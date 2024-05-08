<template>
  <div class="contenedor">
    <div class="tabla">
      <table class="table table-hover caption-top" v-if="bienes.length > 0">
        <caption>
          Lista de Bienes
        </caption>
        <div class="info">
          <thead>
            <tr class="table-dark">
              <th v-if="false" scope="col">ID</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Número de Serie</th>
              <th>Estado</th>
              <th>Disponible</th>
              <th>Tipo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="bien in bienes" :key="bien.id">
              <td v-if="false">{{ bien.id }}</td>
              <td>{{ bien.codigo }}</td>
              <td>{{ bien.nombre }}</td>
              <td>{{ bien.numSerie }}</td>
              <td>{{ bien.estado }}</td>
              <td v-if="bien.disponible">Sí</td>
              <td v-else>No</td>
              <td>{{ this.cambiarTipoATexto(bien.tipo) }}</td>
              <td style="padding-block: 5px">
                <button
                  class="btn btn-dark"
                  @click="redirigirActualizarBien(bien.id)"
                >
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        </div>
      </table>
      <div v-else>
        <h1>Buscando bienes...</h1>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import { buscarTodosBienesFachada } from "../helpers/BienCliente";

export default {
  data() {
    return {
      bienes: [],
    };
  },
  methods: {
    async buscarBienes() {
      const data = await buscarTodosBienesFachada();
      this.bienes = data;
    },
    async redirigirActualizarBien(id) {
      const ruta = `/bienes/actualizar/${id}`;
      await router.push({ path: ruta });
    },
    cambiarTipoATexto(tipo) {
      if (tipo !== "") {
        switch (tipo) {
          case "P":
            return "Proyector";
          case "H":
            return "Cable HDMI";
          case "V":
            return "Cable VGA";
          case "E":
            return "Extensión";
          case "C":
            return "Cortapicos";
          case "PA":
            return "Parlantes";
          case "AD":
            return "Adaptador";
          case "CP":
            return "Cable de Poder";
          default:
            return;
        }
      }
    },
  },
  mounted() {
    this.buscarBienes();
  },
};
</script>

<style scoped>
/*.contenedor {
    align-items: center;
    justify-content: center;
    margin-top: 2%;
}

.tabla {
    margin-left: 2%;
    width: 96%;
}

table{
    width: 100%;
}

caption {
    font-weight: bold;
    font-size: 30px;
    text-align: center;
}


.info {
  max-height: 70vh;
  overflow-y: auto;
}

td, th {
    text-align: center;
    vertical-align: middle;
}*/
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
}

/*Ver padding */
.info th,
.info td {
  padding: 26px;
  text-align: center;
}

thead {
  position: sticky;
  top: 0;
}

caption {
  font-weight: bold;
  font-size: 30px;
  text-align: center;
}
</style>