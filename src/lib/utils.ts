/*
 * checks if the given data object has all the keys of the given class
 */
const hasAllProperties = (data: any, clazz: any) => {
  return Object.keys(new clazz()).every((key) => data[key] !== undefined);
};

/*
 * copies all the data from the given object to a new instance of the given class
 */
const softCopy = (data: any, clazz: any) => {
  const _clazz = new clazz();
  Object.keys(_clazz).forEach((key) => (_clazz[key] = data[key]));
  return _clazz;
};

export { hasAllProperties, softCopy };
