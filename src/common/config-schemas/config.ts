import Ajv, { JTDDataType } from 'ajv/dist/jtd';
import * as _ from 'lodash';
import {
  ConfigLocalLogger,
  DEFAULT_CONFIG_META_ENV_VERSION_DEPTH_SUFFIX_DEFAULT,
  DEFAULT_CONFIG_META_ENV_VERSION_SUFFIX_DEFAULT,
  DEFAULT_CONFIG_META_PATH,
  INestConfigParams,
  NEST_CONFIG_LOGGER_NAME
} from './types';
import {
  applyFile,
  getConfigValue,
  initProvider,
  transformPathFromDotToEnv
} from './init';
import { isSafe } from './utils';
import { INestLogger, prepareLogger } from './types/logger';

const isInitNestConfig = false;

export const initNestConfig = ({
  files,
  forceInit = false,
  ...params
}: {
  files?: string[];
  logger?: INestLogger;
  forceInit?: boolean;
}) => {
  if (isInitNestConfig && !forceInit) return;

  if (forceInit) initProvider();

  const logger = prepareLogger(
    ConfigLocalLogger,
    NEST_CONFIG_LOGGER_NAME,
    params?.logger
  );
  try {
    if (!_.isEmpty(files)) files?.forEach((file) => applyFile(file, logger));
  } catch (err) {
    logger.error('Init config error', {
      err
    });
    throw err;
  }
};

export const getNestConfig = ({
  schema,
  files,
  envVersionSuffix = DEFAULT_CONFIG_META_ENV_VERSION_SUFFIX_DEFAULT,
  envVersionDepthSuffix = DEFAULT_CONFIG_META_ENV_VERSION_DEPTH_SUFFIX_DEFAULT,
  ...params
}: INestConfigParams) => {
  const logger = prepareLogger(
    ConfigLocalLogger,
    NEST_CONFIG_LOGGER_NAME,
    params?.logger
  );

  try {
    initNestConfig({ files, logger });

    const ajv = new Ajv({
      jtd: true,
      meta: true
    });
    ajv.addKeyword(DEFAULT_CONFIG_META_PATH);

    type TConfig = JTDDataType<typeof schema>;
    const validate = ajv.compile<TConfig>(schema);

    const configData: TConfig = iterateSchema({
      schema,
      accumulate: {},
      envVersionSuffix,
      envVersionDepthSuffix
    });

    if (!validate(configData)) {
      logger.error('Not valid config', {
        err: validate.errors,
        config: configData
      });
      throw new Error(`Not valid config: ${JSON.stringify(validate.errors)}`);
    }

    return configData;
  } catch (err) {
    logger.error('Schema error', {
      err
    });
    throw err;
  }
};

function iterateSchema({
  schema,
  accumulate,
  currentPath = '',
  objectPath,
  envVersionSuffix,
  envVersionDepthSuffix
}: {
  schema: any;
  accumulate: any;
  objectPath?: string;
  currentPath?: string;
  envVersionSuffix: string;
  envVersionDepthSuffix: number;
}) {
  const resolvePath = (() => {
    const customPath = _.get(schema, `metadata.${DEFAULT_CONFIG_META_PATH}`);

    if (!isSafe(customPath) || customPath === '') return currentPath;

    const splitPath = currentPath.split('.');
    splitPath[splitPath.length - 1] = customPath;

    return splitPath.join('.');
  })();

  const resolveObjectPath =
    isSafe(objectPath) && objectPath !== '' ? `${objectPath}` : currentPath;

  const typeField = _.get(schema, 'type');
  const propertiesField = _.get(schema, 'properties');
  const valuesField = _.get(schema, 'values');
  const elementsField = _.get(schema, 'elements');
  const enumField = _.get(schema, 'enum');

  // For simple value.
  if (isSafe(typeField) || isSafe(enumField)) {
    return applySimpleField({
      accumulate,
      path: resolvePath,
      objectPath: resolveObjectPath,
      number: /int|float/i.test(typeField),
      boolean: /bool/i.test(typeField),
      envVersionSuffix,
      envVersionDepthSuffix
    });
  }

  // For object value.
  if (isSafe(propertiesField)) {
    return applyObjectField({
      accumulate,
      path: resolvePath,
      objectPath: resolveObjectPath,
      propertiesField,
      envVersionSuffix,
      envVersionDepthSuffix
    });
  }

  // For values.
  if (isSafe(valuesField)) {
    return applyValuesField({
      accumulate,
      path: resolvePath,
      objectPath: resolveObjectPath,
      valuesField,
      envVersionSuffix,
      envVersionDepthSuffix
    });
  }

  // For lists.
  if (isSafe(elementsField)) {
    return applyListField({
      accumulate,
      path: resolvePath,
      objectPath: resolveObjectPath,
      elementsField,
      envVersionSuffix,
      envVersionDepthSuffix
    });
  }

  return applySimpleField({
    accumulate,
    path: resolvePath,
    objectPath: resolveObjectPath,
    number: false,
    boolean: false,
    envVersionSuffix,
    envVersionDepthSuffix
  });
}

