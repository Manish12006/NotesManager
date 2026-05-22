import React, { useState } from "react";
import "./CreateNote.css";

import { createNote } from "../services/noteService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateNote = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!title.trim() || !content.trim()) {

            toast.error("All fields are required");

            return;
        }
        try {

            await createNote({
                title,
                content,
            });

            setTitle("");
            setContent("");

            toast.success("Note added successfully");

            navigate("/");

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <div className="create-note">

            <form className="note-form" onSubmit={handleSubmit}>

                <h1>Create Note</h1>

                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Enter content"
                    rows="8"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>

                <button type="submit">
                    Save Note
                </button>

            </form>

        </div>
    );
};

export default CreateNote;