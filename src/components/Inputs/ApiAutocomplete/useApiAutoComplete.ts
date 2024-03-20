const useApiAutoComplete = () => {
  const reformatReturnAutocomplete = (originData: any) => ({
    id: originData.value.id,
    image: originData.value.image,
    name: originData.value.name,
    options: originData.value.options,
  });
  return { reformatReturnAutocomplete };
};

export default useApiAutoComplete;
