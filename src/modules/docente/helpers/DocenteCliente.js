import axios from "axios";

export const guardarDocenteFachada = async (bodyDocente) => {
    return await guardarDocente(bodyDocente);
}

export const buscarPorCedulaDocenteFachada = async (cedula) => {
    return await buscarPorCedulaDocente(cedula);
}

export const buscarPorNombreDocenteFachada = async (nombre) => {
    return await buscarPorNombreDocente(nombre);
}

export const buscarCartasCompromisoDocenteFachada = async (cedula) => {
    return await buscarCartasCompromisoDocente(cedula);
}

export const buscarTodosDocentesFachada = async () => {
    return await buscarTodosDocentes();
}

export const actualizarDocenteFachada = async (bodyDocente, cedula) => {
    return await actualizarDocente(bodyDocente, cedula);
}

const guardarDocente = async (bodyDocente) => {
    const data = axios.post(`http://localhost:8086/API/v1.0/Prestamos/docentes`, bodyDocente).then(r => r.data);
    return data;
}

const buscarPorCedulaDocente = async (cedula) => {
    const data = await axios.get(`http://localhost:8086/API/v1.0/Prestamos/docentes/${cedula}`).then(r => r.data);
    return data;
}

const buscarPorNombreDocente = async (nombre) => {
    const data = await axios.get(`http://localhost:8086/API/v1.0/Prestamos/docentes/n/${nombre}`).then(r => r.data);
    return data;
}

const buscarCartasCompromisoDocente = async (cedula) => {
    const data = await axios.get(`http://localhost:8086/API/v1.0/Prestamos/docentes/${cedula}/cartasCompromiso`).then(r => r.data);
    return data;
}

const buscarTodosDocentes = async () => {
    const data = await axios.get(`http://localhost:8086/API/v1.0/Prestamos/docentes`).then(r => r.data);
    return data;
}

const actualizarDocente = async (bodyDocente, cedula) => {
    const data = await axios.put(`http://localhost:8086/API/v1.0/Prestamos/docentes/${cedula}`, bodyDocente).then(r => r.data);
    return data;
}