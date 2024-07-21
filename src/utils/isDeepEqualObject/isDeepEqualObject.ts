/**
 * Deep compare two objects
 * @param objectA
 * @param objectB
 */
const isDeepEqualObject = <T>(objectA: T, objectB: T): boolean => {
  if (objectA === objectB) {
    return true;
  }

  // Check if both are an object
  if (objectA === null || typeof objectA !== "object" || objectB === null || typeof objectB !== "object") {
    return objectA === objectB;
  }

  const keysA = Object.keys(objectA) as (keyof T)[];
  const keysB = Object.keys(objectB) as (keyof T)[];

  // Check if both have the same number of keys
  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i += 1) {
    const key = keysA[i];

    // Check if current key is in the other object and if the values are equal
    if (!Object.prototype.hasOwnProperty.call(objectB, key) || !isDeepEqualObject(objectA[key], objectB[key])) {
      return false;
    }
  }

  return true;
};

export default isDeepEqualObject;
