import type { Params } from "@tracktor/types-treege";
import { TreeFieldValues } from "@/types/FieldValues";

interface ParamsBuilderParams {
  params?: Params[];
  treeFieldValues?: TreeFieldValues[];
}

const paramsBuilder = ({ params, treeFieldValues }: ParamsBuilderParams) => {
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
        const matchingField = treeFieldValues?.find((field) => field.uuid === param.ancestorUuid);
        const stringValue = typeof matchingField?.value === "string" ? matchingField.value : "";

        return {
          key: param.key,
          value: stringValue,
        };
      }) || [];

  const nonEmptyDynamicParams = paramsWithDynamicValue.filter((p) => p.value);

  return [...paramsWithStaticValue, ...nonEmptyDynamicParams];
};

export default paramsBuilder;
