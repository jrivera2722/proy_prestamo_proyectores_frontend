<template>
    <div class="contenedor">
        <div class="tabla">
            <table class="table table-hover caption-top" v-if="cartas.length > 0">
                <caption>Lista de Cartas de Compromiso</caption>
                <!-- <div>
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

                        <div v-if="filtro == 'Autorizacion'">
                        <div class="form-floating">
                            <select
                            class="form-select"
                            id="floatingSelect"
                            v-model="filtroText"
                            >
                            <option
                                v-for="opcion in opcionesAutorizacion"
                                :key="opcion"
                                :value="opcion"
                            >
                                {{ opcion }}
                            </option>
                            </select>
                            <label for="floatingSelect"><strong>Opcion:</strong></label>
                        </div>
                        </div>

                        <div v-if="filtroText != ''">
                        <button
                            @click="filtrarPorAutorizacion"
                            class="btn btn-primary"
                            style="margin-right: 5px"
                        >
                            Filtrar
                        </button>
                        <button @click="buscarCartas" class="btn btn-danger">
                            Eliminar filtro
                        </button>
                        </div>
                    </div>
                </div> -->

                <div class="center-content">

                    <button class="descarga" v-if="cartas.length >= 1 && !filtrar" @click="mostrar">
                        <img src="@/assets/download.png" alt="Descargar" />
                    </button>

                    <div v-if="mostrarOpciones" class="opciones">
                        <button class="btn btn-success" @click="descargarExcel2">Excel</button>
                        <button class="btn btn-danger" @click="descargarPDF">PDF</button>
                    </div>
                </div>
                <div class="info">
                    <thead>
                        <tr class="table-dark">
                            <th style="width: 5%;" v-if="!filtrar">N.Carta</th>
                            <th style="width: 5%;">Asignatura</th>
                            <th style="width: 5%;">Semestre</th>
                            <th style="width: 5%;">Paralelo</th>
                            <th style="width: 5%;">Día</th>
                            <th style="width: 5%;">Hora del Préstamo</th>
                            <th style="width: 5%;">Día de Devolución</th>
                            <th style="width: 5%;">Hora de Devolución</th>
                            <th style="width: 5%;">Docente</th>
                            <th style="width: 5%;">Ayudante</th>
                            <th style="width: 5%;">Autorizado</th>
                            <th style="width: 5%;" v-if="editar" scope="col">Acción</th>
                            <th style="width: 5%;" v-if="filtrar">Seleccionar</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="carta in cartas.slice().reverse()" :key="carta.id" :class= "claseFila(carta.autorizacion, carta.id)">
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
                            <td v-if="editar" class="casilla-btns"><button class="btn btn-dark"
                                    @click="redirigirActualizarBien(carta.id)">Editar</button>
                                <button class="btn btn-dark"
                                    @click="actualizarAutorizacion(carta.id)">Autorizar</button>
                            </td>
                            <td v-if="filtrar"><button class="btn btn-dark"
                                    @click="enviarIdCarta(carta.id)">Seleccionar</button></td>
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
import * as xlsx from "xlsx";

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import router from "@/router/router";
import { buscarPorCedulaAyudanteFachada, buscarCartasCompromisoXDiaAyudanteFachada } from '@/modules/ayudante/helpers/AyudanteCliente';
import { buscarTodosCartasCompromisoFachada, actualizarCartaCompromisoFachada, buscarPorIdCartaCompromisoFachada } from '../helpers/CartaCompromisoCliente';
import { buscarPorCedulaDocenteFachada } from '@/modules/docente/helpers/DocenteCliente';

