import React, { useEffect, useState } from "react";
import "./Home.css";
import { getAllNotes } from "../services/noteService";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetchNotes();

  }, [])

  const fetchNotes = async () => {
    try {
      const data = await getAllNotes();
      setNotes(data);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="home">

      <div className="home-header">
        <div>
          <h1>Notify</h1>
          <p>Manage your notes easily</p>
        </div>

        <button
          className="create-btn"
          onClick={() => navigate("/create")}
        >
          Create Note
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search notes..."
        />
      </div>

      <div className="notes-grid">


        {
          notes.map((note) => (

            <div className="note-card" key={note._id}>

              <h3>{note.title}</h3>

              <p>
                {note.content}
              </p>

              <div className="note-footer">

                <span>
                  {new Date(note.updatedAt).toLocaleDateString()}
                </span>

                <div className="note-actions">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>

              </div>

            </div>

          ))
        }



      </div>

    </div>
  );
};

export default Home;