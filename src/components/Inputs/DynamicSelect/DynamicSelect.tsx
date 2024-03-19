import { useQuery } from "@tanstack/react-query";
import { Select, MenuItem, SelectChangeEvent } from "@tracktor/design-system";
import { useMemo } from "react";
import ControlledToolTip from "@/components/ControlledToolTip/ControlledToolTip";
import ChangeEventField from "@/types/ChangeEventField";
import Headers from "@/types/Headers";
import TreeNode from "@/types/TreeNode";
import adaptRouteResponseToOptions from "@/utils/adaptRouteResponseToOptions/adaptRouteResponseToOptions";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";
import getValueFromTree from "@/utils/getValueFromTree/getValueFromTree";

interface DynamicSelectProps {
  node: TreeNode;
  treeValue?: JsonFormValue[] | unknown;
  onChange?(dataAttribute: ChangeEventField): void;
  errorMessage?: string;
  disabled?: boolean;
  headers?: Headers;
}

/**
 * DynamicSelect component
 * @param treeValue
 * @param node
 * @param onChange
 * @param errorMessage
 * @param disabled
 * @param headers
 * @constructor
 */
const DynamicSelect = ({ treeValue, node, onChange, errorMessage, disabled, headers }: DynamicSelectProps) => {
  const { name, attributes, children } = node;
  const { label, type, isLeaf, parentRef, isDecision, route, required, isMultiple } = attributes;
  const getValueFromParent = getValueFromTree(treeValue, String(parentRef));
  const updatedUrl = route?.url?.replace(`{{${parentRef}}}`, String(getValueFromParent)) || "";
  const enableQuery = updatedUrl.length > 0 && typeof getValueFromParent === "string" && getValueFromParent?.length > 0;

  console.log("treeValue", treeValue);

  const requestOptions: RequestInit = {
    headers,
    method: "GET",
  };

  const { data, isError, isLoading } = useQuery({
    enabled: enableQuery,
    queryFn: () =>
      fetch(updatedUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching data");
          }
          return response.json();
        })
        .then((responseData) => responseData)
        .catch((error) => {
          console.error("Fetch error:", error);
          throw new Error("Fetch error:", error);
        }),
    queryKey: [name, getValueFromParent],
  });

  const options = useMemo(() => {
    if ((route?.url && !isError && !isLoading && data && Array.isArray(data)) || getValueFromParent !== undefined) {
      const itemsOptions = adaptRouteResponseToOptions(route?.url ? data : getValueFromParent, route || {});
      return itemsOptions?.map((option) => ({
        id: String(option.id),
        imageUri: option.imageUri,
        label: String(option.label),
        value: String(option.value),
      }));
    }

    return [];
  }, [route, isError, isLoading, data, getValueFromParent]);

  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;

    onChange?.({
      children,
      event,
      isDecision,
      isLeaf,
      name,
      type,
      value,
    });
  };

  return (
    <ControlledToolTip title={parentRef}>
      <Select multiple={isMultiple} required={required} error={!!errorMessage} label={label} onChange={handleChange} disabled={disabled}>
        {options?.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </ControlledToolTip>
  );
};

export default DynamicSelect;
