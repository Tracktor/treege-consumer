import { isObject } from "@tracktor/react-utils";
import type { FieldValues } from "@/types/FieldValues";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";

/**
 * Initialize field values from JSON
 * @param jsonFormValues
 */
const initializeFieldValuesFromJson = (jsonFormValues?: JsonFormValue[]): FieldValues | undefined =>
  jsonFormValues?.reduce((acc, { value, name, type }) => {
    if (type === "autocomplete" || type === "dynamicSelect") {
      return {
        ...acc,
        [name]: value,
      };
    }

    const fieldValue = isObject(value) && "value" in value ? value?.value : value;

    return {
      ...acc,
      [name]: fieldValue,
    };
  }, {});

export default initializeFieldValuesFromJson;
