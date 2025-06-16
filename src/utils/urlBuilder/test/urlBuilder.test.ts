import type { Params } from "@tracktor/types-treege";
import { describe, test, expect } from "vitest";
import type { TreeFieldValues } from "@/types/FieldValues";
import urlBuilder from "@/utils/urlBuilder/urlBuilder";

describe("urlBuilder", () => {
  test("returns empty string when url is undefined", () => {
    const result = urlBuilder({});
    expect(result).toBe("");
  });

  test("returns original url when no params or treeFieldValues", () => {
    const result = urlBuilder({ url: "https://example.com/{id}" });
    expect(result).toBe("https://example.com/{id}");
  });

  test("replaces dynamic key with ancestor value", () => {
    const params: Params[] = [
      {
        ancestorUuid: "123",
        key: "{id}",
        useAncestorValue: true,
      } as Params,
    ];

    const treeFieldValues: TreeFieldValues[] = [
      {
        uuid: "123",
        value: "456",
      } as TreeFieldValues,
    ];

    const result = urlBuilder({
      params,
      treeFieldValues,
      url: "https://example.com/{id}",
    });

    expect(result).toBe("https://example.com/456");
  });

  test("returns original url when not all dynamic values are filled", () => {
    const params: Params[] = [
      {
        ancestorUuid: "123",
        key: "{id}",
        useAncestorValue: true,
      } as Params,
    ];

    const treeFieldValues: TreeFieldValues[] = [
      {
        uuid: "123",
        value: "",
      } as TreeFieldValues,
    ];

    const result = urlBuilder({
      params,
      treeFieldValues,
      url: "https://example.com/{id}",
    });

    expect(result).toBe("https://example.com/{id}");
  });

  test("handles multiple replacements", () => {
    const params: Params[] = [
      {
        ancestorUuid: "123",
        key: "{id}",
        useAncestorValue: true,
      } as Params,
      {
        ancestorUuid: "456",
        key: "{name}",
        useAncestorValue: true,
      } as Params,
    ];

    const treeFieldValues: TreeFieldValues[] = [
      {
        uuid: "123",
        value: "789",
      } as TreeFieldValues,
      {
        uuid: "456",
        value: "John",
      } as TreeFieldValues,
    ];

    const result = urlBuilder({
      params,
      treeFieldValues,
      url: "https://example.com/{id}/{name}",
    });

    expect(result).toBe("https://example.com/789/John");
  });

  test("ignores params without dynamic key pattern", () => {
    const params: Params[] = [
      {
        ancestorUuid: "123",
        key: "id",
        useAncestorValue: true,
      } as Params,
    ];

    const treeFieldValues: TreeFieldValues[] = [
      {
        uuid: "123",
        value: "000",
      } as TreeFieldValues,
    ];

    const result = urlBuilder({
      params,
      treeFieldValues,
      url: "https://example.com/id",
    });

    expect(result).toBe("https://example.com/id");
  });
});
