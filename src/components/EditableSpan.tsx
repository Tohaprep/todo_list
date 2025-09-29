import { useState, type ChangeEvent } from "react";
import { TextField } from "@mui/material";

interface EditableSpanProps {
  title: string;
  onSubmit: (value: string) => void;
}

export default function EditableSpan({ title, onSubmit }: EditableSpanProps) {
  const [spanValue, setSpanValue] = useState<string>(title);
  const [editMode, setEditMode] = useState<boolean>(false);

  const setSpanValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSpanValue(e.target.value);
  };

  const changeTaskTitleHandler = () => {
    setSpanValue((prevValue) =>
      prevValue === "" ? "*без названия*" : prevValue
    );
    onSubmit(spanValue);
    setEditMode(false);
  };

  const activateEditModeHandler = () => {
    setEditMode(true);
  };

  return (
    <div className="editableSpan">
      {editMode ? (
        <TextField
          id="standard-basic"
          variant="standard"
          className="editableSpan_input"
          type="text"
          value={spanValue}
          onChange={setSpanValueHandler}
          onBlur={changeTaskTitleHandler}
          autoFocus
        />
      ) : (
        <span
          className="editableSpan_title"
          onDoubleClick={activateEditModeHandler}>
          {spanValue}
        </span>
      )}
    </div>
  );
}
