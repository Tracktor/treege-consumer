import { useContext } from "react";
import { OptionsContext } from "@/context/OptionsProvider";

const useOptionsContext = () => {
  const context = useContext(OptionsContext);

  if (!context) {
    throw new Error("useOptionsContext must be used within a OptionsProvider");
  }
  return context;
};

export default useOptionsContext;
