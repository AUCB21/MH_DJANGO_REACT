import { useEffect, useState } from "react";
import api from "../api";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => {
        res.data;
        console.log(res.data);
      })
      .then((data) => setNotes(data))
      .catch((e) => alert(e));
  };

  const deleteNotes = (id) => {
    api
      .delete(`/api/notes/delete/${id}`)
      .then((res) => {
        getNotes();
        res.status === 204
          ? alert("Note was deleted")
          : alert("Failed to delete note");
      })
      .catch((e) => alert(e));

  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Note created");
          getNotes();
        } else {
          alert("Failed to create note");
        }
      })
      .catch((e) => alert(e));
  };
  return (
    <div>
      <div>
        <h2>Notes</h2>
      </div>
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
    </div>
  );
}

export default Home;
