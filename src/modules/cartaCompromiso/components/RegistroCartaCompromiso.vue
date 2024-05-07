<template>
    <div class="container">
        <div>
            <div class="formulario">
                <h1>Registro de Cartas de Compromiso</h1>
                <div class="form-floating">
                    <input id="asiInput" type="text" v-model="asignatura" class="form-control" placeholder="Química I">
                    <label for="asiInput">Asignatura</label>
                </div>
                <div class="form-floating">
                    <select name="diaDevInput" id="semInput" v-model="semestre" class="form-control"
                        placeholder="Primero">
                        <option v-for="opcion in opcionesSemestre" :key="opcion" :value="opcion">{{ opcion }}</option>
                    </select>
                    <label for="semInput">Semestre</label>
                </div>
                <div class="form-floating">
                    <input id="parInput" type="number" v-model="paralelo" class="form-control" placeholder="0">
                    <label for="parInput">Paralelo</label>
                </div>
                <div class="form-floating">
                    <input id="cedDocInput" type="text" v-model="cedulaDocente" class="form-control"
                        placeholder="XXXXXXXXXX">
                    <label for="cedDocInput">Cédula Docente</label>
                </div>
                <div class="form-floating" v-if="nombreDocente">
                    <input id="cedDocInput" type="text" v-model="nombreDocente" disabled class="form-control"
                        placeholder="Pepito de los Palotes">
                    <label for="cedDocInput">Nombre Docente</label>
                </div>
                <div class="form-floating">
                    <input id="cedAyuInput" type="text" v-model="cedulaAyudante" class="form-control"
                        placeholder="XXXXXXXXXX">
                    <label for="cedAyuInput">Cédula Ayudante</label>
                </div>
                <div class="form-floating" v-if="nombreAyudante">
                    <input id="cedDocInput" type="text" v-model="nombreAyudante" disabled class="form-control"
                        placeholder="Julian Alvarez">
                    <label for="cedDocInput">Nombre Ayudante</label>
                </div>
                <div class="form-floating">
                    <input id="numDiasInput" type="number" v-model="numDias" class="form-control" placeholder="1">
                    <label for="numDiasInput">Número de días</label>
                </div>
                <ul>
                    <li v-for="(item, index) in dias" :key="index">
                        <h4>Horario {{ index + 1 }}</h4>
                        <div class="form-floating">
                            <select name="diaInput" v-model="item.dia" class="form-control" placeholder="Lunes">
                                <option v-for="opcion in opcionesDia" :key="opcion" :value="opcion">{{ opcion }}
                                </option>
                            </select>
                            <label for="diaInput">Día</label>
                        </div>
                        <div class="form-floating">
                            <input id="horInput" type="time" v-model="item.horaPrestamo" class="form-control"
                                placeholder="00:00">
                            <label for="horInput">Hora del préstamo</label>
                        </div>
                        <div class="form-floating">
                            <select name="diaDevInput" v-model="item.diaDevolucion" class="form-control"
                                placeholder="Química I">
                                <option v-for="opcion in opcionesDia" :key="opcion" :value="opcion">{{ opcion }}
                                </option>
                            </select>
                            <label for="diaDevInput">Día Devolución</label>
                        </div>
                        <div class="form-floating">
                            <input id="horDevInput" type="time" v-model="item.horaDevolucion" class="form-control"
                                placeholder="Química I">
                            <label for="horDevInput">Hora de la devolución</label>
                        </div>
                    </li>
                </ul>

                <div>
                    <button class="btn btn-outline-secondary" @click="registrarCartaCompromiso"
                        style="margin-bottom: 1%">Guardar</button>
                </div>
                <div>
                    <button class="btn btn-outline-secondary" v-if="imprimirNuevamente" @click="generarPDF"
                        style="margin-bottom: 5%">
                        Mostrar Carta generada
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { guardarCartaCompromisoFachada } from '../helpers/CartaCompromisoCliente';
import { buscarPorCedulaAyudanteFachada } from '@/modules/ayudante/helpers/AyudanteCliente';
import { buscarPorCedulaDocenteFachada } from '@/modules/docente/helpers/DocenteCliente';

