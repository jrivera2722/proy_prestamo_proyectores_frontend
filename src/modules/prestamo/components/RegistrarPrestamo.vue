<template>
    <div class="contenedor">
        <div>
            <div class="formulario">
                <h1>Realizar un préstamo</h1>

                <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group"
                    style="margin-top: -15px">
                    <input class="btn-check" id="btnPrestDoc" type="checkbox" v-model="prestamoDocente"
                        @click="toggleCheckboxes(1)" />
                    <label class="btn btn-outline-secondary" for="btnPrestDoc" style="background: white">Docente</label>

                    <input class="btn-check" id="btnPrestAyu" type="checkbox" v-model="prestamoAyudante"
                        @click="toggleCheckboxes(2)" />
                    <label class="btn btn-outline-secondary" for="btnPrestAyu" style="background: white">Ayudante</label>
                </div>
                <div v-if="opcSeleccionado.nombre!=null && opcSeleccionado.cedula!=null">
                    <h5>Realizar un préstamo: {{ opcSeleccionado.nombre }} C.I: {{ opcSeleccionado.cedula }}</h5>
                </div>
                <div v-if="prestamoAyudante">
                    <v-select id="asiInput" v-model="cedulaSolicitud" @search="valorDado" class="form-control" :options="listaAyudantes"
                            @input="printSelectedValue" placeholder="Nombre o número de cédula del ayudante"></v-select>
                    <ListaCartasCompromiso v-if="cedulaRegistrada" :filtrar="true" :cedulaFiltro="filtroCarta"
                        @obtenerIdCarta="recibirIdCarta" class="lista-centrada" style="height: 100%;"/>
                    <div v-else>
                        <h3 v-if="listaAyudantes.length == 10">
                            No existe ayudantes que conicidan con la busqueda.
                        </h3>
                    </div>
                </div>
                <div v-if="prestamoDocente">
                    <v-select id="asiInput" v-model="cedulaSolicitudDocente" @search="valorDadoDocente" class="form-control" :options="listaDocentes"
                            @input="printSelectedValue" placeholder="Nombre o número de cédula del docente"></v-select>
                </div>
                <div v-if="cedulaRegistrada || prestamoDocente" class="btn-group" role="group" aria-label="Basic checkbox toggle button group"
                    style="margin-top: 15px; margin-bottom: 15px; margin-left: -15%; margin-right: -15%">
                    <input class="btn-check" id="btnProyector" type="checkbox" v-model="buscarProyectores" />
                    <label class="btn btn-outline-secondary" for="btnProyector">Proyector</label>

                    <input class="btn-check" id="btnCablePoder" type="checkbox" v-model="buscarCablesPoder" />
                    <label class="btn btn-outline-secondary" for="btnCablePoder">C.Poder</label>

                    <input class="btn-check" id="btnCHDMI" type="checkbox" v-model="buscarcablesHDMI" />
                    <label class="btn btn-outline-secondary" for="btnCHDMI">HDMI</label>

                    <input class="btn-check" id="btnAD" type="checkbox" v-model="buscarAdaptador" />
                    <label class="btn btn-outline-secondary" for="btnAD">Adaptador</label>

                    <input class="btn-check" id="btnPA" type="checkbox" v-model="buscarParlantes" />
                    <label class="btn btn-outline-secondary" for="btnPA">Parlantes</label>

                    <input class="btn-check" id="btnCVGAr" type="checkbox" v-model="buscarCablesVGA" />
                    <label class="btn btn-outline-secondary" for="btnCVGAr">VGA</label>

                    <input class="btn-check" id="btnExtension" type="checkbox" v-model="buscarExtensiones" />
                    <label class="btn btn-outline-secondary" for="btnExtension">Extensión</label>

                    <input class="btn-check" id="btnCortapicos" type="checkbox" v-model="buscarCortapicos" />
                    <label class="btn btn-outline-secondary" for="btnCortapicos">Cortapicos</label>
                </div>
                <div v-if="buscarProyectores && proyectores.length != 0" class="form-floating">
                    <select name="inpProyector" v-model="proyector" class="form-control" placeholder="P000">
                        <option v-for="opcion in proyectores" :key="opcion.id" :value="opcion.codigo">
                            {{ opcion.codigo }}
                        </option>
                    </select>
                    <label for="inpProyector">Escoja el proyector: </label>
                </div>
                <div v-if="buscarCablesPoder && cablesPoder.length != 0" class="form-floating">
                    <select name="inpCablePoder" v-model="cablePoder" class="form-control" placeholder="CP000">
                        <option v-for="opcion in cablesPoder" :key="opcion.id" :value="opcion.codigo">
                            {{ opcion.codigo }}
                        </option>
                    </select>
                    <label for="inpCablePoder">Escoja el cable de poder: </label>
                </div>
                <div v-if="buscarcablesHDMI && cablesHDMI.length != 0" class="form-floating">
                    <select name="inpCableHDMI" v-model="cableHDMI" class="form-control" placeholder="H000">
                        <option v-for="opcion in cablesHDMI" :key="opcion.id" :value="opcion.codigo">
                            {{ opcion.codigo }}
                        </option>
                    </select>
                    <label for="inpCableHDMI">Escoja el cable HDMI: </label>
                </div>
                <div v-if="buscarAdaptador && adaptadores.length != 0" class="form-floating">
                    <select name="inpAD" v-model="adaptador" class="form-control" placeholder="AD000">
                        <option v-for="opcion in adaptadores" :key="opcion.id" :value="opcion.codigo">
                            {{ opcion.codigo }}
                        </option>
                    </select>
                    <label for="inpAD">Escoja el adaptador: </label>
                </div>
                <div v-if="buscarParlantes && parlantes.length != 0" class="form-floating">
                    <select name="inpPA" v-model="parlante" class="form-control" placeholder="PA000">
                        <option v-for="opcion in parlantes" :key="opcion.id" :value="opcion.codigo">
                            {{ opcion.codigo }}
                        </option>
                    </select>
                    <label for="inpPA">Escoja el parlante: </label>
                </div>
                <div v-if="buscarCablesVGA && cablesVGA.length != 0" class="form-floating">
                    <select name="inpCablesVGA" v-model="cableVGA" class="form-control" placeholder="V000">
                        <option v-for="opcion in cablesVGA" :key="opcion.id" :value="opcion.codigo">
                            {{ opcion.codigo }}
                        </option>
                    </select>
                    <label for="inpCablesVGA">Escoja el cable VGA: </label>
                </div>
                <div v-if="buscarExtensiones && extensiones.length != 0" class="form-floating">
                    <select name="inpExtension" v-model="extension" class="form-control" placeholder="E000">
                        <option v-for="opcion in extensiones" :key="opcion.id" :value="opcion.codigo">
                            {{ opcion.codigo }}
                        </option>
                    </select>
                    <label for="inpExtension">Escoja la extensión: </label>
                </div>
                <div v-if="buscarCortapicos && cortapicos.length != 0" class="form-floating">
                    <select name="inpCortapicos" v-model="cortapico" class="form-control" placeholder="C000">
                        <option v-for="opcion in cortapicos" :key="opcion.id" :value="opcion.codigo">
                            {{ opcion.codigo }}
                        </option>
                    </select>
                    <label for="inpCortapicos">Escoja el cortapicos: </label>
                </div>

                <div v-if="seguro">
                    <button class="btn btn-outline-secondary" @click="realizarPrestamo" style="margin-bottom: 1%">
                        Realizar prestamo
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ListaCartasCompromiso from "@/modules/cartaCompromiso/components/ListaCartasCompromiso.vue";
import { buscarPorDisponibilidadTipoBienFachada } from "@/modules/bien/helpers/BienCliente";
import {
    buscarPorCedulaAyudanteFachada,
    buscarPorNombreAyudanteFachada,
} from "@/modules/ayudante/helpers/AyudanteCliente";
import { buscarPorCedulaDocenteFachada, buscarPorNombreDocenteFachada } from '@/modules/docente/helpers/DocenteCliente';
import { guardarPrestamoFachada } from "../helpers/PrestamoCliente";

