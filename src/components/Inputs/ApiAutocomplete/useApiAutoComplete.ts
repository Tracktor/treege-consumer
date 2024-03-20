const useApiAutoComplete = () => {
  const reformatReturnAutocomplete = (originData: any) => ({
    id: originData.value.id || originData.id,
    image: originData.value.image || originData.image,
    name: originData.value.name || originData.label,
    options: originData.value.options || originData.value,
  });
  return { reformatReturnAutocomplete };
};

export default useApiAutoComplete;
