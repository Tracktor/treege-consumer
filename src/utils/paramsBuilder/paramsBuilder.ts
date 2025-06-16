import type { Params } from "@tracktor/types-treege";
import { DetailFieldValues } from "@/types/FieldValues";

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

        const stringValue = rawValue !== null && rawValue !== undefined && typeof rawValue !== "object" ? String(rawValue) : "";

        return {
          key: param.key,
          value: stringValue,
        };
      }) || [];

  const nonEmptyDynamicParams = paramsWithDynamicValue.filter((p) => p.value);

  return [...paramsWithStaticValue, ...nonEmptyDynamicParams];
};

export default paramsBuilder;
