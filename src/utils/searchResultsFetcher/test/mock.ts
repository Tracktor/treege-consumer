import { Headers } from "@/types/Headers";
import { Params } from "@/types/TreeNode";

interface Mock {
  url: string;
  searchKey: string;
  value: string;
  headers?: Headers;
  additionalParams?: Params[];
  signal: AbortSignal;
  responseData?: Record<string, string[]>;
  errorResponse?: Error;
}

const mockSuccessfulRequest: Mock = {
  additionalParams: [{ id: "0", key: "filter", value: "true" }],
  headers: { Authorization: "Bearer token" },
  responseData: { results: ["result1", "result2"] },
  searchKey: "query",
  signal: new AbortController().signal,
  url: "https://example.com/api/search",
  value: "example",
};

const mockFailedRequest: Mock = {
  additionalParams: [{ id: "0", key: "filter", value: "true" }],
  errorResponse: new Error("Network response was not ok"),
  headers: { Authorization: "Bearer token" },
  searchKey: "query",
  signal: new AbortController().signal,
  url: "https://example.com/api/search",
  value: "example",
};

const mockNoAdditionalParams: Mock = {
  headers: { Authorization: "Bearer token" },
  responseData: { results: ["result1", "result2"] },
  searchKey: "query",
  signal: new AbortController().signal,
  url: "https://example.com/api/search",
  value: "example",
};

const mockNoHeaders: Mock = {
  responseData: { results: ["result1", "result2"] },
  searchKey: "query",
  signal: new AbortController().signal,
  url: "https://example.com/api/search",
  value: "example",
};

export { mockSuccessfulRequest, mockFailedRequest, mockNoAdditionalParams, mockNoHeaders };
