import { describe, expect, it } from "vitest";
import { JsonFormValue } from "@/types/JsonFormValue";
import initializeFieldValuesFromJson from "@/utils/initializeFieldValuesFromJson/initializeFieldValuesFromJson";

describe("initializeFieldValuesFromJson", () => {
  it("should return undefined when input is undefined", () => {
    const result = initializeFieldValuesFromJson(undefined);
    expect(result).toBeUndefined();
  });

  it("should handle empty array input", () => {
    const input: JsonFormValue[] = [];
    const result = initializeFieldValuesFromJson(input);
    expect(result).toEqual({});
  });

  it("should correctly transform simple text fields", () => {
    const input: JsonFormValue[] = [
      { name: "firstName", type: "text", value: "John" },
      { name: "lastName", type: "text", value: "Doe" },
      { name: "age", type: "number", value: 30 },
    ];

    const expected = {
      age: 30,
      firstName: "John",
      lastName: "Doe",
    };

    const result = initializeFieldValuesFromJson(input);
    expect(result).toEqual(expected);
  });

  it("should correctly extract values from autocomplete and dynamicSelect fields", () => {
    const input: JsonFormValue[] = [
      {
        name: "country",
        type: "autocomplete",
        value: { id: "1", label: "France", value: "FR" },
      },
      {
        name: "city",
        type: "dynamicSelect",
        value: { id: "2", label: "Paris", value: "PAR" },
      },
    ];

    const expected = {
      city: { id: "2", label: "Paris", value: "PAR" },
      country: { id: "1", label: "France", value: "FR" },
    };

    const result = initializeFieldValuesFromJson(input);
    expect(result).toEqual(expected);
  });

  it("should extract value property from object values for non-autocomplete fields", () => {
    const input: JsonFormValue[] = [
      {
        name: "gender",
        type: "select",
        value: { label: "Male", value: "M" },
      },
      {
        name: "role",
        type: "radio",
        value: { label: "Admin", value: "admin" },
      },
    ];

    const expected = {
      gender: "M",
      role: "admin",
    };

    const result = initializeFieldValuesFromJson(input);
    expect(result).toEqual(expected);
  });

  it("should handle boolean values correctly", () => {
    const input: JsonFormValue[] = [
      { name: "isActive", type: "switch", value: true },
      { name: "isAdmin", type: "checkbox", value: false },
    ];

    const expected = {
      isActive: true,
      isAdmin: false,
    };

    const result = initializeFieldValuesFromJson(input);
    expect(result).toEqual(expected);
  });

  it("should handle array values correctly", () => {
    const input: JsonFormValue[] = [
      { name: "skills", type: "multiSelect", value: ["javascript", "react", "typescript"] },
      { name: "dateRange", type: "dateRange", value: ["2023-01-01", "2023-12-31"] },
    ];

    const expected = {
      dateRange: ["2023-01-01", "2023-12-31"],
      skills: ["javascript", "react", "typescript"],
    };

    const result = initializeFieldValuesFromJson(input);
    expect(result).toEqual(expected);
  });

  it("should handle mixed field types", () => {
    const input: JsonFormValue[] = [
      { name: "firstName", type: "text", value: "John" },
      { name: "isActive", type: "switch", value: true },
      { name: "country", type: "autocomplete", value: { id: "1", label: "France", value: "FR" } },
      { name: "gender", type: "select", value: { label: "Male", value: "M" } },
      { name: "dateRange", type: "dateRange", value: ["2023-01-01", "2023-12-31"] },
    ];

    const expected = {
      country: { id: "1", label: "France", value: "FR" },
      dateRange: ["2023-01-01", "2023-12-31"],
      firstName: "John",
      gender: "M",
      isActive: true,
    };

    const result = initializeFieldValuesFromJson(input);
    expect(result).toEqual(expected);
  });

  it("should handle null and undefined values", () => {
    const input: JsonFormValue[] = [
      { name: "field1", type: "text", value: null },
      { name: "field2", type: "text", value: undefined },
    ];

    const expected = {
      field1: null,
      field2: undefined,
    };

    const result = initializeFieldValuesFromJson(input);
    expect(result).toEqual(expected);
  });

  it("should handle values without type property", () => {
    const input: JsonFormValue[] = [
      { name: "field1", value: "value1" },
      { name: "field2", value: { label: "Option", value: "option" } },
    ];

    const expected = {
      field1: "value1",
      field2: "option",
    };

    const result = initializeFieldValuesFromJson(input);
    expect(result).toEqual(expected);
  });
});
