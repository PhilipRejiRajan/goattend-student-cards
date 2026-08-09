
import axios from "axios";

export const API_URL = "http://localhost:3000";

export const getStudents = () => axios.get(`${API_URL}/students`);
export const createStudent = (data) => axios.post(`${API_URL}/students`, data);
export const updateStudent = (id, data) => axios.put(`${API_URL}/students/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${API_URL}/students/${id}`);