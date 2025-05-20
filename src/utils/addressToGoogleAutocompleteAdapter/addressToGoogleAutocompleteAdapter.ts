import { addressToString } from "@tracktor/react-utils";

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
const addressToGoogleAutocompleteAdapter = (address?: unknown | null) => {
  if (!address) {
    return null;
  }

  console.log(addressToString(address));

  const googleAddress = {
    description: addressToString(address),
    distance_meters: 0,
    matched_substrings: [],
    place_id: "",
    structured_formatting: { main_text: "", main_text_matched_substrings: [], secondary_text: "" },
    terms: [],
    types: [],
  };

  console.log("output", googleAddress);

  return googleAddress;
};

export default addressToGoogleAutocompleteAdapter;
