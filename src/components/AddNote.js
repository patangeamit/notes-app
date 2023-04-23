import { useState } from "react";

const AddNote = ({ handleAddNote }) => {
  const [text, setText] = useState("");
  const characterLimit = 50;
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSaveClick = () => {
    if (text.trim().length > 0) {
      handleAddNote(text);
      setText("");
    }
  };
  return (
    <div className="note" style={{ backgroundColor: "#67d7cc" }}>
      <textarea
        rows="8"
        value={text}
        cols="10"
        placeholder="Type something to add a note..."
        onChange={handleChange}
        maxLength={characterLimit}
      ></textarea>
      <div className="note-footer">
        <small>{characterLimit - text.length} Remaining</small>
        <button className="save" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};
export default AddNote;