export default {
    data() {
        return {
            asignatura: "",
            semestre: "Primero",
            paralelo: "",
            cedulaDocente: "",
            cedulaAyudante: "",
            opcionesSemestre: [
                "Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo"
            ],
            opcionesDia: [
                "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
            ],
            nombreDocente: "",
            nombreAyudante: "",
            numDias: 1,
            dias: [],
            telefonoAyudante: "",
            asignatura2: "",
            semestre2: "",
            paralelo2: "",
            cedulaDocente2: "",
            cedulaAyudante2: "",
            nombreDocente2: "",
            nombreAyudante2: "",
            numDias2: 1,
            dias2: [],
            telefonoAyudante2: "",
            imprimirNuevamente: false
        }
    },
    methods: {
        async registrarCartaCompromiso() {
            let registro = false;
            for (let i = 0; i < this.numDias; i++) {
                const data = {
                    asignatura: this.asignatura,
                    semestre: this.semestre,
                    paralelo: this.paralelo,
                    dia: this.dias[i].dia,
                    horaPrestamo: this.dias[i].horaPrestamo,
                    diaDevolucion: this.dias[i].diaDevolucion,
                    horaDevolucion: this.dias[i].horaDevolucion,
                    cedulaDocente: this.cedulaDocente,
                    cedulaAyudante: this.cedulaAyudante,
                }
                if (this.verificarCampos()) {
                    registro = await guardarCartaCompromisoFachada(data);
                    if (registro) {
                        //alert("Registro de carta de compromiso exitoso");
                    } else {
                        alert("Parece que hubo un problema registrando la carta de compromiso del día " + this.dias[i].dia);
                    }
                } else {
                    alert("Asegúrese de llenar todos los campos.")
                }
            }
            if (registro) {
                alert("Registro de carta de compromiso exitoso");
                this.asignatura2 = this.asignatura;
                this.semestre2 = this.semestre;
                this.paralelo2 = this.paralelo;
                this.cedulaDocente2 = this.cedulaDocente;
                this.cedulaAyudante2 = this.cedulaAyudante;
                this.nombreDocente2 = this.nombreDocente;
                this.nombreAyudante2 = this.nombreAyudante;
                this.numDias2 = this.numDias;
                this.dias2 = this.dias;
                this.telefonoAyudante2 = this.telefonoAyudante;
                this.imprimirNuevamente = true;
                this.generarPDF();
            }
            this.limpiarCampos();
        },
        verificarCampos() {
            try {
                if (this.cedulaDocente.length === 10 &&
                    this.cedulaAyudante.length === 10 &&
                    this.asignatura != "" &&
                    this.semestre != "" &&
                    this.paralelo != "" &&
                    this.nombreAyudante != "" &&
                    this.nombreDocente != ""
                ) {
                    for (let i = 0; i < this.numDias; i++) {
                        if (this.dias[i].dia == "" &&
                            this.dias[i].horaPrestamo == "" &&
                            this.dias[i].diaDevolucion == "" &&
                            this.dias[i].horaDevolucion == ""
                        ) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            } catch {
                return false;
            }
        },
        limpiarCampos() {
            this.asignatura = "";
            this.semestre = "Primero";
            this.paralelo = "";
            this.dias = [];
            this.numDias = 1;
            this.cedulaDocente = "";
            this.cedulaAyudante = "";
            this.nombreDocente = "";
            this.nombreAyudante = "";
            this.telefonoAyudante = "";
        },
        actualizarItems() {
            this.dias = [];
            for (let i = 0; i < this.numDias; i++) {
                this.dias.push({
                    dia: '',
                    horaPrestamo: '',
                    diaDevolucion: '',
                    horaDevolucion: ''
                });
            }
        },
        generarPDF() {
            const doc = new jsPDF();

            const x = 28;
            const anchoMaximo = 150;

            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            const texto = 'Carta de Compromiso';
            const textoWidth = doc.getTextWidth(texto);
            const centerX = (doc.internal.pageSize.width - textoWidth) / 2;
            const y = 43;
            doc.text(texto, centerX, y);

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            const fecha = 'Quito, ' + this.formatDate(this.obtenerFechaHoy());
            doc.text(fecha, x, 50);

            doc.setFont('helvetica', 'bold');
            doc.text("ING. JORGE RIVERA", x, 65);

            doc.text("RESPONSABLE DE LOS BIENES DEL LABORATORIO DE CÓMPUTO DE INGENIERÍA CIVIL", x, 72);

            doc.setFont('helvetica', 'normal');
            const parrafo1 = `Yo ${this.nombreDocente}, con documento de identidad número ${this.cedulaDocente}, docente de la Facultad de Ingeniería y Ciencias Aplicadas de la Carrera de Ingeniería Cívil declaro mediante esta carta que, me comprometo a respetar el reglamento para el uso del equipo de cómputo, y de igual manera declaro que asumo la responsabilidad del correcto uso del equipo, en caso de surgir cualquier tipo de daño responderé con mis propios bienes hasta solucionar la reparación o reposición del equipo y componentes facilitados.`;
            const parrafo1Recorte = doc.splitTextToSize(parrafo1, anchoMaximo);

            // Agregar el texto al PDF
            doc.text(parrafo1Recorte, x, 85);

            const parrafo2 = "En el caso de contar con un estudiante que apoye en la materia a mi cargo, me permito incluir los datos correspondientes, quien asume la responsabilidad del correcto uso del equipo, respetar los reglamentos para el uso del equipo y será la única persona autorizada para el retiro y entrega del equipo facilitado para el desarrollo de la cátedra, detallo la informacion del horario en el que voy a hacer uso del equipo de cómputo dentro del período académico vigente de clases.";
            const parrafo2Recorte = doc.splitTextToSize(parrafo2, anchoMaximo);
            doc.text(parrafo2Recorte, x, 115)

            const columns = ["NOMBRE AYUDANTE", "CÉDULA", "MATERIA", "SEMESTRE", "PARALELO", "DIA", "HORA\nINICIO", "HORA\nFIN"]
            const data = this.dias2.map(dia => [
                this.nombreAyudante2,
                this.cedulaAyudante2,
                this.asignatura2,
                this.semestre2,
                this.paralelo2,
                dia.dia,
                dia.horaPrestamo,
                dia.horaDevolucion
            ])

            doc.autoTable({
                head: [columns],
                body: data,
                startY: 145,
                align: 'center',
                width: 'auto',
                theme: 'plain',
                styles: {
                    lineColor: [0, 0, 0], // Color de las líneas
                    lineWidth: 0.01,      // Ancho de las líneas
                    fontSize: 9,
                    valign: 'middle',
                    halign: 'center'
                },
            });

            doc.text("Observación:", x, 205)

            doc.text("Atentamente:", x, 220)

            doc.text("FIRMA:_________________________", x, 240)
            doc.text("FIRMA:_________________________", x + 87, 240)

            doc.text(`C.I.: ${this.cedulaDocente2}`, x, 247)
            doc.text(`C.I.: ${this.cedulaAyudante2}`, x + 87, 247)
            doc.text(`Telf.: ${this.telefonoAyudante2}`, x + 87, 254)

            doc.setFontSize(7);
            doc.setFont('helvetica', 'bold');
            doc.text(`DOCENTE DE LA FACULTAD DE INGENIERÍA Y`, x, 265)
            doc.text(`ESTUDIANTE DE LA FACULTAD DE INGENIERÍA Y`, x + 87, 265)

            doc.text(`CIENCIAS APLICADAS Y CARRERA DE INGENIERÍA CIVIL`, x, 270)
            doc.text(`CIENCIAS APLICADAS Y CARRERA DE INGENIERÍA CIVIL`, x + 87, 270)

            window.open(doc.output('bloburl'), '_blank');
        },
        obtenerFechaHoy() {
            const fechaHoy = new Date();
            const año = fechaHoy.getFullYear();
            const mes = fechaHoy.getMonth() + 1;
            const dia = fechaHoy.getDate();
            const hora = fechaHoy.getHours();
            const minutos = fechaHoy.getMinutes();
            const segundos = fechaHoy.getSeconds();

            const fechaFormateada = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

            return fechaFormateada;
        },
        formatDate(fecha) {
            if (!fecha) {
                return "";
            }

            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
            };

            return new Date(fecha).toLocaleDateString("es-ES", options);
        },
        convertirAMayusculas() {
            this.nombre = this.nombre.toUpperCase();
        },
    },
    watch: {
        async cedulaAyudante() {
            try {
                if (this.cedulaAyudante.length == 10) {
                    const data = await buscarPorCedulaAyudanteFachada(this.cedulaAyudante);
                    this.nombreAyudante = data.nombre;
                    this.telefonoAyudante = data.telefono;
                } else {
                    this.nombreAyudante = "";
                    this.telefonoAyudante = "";
                }
            } catch {
                this.nombreAyudante = "";
                this.telefonoAyudante = "";
            }
        },
        async cedulaDocente() {
            try {
                if (this.cedulaDocente.length == 10) {
                    const data = await buscarPorCedulaDocenteFachada(this.cedulaDocente);
                    this.nombreDocente = data.nombre;
                } else {
                    this.nombreDocente = "";
                }
            } catch {
                this.nombreDocente = "";
            }
        },
        numDias() {
            if (this.numDias > 5) {
                this.numDias = 5;
            } else if (this.numDias < 1) {
                this.numDias = 1;
            }
            this.actualizarItems();
        }
    },
    mounted() {
        this.actualizarItems();
    }
}
</script>

<style scoped>
.container {
    align-items: center;
    justify-content: center;
    margin-top: 2%;
}

.formulario {
    width: 60%;
    margin-left: 20%;
}

h1 {
    color: #363636;
    margin-bottom: 3%;
}

input,
select {
    margin-top: 1%;
}

button {
    margin-top: 2%;
}

label {
    font-weight: bold;
    color: #462255;
}

ul {
    list-style-type: none;
    padding-left: 0;
}

li {
    margin-top: 3%;
}

h4 {
    color: #3E78B2;
}

@media screen and (max-width: 991px) {
    .formulario {
        width: 80%;
        margin-left: 10%;
    }
}

@media screen and (max-width: 301px) {
    h1 {
        font-size: 24px;
    }
}

@media screen and (max-width: 275px) {
    h1 {
        font-size: 20px;
    }
}

@media screen and (max-width: 232px) {
    h1 {
        font-size: 18px;
    }
}

@media screen and (max-width: 211px) {
    h1 {
        font-size: 16px;
    }
}
</style>