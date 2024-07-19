/**
 * Deep compare two objects
 * @param a
 * @param b
 */
const isDeepEqual = <T>(a: T, b: T): boolean => {
  if (a === b) {
    return true;
  }

  if (a === null || typeof a !== "object" || b === null || typeof b !== "object") {
    return a === b;
  }

  const keysA = Object.keys(a) as (keyof T)[];
  const keysB = Object.keys(b) as (keyof T)[];

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i += 1) {
    const key = keysA[i];

    if (!Object.prototype.hasOwnProperty.call(b, key) || !isDeepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
};

export default isDeepEqual;
