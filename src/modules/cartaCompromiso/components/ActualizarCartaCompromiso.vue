<template>
    <div class="container">
        <div>
            <div class="formulario">
                <h1>Actualizar Carta de Compromiso</h1>
                <div class="form-floating">
                    <input id="asiInput" type="text" v-model="asignatura" class="form-control" placeholder="XXXXXXXXXX"
                        @input="mayusculas">
                    <label for="asiInput">Asignatura</label>
                </div>
                <div class="form-floating">
                    <select name="diaDevInput" id="estInput" v-model="semestre" class="form-control"
                        placeholder="XXXXXXXXXX">
                        <option v-for="opcion in opcionesSemestre" :key="opcion" :value="opcion">{{ opcion }}</option>
                    </select>
                    <label for="semInput">Semestre</label>
                </div>
                <div class="form-floating">
                    <input id="parInput" type="number" v-model="paralelo" class="form-control" placeholder="XXXXXXXXXX">
                    <label for="parInput">Paralelo</label>
                </div>
                <div class="form-floating">
                    <select name="diaInput" id="estInput" v-model="dia" class="form-control" placeholder="XXXXXXXXXX">
                        <option v-for="opcion in opcionesDia" :key="opcion" :value="opcion">{{ opcion }}</option>
                    </select>
                    <label for="diaInput">Día</label>
                </div>
                <div class="form-floating">
                    <input id="horInput" type="time" v-model="horaPrestamo" class="form-control"
                        placeholder="XXXXXXXXXX">
                    <label for="horInput">Hora del préstamo</label>
                </div>
                <div class="form-floating">
                    <select name="diaDevInput" id="estInput" v-model="diaDevolucion" class="form-control"
                        placeholder="XXXXXXXXXX">
                        <option v-for="opcion in opcionesDia" :key="opcion" :value="opcion">{{ opcion }}</option>
                    </select>
                    <label for="diaDevInput">Día Devolución</label>
                </div>
                <div class="form-floating">
                    <input id="horDevInput" type="time" v-model="horaDevolucion" class="form-control"
                        placeholder="XXXXXXXXXX">
                    <label for="horDevInput">Hora de la devolución</label>
                </div>
                <div class="form-floating">
                    <input id="cedDocInput" type="text" v-model="cedulaDocente" class="form-control"
                        placeholder="XXXXXXXXXX" :disabled="admin">
                    <label for="cedDocInput">Cédula Docente</label>
                </div>
                <div class="form-floating" v-if="nombreDocente">
                    <input id="cedDocInput" type="text" v-model="nombreDocente" class="form-control"
                        placeholder="XXXXXXXXXX" disabled>
                    <label for="cedDocInput">Nombre Docente</label>
                </div>
                <div class="form-floating">
                    <input id="cedAyuInput" type="text" v-model="cedulaAyudante" class="form-control"
                        placeholder="XXXXXXXXXX">
                    <label for="cedAyuInput">Cédula Ayudante</label>
                </div>
                <div class="form-floating" v-if="nombreAyudante">
                    <input id="cedDocInput" type="text" v-model="nombreAyudante" class="form-control"
                        placeholder="XXXXXXXXXX" disabled>
                    <label for="cedDocInput">Nombre Ayudante</label>
                </div>
                <div class="btn-group" style="margin-top: 1%;">
                    <input id="autInput" type="checkbox" v-model="autorizacion" class="btn-check"
                        placeholder="XXXXXXXXXX" />
                    <label class="btn btn-outline-secondary" for="autInput">Autorizacion</label>
                </div>
                <div style="margin-bottom: 20px">
                    <button class="btn btn-dark" @click="actualizarCarta">Editar</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import router from "@/router/router";
import { buscarPorCedulaAyudanteFachada, buscarCartasCompromisoXDiaAyudanteFachada } from '@/modules/ayudante/helpers/AyudanteCliente';
import { buscarPorCedulaPrestadorFachada } from "@/modules/prestador/helpers/PrestadorCliente";
import { buscarPorCedulaDocenteFachada } from '@/modules/docente/helpers/DocenteCliente';
import { actualizarCartaCompromisoFachada, buscarPorIdCartaCompromisoFachada }
    from '../helpers/CartaCompromisoCliente';

