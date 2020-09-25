export function arrConv<T>(obj: Array<T> | T): Array<T> {
  return Array.isArray(obj) ? obj : [obj];
}
