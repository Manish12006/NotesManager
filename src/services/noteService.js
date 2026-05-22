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

export const deleteNote = async (id) => {
    const response = await axios.delete(`${API}/${id}`);
    return response.data;
};

export const getSingleNote = async (id) => {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
};

export const updateNote = async (id, noteData) => {
    const response = await axios.put(`${API}/${id}`, noteData);
    return response.data;
};

export const searchNotes = async (query) => {
    const response = await axios.get(`${API}/search/query?q=${query}`);
    return response.data;
};