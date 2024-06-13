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
            <input type="date" class="form-control" id="fechaDesde" v-model="fechaDesde" />
            <label for="fechaDesde"><strong>Desde</strong></label>
          </div>
          <div class="form-floating">
            <input type="date" class="form-control" id="fechaHasta" v-model="fechaHasta" />
            <label for="fechaHasta"><strong>Hasta</strong></label>
          </div>
          <button v-if="filtro == 'Fecha'" @click="helperPrestamosFiltro" class="btn btn-primary">
            Filtrar
          </button>
        </div>

        <div v-if="filtro == 'Devolución'">
          <div class="form-floating">
            <select class="form-select" id="floatingSelect" v-model="filtroText">
              <option v-for="opcion in opcionesDevolucion" :key="opcion" :value="opcion">
                {{ opcion }}
              </option>
            </select>
            <label for="floatingSelect"><strong>Devuelto:</strong></label>
          </div>
        </div>

        <div v-if="filtroText != ''">
          <button @click="buscarPrestamosFiltro" class="btn btn-primary" style="margin-right: 5px">
            Filtrar
          </button>
          <button @click="buscarPrestamos" class="btn btn-danger">
            Eliminar filtro
          </button>
        </div>
      </div>
    </div>

    <div class="center-content">
      <button class="descarga" @click="mostrar">
        <img src="@/assets/download.png" style="width: 20px; height: 20px" alt="Descargar" />
      </button>

      <div v-if="mostrarOpciones" class="opciones">
        <button class="btn btn-success" @click="descargarExcel2">Excel</button>
        <button class="btn btn-danger" @click="descargarPDF">PDF</button>
      </div>
    </div>

    <div class="tabla" style="margin-top: 10px">
      <table class="table table-hover caption-top" v-if="prestamos.length > 0">
        <caption>
          Lista de Préstamos
        </caption>
        <div class="info">
          <thead>
            <tr class="table-dark">
              <th v-if="admin" scope="col">ID</th>
              <th scope="col">Fecha del Préstamo</th>
              <th v-if="!admin" scope="col">Devuelto</th>
              <th scope="col">Fecha de Devolución</th>
              <th v-if="!admin" scope="col">Número de carta de compromiso</th>
              <!-- <th scope="col">Docente</th> -->

              <th v-if="admin" scope="col">Asignatura</th>
              <th v-if="admin" scope="col">Semestre</th>
              <th v-if="admin" scope="col">Paralelo</th>
              <th v-if="admin" scope="col">Día</th>
              <th v-if="admin" scope="col">Hora préstamo</th>
              <th v-if="admin" scope="col">Hora devolución</th>
              <th v-if="admin" scope="col">Docente</th>
              <th v-if="admin" scope="col">Ayudantes</th>

              <template v-if="!admin">
                <th scope="col">Prestador</th>
                <th scope="col">Receptor</th>
              </template>

              <th scope="col">Bienes Prestados</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="prestamo in listado.slice().reverse()" :key="prestamo.id" :class="claseFila(prestamo.devuelto)">
              <td v-if="admin">{{ prestamo.id }}</td>
              <td>{{ formatDate(prestamo.fechaPrestamo) }}</td>
              <template v-if="!admin">
                <td v-if="prestamo.devuelto">Sí</td>
                <td v-else>No</td>
              </template>

              <td>{{ formatDate(prestamo.fechaDevolucion) }}</td>

              <template v-if="!admin">
                <td v-if="prestamo.idCartaCompromiso">
                  {{ prestamo.idCartaCompromiso }}
                </td>
                <td v-else></td>

              </template>


              <template v-if="admin">
                <template v-if="prestamo.carta">
                  <td>{{ prestamo.carta.asignatura }}</td>
                  <td>{{ prestamo.carta.semestre }}</td>
                  <td>{{ prestamo.carta.paralelo }}</td>
                  <td>{{ prestamo.carta.dia }}</td>
                  <td>{{ prestamo.carta.horaPrestamo }}</td>
                  <td>{{ prestamo.carta.horaDevolucion }}</td>
                  <td>{{ nombreDocentes[prestamo.carta.cedulaDocente] }}</td>
                  <td>{{ nombreAyudantes[prestamo.carta.cedulaAyudante] }}</td>
                </template>
                <template v-else>
                  <td v-if="!admin"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{{ nombreDocentes[prestamo.cedulaDocente] }}</td>
                  <td></td>
                </template>
              </template>



              <template v-if="!admin">
                <td>{{ nombrePrestadores[prestamo.cedulaPrestador] }}</td>
                <td v-if="prestamo.cedulaReceptor">
                  {{ nombrePrestadores[prestamo.cedulaReceptor] }}
                </td>
                <td v-else></td>
              </template>


              <td>{{ prestamo.codigoBienes.join(", ") }}</td>
              <td class="casilla-btns">
                <button class="btn btn-dark" @click="redirigirActualizarPrestamo(prestamo.id)">
                  Editar
                </button>
                <button class="btn btn-dark" @click="ActualizarDevolucion(prestamo.id)">
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
import * as xlsx from "xlsx";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import router from "@/router/router";
import {
  buscarPorCedulaDocenteFachada,
  buscarTodosDocentesFachada,
} from "@/modules/docente/helpers/DocenteCliente";
import { buscarTodosCartasCompromisoFachada } from "@/modules/cartaCompromiso/helpers/CartaCompromisoCliente";
import { buscarTodosAyudantesFachada } from "@/modules/ayudante/helpers/AyudanteCliente";
import {
  buscarPrestamosFachada,
  buscarPorFechaPrestamoFachada,
  buscarPrestamosDevueltosFachada,
} from "../helpers/PrestamoCliente";
import { buscarPorCedulaPrestadorFachada } from "@/modules/prestador/helpers/PrestadorCliente";
import {
  actualizarPrestamoFachada,
  buscarPorIdPrestamoFachada,
  searchFechaDesdeHastaFachada,
} from "../helpers/PrestamoCliente";

