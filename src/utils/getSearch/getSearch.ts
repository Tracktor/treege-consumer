import type Headers from "@/types/Headers";
import { Params } from "@/types/TreeNode";

type LocalFetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

/**
 * Get search value from autocomplete URL and add additional params
 * @param url
 * @param searchKey
 * @param value
 * @param additionalParams
 * @param headers
 * @param localFetch
 */
const getSearch =
  (url: string, searchKey: string, value: string, headers?: Headers, additionalParams?: Params[], localFetch?: LocalFetch) =>
  async (signal: AbortSignal) => {
    const searchParams = new URLSearchParams();
    searchParams.append(searchKey, value);

    if (additionalParams) {
      for (let i = 0; i < additionalParams.length; i += 1) {
        const param = additionalParams[i];
        searchParams.append(param.key, param.value);
      }
    }

    const fullUrl = `${url}?${searchParams.toString()}`;

    const requestHeaders: RequestInit = {
      headers: new Headers(headers),
      method: "GET",
    };

    const fetchCall = localFetch || fetch;

    const response = await fetchCall(fullUrl, {
      ...requestHeaders,
      signal,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

export default getSearch;
