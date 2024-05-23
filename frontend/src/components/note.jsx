import react from "react";

function Note({ note, onDelete }) {
  const formattedDate = new Date(note.createdAt).toLocaleDateString("es-mx");

  return <div className="note-container">
    <p className="note-title">{note.title}</p>
    <p className="note-content">{note.content}</p>
    <p className="note-date">{ }</p>
    <button className="delete-button" onClick={() => onDelete(node.id)}>
      Delete Note
    </button>
  </div>
}