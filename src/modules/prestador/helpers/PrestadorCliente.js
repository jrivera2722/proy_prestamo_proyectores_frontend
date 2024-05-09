import axios from "axios";

export const guardarPrestadorFachada = async (bodyPrestador) => {
    return await guardarPrestador(bodyPrestador);
}

export const loginPrestadorFachada = async (bodyPrestador) => {
    return await loginPrestador(bodyPrestador);
}

export const buscarPorCedulaPrestadorFachada = async (cedula) => {
    return await buscarPorCedulaPrestador(cedula);
}

export const buscarPorNombrePrestadorFachada = async (nombre) => {
    return await buscarPorNombrePrestador(nombre);
}

export const buscarTodosPrestadoresFachada = async () => {
    return await buscarTodosPrestadores();
}

export const buscarAdminPrestadorFachada = async (admin) => {
    return await buscarAdminPrestador(admin);
}

export const actualizarPrestadorFachada = async (bodyPrestador, cedula) => {
    return await actualizarPrestador(bodyPrestador, cedula);
}

const guardarPrestador = async (bodyPrestador) => {
    const data = axios.post(`http://localhost:8080/API/v1.0/Prestamos/prestadores`, bodyPrestador).then(r => r.data);
    return data;
}

const loginPrestador = async (bodyPrestador) => {
    const data = axios.post(`http://localhost:8080/API/v1.0/Prestamos/prestadores/login`, bodyPrestador).then(r => r.data);
    return data;
}

const buscarPorCedulaPrestador = async (cedula) => {
    const data = await axios.get(`http://localhost:8080/API/v1.0/Prestamos/prestadores/${cedula}`).then(r => r.data);
    return data;
}

const buscarPorNombrePrestador = async (nombre) => {
    const data = await axios.get(`http://localhost:8080/API/v1.0/Prestamos/prestadores/n/${nombre}`).then(r => r.data);
    return data;
}

const buscarTodosPrestadores = async () => {
    const data = await axios.get(`http://localhost:8080/API/v1.0/Prestamos/prestadores`).then(r => r.data);
    return data;
}

const buscarAdminPrestador = async (admin) => {
    const data = await axios.get(`http://localhost:8080/API/v1.0/Prestamos/prestadores/a/${admin}`).then(r => r.data);
    return data;
}

const actualizarPrestador = async (bodyPrestador, cedula) => {
    const data = await axios.put(`http://localhost:8080/API/v1.0/Prestamos/prestadores/${cedula}`, bodyPrestador).then(r => r.data);
    return data;
}