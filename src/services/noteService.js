import axios from "axios";

const API = "http://localhost:5000/notes";

export const getAllNotes = async () => {
    const response = await axios.get(API);
    return response.data;
};

export const createNote = async (noteData) => {
    const response = await axios.post(API, noteData);
    return response.data;
};