export default {
  data() {
    return {
      listado: [],
      prestamos: [],
      nombreDocentes: [],
      nombreAyudantes: [],
      nombrePrestadores: [],
      admin: true,
      filtro: "Fecha",
      filtroText: "",
      opciones: ["Fecha", "Devolución"],
      mostrarOpciones: false,
      opcionesDevolucion: ["Si", "No"],
      fechaDesde: "",
      fechaHasta: "",
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
    async unirDatosPorId() {
      try {
        // Obtener datos de préstamos y cartas
        const prestamos = await buscarPrestamosFachada();
        const cartas = await buscarTodosCartasCompromisoFachada();
        console.log(cartas.id);
        console.log(prestamos.idCartaCompromiso);

        const datosUnidos = [];
        prestamos.forEach((prestamo) => {
          const cartaCorrespondiente = cartas.find(
            (carta) => carta.id === prestamo.idCartaCompromiso
          );
          if (cartaCorrespondiente) {
            datosUnidos.push({
              ...prestamo,
              carta: cartaCorrespondiente,
            });
          } else {
            datosUnidos.push({
              ...prestamo,
              carta: null,
            });
          }
        });

        // Aquí tienes los datos unidos por id_cartas
        console.log("datos unidos");
        console.log(datosUnidos);
        console.log(datosUnidos[0].carta.asignatura);
        this.listado = datosUnidos;
      } catch (error) {
        console.error("Error al buscar y unir los datos:", error);
      }
    },
    async buscarPrestamos() {
      this.filtro = "Fecha";
      this.filtroText = "";
      this.fechaDesda = "";
      this.fechaHasta = "";
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
    async helperPrestamosFiltro() {
      if (!this.fechaDesde || !this.fechaHasta) {
        alert("Por favor, seleccione las fechas de desde y hasta.");
      } else {
        await this.buscarPrestamosFiltro();
      }
    },
    async buscarPrestamosFiltro() {
      let data = [];

      if (this.fechaDesde && this.fechaHasta) {
        data = await searchFechaDesdeHastaFachada(
          this.fechaDesde + "T00:00",
          this.fechaHasta + "T00:00"
        );
      } else if (this.filtro == "Fecha") {
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
      //this.nombreDocentes[data.cedula] = data.nombre;
    },
    async buscarPrestador(cedula) {
      const data = await buscarPorCedulaPrestadorFachada(cedula);
      this.nombrePrestadores[data.cedula] = data.nombre;
    },
    async buscarTodosDocente() {
      const data = await buscarTodosDocentesFachada();
      //console.log(data);
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var it = data[key];
          this.nombreDocentes[it.cedula] = it.nombre;
        }
      }
      console.log(this.nombreDocentes);
    },
    async buscarTodosAyudantes() {
      const data = await buscarTodosAyudantesFachada();
      //console.log(data);
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var it = data[key];
          this.nombreAyudantes[it.cedula] = it.nombre;
        }
      }
      //console.log(this.nombreAyudantes);
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
    descargarPDF() {
      const doc = new jsPDF({
        orientation: "landscape",
      });

      const columns = [
        "ID",
        "Fecha del Préstamo",
        /*"Devuelto",*/
        "Fecha de Devolución",
        /*"Número de carta de compromiso",*/
        "Docente",
        "N Docente",
        "Ayudante",
        "Semestre",
        "Paralelo",
        "Dia",
        "Hora Prestamo",
        "Hora devolución",
        /*"Prestador",*/
        /*"Receptor",*/
        "Bienes Prestados",
        "Acción",
      ];

      const data = this.listado.map((prestamo) => [
        prestamo.id,
        this.formatDate(prestamo.fechaPrestamo),
        //prestamo.devuelto ? "Sí" : "No",
        prestamo.fechaDevolucion
          ? this.formatDate(prestamo.fechaDevolucion)
          : "",
        //prestamo.idCartaCompromiso ? prestamo.idCartaCompromiso : "",
        prestamo.cedulaDocente
          ? this.nombreDocentes[prestamo.cedulaDocente]
          : "No",
        //this.nombrePrestadores[prestamo.cedulaPrestador],
        /*prestamo.cedulaReceptor
          ? this.nombrePrestadores[prestamo.cedulaReceptor]
          : "",*/
        prestamo.codigoBienes.join(", "),
        "",
      ]);

      // Añadir la tabla
      doc.autoTable({
        head: [columns],
        body: data,
        startY: 10,
        theme: "striped",
      });

      // Verificar espacio restante en la página actual
      const spaceLeft =
        doc.internal.pageSize.height - doc.autoTable.previous.finalY;

      // Configurar el formato y la orientación del PDF
      const textoReglamento1 = "Esperando texto... ";
      const textoReglamento2 = "\nEsperando texto...";

      const maxWidth = doc.internal.pageSize.width + 70;

      // Dividir el texto en líneas
      const textLines = doc.splitTextToSize(
        textoReglamento1 + textoReglamento2,
        maxWidth
      );

      let x = 14;
      let y = doc.autoTable.previous.finalY + 10;

      // Si el espacio restante no es suficiente para el texto adicional y las firmas, agregar una nueva página
      if (spaceLeft < textLines.length * 7 + 60) {
        doc.addPage();
        y = 30;
      }

      // Agregar cada línea de texto al PDF
      doc.setFontSize(11);
      textLines.forEach((line) => {
        doc.text(line, x, y);
        y += 7;
      });

      // Agregar las firmas en la nueva página
      const firma = "__________________________";
      const rec = "Ing. Jorge Rivera - Recibe";
      const ent = "Ing. - Entrega";

      doc.text(firma, 42, 90);
      doc.text(firma, 194, 90);

      doc.text(rec, 45, 100);
      doc.text(ent, 200, 100);

      // Descargar el PDF
      doc.save("Cartas.pdf");

      this.ocultar();
    },
    descargarExcel2() {
      const data = this.prestamos.map((prestamo) => ({
        ID: this.admin ? prestamo.id : "",
        "Fecha del Préstamo": this.formatDate(prestamo.fechaPrestamo),
        Devuelto: prestamo.devuelto ? "Sí" : "No",
        "Fecha de Devolución": this.admin
          ? prestamo.fechaDevolucion
            ? this.formatDate(prestamo.fechaDevolucion)
            : ""
          : "",
        "Número de carta de compromiso": prestamo.idCartaCompromiso
          ? prestamo.idCartaCompromiso
          : "Docente",
        Docente: prestamo.cedulaDocente
          ? this.nombreDocentes[prestamo.cedulaDocente]
          : "No",
        Prestador: this.nombrePrestadores[prestamo.cedulaPrestador],
        Receptor: prestamo.cedulaReceptor
          ? this.nombrePrestadores[prestamo.cedulaReceptor]
          : "",
        "Bienes Prestados": prestamo.codigoBienes.join(", "),
      }));

      const ws = xlsx.utils.json_to_sheet(data);
      ws["!cols"] = [
        { wch: 10 }, // ID
        { wch: 18 }, // Fecha del Préstamo
        { wch: 10 }, // Devuelto
        { wch: 18 }, // Fecha de Devolución
        { wch: 25 }, // Número de carta de compromiso
        { wch: 25 }, // Docente
        { wch: 25 }, // Prestador
        { wch: 25 }, // Receptor
        { wch: 30 }, // Bienes Prestados
        { wch: 15 }, // Acción
      ];

      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, "Prestamos");

      xlsx.writeFile(wb, "prestamos.xlsx");

      this.ocultar();
    },
    mostrar() {
      this.mostrarOpciones = true;
    },
    ocultar() {
      this.mostrarOpciones = false;
    },
  },
  mounted() {
    this.consultarAdmin();
    this.buscarPrestamos();
    this.unirDatosPorId();
    this.buscarTodosDocente();
    this.buscarTodosAyudantes();
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
  height: calc(120vh - 70px);
  background-color: #6999db;
}

.descarga {
  /*margin-left: 20px;*/
  border-radius: 20px;
  width: 50px;
  height: 50px;
  background-color: white;
  border: 2px outset #457b9d;
  cursor: pointer;
}

.descarga:hover {
  background-color: #caf0f8;
  border: 2px inset #457b9d;
}

.center-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tabla {
  width: 100%;
  overflow: auto;
}

.filtros {
  margin-inline: 20%;
  margin-bottom: 2%;
  width: 60%;
  border: 1px solid;
  padding: 25px 50px;
  background-color: #b4b8ab;
  position: absolute;
  top: 20px;
}

.info {
  max-height: 50vh;
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

@media screen and (max-width: 700px) {

  /*responsive*/
  .tabla {
    overflow-x: auto;
  }
}
</style>