export default {
    data() {
        return {
            list: [],
            cartas: [],
            nombreAyudantes: [],
            nombreDocentes: [],
            cartaSeleccionada: null,
            editar: true,
            mostrarOpciones: false,
            filtro: 'Autorizacion',
            filtroText: '',
            opciones: ["Autorizacion"],
            opcionesAutorizacion: ["No"]
        };
    },
    methods: {
        async buscarCartas() {
            let data = [];
            data = await buscarTodosCartasCompromisoFachada();
            if (data.length != 0) {
                this.cartas = data.sort((a, b) => b.id - a.id).reverse();
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
            } else if (!this.filtrar) {
                return {
                    'table-info': autorizacion === true,
                    'table-danger': autorizacion === false
                };
            }
        },
        async buscarPrestamosFiltro() {
            let data = [];
            data = await buscarPorFechaPrestamoFachada(this.filtroText + "T00:00");
            if (this.filtro == "Autorizacion") {
                let dev = this.filtroText == "Si" ? true : false;
                data = await buscarPrestamosDevueltosFachada(dev);
            }
            if (data.length != 0) this.cartas = data;
            else {
                alert("El filtro aplicado no posee préstamos.");
            }
        },
        async actualizarAutorizacion(id) {
            console.log("funcion" + id);
            const log = sessionStorage.getItem("user");
            try {
                const cartaAutorizar = await buscarPorIdCartaCompromisoFachada(id);
                cartaAutorizar.autorizacion = cartaAutorizar.autorizacion === true ? false : true;
                const registro = await actualizarCartaCompromisoFachada(cartaAutorizar, id);
                if (registro) {
                    this.buscarCartas();
                }
            } catch (error) {
                alert("No se puede devolver el prestamo ", id);
            }
        },
        filtrarPorAutorizacion() {
            if (this.filtro === "Autorizacion") {
                if (this.filtroText === "No") {
                    let data = this.cartas.filter(carta => carta.autorizacion !== true);

                    if (data.length !== 0) {
                        this.cartas = data;
                    } else {
                        alert("No hay cartas con autorización 'No'.");
                    }
                } else {
                    this.buscarCartas();
                }
            }
        },
        mostrar() {
            this.mostrarOpciones = true;
        },
        ocultar() {
            this.mostrarOpciones = false;
        },
        descargarPDF() {
            // Crear un nuevo objeto jsPDF
            const doc = new jsPDF({
                orientation: "landscape"
            });

            const columns = ["No. Carta", "Asignatura",
                "Semestre", "Paralelo", "Día",
                "Hora prestamo", "Día devolución",
                "Hora devolución", "Autorización", "C. Docente", "C. Ayudante"]

            const data = this.cartas.map(carta => [
                carta.id,
                carta.asignatura,
                carta.semestre,
                carta.paralelo,
                carta.dia,
                carta.horaPrestamo,
                carta.diaDevolucion,
                carta.horaDevolucion,
                carta.autorizacion,
                carta.cedulaDocente,
                carta.cedulaAyudante,
            ]);

            // Añadir la tabla
            doc.autoTable({
                head: [columns],
                body: data,
                startY: 10,
                align: 'center',
                //width: 'auto', // O ajusta según sea necesario
                theme: 'striped', // Ajusta la alineación del texto
            });

            //doc.addPage();

            // Configurar el formato y la orientación del PDF
            const textoReglamento1 =
                "Esperando texto... ";
            const textoReglamento2 =
                "\nEsperando texto...";

            const maxWidth = doc.internal.pageSize.width + 70;

            // Dividir el texto en líneas
            const textLines = doc.splitTextToSize(textoReglamento1 + textoReglamento2, maxWidth);

            let x = 14;
            let y = doc.autoTable.previous.finalY + 10;

            // Agregar cada línea al PDF
            doc.setFontSize(11);
            textLines.forEach(line => {
                doc.text(line, x, y);
                y += 7; // Puedes ajustar el espacio entre líneas según tus necesidades
            });

            const firma = "__________________________"
            const rec = "Ing. Jorge Rivera - Recibe";
            const ent = "Ing. - Entrega";

            doc.text(firma, 42, y + 15);
            doc.text(firma, 194, y + 15);

            doc.text(rec, 54, y + 20);
            doc.text(ent, 204, y + 20);

            // Descargar el PDF
            doc.save('Cartas.pdf');

            this.ocultar();
        },
        descargarExcel2() {
            const data = this.cartas.map((carta) => ({
                "No.Carta": carta.id,
                "Asignatura": carta.asignatura,
                "Semestre": carta.semestre,
                "Paralelo": carta.paralelo,
                "Día prestamo": carta.dia,
                "Hora prestamo": carta.horaPrestamo,
                "Día devolución": carta.diaDevolucion,
                "Hora devolución": carta.horaDevolucion,
                "Autorización": carta.autorizacion,
                "C. Docente": carta.cedulaDocente,
                "C. Ayudante": carta.cedulaAyudante,
            }));

            const ws = xlsx.utils.json_to_sheet(data);
            ws["!cols"] = [
                { wch: 10.5 },  // A
                { wch: 18 },    // B
                { wch: 22 },    // C
                { wch: 18 },    // D
                { wch: 10.5 },  // E
                { wch: 10.5 },  // F
                { wch: 12 },    // G
                { wch: 15 },    // H
                { wch: 40 },    // I
            ];

            var row = this.cartas.length + 2;

            ws["!ref"] = `A1:M${row + 10}`;

            const textoReglamento1 =
                "Waiting text....";
            const textoReglamento2 =
                "Waiting text....";

            xlsx.utils.sheet_add_aoa(ws, [[textoReglamento1]], {
                origin: `A${row + 2}`,
            });
            xlsx.utils.sheet_add_aoa(ws, [[textoReglamento2]], {
                origin: `A${row + 4}`,
            });

            //ws[`B${row + 6}`].s = { border: { bottom: { style: 'thin', color: { auto: 1 } } } };
            xlsx.utils.sheet_add_aoa(ws, [["Ing. Jorge Rivera - Recibe"]], {
                origin: `C${row + 7}`,
            });
            xlsx.utils.sheet_add_aoa(ws, [["Ing. - Entrega"]], {
                origin: `K${row + 7}`,
            });

            if (this.filtro == "Responsable") {
                xlsx.utils.sheet_add_aoa(ws, [[this.filtroText]], {
                    origin: `C${row + 8}`,
                });
            }

            const wb = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(wb, ws, "Cartas");

            xlsx.writeFile(wb, "cartas.xlsx");

            this.ocultar();
        },
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
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 70px);
    background-color: #6999db;
}

