import axios from "axios";

export const guardarAyudanteFachada = async (bodyAyudante) => {
    return await guardarAyudante(bodyAyudante);
}

export const buscarPorCedulaAyudanteFachada = async (cedula) => {
    return await buscarPorCedulaAyudante(cedula);
}

export const buscarPorNombreAyudanteFachada = async (nombre) => {
    return await buscarPorNombreAyudante(nombre);
}

export const buscarCartasCompromisoAyudanteFachada = async (cedula) => {
    return await buscarCartasCompromisoAyudante(cedula);
}

export const buscarCartasCompromisoXDiaAyudanteFachada = async (cedula) => {
    return await buscarCartasCompromisoXDiaAyudante(cedula);
}

export const buscarTodosAyudantesFachada = async () => {
    return await buscarTodosAyudantes();
}

export const actualizarAyudanteFachada = async (bodyAyudante, cedula) => {
    return await actualizarAyudante(bodyAyudante, cedula);
}

const guardarAyudante = async (bodyAyudante) => {
    const data = axios.post(`http://10.3.2.44:8082/API/v1.0/Prestamos/ayudantes`, bodyAyudante).then(r => r.data);
    return data;
}

const buscarPorCedulaAyudante = async (cedula) => {
    const data = await axios.get(`http://10.3.2.44:8082/API/v1.0/Prestamos/ayudantes/${cedula}`).then(r => r.data);
    return data;
}

const buscarPorNombreAyudante = async (nombre) => {
    const data = await axios.get(`http://10.3.2.44:8082/API/v1.0/Prestamos/ayudantes/n/${nombre}`).then(r => r.data);
    return data;
}

const buscarCartasCompromisoAyudante = async (cedula) => {
    const data = await axios.get(`http://10.3.2.44:8082/API/v1.0/Prestamos/ayudantes/${cedula}/cartasCompromiso`).then(r => r.data);
    return data;
}

const buscarCartasCompromisoXDiaAyudante = async (cedula) => {
    const data = await axios.get(`http://10.3.2.44:8082/API/v1.0/Prestamos/ayudantes/${cedula}/diaCartasCompromiso`).then(r => r.data);
    return data;
}

const buscarTodosAyudantes = async () => {
    const data = await axios.get(`http://10.3.2.44:8082/API/v1.0/Prestamos/ayudantes`).then(r => r.data);
    return data;
}

const actualizarAyudante = async (bodyAyudante, cedula) => {
    const data = await axios.put(`http://10.3.2.44:8082/API/v1.0/Prestamos/ayudantes/${cedula}`, bodyAyudante).then(r => r.data);
    return data;
}