import * as _ from 'lodash';

export const isSafe = (v) => {
  return v !== undefined && v !== null;
};

export const safeObject = (instance: any) => {
  const resolve = {};
  _.each(instance, (value, key) => {
    if (value !== undefined && value !== null) resolve[key] = value;
  });

  return resolve;
};
