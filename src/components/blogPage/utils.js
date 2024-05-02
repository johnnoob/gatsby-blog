import { useState } from "react";

export const useFilterSelect = (initialValue) => {
  const [targetFilters, setTargetFilters] = useState(initialValue);
  const handleFilterSelect = (e) => {
    const targetFilter = e.target.value;
    if (targetFilters.includes(targetFilter)) {
      setTargetFilters((prevTargetFilters) =>
        prevTargetFilters.filter((filter) => filter !== targetFilter)
      );
    } else {
      setTargetFilters((prevTargetFilters) => [
        ...prevTargetFilters,
        targetFilter,
      ]);
    }
  };
  return [targetFilters, setTargetFilters, handleFilterSelect];
};
