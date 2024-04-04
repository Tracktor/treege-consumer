/**
 * Get value from object by key safely
 * @param obj
 * @param key
 */
const safeGetObjectValueByKey = (obj: unknown, key: string) => {
  if (typeof obj !== "object" || obj === null) {
    return "";
  }

  if (Object.keys(obj).includes(key)) {
    return obj[key as keyof typeof obj];
  }

  return "";
};

export default safeGetObjectValueByKey;
