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

        <div v-if="filtro == 'Fecha'">
          <div class="form-floating">
            <input
              type="date"
              class="form-control"
              id="floatingInput2"
              v-model="filtroText"
            />
            <label for="floatingInput2"><strong>Fecha</strong></label>
          </div>
        </div>

        <div v-if="filtro == 'Devolución'">
          <div class="form-floating">
            <select
              class="form-select"
              id="floatingSelect"
              v-model="filtroText"
            >
              <option
                v-for="opcion in opcionesDevolucion"
                :key="opcion"
                :value="opcion"
              >
                {{ opcion }}
              </option>
            </select>
            <label for="floatingSelect"><strong>Devuelto:</strong></label>
          </div>
        </div>

        <div v-if="filtroText != ''">
          <button
            @click="buscarPrestamosFiltro"
            class="btn btn-primary"
            style="margin-right: 5px"
          >
            Filtrar
          </button>
          <button @click="buscarPrestamos" class="btn btn-danger">
            Eliminar filtro
          </button>
        </div>
      </div>
    </div>

    <div class="tabla" style="margin-top: 70px">
      <table class="table table-hover caption-top" v-if="prestamos.length > 0">
        <caption>
          Lista de Préstamos
        </caption>
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
            <tr
              v-for="prestamo in prestamos"
              :key="prestamo.id"
              :class="claseFila(prestamo.devuelto)"
            >
              <td v-if="admin">{{ prestamo.id }}</td>
              <td>{{ formatDate(prestamo.fechaPrestamo) }}</td>
              <td v-if="prestamo.devuelto">Sí</td>
              <td v-else>No</td>
              <td v-if="admin">{{ formatDate(prestamo.fechaDevolucion) }}</td>
              <td v-if="prestamo.idCartaCompromiso">
                {{ prestamo.idCartaCompromiso }}
              </td>
              <td v-else>Docente</td>
              <td v-if="prestamo.cedulaDocente">
                {{ nombreDocentes[prestamo.cedulaDocente] }}
              </td>
              <td v-else>No</td>
              <td>{{ nombrePrestadores[prestamo.cedulaPrestador] }}</td>
              <td v-if="prestamo.cedulaReceptor">
                {{ nombrePrestadores[prestamo.cedulaReceptor] }}
              </td>
              <td v-else></td>
              <td>{{ prestamo.codigoBienes.join(", ") }}</td>
              <td class="casilla-btns">
                <button
                  class="btn btn-dark"
                  @click="redirigirActualizarPrestamo(prestamo.id)"
                >
                  Editar
                </button>
                <button
                  class="btn btn-dark"
                  @click="ActualizarDevolucion(prestamo.id)"
                >
                  Devuelto
                </button>
              </td>
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
import { buscarPorCedulaDocenteFachada } from "@/modules/docente/helpers/DocenteCliente";
import {
  buscarPrestamosFachada,
  buscarPorFechaPrestamoFachada,
  buscarPrestamosDevueltosFachada,
} from "../helpers/PrestamoCliente";
import { buscarPorCedulaPrestadorFachada } from "@/modules/prestador/helpers/PrestadorCliente";
import {
  actualizarPrestamoFachada,
  buscarPorIdPrestamoFachada,
} from "../helpers/PrestamoCliente";

export default {
  data() {
    return {
      prestamos: [],
      nombreDocentes: [],
      nombrePrestadores: [],
      admin: true,
      filtro: "Fecha",
      filtroText: "",
      opciones: ["Fecha", "Devolución"],
      mostrarOpciones: false,
      opcionesDevolucion: ["Si", "No"],
    };
  },
  methods: {
    async buscarBienes() {
      var bienes = [];

      if (this.filtro == "") {
        bienes = await buscarPrestamos();
      } else if (this.filtro == "Fecha de prestamos") {
        try {
          var b = await buscarPorFechaPrestamoFachada(this.filtroText.tod);
          bienes.push(b);
        } catch {
          alert("Ingrese una fecha válida.");
          return;
        }
      }
    },
    async buscarPrestamos() {
      this.filtro = "Fecha";
      this.filtroText = "";
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
    async buscarPrestamosFiltro() {
      let data = [];
      if (this.filtro == "Fecha") {
        data = await buscarPorFechaPrestamoFachada(this.filtroText + "T00:00");
      } else if (this.filtro == "Devolución") {
        let dev = this.filtroText == "Si" ? true : false;
        data = await buscarPrestamosDevueltosFachada(dev);
      }
      if (data.length != 0) this.prestamos = data;
      else {
        alert("El filtro aplicado no posee préstamos.");
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
      this.admin = data.administrador;
    },
    claseFila(docente) {
      if (!this.filtrar) {
        return {
          "table-info": docente === true,
          "table-danger": docente === false,
        };
      }
    },
    async ActualizarDevolucion(id) {
      console.log("funcion" + id);
      const log = sessionStorage.getItem("user");
      try {
        const prestamoActualizar = await buscarPorIdPrestamoFachada(id);
        prestamoActualizar.devuelto =
          prestamoActualizar.devuelto === true ? false : true;
        prestamoActualizar.cedulaReceptor = log;
        const registro = await actualizarPrestamoFachada(
          prestamoActualizar,
          id
        );
        if (registro) {
          this.buscarPrestamos();
        }
      } catch (error) {
        alert("No se puede devolver el prestamo ", id);
      }
      /*for (let i = 0; i < this.prestamos.length; i++) {
                        if(this.prestamos[i].id==id){
                            
                            const data = this.prestamos[i]
                            data.devuelto = data.devuelto === true? false : true;
                            const registro = await actualizarPrestamoFachada(data, id);
                        }
                    }*/
    },
  },
  mounted() {
    this.consultarAdmin();
    this.buscarPrestamos();
  },
  watch: {
    filtro() {
      this.filtroText = "";
    },
  },
  props: {
    filtrar: {
      type: Boolean,
      default: false,
      required: false,
    },
    cedulaFiltro: {
      type: String,
    },
  },
};
</script>

<style scoped>
.contenedor {
  display: grid;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 70px);
  background-color: #6999db;
}

.tabla {
  width: 100%;
}

.filtros {
  margin-inline: 20%;
  margin-bottom: 2%;
  width: 60%;
  border: 1px solid;
  padding: 25px 50px;
  background-color: #b4b8ab;
  position: absolute;
  top: 100px;
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
th .casilla-btns {
  text-align: center;
  vertical-align: middle;

  width: 10%;
}

button {
  margin: 0 5px 5px 0;
}

.casilla-btns {
  width: fit-content;
}

.filtros {
  width: 50%;
  border: 1px solid;
  padding: 50px;
  margin-left: 25%;
  background-color: #a8bfdc;
  position: relative;
}

@media screen and (width=700px) {
  td {
    display: flex;
    width: 405px;
    overflow-x: auto;
  }

  .tabla {
    overflow-x: auto;
  }
}

@media screen and (max-width:700px) { /*responsive*/
  .tabla{
    overflow-x: auto;
  }
}
</style>