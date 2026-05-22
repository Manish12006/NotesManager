import React, { useEffect, useState } from "react";
import "./CreateNote.css";

import { useNavigate, useParams } from "react-router-dom";

import { getSingleNote, updateNote } from "../services/noteService";

import { toast } from "react-toastify";

const EditNote = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        fetchNote();

    }, []);

    const fetchNote = async () => {

        try {

            const data = await getSingleNote(id);

            setTitle(data.title);
            setContent(data.content);

        } catch (error) {

            console.log(error);

        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!title.trim() || !content.trim()) {

            toast.error("All fields are required");

            return;
        }
        try {

            await updateNote(id, {
                title,
                content,
            });

            toast.success("Note updated successfully");

            navigate("/");

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <div className="create-note">

            <form className="note-form" onSubmit={handleSubmit}>

                <h1>Edit Note</h1>

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
                    Update Note
                </button>

            </form>

        </div>
    );
};

export default EditNote;