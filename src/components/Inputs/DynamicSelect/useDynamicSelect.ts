import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import Headers from "@/types/Headers";
import TreeNode, { Route } from "@/types/TreeNode";
import adaptRouteResponseToOptions from "@/utils/adaptRouteResponseToOptions/adaptRouteResponseToOptions";
import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";
import getValueFromTree from "@/utils/getValueFromTree/getValueFromTree";

interface useDynamicSelectProps {
  route: Route;
  parentRef: string;
  initialQuery: TreeNode;
  name: string;
  fieldValues?: JsonFormValue[] | unknown;
  headers?: Headers;
}

const useDynamicSelect = ({ headers, fieldValues, route, parentRef, initialQuery, name }: useDynamicSelectProps) => {
  const getValueFromParent = getValueFromTree(fieldValues, String(parentRef));
  const dynamicValue =
    getValueFromParent && typeof getValueFromParent === "object" && "options" in getValueFromParent
      ? (getValueFromParent.options as string[])
      : undefined;

  const updatedUrl = route?.url?.replace(`{{${parentRef}}}`, String(dynamicValue)) || "";
  const enableQuery = (updatedUrl.length > 0 && initialQuery && dynamicValue && dynamicValue.length > 0) || dynamicValue !== undefined;

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

  return { disabled: isLoading, options };
};

export default useDynamicSelect;
