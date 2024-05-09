<template>
    <div class="contenedor">
        <div class="tabla">
            <table class="table table-hover caption-top" v-if="ayudantes.length > 0">
                <caption>Lista de Ayudantes</caption>
                <thead>
                    <tr class="table-dark">
                        <th scope="col">Cédula</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ayudante in ayudantes" :key="ayudante.id">
                        <td>{{ ayudante.cedula }}</td>
                        <td>{{ ayudante.nombre }}</td>
                        <td>{{ ayudante.telefono }}</td>
                        <td>
                            <button class="btn btn-dark" @click="redirigirActualizarAyudante(ayudante.cedula)">
                                Actualizar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else>
                <h1>Buscando ayudantes...</h1>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router/router';
import { buscarTodosAyudantesFachada } from '../helpers/AyudanteCliente';

export default {
    data() {
        return {
            ayudantes: [],
        };
    },
    methods: {
        async buscarAyudantes() {
            const data = await buscarTodosAyudantesFachada();
            this.ayudantes = data;
        },
        async redirigirActualizarAyudante(cedula) {
            const ruta = `/ayudantes/actualizar/${cedula}`;
            await router.push({ path: ruta });
        }
    },
    mounted() {
        this.buscarAyudantes();
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
    margin-left: 2%;
    width: 96%;
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