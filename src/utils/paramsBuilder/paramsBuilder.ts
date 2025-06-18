import type { Params } from "@tracktor/types-treege";
import dayjs from "dayjs";
import { DetailFieldValues } from "@/types/FieldValues";

const toParamString = (v: unknown): string => {
  if (v === null || v === undefined) return "";
  if (Array.isArray(v)) return v.join(",");
  if (dayjs.isDayjs(v) || v instanceof Date) return dayjs(v).toISOString();

  return typeof v === "object" ? "" : String(v);
};

interface ParamsBuilderParams {
  params?: Params[];
  detailFieldValues?: DetailFieldValues[];
}

const paramsBuilder = ({ params, detailFieldValues }: ParamsBuilderParams) => {
  const paramsWithStaticValue =
    params
      ?.filter((param) => !param?.useAncestorValue)
      .map((obj) => ({
        key: obj?.key,
        value: obj?.staticValue || "",
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

  const nonEmptyDynamicParams = paramsWithDynamicValue.filter((p) => p.value);

  return [...paramsWithStaticValue, ...nonEmptyDynamicParams];
};

export default paramsBuilder;
