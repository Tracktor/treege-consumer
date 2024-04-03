import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { FieldValues } from "@/types/FieldValues";
import Headers from "@/types/Headers";
import { Route } from "@/types/TreeNode";
import adaptRouteResponseToOptions from "@/utils/adaptRouteResponseToOptions/adaptRouteResponseToOptions";
// import { JsonFormValue } from "@/utils/formDataToJSON/formDataToJSON";
// import getFormValueFromName from "@/utils/getFormValueFromName/getFormValueFromName";

interface useDynamicSelectProps {
  route?: Route;
  parentRef?: string;
  initialQuery?: boolean;
  name: string;
  fieldValues?: FieldValues;
  headers?: Headers;
}

const useDynamicSelect = ({ headers, fieldValues, route, parentRef, initialQuery, name }: useDynamicSelectProps) => {
  // TODO TO VERIFY
  // OVER KILL
  // const getValueFromParent = getFormValueFromName(fieldValues, String(parentRef));
  const getValueFromParent = fieldValues?.[String(parentRef)];
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
    queryFn: ({ signal }) =>
      fetch(updatedUrl, { ...requestOptions, signal })
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
