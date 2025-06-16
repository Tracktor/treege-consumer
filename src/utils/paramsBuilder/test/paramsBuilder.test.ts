import type { Params } from "@tracktor/types-treege";
import { describe, test, expect } from "vitest";
import type { TreeFieldValues } from "@/types/FieldValues";
import paramsBuilder from "@/utils/paramsBuilder/paramsBuilder";

describe("paramsBuilder", () => {
  test("returns empty array when no params are provided", () => {
    const result = paramsBuilder({});
    expect(result).toEqual([]);
  });

  test("returns static params only when no dynamic values", () => {
    const params: Params[] = [
      {
        key: "lang",
        staticValue: "fr",
        useAncestorValue: false,
      } as Params,
      {
        key: "country",
        staticValue: "FR",
        useAncestorValue: false,
      } as Params,
    ];

    const result = paramsBuilder({ params });
    expect(result).toEqual([
      { key: "lang", value: "fr" },
      { key: "country", value: "FR" },
    ]);
  });

  test("returns dynamic params only when useAncestorValue is true", () => {
    const params: Params[] = [
      {
        ancestorUuid: "abc",
        key: "id",
        useAncestorValue: true,
      } as Params,
    ];

    const treeFieldValues: TreeFieldValues[] = [
      {
        uuid: "abc",
        value: "123",
      } as TreeFieldValues,
    ];

    const result = paramsBuilder({ params, treeFieldValues });
    expect(result).toEqual([{ key: "id", value: "123" }]);
  });

  test("returns both static and dynamic params", () => {
    const params: Params[] = [
      {
        key: "staticParam",
        staticValue: "foo",
        useAncestorValue: false,
      } as Params,
      {
        ancestorUuid: "uuid-1",
        key: "dynParam",
        useAncestorValue: true,
      } as Params,
    ];

    const treeFieldValues: TreeFieldValues[] = [
      {
        uuid: "uuid-1",
        value: "bar",
      } as TreeFieldValues,
    ];

    const result = paramsBuilder({ params, treeFieldValues });
    expect(result).toEqual([
      { key: "staticParam", value: "foo" },
      { key: "dynParam", value: "bar" },
    ]);
  });

  test("excludes dynamic params with empty values", () => {
    const params: Params[] = [
      {
        ancestorUuid: "abc",
        key: "id",
        useAncestorValue: true,
      } as Params,
    ];

    const treeFieldValues: TreeFieldValues[] = [
      {
        uuid: "abc",
        value: "",
      } as TreeFieldValues,
    ];

    const result = paramsBuilder({ params, treeFieldValues });
    expect(result).toEqual([]);
  });

  test("casts non-string primitive values in dynamic fields to strings", () => {
    const params: Params[] = [
      {
        ancestorUuid: "abc",
        key: "id",
        useAncestorValue: true,
      } as Params,
    ];

    const treeFieldValues: TreeFieldValues[] = [
      {
        uuid: "abc",
        value: 1234,
      } as unknown as TreeFieldValues,
    ];

    const result = paramsBuilder({ params, treeFieldValues });

    expect(result).toEqual([
      {
        key: "id",
        value: "1234",
      },
    ]);
  });

  test("ignores object and array values in dynamic fields", () => {
    const params: Params[] = [
      {
        ancestorUuid: "abc",
        key: "ignored",
        useAncestorValue: true,
      } as Params,
    ];

    const treeFieldValues: TreeFieldValues[] = [
      {
        uuid: "abc",
        value: { nested: "value" },
      } as unknown as TreeFieldValues,
    ];

    const result = paramsBuilder({ params, treeFieldValues });

    expect(result).toEqual([]);
  });

  test("handles undefined staticValue as empty string", () => {
    const params: Params[] = [
      {
        key: "undefinedStatic",
        useAncestorValue: false,
      } as Params,
    ];

    const result = paramsBuilder({ params });
    expect(result).toEqual([{ key: "undefinedStatic", value: "" }]);
  });
});