export default {
    data() {
        return {
            id: this.$route.params.id,
            asignatura: "",
            semestre: "",
            paralelo: "",
            dia: "",
            horaPrestamo: "",
            diaDevolucion: "",
            horaDevolucion: "",
            cedulaDocente: "",
            cedulaAyudante: "",
            opcionesSemestre: [
                "Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo"
            ],
            opcionesDia: [
                "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
            ],
            nombreDocente: "",
            nombreAyudante: "",
            autorizacion: false,
            admin:true
        }
    },
    mounted() {
        this.consultarAdmin();
        this.buscarCarta();
    },
    methods: {
        async actualizarCarta() {
            const data = {
                asignatura: this.asignatura,
                semestre: this.semestre,
                paralelo: this.paralelo,
                dia: this.dia,
                horaPrestamo: this.horaPrestamo,
                diaDevolucion: this.diaDevolucion,
                horaDevolucion: this.horaDevolucion,
                cedulaDocente: this.cedulaDocente,
                cedulaAyudante: this.cedulaAyudante,
                autorizacion: this.autorizacion
            }
            try {
                if (this.verificarCampos()) {
                    const registro = await actualizarCartaCompromisoFachada(data, this.id);
                    if (registro) {
                        alert("Actualización de carta de compromiso exitoso");
                        this.redirigirAVerCartaLista();
                    } else {
                        alert("Existen campos vacios.");
                    }
                }
            } catch {
                alert("No se pudo actualizar");
            }

        },
        async buscarCarta() {
            let carta;
            try {
                carta = await buscarPorIdCartaCompromisoFachada(this.id);
            } catch {
                this.redirigirAError();
                return;
            }
            this.asignatura = carta.asignatura;
            this.semestre = carta.semestre;
            this.paralelo = carta.paralelo;
            this.dia = carta.dia;
            this.horaPrestamo = carta.horaPrestamo;
            this.diaDevolucion = carta.diaDevolucion;
            this.horaDevolucion = carta.horaDevolucion;
            this.cedulaDocente = carta.cedulaDocente;
            this.cedulaAyudante = carta.cedulaAyudante;
            this.autorizacion = carta.autorizacion;
        },
        async redirigirAVerCartaLista() {
            const ruta = `/cartasCompromiso`;
            await router.push({ path: ruta });
        },
        async redirigirAError() {
            const ruta = `/error`;
            await router.push({ path: ruta });
        },
        verificarCampos() {
            try {
                if (this.cedulaDocente.length === 10 &&
                    this.cedulaAyudante.length === 10 &&
                    this.asignatura != "" &&
                    this.semestre != "" &&
                    this.paralelo != "" &&
                    this.dia != "" &&
                    this.horaPrestamo != "" &&
                    this.diaDevolucion != "" &&
                    this.horaDevolucion != "" &&
                    this.nombreAyudante != "" &&
                    this.nombreDocente != ""
                ) {
                    return true;
                }
                return false;
            } catch {
                return false;
            }
        },
        limpiarCampos() {
            this.asignatura = "";
            this.semestre = "";
            this.paralelo = "";
            this.dia = "";
            this.horaPrestamo = "";
            this.diaDevolucion = "";
            this.horaDevolucion = "";
            this.cedulaDocente = "";
            this.cedulaAyudante = "";
            this.nombreDocente = "";
            this.nombreAyudante = "";
        },
        async consultarAdmin() {
            const user = sessionStorage.getItem("user");
            const data = await buscarPorCedulaPrestadorFachada(user);
            this.admin=!data.administrador;
        },
        mayusculas(event) {
            event.target.value = event.target.value.toUpperCase();
        }
    },
    watch: {
        async cedulaAyudante() {
            try {
                if (this.cedulaAyudante.length == 10) {
                    const data = await buscarPorCedulaAyudanteFachada(this.cedulaAyudante);
                    this.nombreAyudante = data.nombre;
                } else {
                    this.nombreAyudante = "";
                }
            } catch {
                this.nombreAyudante = "";
            }
        },
        async cedulaDocente() {
            try {
                if (this.cedulaDocente.length == 10) {
                    const data = await buscarPorCedulaDocenteFachada(this.cedulaDocente);
                    this.nombreDocente = data.nombre;
                } else {
                    this.nombreDocente = "";
                }
            } catch {
                this.nombreDocente = "";
            }
        }
    }
};
</script>

<style scoped>
.container {
    align-items: center;
    justify-content: center;
    margin-top: 2%;
}

.formulario {
    width: 60%;
    margin-left: 20%;
}

h1 {
    color: #363636;
    margin-bottom: 3%;
}

input,
select {
    margin-top: 1%;
}

button {
    margin-top: 2%;
}

label {
    font-weight: bold;
    color: #462255;
}

ul {
    list-style-type: none;
    padding-left: 0;
}

li {
    margin-top: 3%;
}

h4 {
    color: #3E78B2;
}

@media screen and (max-width: 991px) {
    .formulario {
        width: 80%;
        margin-left: 10%;
    }
}

@media screen and (max-width: 301px) {
    h1 {
        font-size: 24px;
    }
}

@media screen and (max-width: 275px) {
    h1 {
        font-size: 20px;
    }
}

@media screen and (max-width: 232px) {
    h1 {
        font-size: 18px;
    }
}

@media screen and (max-width: 211px) {
    h1 {
        font-size: 16px;
    }
}
</style>