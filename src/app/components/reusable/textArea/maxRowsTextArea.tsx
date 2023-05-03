import React, { KeyboardEvent, useState, useRef } from "react";

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
  let row = 1;
  const colRef = useRef(0);

  const handleLineMaxLength = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let maxCharactersPerLine = 25;
    const cursorPosition = e.target.selectionStart;
    console.log("cursorPosition", cursorPosition);
    let calculatedRow = Math.floor(cursorPosition / maxCharactersPerLine) + 1;
    console.log("calculatedRow", calculatedRow);
    let col = cursorPosition % maxCharactersPerLine;
    console.log("col", col);
    if (row <= calculatedRow) colRef.current = col;
    if (row > calculatedRow) {
      const difference = row - calculatedRow;
      calculatedRow = row;
      col = (cursorPosition % maxCharactersPerLine) - colRef.current;
    }

    console.log(
      `Użytkownik znajduje się w rzędzie ${calculatedRow} na pozycji ${col} wiersza`
    );
    if (calculatedRow === 5 && col > 18) return true;
    if (calculatedRow >= 6) return true;
    return false;
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const target = e.target as HTMLTextAreaElement;
    if (handleLineMaxLength(e)) return;
    customOnInput(e);
    setValue(target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    row = e.currentTarget.value.split("\n").length;
    if (row >= maxRows && e.key === "Enter") e.preventDefault();
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
