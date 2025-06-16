import type { Params } from "@tracktor/types-treege";
import { describe, test, expect } from "vitest";
import type { DetailFieldValues } from "@/types/FieldValues";
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
        id: "1",
        key: "{id}",
        useAncestorValue: true,
      },
    ];

    const detailFieldValues: DetailFieldValues[] = [
      {
        name: "Test",
        type: "string",
        uuid: "123",
        value: "456",
      },
    ];

    const result = urlBuilder({
      detailFieldValues,
      params,
      url: "https://example.com/{id}",
    });

    expect(result).toBe("https://example.com/456");
  });

  test("returns original url when not all dynamic values are filled", () => {
    const params: Params[] = [
      {
        ancestorUuid: "123",
        id: "1",
        key: "{id}",
        useAncestorValue: true,
      },
    ];

    const detailFieldValues: DetailFieldValues[] = [
      {
        uuid: "123",
        value: "",
      } as DetailFieldValues,
    ];

    const result = urlBuilder({
      detailFieldValues,
      params,
      url: "https://example.com/{id}",
    });

    expect(result).toBe("https://example.com/{id}");
  });

  test("handles multiple replacements", () => {
    const params: Params[] = [
      {
        ancestorUuid: "123",
        id: "1",
        key: "{id}",
        useAncestorValue: true,
      },
      {
        ancestorUuid: "456",
        id: "2",
        key: "{name}",
        useAncestorValue: true,
      },
    ];

    const detailFieldValues: DetailFieldValues[] = [
      {
        uuid: "123",
        value: "789",
      },
      {
        uuid: "456",
        value: "John",
      },
    ] as DetailFieldValues[];

    const result = urlBuilder({
      detailFieldValues,
      params,
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

    const detailFieldValues: DetailFieldValues[] = [
      {
        name: "Test",
        type: "string",
        uuid: "123",
        value: "000",
      },
    ];

    const result = urlBuilder({
      detailFieldValues,
      params,
      url: "https://example.com/id",
    });

    expect(result).toBe("https://example.com/id");
  });
});
