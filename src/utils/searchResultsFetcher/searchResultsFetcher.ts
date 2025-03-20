import type { Params } from "@tracktor/types-treege";

type LocalFetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

interface searchResultsFetcherParams {
  url: string;
  searchKey: string;
  searchValue: string;
  headers?: HeadersInit;
  additionalParams?: Params[];
  localFetch?: LocalFetch;
}

/**
 * Get search value from autocomplete URL and add additional params
 * @param url
 * @param searchKey
 * @param value
 * @param additionalParams
 * @param headers
 * @param localFetch
 */
const searchResultsFetcher =
  ({ url, searchKey, searchValue, headers, additionalParams, localFetch }: searchResultsFetcherParams) =>
  async (signal: AbortSignal) => {
    const searchParams = new URLSearchParams();

    // Add search value to URL
    searchParams.append(searchKey, searchValue);

    // Add additional params to URL
    if (additionalParams) {
      for (let i = 0; i < additionalParams.length; i += 1) {
        const param = additionalParams[i];
        searchParams.append(param.key, param.value);
      }
    }

    // Construct final URL
    const finalUrl = `${url}?${searchParams.toString()}`;

    // Add headers to request
    const requestHeaders: RequestInit = {
      headers: new Headers(headers),
      method: "GET",
    };

    // Fetch data
    const fetchCall = localFetch || fetch;

    const response = await fetchCall(finalUrl, {
      ...requestHeaders,
      signal,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

export default searchResultsFetcher;
