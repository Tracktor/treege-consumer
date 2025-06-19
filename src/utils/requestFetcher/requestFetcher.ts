export interface DryParams {
  key: string;
  value: string | string[];
}

type LocalFetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

interface searchResultsFetcherParams {
  url: string;
  searchKey?: string;
  searchValue?: string;
  headers?: HeadersInit;
  additionalParams?: DryParams[];
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
const requestFetcher =
  ({ url, searchKey, searchValue, headers, additionalParams, localFetch }: searchResultsFetcherParams) =>
  async (signal: AbortSignal) => {
    const searchParams = new URLSearchParams();

    // Add search value to URL
    if (searchKey && searchValue) {
      searchParams.append(searchKey, searchValue);
    }

    // Add additional params to URL
    if (additionalParams) {
      for (let i = 0; i < additionalParams.length; i += 1) {
        const param = additionalParams[i];

        const valueIsEmpty = param.value === "" || (Array.isArray(param.value) && param.value.length === 0);

        if (!valueIsEmpty) {
          searchParams.append(param.key, String(param.value));
        }
      }
    }

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

export default requestFetcher;
