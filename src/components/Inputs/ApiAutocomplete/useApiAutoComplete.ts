import { Option } from "@/utils/adaptRouteResponseToOptions/adaptRouteResponseToOptions";

export interface OriginData {
  value: unknown;
  id: string;
  image: string;
  label: string;
}

const useApiAutoComplete = () => {
  const reformatReturnAutocomplete = (originData: OriginData | Option | string | null) => {
    if (originData === null) {
      return null;
    }

    if (typeof originData === "string") {
      return originData;
    }

    const value = originData.value as { id?: string; image?: string; name?: string; options?: unknown };

    return {
      id: value?.id || originData.id,
      image: "image" in originData ? value?.image || originData.image : originData.imageUri,
      label: value?.name || originData.label,
      options: value?.options || value,
    };
  };

  const addValueToOptions = (options?: Option[] | null, value?: Option | null) => {
    if (!value) {
      return options;
    }

    return typeof value === "object" ? [value, ...(options || [])] : [{ value }, ...(options || [])];
  };

  return {
    addValueToOptions,
    reformatReturnAutocomplete,
  };
};

export default useApiAutoComplete;
