import axios from "axios";

export const guardarBienFachada = async (bodyBien) => {
    return await guardarBien(bodyBien)
}

export const buscarPorIdBienFachada = async (id) => {
    return await buscarPorIdBien(id)
}

export const buscarPorCodigoBienFachada = async (codigo) => {
    return await buscarPorCodigoBien(codigo)
}

export const buscarPorSerieBienFachada = async (serie) => {
    return await buscarPorSerieBien(serie)
}

export const buscarPorNombreBienFachada = async (nombre) => {
    return await buscarPorNombreBien(nombre)
}

export const buscarPorEstadoBienFachada = async (estado) => {
    return await buscarPorEstadoBien(estado)
}

export const buscarPorDisponibilidadBienFachada = async (disponibilidad) => {
    return await buscarPorDisponibilidadBien(disponibilidad)
}

export const buscarPorTipoBienFachada = async (tipo) => {
    return await buscarPorTipoBien(tipo)
}

export const buscarPorDisponibilidadTipoBienFachada = async (tipo, disponibilidad) => {
    return await buscarPorDisponibilidadTipoBien(tipo, disponibilidad)
}

export const buscarPorPrestamoTipoDisponiblesBienFachada = async (tipo, idPrestamo) => {
    return await buscarPorPrestamoTipoDisponiblesBien(tipo, idPrestamo)
}

export const buscarPorPrestamoTipoBienFachada = async (tipo, idPrestamo) => {
    return await buscarPorPrestamoTipoBien(tipo, idPrestamo)
}

export const buscarTodosBienesFachada = async () => {
    return await buscarTodosBienes()
}

export const actualizarBienFachada = async (bodyBien, codigo) => {
    return await actualizarBien(bodyBien, codigo)
}

export const actualizarBienPorIDFachada = async (bodyBien, id) => {
    return await actualizarBienPorID(bodyBien, id)
}

const guardarBien = async (bodyBien) => {
    const data = axios.post(`http://localhost:8080/API/v1.0/Prestamos/bienes`, bodyBien).then(r => r.data);
    return data;
}

const buscarPorIdBien = async (id) => {
    const data = axios.get(`http://localhost:8080/API/v1.0/Prestamos/bienes/id/${id}`).then(r => r.data);
    return data;
}

const buscarPorCodigoBien = async (codigo) => {
    const data = axios.get(`http://localhost:8080/API/v1.0/Prestamos/bienes/${codigo}`).then(r => r.data);
    return data;
}

const buscarPorSerieBien = async (serie) => {
    const data = axios.get(`http://localhost:8080/API/v1.0/Prestamos/bienes/s?serie=${serie}`).then(r => r.data);
    return data;
}

const buscarPorNombreBien = async (nombre) => {
    const data = axios.get(`http://localhost:8080/API/v1.0/Prestamos/bienes/n?nombre=${nombre}`).then(r => r.data);
    return data;
}

const buscarPorEstadoBien = async (estado) => {
    const data = axios.get(`http://localhost:8080/API/v1.0/Prestamos/bienes/e?estado=${estado}`).then(r => r.data);
    return data;
}

const buscarPorDisponibilidadBien = async (disponibilidad) => {
    const data = axios.get(`http://localhost:8080/API/v1.0/Prestamos/bienes/d?disponibilidad=${disponibilidad}`).then(r => r.data);
    return data;
}

const buscarPorTipoBien = async (tipo) => {
    const data = axios.get(`http://localhost:8080/API/v1.0/Prestamos/bienes/t?tipo=${tipo}`).then(r => r.data);
    return data;
}

const buscarPorDisponibilidadTipoBien = async (tipo, disponibilidad) => {
    const data = axios.get(`http://localhost:8080/API/v1.0/Prestamos/bienes/dt?tipo=${tipo}&disponibilidad=${disponibilidad}`).then(r => r.data);
    return data;
}

const buscarPorPrestamoTipoBien = async (tipo, idPrestamo) => {
    const data = axios.get(`http://localhost:8080/API/v1.0/Prestamos/bienes/pt?tipo=${tipo}&idPrestamo=${idPrestamo}`).then(r => r.data);
    return data;
}

const buscarPorPrestamoTipoDisponiblesBien = async (tipo, idPrestamo) => {
    const data = axios.get(`http://localhost:8080/API/v1.0/Prestamos/bienes/ptd?tipo=${tipo}&idPrestamo=${idPrestamo}`).then(r => r.data);
    return data;
}

const buscarTodosBienes = async () => {
    const data = axios.get(`http://localhost:8080/API/v1.0/Prestamos/bienes`).then(r => r.data);
    return data;
}

const actualizarBien = async (bodyBien, codigo) => {
    const data = await axios.put(`http://localhost:8080/API/v1.0/Prestamos/bienes/${codigo}`, bodyBien).then(r => r.data);
    return data;
}

const actualizarBienPorID = async (bodyBien, id) => {
    const data = await axios.put(`http://localhost:8080/API/v1.0/Prestamos/bienes/${id}`, bodyBien).then(r => r.data);
    return data;
}