import _ from 'lodash';

/**
 * AutoMapper clone from .NET to map from an object to another (usually from the query response to the object instance)
 * @param origin The original source of data
 * @param destination The object that will receive the data
 */
export function autoMapper<T>(
  origin: T,
  destination: T,
  upper = false,
  purge = false
) {
  Object.keys(destination).forEach((key) => {
    if (
      !origin[upper ? (_.toUpper(key) as keyof T) : (_.toLower(key) as keyof T)]
    ) {
      if (purge) {
        delete destination[_.toLower(key) as keyof T];
      }
    } else {
      destination[_.toLower(key) as keyof T] =
        origin[
          upper ? (_.toUpper(key) as keyof T) : (_.toLower(key) as keyof T)
        ];
    }
  });
}