.tabla {
    /*margin: 1.5%;
    width: fit-content;*/
    margin-inline: 2%;
    width: 100%;
}

caption {
    font-weight: bold;
    font-size: 30px;
    text-align: center;
}

.info {
    max-height: 60vh;
    overflow-y: auto;
    align-items: center;
}

td,
th {
    text-align: center;
    vertical-align: middle;
}

.casilla-btns {
    width: fit-content;
}

button {
    margin: 0 5px 5px 0;
}

.center-content {
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
}

.center-content * {
    margin: 10px;
}

img {
    height: 28px;
}

thead {
  position: sticky;
  top: 0;
  z-index: 1;
}

.filtros {
  margin-inline: 20%;
  margin-bottom: 2%;
  width: 60%;
  border: 1px solid;
  padding: 25px 50px;
  position: absolute;
}

.filtros {
  width: 50%;
  border: 1px solid;
  padding: 50px;
  margin-left: 25%;
  background-color: #a8bfdc;
  position: relative;
}

.descarga {
    margin-left: 20px;
    border-radius: 20px;
    background-color: white;
    border: 2px outset #457b9d;
    cursor: pointer;
}

.descarga:hover {
    background-color: #caf0f8;
    border: 2px inset #457b9d;
}
@media screen and (max-width:700px) { /*responsive*/
  .tabla{
    overflow-x: auto;
  }
}
</style>