<template>
  <div class="contenedor">
    <div class="tabla">
      <table
        class="table table-hover caption-top"
        v-if="prestadores.length > 0"
      >
        <caption>
          Lista de Prestadores
        </caption>
        <thead>
          <tr class="table-dark">
            <th scope="col">Cédula</th>
            <th scope="col">Nombre</th>
            <th scope="col">Administrador</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prestador in prestadores" :key="prestador.id">
            <td>{{ prestador.cedula }}</td>
            <td>{{ prestador.nombre }}</td>
            <td v-if="prestador.administrador">Sí</td>
            <td v-else>No</td>
            <td>
              <button
                class="btn btn-dark"
                @click="redirigirActualizarPrestador(prestador.cedula)"
                :disabled="comprobarUsuario(prestador.cedula)">
                Actualizar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <h1>Buscando prestadores...</h1>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import {
  buscarTodosPrestadoresFachada,
  buscarPorCedulaPrestadorFachada,
} from "../helpers/PrestadorCliente";

export default {
  data() {
    return {
      prestadores: [],
      usuario: null,
      admin: false,
    };
  },
  methods: {
    async buscarPrestadores() {
        const user = sessionStorage.getItem("user");
        const addmin = await buscarPorCedulaPrestadorFachada(user);
        this.usuario = addmin;
        this.admin = addmin.administrador;

        const data = await buscarTodosPrestadoresFachada();
        this.prestadores = data;
    },
    async redirigirActualizarPrestador(cedula) {
      const ruta = `/prestadores/actualizar/${cedula}`;
      await router.push({ path: ruta });
    },
    comprobarUsuario(cedula) {
        if (this.admin==true || this.usuario.cedula == cedula) {
            return false;
        } else {
            return true;
        }
    },
  },
  mounted() {
    this.buscarPrestadores();
  },
};
</script>

<style scoped>
.fila-seleccionada {
  background-color: lightblue;
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

td,
th {
  text-align: center;
  vertical-align: middle;
}
</style>