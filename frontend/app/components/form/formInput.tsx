import { FormEvent, InputHTMLAttributes, useState } from "react";
import "./formInput.css";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: any) => void;
  errorMessage?: string;
  label: string;
}

const FormInput = (props: IProps) => {
  const [focused, setFocused] = useState<boolean>(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e: FormEvent) => {
    setFocused(true);
  };

  return (
    <div className="form-input">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        data-focused={focused.toString()}
      />
      <span className="input-error">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
