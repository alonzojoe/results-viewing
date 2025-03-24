import { useState } from "react";

const useToggle = () => {
  const [value, setValue] = useState(false);

  const toggleValue = (newValue) => {
    setValue((prev) => (typeof newValue === "boolean" ? newValue : !prev));
  };

  return [value, toggleValue];
};

export default useToggle;
