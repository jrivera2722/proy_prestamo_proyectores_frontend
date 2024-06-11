<template>
  <div class="contenedor">
    <div>
      <div class="filtros">
        <caption>
          Filtros
        </caption>

        <div class="form-floating">
          <select class="form-select" id="floatingSelect" v-model="filtro">
            <option v-for="opcion in opciones" :key="opcion" :value="opcion">
              {{ opcion }}
            </option>
          </select>
          <label for="floatingSelect"><strong>Filtrar por:</strong></label>
        </div>

        <div v-if="filtro == 'Cedula'">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInput2"
              v-model="filtroText"
            />
            <label for="floatingInput2"><strong>Cedula</strong></label>
          </div>
        </div>

        <div v-if="filtro == 'Nombre'">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInput2"
              v-model="filtroText"
              @input="filtroText = $event.target.value.toUpperCase()"
            />
            <label for="floatingInput2"><strong>Nombre</strong></label>
          </div>
        </div>

        <div v-if="filtroText != ''">
          <button
            @click="buscarAyudantesFiltro"
            class="btn btn-primary"
            style="margin-right: 5px"
          >
            Filtrar
          </button>
          <button @click="buscarAyudantes" class="btn btn-danger">
            Eliminar filtro
          </button>
        </div>
      </div>
    </div>

    <div class="tabla">
      <table
        class="table table-hover caption-top"
        v-if="ayudantes.length !== 0"
      >
        <caption>
          Lista de Ayudantes
        </caption>
        <div class="info">
        <thead>
          <tr class="table-dark">
            <th scope="col">Cédula</th>
            <th scope="col">Nombre</th>
            <!-- <th scope="col">Teléfono</th> -->
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ayudante in ayudantes" :key="ayudante.id">
            <td>{{ ayudante.cedula }}</td>
            <td>{{ ayudante.nombre }}</td>
            <!-- <td>{{ ayudante.telefono }}</td> -->
            <td>
              <button
                class="btn btn-dark"
                @click="redirigirActualizarAyudante(ayudante.cedula)"
              >
                Actualizar
              </button>
            </td>
          </tr>
        </tbody>
    </div>
      </table>
      <div v-else>
        <h1>Buscando ayudantes...</h1>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import {
  buscarTodosAyudantesFachada,
  buscarPorNombreAyudanteFachada,
  buscarPorCedulaAyudanteFachada,
} from "../helpers/AyudanteCliente";

export default {
  data() {
    return {
      ayudantes: [],
      filtroText: "",
      filtro: "",
      opciones: ["Cedula", "Nombre"],
    };
  },
  methods: {
    async buscarAyudantesFiltro() {
      let data = [];
      let cedulas = [];
      for (let i =0; i< this.ayudantes.length; i++) {
        cedulas[i] = this.ayudantes[i].cedula;
      }
      console.log(cedulas);
      if (this.filtro == "Cedula" && cedulas.includes(this.filtroText)) {
        data[0] = await buscarPorCedulaAyudanteFachada(this.filtroText);
      } else if (this.filtro == "Nombre") {
        console.log("Filtrando por nombre...");
        data = await buscarPorNombreAyudanteFachada(this.filtroText);
        console.log("Datos encontrados:", data);
      }

      if (data.length !== 0) {
        console.log("Ayudantes antes:", this.ayudantes);
        this.ayudantes = data;
        console.log("Ayudantes:", this.ayudantes);
      } else {
        alert("El filtro aplicado no existe o no hay resultados.");
      }
    },
    async buscarAyudantes() {
      this.filtroText = "";
      const data = await buscarTodosAyudantesFachada();
      this.ayudantes = data;
    },
    async redirigirActualizarAyudante(cedula) {
      const ruta = `/ayudantes/actualizar/${cedula}`;
      await router.push({ path: ruta });
    },
  },
  mounted() {
    this.buscarAyudantes();
  },
  watch: {
    filtro() {
      this.filtroText = "";
    },
  },
};
</script>

<style scoped>
.contenedor {
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6999db;
}

.filtros {
  margin-inline: 20%;
  margin-bottom: 2%;
  width: 60%;
  border: 1px solid;
  padding: 25px 50px;
  background-color: #b4b8ab;
  /*position: absolute;*/
  top: 100px;
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

td,
th {
  text-align: center;
  vertical-align: middle;
}

.info {
  max-height: 70vh;
  overflow-y: auto; /*scroll*/
}

/*View this observality for changed in others pags web.*/
.info th,
.info td {
  padding: 26px;
  text-align: center;
  vertical-align: middle;
}


thead {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>