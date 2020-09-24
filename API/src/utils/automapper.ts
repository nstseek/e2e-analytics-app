import _ from 'lodash';

/**
 * AutoMapper clone from .NET to map from an object to another (usually from the query response to the object instance)
 * @param origin The original source of data
 * @param destination The object that will receive the data
 */
export function autoMapper<T>(origin: T, destination: T) {
  Object.keys(destination).forEach((key) => {
    // @ts-expect-error
    destination[_.toLower(key)] = origin[_.toLower(key)];
  });
}
