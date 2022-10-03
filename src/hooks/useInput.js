import { useState } from "react";
import useValidation from "./useValidation";

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const [checkSubmit, setCheckSubmit] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
    setCheckSubmit(false);
  }

  const onBlur = (e) => {
    setDirty(true);
  }

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    setDirty,
    setValue,
    checkSubmit,
    setCheckSubmit,
    ...valid
  }
}

export default useInput;
