import axios from "axios";

export const guardarCartaCompromisoFachada = async (bodyCartaCompromiso) => {
    return await guardarCartaCompromiso(bodyCartaCompromiso)
}

export const buscarPorIdCartaCompromisoFachada = async (id) => {
    return await buscarPorIdCartaCompromiso(id)
}

export const buscarPorAsignaturaCartaCompromisoFachada = async (asignatura) => {
    return await buscarPorAsignaturaCartaCompromiso(asignatura)
}

export const buscarPorParaleloSemestreCartaCompromisoFachada = async (paralelo, semestre) => {
    return await buscarPorParaleloSemestreCartaCompromiso(paralelo, semestre)
}

export const buscarPorDiaCartaCompromisoFachada = async (dia) => {
    return await buscarPorDiaCartaCompromiso(dia)
}

export const buscarTodosCartasCompromisoFachada = async () => {
    return await buscarTodosCartasCompromiso()
}

export const actualizarCartaCompromisoFachada = async (bodyCartaCompromiso, id) => {
    return await actualizarCartaCompromiso(bodyCartaCompromiso, id)
}

const guardarCartaCompromiso = async (bodyCartaCompromiso) => {
    const data = axios.post(`http://localhost:8081/API/v1.0/Prestamos/cartasCompromiso`, bodyCartaCompromiso).then(r => r.data);
    return data;
}

const buscarPorIdCartaCompromiso = async (id) => {
    const data = axios.get(`http://localhost:8081/API/v1.0/Prestamos/cartasCompromiso/${id}`).then(r => r.data);
    return data;
}

const buscarPorAsignaturaCartaCompromiso = async (asignatura) => {
    const data = axios.get(`http://localhost:8081/API/v1.0/Prestamos/cartasCompromiso/a?asignatura=${asignatura}`).then(r => r.data);
    return data;
}

const buscarPorParaleloSemestreCartaCompromiso = async (paralelo, semestre) => {
    const data = axios.get(`http://localhost:8081/API/v1.0/Prestamos/cartasCompromiso/p?paralelo=${paralelo}&semestre=${semestre}`).then(r => r.data);
    return data;
}

const buscarPorDiaCartaCompromiso = async (dia) => {
    const data = axios.get(`http://localhost:8081/API/v1.0/Prestamos/cartasCompromiso/d?dia=${dia}`).then(r => r.data);
    return data;
}

const buscarTodosCartasCompromiso = async () => {
    const data = axios.get(`http://localhost:8081/API/v1.0/Prestamos/cartasCompromiso`).then(r => r.data);
    return data;
}

const actualizarCartaCompromiso = async (bodyCartaCompromiso, id) => {
    const data = await axios.put(`http://localhost:8081/API/v1.0/Prestamos/cartasCompromiso/${id}`, bodyCartaCompromiso).then(r => r.data);
    return data;
}