import { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/note";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const res = await api.get("/api/notes/");
      console.log(res.data);
      alert("Succesfully fetched notes!")
      // res.data.map((note) => console.log(note.content));
      setNotes(res.data);
    } catch (e) {
      alert(e);
    }
  };

  const deleteNotes = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}`);
      getNotes();
      res.status === 204
        ? alert("Note was deleted")
        : alert("Failed to delete note");
    } catch (e) {
      alert(e);
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/notes/", { content, title });
      if (res.status === 201) {
        alert("Note created");
        getNotes();
      } else {
        alert("Failed to create note");
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title: </label>
        <br />
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={(e) =>
            setTitle(e.target.value)
          } /* setea el titulo de la nota */
          value={title}
        />
        <br />
        <label htmlFor="content">Content: </label>
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          } /* setea el contenido de la nota */
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <h2>Notes</h2>
      {notes ? notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onDelete={deleteNotes}
        />
      )) : (
        <p>No notes to display</p>
      )}
    </div>
  );
}

export default Home;
