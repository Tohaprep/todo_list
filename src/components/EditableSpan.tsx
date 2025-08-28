import { useState, type ChangeEvent } from "react";

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
    <div>
      {editMode ? (
        <input
          type="text"
          value={spanValue}
          onChange={setSpanValueHandler}
          onBlur={changeTaskTitleHandler}
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditModeHandler}>{spanValue}</span>
      )}
    </div>
  );
}
