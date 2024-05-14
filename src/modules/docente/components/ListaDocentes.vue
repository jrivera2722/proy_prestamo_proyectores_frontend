<template>
    <div class="contenedor">
        <div class="tabla">
            <table class="table table-hover caption-top" v-if="docentes.length > 0">
                <caption>Lista de Docentes</caption>
                <thead>
                    <tr class="table-dark">
                        <th scope="col">Cédula</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="docente in docentes" :key="docente.id">
                        <td>{{ docente.cedula }}</td>
                        <td>{{ docente.nombre }}</td>
                        <td>
                            <button class="btn btn-dark" @click="redirigirActualizarAyudante(docente.cedula)">
                                Actualizar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else>
                <h1>Buscando docentes...</h1>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router/router';
import { buscarTodosDocentesFachada } from '../helpers/DocenteCliente';

export default {
    data() {
        return {
            docentes: [],
        };
    },
    methods: {
        async buscarDocentes() {
            const data = await buscarTodosDocentesFachada();
            this.docentes = data;
        },
        async redirigirActualizarAyudante(cedula) {
            const ruta = `/docentes/actualizar/${cedula}`;
            await router.push({ path: ruta });
        }
    },
    mounted() {
        this.buscarDocentes();
    },
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
    margin-inline: 2%;
    width: 100%;
}

caption {
    font-weight: bold;
    font-size: 30px;
    text-align: center;
}

td, th {
    text-align: center;
    vertical-align: middle;
}
</style>