import FieldValues from "@/types/FieldValues";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

const isObject = (value: unknown) => typeof value === "object" && !Array.isArray(value) && value !== null;

/**
 * Prefixes the name of each field in the array with the tree path.
 * @param jsonFormValues
 */
const setInitialJsonValues = (jsonFormValues: JsonFormValue[]): FieldValues =>
  jsonFormValues.reduce((acc, { value, name, type }) => {
    if (type === "autocomplete" || type === "dynamicSelect") {
      return {
        ...acc,
        [name]: value,
      };
    }

    const fieldValue = isObject(value) ? value?.value : value;

    return {
      ...acc,
      [name]: fieldValue,
    };
  }, {});

export default setInitialJsonValues;
