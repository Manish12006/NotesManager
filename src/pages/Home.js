import React, { useEffect, useState, useRef } from "react";
import "./Home.css";
import { getAllNotes, deleteNote, searchNotes } from "../services/noteService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { gsap } from "gsap";

const Home = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

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

  const handleDelete = (id) => {

    setSelectedNoteId(id);
    setShowPopup(true);

  };
  const confirmDelete = async () => {

    try {

      await deleteNote(selectedNoteId);

      setNotes(
        notes.filter((note) => note._id !== selectedNoteId)
      );

      toast.success("Note deleted successfully");

      setShowPopup(false);

    } catch (error) {

      console.log(error);

    }
  };

  const handleSearch = async (value) => {

    setSearch(value);

    try {

      if (value.trim() === "") {

        fetchNotes();

      } else {

        const data = await searchNotes(value);
        setNotes(data);

      }

    } catch (error) {

      console.log(error);

    }
  };


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
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="notes-grid">


        {
          notes.length > 0 ? (

            notes.map((note, index) => (

              <div
                className="note-card"
                key={note._id}
                onClick={() => navigate(`/note/${note._id}`)}
              >

                <h3>{note.title}</h3>

                <p>
                  {note.content}
                </p>

                <div className="note-footer">

                  <div className="note-dates">

                    <span>
                      Created:&nbsp;
                      {
                        new Date(note.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      }
                    </span>

                    <span>
                      Updated:&nbsp;
                      {
                        new Date(note.updatedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      }
                    </span>

                  </div>

                  <div className="note-actions">

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/edit/${note._id}`);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(note._id);
                      }}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="empty-notes">

              <h2>No Notes Found</h2>
              <br></br>
              <p>
                Start by creating your first note.
              </p>

            </div>

          )
        }



      </div>
      {
        showPopup && (

          <div className="popup-overlay">

            <div className="popup-box">

              <h2>Delete Note</h2>

              <p>
                Are you sure you want to delete this note?
              </p>

              <div className="popup-buttons">

                <button
                  className="cancel-btn"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>

                <button
                  className="delete-btn"
                  onClick={confirmDelete}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        )
      }
    </div>
  );
};

export default Home;