function applySimpleField({
  path,
  objectPath,
  accumulate,
  number,
  boolean
}: {
  path: string;
  objectPath: string;
  accumulate: any;
  number: boolean;
  boolean: boolean;
  envVersionSuffix: string;
  envVersionDepthSuffix: number;
}) {
  let value = getConfigValue(path);

  if (number) {
    value = Number(value);
  } else if (boolean && _.isString(value)) value = value === 'true';

  _.set(accumulate, objectPath, value);

  return accumulate;
}

function getSchemaPath(prefix: string, schemaKey = '') {
  if (isSafe(prefix) && prefix !== '') {
    return `${prefix}${
      isSafe(schemaKey) && schemaKey !== '' ? `.${schemaKey}` : ''
    }`;
  }

  return schemaKey ?? '';
}

function applyObjectField({
  path,
  objectPath,
  accumulate,
  propertiesField,
  envVersionSuffix,
  envVersionDepthSuffix
}: {
  path: string;
  objectPath: string;
  accumulate: any;
  propertiesField: Record<string, any>;
  envVersionSuffix: string;
  envVersionDepthSuffix: number;
}) {
  for (const [schemaKey, currentSchema] of Object.entries(propertiesField)) {
    Object.assign(
      accumulate,
      iterateSchema({
        schema: currentSchema,
        accumulate: accumulate,
        currentPath: getSchemaPath(path, schemaKey),
        objectPath: getSchemaPath(objectPath, schemaKey),
        envVersionSuffix,
        envVersionDepthSuffix
      })
    );
  }

  return accumulate;
}

function applyValuesField({
  path,
  objectPath,
  accumulate,
  valuesField,
  envVersionSuffix,
  envVersionDepthSuffix
}: {
  path: string;
  objectPath: string;
  accumulate: any;
  valuesField: Record<string, any>;
  envVersionSuffix: string;
  envVersionDepthSuffix: number;
}) {
  const values = getConfigValue(path);

  if (_.isEmpty(values)) {
    _.set(accumulate, objectPath, {});

    return accumulate;
  }

  for (const [key] of Object.entries(values)) {
    Object.assign(
      accumulate,
      iterateSchema({
        schema: valuesField,
        accumulate: accumulate,
        currentPath: getSchemaPath(path, key),
        objectPath: getSchemaPath(objectPath, key),
        envVersionSuffix,
        envVersionDepthSuffix
      })
    );
  }

  return accumulate;
}

function applyListField({
  path,
  objectPath,
  accumulate,
  elementsField,
  envVersionSuffix,
  envVersionDepthSuffix
}: {
  path: string;
  objectPath: string;
  accumulate: any;
  elementsField: Record<string, any>;
  envVersionSuffix: string;
  envVersionDepthSuffix: number;
}) {
  const originalList = getConfigValue(path);

  const envVersionsList = _.map(
    getEnvVersionSuffixes({
      path,
      suffix: envVersionSuffix,
      depth: envVersionDepthSuffix
    }),
    (suffix) => {
      return getConfigValue(suffix);
    }
  )
    .filter((l) => isSafe(l))
    .map((l) => l.split(','));

  if (_.isString(originalList)) {
    _.set(
      accumulate,
      objectPath,
      _.uniq([...originalList.split(','), ..._.flatten(envVersionsList)])
    );

    return accumulate;
  }

  if (_.isEmpty(originalList)) {
    _.set(accumulate, objectPath, []);

    return accumulate;
  }

  for (const [index] of originalList.entries()) {
    Object.assign(
      accumulate,
      iterateSchema({
        schema: elementsField,
        accumulate,
        currentPath: getSchemaPath(`${path}.${index}`),
        objectPath: getSchemaPath(`${objectPath}.${index}`),
        envVersionSuffix,
        envVersionDepthSuffix
      })
    );
  }

  _.set(
    accumulate,
    objectPath,
    _.uniq([
      ..._.get(accumulate, getSchemaPath(`${objectPath}`)),
      ..._.flatten(envVersionsList)
    ])
  );

  return accumulate;
}

function getEnvVersionSuffixes({
  path,
  suffix,
  depth
}: {
  path: string;
  suffix: string;
  depth: number;
}): string[] {
  return _.map(_.times(depth), (i) =>
    transformPathFromDotToEnv(`${path}.${suffix}.${i + 1}`)
  );
}
