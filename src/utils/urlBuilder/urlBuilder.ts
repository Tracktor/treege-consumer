import type { Params } from "@tracktor/types-treege";
import { DetailFieldValues } from "@/types/FieldValues";

interface UrlBuilderParams {
  url?: string;
  params?: Params[];
  detailFieldValues?: DetailFieldValues[];
}

const urlBuilder = ({ url, detailFieldValues, params = [] }: UrlBuilderParams) => {
  if (!url) {
    return "";
  }

  const filteredParams = params?.filter((item) => typeof item.key === "string" && /^\{.+}$/.test(item.key));
  const paramsWithDynamicValue =
    filteredParams
      ?.filter((param) => param.useAncestorValue)
      .map((param) => {
        const matchingField = detailFieldValues?.find((field) => field.uuid === param.ancestorUuid);
        const stringValue = typeof matchingField?.value === "string" ? matchingField.value : "";

        return {
          key: param.key,
          value: stringValue,
        };
      }) || [];

  const allValuesFilled = paramsWithDynamicValue.every(({ value }) => value.trim() !== "");

  if (paramsWithDynamicValue.length > 0 && allValuesFilled) {
    return paramsWithDynamicValue.reduce((acc, { key, value }) => {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return acc.replace(new RegExp(escapedKey, "g"), value);
    }, url);
  }

  return url;
};

export default urlBuilder;
