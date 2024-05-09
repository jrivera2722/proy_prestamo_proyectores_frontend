import axios from "axios";

export const guardarPrestamoFachada = async (bodyPrestamo) => {
    return await guardarPrestamo(bodyPrestamo)
}

export const buscarPorIdPrestamoFachada = async (id) => {
    return await buscarPorIdPrestamo(id)
}

export const buscarPorFechaPrestamoFachada = async (fecha) => {
    return await buscarPorFechaPrestamo(fecha)
}

export const buscarPrestamosDevueltosFachada = async (devuelto) => {
    return await buscarPrestamosDevueltos(devuelto)
}

export const buscarPrestamosFachada = async () => {
    return await buscarPrestamos()
}

export const actualizarPrestamoFachada = async (bodyPrestamo, id) => {
    return await actualizarPrestamo(bodyPrestamo, id)
}

const guardarPrestamo = async (bodyPrestamo) => {
    const data = axios.post(`http://localhost:8080/API/v1.0/Prestamos/prestamos`, bodyPrestamo).then(r => r.data);
    return data;
}

const buscarPorIdPrestamo = async (id) => {
    const data = axios.get(`http://localhost:8080/API/v1.0/Prestamos/prestamos/${id}`).then(r => r.data);
    return data;
}

const buscarPorFechaPrestamo = async (fecha) => {
    const data = axios.get(`http://localhost:8080/API/v1.0/Prestamos/prestamos/f?fecha=${fecha}`).then(r => r.data);
    return data;
}

const buscarPrestamosDevueltos = async (devuelto) => {
    const data = axios.get(`http://localhost:8080/API/v1.0/Prestamos/prestamos/d?devuelto=${devuelto}`).then(r => r.data);
    return data;
}

const buscarPrestamos = async () => {
    const data = axios.get(`http://localhost:8080/API/v1.0/Prestamos/prestamos`).then(r => r.data);
    return data;
}

const actualizarPrestamo = async (bodyPrestamo, id) => {
    const data = await axios.put(`http://localhost:8080/API/v1.0/Prestamos/prestamos/${id}`, bodyPrestamo).then(r => r.data);
    return data;
}