import { isArray, isObject } from "@tracktor/react-utils";
import type { Params } from "@tracktor/types-treege";
import dayjs from "dayjs";
import { DetailFieldValues } from "@/types/FieldValues";

interface ParamsBuilderParams {
  params?: Params[];
  detailFieldValues?: DetailFieldValues[];
}

/**
 * Converts a value to a string suitable for URL parameters.
 * @param v
 */
const toParamString = (v: unknown): string => {
  if (v === null || v === undefined) return "";
  if (isArray(v)) return v.join(",");
  if (dayjs.isDayjs(v) || v instanceof Date) return dayjs(v).toISOString();

  return isObject(v) ? "" : String(v);
};

const paramsBuilder = ({ params, detailFieldValues }: ParamsBuilderParams) => {
  const paramsWithStaticValue =
    params
      ?.filter((param) => !param?.useAncestorValue)
      .map((object) => ({
        key: object?.key,
        value: object?.staticValue || "",
      })) || [];

  const paramsWithDynamicValue =
    params
      ?.filter((param) => param.useAncestorValue)
      .map((param) => {
        const matchingField = detailFieldValues?.find((field) => field.uuid === param.ancestorUuid);
        const rawValue = matchingField?.value;
        const stringValue = toParamString(rawValue);

        return {
          key: param.key,
          value: stringValue,
        };
      }) || [];

  const nonEmptyDynamicParams = paramsWithDynamicValue.filter((param) => param.value);

  return [...paramsWithStaticValue, ...nonEmptyDynamicParams];
};

export default paramsBuilder;
