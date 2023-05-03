import React, { KeyboardEvent, useRef, useState } from "react";

interface IMaxRowsTextArea {
  required?: boolean;
  maxRows: number;
  placeholder?: string;
  initValue?: string;
  customOnInput: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  classes?: string;
  id?: string;
  name?: string;
  maxLength?: number;
  rows?: number;
  cols?: number;
}

const MaxRowsTextArea: React.FC<IMaxRowsTextArea> = ({
  required,
  maxRows,
  placeholder,
  initValue,
  customOnInput,
  classes,
  id,
  name,
  maxLength,
  cols,
}) => {
  const [value, setValue] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const target = e.target as HTMLTextAreaElement;
    customOnInput(e);
    setValue(target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    const lines = e.currentTarget.value.split("\n").length;
    if (lines >= maxRows && e.key === "Enter") e.preventDefault();
  };

  return (
    <textarea
      name={name ?? undefined}
      id={id ?? undefined}
      autoComplete="off"
      value={initValue ?? value}
      onChange={(e) => handleInput(e)}
      onKeyDown={handleKeyPress}
      rows={maxRows}
      className={classes ?? ""}
      required={required ?? false}
      placeholder={placeholder ?? ""}
      maxLength={maxLength ?? undefined}
      cols={cols ?? undefined}
    />
  );
};

export default MaxRowsTextArea;
