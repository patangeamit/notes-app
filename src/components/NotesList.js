import Note from "./Note";
import AddNote from "./AddNote";

const NotesList = ({ notess, handleAddNote, handleDeleteNote }) => {
  return (
    <div className="notes-list">
      {notess.map((note) => (
        <Note
          id={note.id}
          textContent={note.textContent}
          date={note.date}
          handleDeleteNote={handleDeleteNote}
          color={note.color}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};

export default NotesList;
