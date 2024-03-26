import { describe, expect, test, vi } from "vitest";
import getSearch from "@/utils/getSearch/getSearch";
import { mockSuccessfulRequest, mockFailedRequest, mockNoAdditionalParams, mockNoHeaders } from "@/utils/getSearch/test/mock";

const viFns = vi.fn();

const createFetchResponse = (data: unknown) => {
  if (data !== undefined && data !== null) {
    return {
      json: () =>
        new Promise((resolve) => {
          resolve(data);
        }),
      ok: true,
    };
  }
  return {
    json: () =>
      new Promise<void>((resolve) => {
        resolve();
      }),
    ok: false,
  };
};

describe("test getSearch", () => {
  test("test mockSuccessfulRequest", async () => {
    const { url, searchKey, value, headers, additionalParams, signal, responseData } = mockSuccessfulRequest;
    const localFetch = viFns.mockResolvedValue(createFetchResponse(mockSuccessfulRequest.responseData));
    const result = await getSearch(url, searchKey, value, headers, additionalParams, localFetch)(signal);
    expect(result).toEqual(responseData);
  });

  test("test mockFailedRequest", async () => {
    const { url, searchKey, value, headers, additionalParams, signal, errorResponse } = mockFailedRequest;
    const localFetch = viFns.mockResolvedValue(createFetchResponse(undefined));
    try {
      await getSearch(url, searchKey, value, headers, additionalParams, localFetch)(signal);
    } catch (error) {
      expect(error).toEqual(errorResponse);
    }
  });

  test("test mockNoAdditionalParams", async () => {
    const { url, searchKey, value, headers, signal, responseData } = mockNoAdditionalParams;
    const localFetch = viFns.mockResolvedValue(createFetchResponse(responseData));
    const result = await getSearch(url, searchKey, value, headers, undefined, localFetch)(signal);
    expect(result).toEqual(responseData);
  });

  test("test mockNoHeaders", async () => {
    const { url, searchKey, value, signal, responseData } = mockNoHeaders;
    const localFetch = viFns.mockResolvedValue(createFetchResponse(responseData));
    const result = await getSearch(url, searchKey, value, undefined, undefined, localFetch)(signal);
    expect(result).toEqual(responseData);
  });
});
