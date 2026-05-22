import React, { useEffect, useState } from "react";
import "./ViewNote.css";

import { useNavigate, useParams } from "react-router-dom";

import { getSingleNote } from "../services/noteService";

const ViewNote = () => {

    const [note, setNote] = useState(null);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        fetchNote();

    }, []);

    const fetchNote = async () => {

        try {

            const data = await getSingleNote(id);

            setNote(data);

        } catch (error) {

            console.log(error);

        }
    };

    if (!note) {

        return <h2>Loading...</h2>;

    }

    return (
        <div className="view-note">

            <button
                className="back-btn"
                onClick={() => navigate("/")}
            >
                ← Back
            </button>

            <div className="view-note-card">

                <h1>{note.title}</h1>

                <div className="view-note-dates">

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

                <p>
                    {note.content}
                </p>

            </div>

        </div>
    );
};

export default ViewNote;