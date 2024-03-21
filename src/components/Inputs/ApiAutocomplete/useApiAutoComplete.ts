interface OriginData {
  value: unknown;
  id: string;
  image: string;
  label: string;
}

const useApiAutoComplete = () => {
  const reformatReturnAutocomplete = (originData: OriginData) => {
    const value = originData.value as { id?: string; image?: string; name?: string; options?: unknown };
    return {
      id: value?.id || originData.id,
      image: value?.image || originData.image,
      name: value?.name || originData.label,
      options: value?.options || value,
    };
  };
  return { reformatReturnAutocomplete };
};

export default useApiAutoComplete;
