import { describe, expect, it } from "vitest";
import safeGetObjectValueByKey from "@/utils/safeGetObjectValueByKey/safeGetObjectValueByKey";

describe("safeGetObjectValueByKey", () => {
  it("should return empty string when object is null", () => {
    const result = safeGetObjectValueByKey(null, "anyKey");
    expect(result).toBe("");
  });

  it("should return empty string when object is undefined", () => {
    const result = safeGetObjectValueByKey(undefined, "anyKey");
    expect(result).toBe("");
  });

  it("should return empty string when value is a primitive (not an object)", () => {
    const result1 = safeGetObjectValueByKey(42, "anyKey");
    const result2 = safeGetObjectValueByKey("string", "anyKey");
    const result3 = safeGetObjectValueByKey(true, "anyKey");

    expect(result1).toBe("");
    expect(result2).toBe("");
    expect(result3).toBe("");
  });

  it("should return empty string when the key does not exist in the object", () => {
    const obj = { age: 30, name: "John" };
    const result = safeGetObjectValueByKey(obj, "address");
    expect(result).toBe("");
  });

  it("should return the value when the key exists in the object", () => {
    const obj = { age: 30, name: "John" };

    const result1 = safeGetObjectValueByKey(obj, "name");
    const result2 = safeGetObjectValueByKey(obj, "age");

    expect(result1).toBe("John");
    expect(result2).toBe(30);
  });

  it("should handle nested objects", () => {
    const obj = {
      user: {
        address: {
          city: "Paris",
        },
        name: "John",
      },
    };

    const result = safeGetObjectValueByKey(obj, "user");
    expect(result).toEqual({ address: { city: "Paris" }, name: "John" });
  });

  it("should handle arrays", () => {
    const arr = [1, 2, 3];

    const result = safeGetObjectValueByKey(arr, "1");
    expect(result).toBe(2);
  });

  it("should handle key containing special characters", () => {
    const obj = { "special-key": "special value" };

    const result = safeGetObjectValueByKey(obj, "special-key");
    expect(result).toBe("special value");
  });

  it("should return falsy values correctly instead of empty string", () => {
    const obj = {
      empty: "",
      isfalse: false,
      null: null,
      undefined,
      zero: 0,
    };

    expect(safeGetObjectValueByKey(obj, "zero")).toBe(0);
    expect(safeGetObjectValueByKey(obj, "empty")).toBe("");
    expect(safeGetObjectValueByKey(obj, "isfalse")).toBe(false);
    expect(safeGetObjectValueByKey(obj, "null")).toBe(null);
    expect(safeGetObjectValueByKey(obj, "undefined")).toBe(undefined);
  });
});
