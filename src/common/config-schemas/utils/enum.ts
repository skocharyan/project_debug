export const getEnumName = (value: any, enumerate: any): any | undefined => {
  const current = parseInt(value, 10);

  for (const item in enumerate) {
    const valueProperty = parseInt(item, 10);

    if (current === valueProperty) return enumerate[item];
  }

  return undefined;
};