export default {
    components: {
        ListaCartasCompromiso,
    },
    data() {
        return {
            cedulaSolicitud: "",
            cedulaSolicitudDocente: "",
            cedulaRegistrada: false,
            prestamoDocente: false,
            prestamoAyudante: false,
            idCartaCompromiso: 0,
            proyectores: [],
            cablesPoder: [],
            cablesHDMI: [],
            adaptadores: [],
            parlantes: [],
            cablesVGA: [],
            extensiones: [],
            cortapicos: [],
            buscarProyectores: false,
            buscarCablesPoder: false,
            buscarcablesHDMI: false,
            buscarAdaptador: false,
            buscarParlantes: false,
            buscarCablesVGA: false,
            buscarExtensiones: false,
            buscarCortapicos: false,
            proyector: "",
            cablePoder: "",
            cableHDMI: "",
            adaptador: "",
            parlante: "",
            cableVGA: "",
            extension: "",
            cortapico: "",
            codigoBienes: [],
            seguro: true,
            filtroCarta: "",
            listaAyudantes: [],
            listaDocentes: [],
            docenteSeleccionado:"",
            opcSeleccionado:{
                nombre: null,
                cedula: null
            }
        };
    },
    methods: {
        valorDado(searchText) {
            this.cedulaSolicitud = searchText;
        },
        
        valorDadoDocente(searchText) {
            this.cedulaSolicitudDocente = searchText;
        },
        recibirIdCarta(idCarta) {
            this.idCartaCompromiso = idCarta;
        },
        async buscarBienes(tipo) {
            const data = await buscarPorDisponibilidadTipoBienFachada(tipo, true);
            return data;
        },
        async verificarAyudante(nombre) {
            this.cedulaRegistrada = false;
            const partes = nombre.split("/");
            const numeroCedula = partes[1];
            try {
                const data = await buscarPorCedulaAyudanteFachada(numeroCedula);
                this.opcSeleccionado.nombre=data.nombre;
                this.opcSeleccionado.cedula=data.cedula;
                this.filtroCarta = data.cedula;
                console.log(this.filtroCarta);
                this.cedulaRegistrada = true;
            } catch {
                this.cedulaRegistrada = false;
            }
        },
        async verificarDocente(nombre) {
            const partes = nombre.split("/");
            const numeroCedula = partes[1];
            try {
                const data = await buscarPorCedulaDocenteFachada(numeroCedula);
                this.docenteSeleccionado = data.cedula;
                this.opcSeleccionado.nombre=data.nombre;
                this.opcSeleccionado.cedula=data.cedula;
            } catch {
                alert("No existe el docente.")
            }
        },
        async buscarAyudantesNombres() {
            try {
                const lista = [];
                const data = await buscarPorNombreAyudanteFachada(this.cedulaSolicitud);
                data.forEach((item) => {
                    lista.push(item.nombre+"/"+item.cedula);
                });
                this.listaAyudantes = lista;
            } catch {
                alert("Se dio un problema al buscar ayudantes");
            }
        },
        async buscarAyudantesCedula() {
            try {
                const lista = [];
                const data = await buscarPorCedulaAyudanteFachada(this.cedulaSolicitud);
                lista.push(data.nombre+"/"+data.cedula);
                this.listaAyudantes = lista;
            } catch {
                alert("Se dio un problema al buscar ayudantes");
            }
        },
        async buscarDocentesNombres() {
            try {
                const lista = [];
                const data = await buscarPorNombreDocenteFachada(this.cedulaSolicitudDocente);
                data.forEach((item) => {
                    lista.push(item.nombre+"/"+item.cedula);
                });
                this.listaDocentes = lista;
            } catch {
                alert("Se dio un problema al buscar docentes");
            }
        },
        async buscarDocentesCedula() {
            try {
                const lista = [];
                const data = await buscarPorCedulaDocenteFachada(this.cedulaSolicitudDocente);
                lista.push(data.nombre+"/"+data.cedula);
                this.listaDocentes = lista;
            } catch {
                alert("Se dio un problema al buscar docentes");
            }
        },
        almacenarBienes() {
            var bienes = [];
            if (this.proyector != "") {
                bienes.push(this.proyector);
            }
            if (this.cablePoder != "") {
                bienes.push(this.cablePoder);
            }
            if (this.cableHDMI != "") {
                bienes.push(this.cableHDMI);
            }
            if (this.adaptador != "") {
                bienes.push(this.adaptador);
            }
            if (this.parlante != "") {
                bienes.push(this.parlante);
            }
            if (this.cableVGA != "") {
                bienes.push(this.cableVGA);
            }
            if (this.extension != "") {
                bienes.push(this.extension);
            }
            if (this.cortapico != "") {
                bienes.push(this.cortapico);
            }
            return bienes;
        },
        async realizarPrestamo() {
            this.codigoBienes = this.almacenarBienes();
            const log = sessionStorage.getItem("user");
            let data;
            if (this.prestamoAyudante) {
                data = {
                    devuelto: false,
                    idCartaCompromiso: this.idCartaCompromiso,
                    cedulaPrestador: log,
                    codigoBienes: this.codigoBienes,
                };
            } else if (this.prestamoDocente) {
                data = {
                    devuelto: false,
                    cedulaDocente: this.docenteSeleccionado,
                    cedulaPrestador: log,
                    codigoBienes: this.codigoBienes,
                };
            }
            console.log(data);
            console.log(data.codigoBienes);

            if (this.verificarCampos()) {
                const registro = await guardarPrestamoFachada(data);
                console.log(registro);
                if (registro) {
                    this.limpiarCampos();
                    alert("Se realizo el prestamo de forma exitosa.");
                } else {
                    alert("Parece que hubo un problema al intentar el prestamo.");
                }
            } else {
                alert("Asegúrese de llenar todos los campos.");
            }
        },
        verificarCampos() {
            try {
                if (
                    (this.idCartaCompromiso != "" || this.docenteSeleccionado != "") &&
                    this.codigoBienes.length != 0
                ) {
                    return true;
                }
                return false;
            } catch {
                return false;
            }
        },
        limpiarCampos() {
            this.cedulaSolicitud = "";
            this.cedulaSolicitudDocente = "";
            this.cedulaRegistrada = false;
            this.idCartaCompromiso = 0;
            this.proyectores = [];
            this.cablesPoder = [];
            this.cablesHDMI = [];
            this.adaptadores = [];
            this.parlantes = [];
            this.cablesVGA = [];
            this.extensiones = [];
            this.cortapicos = [];
            this.buscarProyectores = false;
            this.buscarCablesPoder = false;
            this.buscarcablesHDMI = false;
            this.buscarAdaptador = false;
            this.buscarParlantes = false;
            this.buscarCablesVGA = false;
            this.buscarExtensiones = false;
            this.buscarCortapicos = false;
            this.proyector = "";
            this.cablePoder = "";
            this.cableHDMI = "";
            this.adaptador = "";
            this.parlante = "";
            this.cableVGA = "";
            this.extension = "";
            this.cortapico = "";
            this.codigoBienes = [];
        },
        toggleCheckboxes(opcion) {
            switch (opcion) {
                case 1:
                    this.prestamoDocente = true;
                    this.prestamoAyudante = false;
                    this.cedulaSolicitud = "";
                    this.cedulaSolicitudDocente = "";
                    this.listaAyudantes=[];
                    this.listaDocentes=[];
                    this.cedulaRegistrada = false;
                    break;
                case 2:
                    this.prestamoDocente = false;
                    this.prestamoAyudante = true;
                    this.cedulaSolicitud = "";
                    this.cedulaSolicitudDocente = "";
                    this.listaAyudantes=[];
                    this.listaDocentes=[];
                    break;
            }
        },
    },
    watch: {
        async cedulaSolicitud() {
            const val = parseInt(this.cedulaSolicitud);
            if (this.cedulaSolicitud.length > 15) {
                this.verificarAyudante(this.cedulaSolicitud);
            }else if (this.cedulaSolicitud.length >= 4 && isNaN(val)) {
                this.buscarAyudantesNombres();
            }else if(this.cedulaSolicitud.length == 10 && !isNaN(val)){
                this.buscarAyudantesCedula();
            }
        },
        async cedulaSolicitudDocente() {
            const val = parseInt(this.cedulaSolicitudDocente);
            if (this.cedulaSolicitudDocente.length > 15) {
                this.verificarDocente(this.cedulaSolicitudDocente);
            }else if (this.cedulaSolicitudDocente.length >= 4 && isNaN(val)) {
                this.buscarDocentesNombres();
            }else if(this.cedulaSolicitudDocente.length == 10 && !isNaN(val)){
                this.buscarDocentesCedula();
            }
        },
        async buscarProyectores() {
            if (this.buscarProyectores && this.proyectores.length == 0) {
                const data = await this.buscarBienes("P");
                this.proyectores = data;

                if (this.proyectores.length == 0) {
                    alert("No hay proyectores disponibles.");
                    this.buscarProyectores = false;
                }
            }
        },
        async buscarCablesPoder() {
            if (this.buscarCablesPoder && this.cablesPoder.length == 0) {
                const data = await this.buscarBienes("CP");
                this.cablesPoder = data;

                if (this.cablesPoder.length == 0) {
                    alert("No hay cables de poder disponibles.");
                    this.buscarCablesPoder = false;
                }
            }
        },
        async buscarcablesHDMI() {
            if (this.buscarcablesHDMI && this.cablesHDMI.length == 0) {
                const data = await this.buscarBienes("H");
                this.cablesHDMI = data;

                if (this.cablesHDMI.length == 0) {
                    alert("No hay cables HDMI disponibles.");
                    this.buscarcablesHDMI = false;
                }
            }
        },
        async buscarAdaptador() {
            if (this.buscarAdaptador && this.adaptadores.length == 0) {
                const data = await this.buscarBienes("AD");
                this.adaptadores = data;

                if (this.adaptadores.length == 0) {
                    alert("No hay adaptadores disponibles.");
                    this.buscarAdaptador = false;
                }
            }
        },
        async buscarParlantes() {
            if (this.buscarParlantes && this.parlantes.length == 0) {
                const data = await this.buscarBienes("PA");
                this.parlantes = data;

                if (this.parlantes.length == 0) {
                    alert("No hay parlantes disponibles.");
                    this.buscarParlantes = false;
                }
            }
        },
        async buscarCablesVGA() {
            if (this.buscarCablesVGA && this.cablesVGA.length == 0) {
                const data = await this.buscarBienes("V");
                this.cablesVGA = data;

                if (this.cablesVGA.length == 0) {
                    alert("No hay cables VGA disponibles.");
                    this.buscarCablesVGA = false;
                }
            }
        },
        async buscarExtensiones() {
            if (this.buscarExtensiones && this.extensiones.length == 0) {
                const data = await this.buscarBienes("E");
                this.extensiones = data;

                if (this.extensiones.length == 0) {
                    alert("No hay extensiones disponibles.");
                    this.buscarExtensiones = false;
                }
            }
        },
        async buscarCortapicos() {
            if (this.buscarCortapicos && this.cortapicos.length == 0) {
                const data = await this.buscarBienes("C");
                this.cortapicos = data;

                if (this.cortapicos.length == 0) {
                    alert("No hay cortapicos disponibles.");
                    this.buscarCortapicos = false;
                }
            }
        },
    },
};
</script>


<style scoped>
.lista-centrada{
    margin-left: -30%;
}
.contenedor {
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
    background: white;
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
    color: #3e78b2;
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