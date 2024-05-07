<template>
    <div class="contenedor">
        <div class="tabla">
            <table class="table table-hover caption-top" v-if="cartas.length > 0">
                <caption>Lista de Cartas de Compromiso</caption>
                <div class="info">
                    <thead>
                    <tr class="table-dark">
                        <th v-if="!filtrar">ID</th>
                        <th>Asignatura</th>
                        <th>Semestre</th>
                        <th>Paralelo</th>
                        <th>Día</th>
                        <th>Hora del Préstamo</th>
                        <th>Día de Devolución</th>
                        <th>Hora de Devolución</th>
                        <th>Docente</th>
                        <th>Ayudante</th>
                        <th>Autorizado</th>
                        <th v-if="editar" scope="col">Acción</th>
                        <th v-if="filtrar">Seleccionar</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="carta in cartas" :key="carta.id" :class="claseFila(carta.autorizacion, carta.id)">
                        <td v-if="!filtrar">{{ carta.id }}</td>
                        <td>{{ carta.asignatura }}</td>
                        <td>{{ carta.semestre }}</td>
                        <td>{{ carta.paralelo }}</td>
                        <td>{{ carta.dia }}</td>
                        <td>{{ carta.horaPrestamo }}</td>
                        <td>{{ carta.diaDevolucion }}</td>
                        <td>{{ carta.horaDevolucion }}</td>
                        <td>{{ nombreDocentes[carta.cedulaDocente] }}</td>
                        <td>{{ nombreAyudantes[carta.cedulaAyudante] }}</td>
                        <td v-if="carta.autorizacion">Sí</td>
                        <td v-else>No</td>
                        <td v-if="editar"><button class="btn btn-dark" @click="redirigirActualizarBien(carta.id)">Editar</button></td>
                        <td v-if="filtrar"><button class="btn btn-dark" @click="enviarIdCarta(carta.id)">Seleccionar</button></td>
                    </tr>
                </tbody>
                </div>
            </table>
            <div v-else>
                <h1>Buscando cartas de compromiso...</h1>
                <div v-if="filtrar">
                    <h3>Parece ser que no hay cartas de compromiso de esa cédula para el dia de hoy.</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router/router";
import { buscarPorCedulaAyudanteFachada, buscarCartasCompromisoXDiaAyudanteFachada } from '@/modules/ayudante/helpers/AyudanteCliente';
import { buscarTodosCartasCompromisoFachada } from '../helpers/CartaCompromisoCliente';
import { buscarPorCedulaDocenteFachada } from '@/modules/docente/helpers/DocenteCliente';

export default {
    data() {
        return {
            cartas: [],
            nombreAyudantes: [],
            nombreDocentes: [],
            cartaSeleccionada: null,
            editar: true
        };
    },
    methods: {
        async buscarCartas() {
            let data = [];
            data = await buscarTodosCartasCompromisoFachada();
            if (data.length != 0) {
                this.cartas = data;
                for (let i = 0; i < this.cartas.length; i++) {
                    this.buscarDocente(this.cartas[i].cedulaDocente);
                    this.buscarAyudante(this.cartas[i].cedulaAyudante);
                }
            }
        },
        async filtrarCartas() {
            await buscarPorCedulaAyudanteFachada(this.cedulaFiltro);
            let data = [];
            data = await buscarCartasCompromisoXDiaAyudanteFachada(this.cedulaFiltro);
            if (data.length != 0) {
                this.editar = false;
                this.cartas = data;
                for (let i = 0; i < this.cartas.length; i++) {
                    this.buscarDocente(this.cartas[i].cedulaDocente);
                    this.buscarAyudante(this.cartas[i].cedulaAyudante);
                }
            }
        },
        async buscarAyudante(cedula) {
            const data = await buscarPorCedulaAyudanteFachada(cedula);
            this.nombreAyudantes[data.cedula] = data.nombre;
        },
        async buscarDocente(cedula) {
            const data = await buscarPorCedulaDocenteFachada(cedula);
            this.nombreDocentes[data.cedula] = data.nombre;
        },
        enviarIdCarta(idCartaCompromiso) {
            this.$emit("obtenerIdCarta", idCartaCompromiso);
            this.seleccionarCarta(idCartaCompromiso);
        },
        async redirigirActualizarBien(id) {
            const ruta = `/cartasCompromiso/actualizar/${id}`;
            await router.push({ path: ruta });
        },
        seleccionarCarta(idCarta) {
            this.cartaSeleccionada = idCarta;
            console.log(idCarta);
        },
        claseFila(autorizacion, id) {
            if (id === this.cartaSeleccionada) {
                console.log("Entra aqui");
                return {
                    'fila-seleccionada': id === this.cartaSeleccionada,
                    'table-info': autorizacion === true
                };
            } else if(!this.filtrar) {
                return {
                    'table-info': autorizacion === true,
                    'table-danger': autorizacion === false
                };
            }
        }
    },
    mounted() {
        if (this.filtrar) {
            this.filtrarCartas();
        } else {
            this.buscarCartas();
        }
    },
    props: {
        filtrar: {
            type: Boolean,
            default: false,
            required: false
        },
        cedulaFiltro: {
            type: String
        }
    }
}
</script>

<style scoped>

.fila-seleccionada {
    background-color: aqua;
}

.contenedor {
    align-items: center;
    justify-content: center;
    margin-top: 2%;
}

.tabla {
    margin-left: 2%;
    width: 96%;
}

caption {
    font-weight: bold;
    font-size: 30px;
    text-align: center;
}

.info {
  max-height: 70vh;
  overflow-y: auto;

  align-items: center;
}

td, th {
    text-align: center;
    vertical-align: middle;
}
</style>