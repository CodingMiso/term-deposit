"use client";

import { useEffect, useState } from "react";
import { ZodSchema } from "zod";
type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  schema: ZodSchema;
  onChange: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  validateOnBlur?: boolean;
};

const FormInput = ({
  value,
  schema,
  onChange,
  validateOnBlur,
  ...rest
}: Props) => {
  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <input
      {...rest}
      onBlur={
        validateOnBlur
          ? (e) => {
              const validateResult = schema.safeParse(inputValue);
              if (validateResult.success && onChange) {
                onChange(inputValue, e);
              } else {
                setInputValue(String(value));
              }
            }
          : undefined
      }
      onChange={(e) => {
        setInputValue(e.target.value);

        if (!validateOnBlur) {
          onChange(e.target.value, e);
        }
      }}
      value={inputValue}
    />
  );
};

export default FormInput;
