import { addressToString } from "@tracktor/react-utils";

interface ResponseGeocodingAddress {
  description?: string;
  distance_meters?: number;
  matched_substrings?: Array<{ offset: number; length: number }>;
  place_id?: string;
  structured_formatting?: {
    main_text: string;
    main_text_matched_substrings: Array<{ offset: number; length: number }>;
    secondary_text: string;
  };
  terms?: Array<{ value: string; offset: number }>;
  types?: string[];
}

/**
 * Adapts a CommonGeocodingAddress object to a format compatible with
 * the Google Places Autocomplete API.
 *
 * @param address - The address object to be adapted. It can be of type
 *                  CommonGeocodingAddress or null/undefined.
 *                  If null or undefined, the function returns null.
 * @returns An object formatted according to the Google Places Autocomplete API,
 *          or null if the input address is invalid.
 */
const addressToGoogleAutocompleteAdapter = (address?: unknown | null): ResponseGeocodingAddress | null => {
  if (!address) {
    return null;
  }

  return {
    description: addressToString(address),
    distance_meters: 0,
    matched_substrings: [],
    place_id: "",
    structured_formatting: { main_text: "", main_text_matched_substrings: [], secondary_text: "" },
    terms: [],
    types: [],
  };
};

export default addressToGoogleAutocompleteAdapter;
