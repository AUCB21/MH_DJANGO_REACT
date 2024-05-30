import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/navbar";
import Note from "../components/note";

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
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <Navbar />
      <div>
        <div>
          <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white justify-center items-center flex flex-col h-48">
            Create a Note
          </h2>
          <form onSubmit={createNote} className="max-w-sm mx-auto">
            <div class="mb-5">
              <br />

              <label
                for="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title:
              </label>
              <input
                type="text"
                id="large-input"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Content:
            </label>
            <br />
            <textarea
              id="content"
              name="content"
              required
              value={content}
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Note content..."
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <br />
            <button
              type="submit"
              value="submit"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 justify-center items-center"
            >
              Submit Note!
            </button>
          </form>
          <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white justify-center items-center flex flex-col h-24">
            Notes
          </h2>
          <div className="justify-center items-center grid grid-cols-3 md:grid-cols-4 gap-4">
            {notes &&
              notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
