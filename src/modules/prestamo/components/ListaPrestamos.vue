<template>
    <div class="contenedor">
        <div class="tabla">
            <table class="table table-hover caption-top" v-if="prestamos.length > 0">
                <caption>Lista de Préstamos</caption>
                <div class="info">
                    <thead>
                        <tr class="table-dark">
                            <th v-if="admin" scope="col">ID</th>
                            <th scope="col">Fecha del Préstamo</th>
                            <th scope="col">Devuelto</th>
                            <th v-if="admin" scope="col">Fecha de Devolución</th>
                            <th scope="col">Número de carta de compromiso</th>
                            <th scope="col">Docente</th>
                            <th scope="col">Prestador</th>
                            <th scope="col">Receptor</th>
                            <th scope="col">Bienes Prestados</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="prestamo in prestamos" :key="prestamo.id" :class="claseFila(prestamo.devuelto)">
                            <td v-if="admin">{{ prestamo.id }}</td>
                            <td>{{ formatDate(prestamo.fechaPrestamo) }}</td>
                            <td v-if="prestamo.devuelto">Sí</td>
                            <td v-else>No</td>
                            <td v-if="admin">{{ formatDate(prestamo.fechaDevolucion) }}</td>
                            <td v-if="prestamo.idCartaCompromiso">{{ prestamo.idCartaCompromiso }}</td>
                            <td v-else>Docente</td>
                            <td v-if="prestamo.cedulaDocente">{{ nombreDocentes[prestamo.cedulaDocente] }}</td>
                            <td v-else>No</td>
                            <td>{{ nombrePrestadores[prestamo.cedulaPrestador] }}</td>
                            <td v-if="prestamo.cedulaReceptor">{{ nombrePrestadores[prestamo.cedulaReceptor] }}</td>
                            <td v-else></td>
                            <td>{{ prestamo.codigoBienes.join(", ") }}</td>
                            <td><button class="btn btn-dark"
                                    @click="redirigirActualizarPrestamo(prestamo.id)">Editar</button></td>
                        </tr>
                    </tbody>
                </div>
            </table>
            <div v-else>
                <h1>Buscando préstamos...</h1>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router/router";
import { buscarPorCedulaDocenteFachada } from '@/modules/docente/helpers/DocenteCliente';
import { buscarPrestamosFachada } from '../helpers/PrestamoCliente';
import { buscarPorCedulaPrestadorFachada } from '@/modules/prestador/helpers/PrestadorCliente';

export default {
    data() {
        return {
            prestamos: [],
            nombreDocentes: [],
            nombrePrestadores: [],
            admin:true
        };
    },
    methods: {
        async buscarPrestamos() {
            let data = [];
            data = await buscarPrestamosFachada();
            if (data.length != 0) {
                this.prestamos = data;

                for (let i = 0; i < this.prestamos.length; i++) {
                    this.buscarPrestador(this.prestamos[i].cedulaPrestador);
                    if (this.prestamos[i].cedulaDocente)
                        this.buscarDocente(this.prestamos[i].cedulaDocente);
                    if (this.prestamos[i].cedulaReceptor)
                        this.buscarPrestador(this.prestamos[i].cedulaReceptor);
                }
            }
        },
        async buscarDocente(cedula) {
            const data = await buscarPorCedulaDocenteFachada(cedula);
            this.nombreDocentes[data.cedula] = data.nombre;
        },
        async buscarPrestador(cedula) {
            const data = await buscarPorCedulaPrestadorFachada(cedula);
            this.nombrePrestadores[data.cedula] = data.nombre;
        },
        formatDate(fecha) {
            if (!fecha) {
                return "";
            }

            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
            };
            return new Date(fecha).toLocaleDateString("es-ES", options);
        },
        async redirigirActualizarPrestamo(id) {
            const ruta = `/prestamos/actualizar/${id}`;
            await router.push({ path: ruta });
        },
        async consultarAdmin() {
            const user = sessionStorage.getItem("user");
            const data = await buscarPorCedulaPrestadorFachada(user);
            this.admin=data.administrador;
        },
        claseFila(docente) {
            if(!this.filtrar) {
                return {
                    'table-info': docente === true,
                    'table-danger': docente === false
                };
            }
        }
    },
    mounted() {
        this.consultarAdmin();
        this.buscarPrestamos();
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
.contenedor {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 70px);
    background-color: #6999db;
}
.tabla {
    margin-left: 2%;
    width: 96%;
}


.info {
    max-height: 70vh;
    overflow-y: auto;
    align-items: center;
}

caption {
    font-weight: bold;
    font-size: 30px;
    text-align: center;
}

thead {
    position: sticky;
    top: 0;
}

td,
th {
    text-align: center;
    vertical-align: middle;

    width: 10%;
}
</style>