import type Headers from "@/types/Headers";
import { Params } from "@/types/TreeNode";

/**
 * Get search value from autocomplete URL and add additional params
 * @param url
 * @param searchKey
 * @param value
 * @param additionalParams
 * @param headers
 */
const getSearch =
  (url: string, searchKey: string, value: string, headers?: Headers, additionalParams?: Params[]) => async (signal: AbortSignal) => {
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

    const response = await fetch(fullUrl, { ...requestHeaders, signal });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

export default getSearch;
