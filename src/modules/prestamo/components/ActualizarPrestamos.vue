<template>
    <div class="contenedor">
        <div>
            <div class="formulario">
                <h1>Actualizar un préstamo</h1>

                <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group"
                    style="margin-top: -15px;">
                    <input class="btn-check" id="btnPrestDoc" type="checkbox" v-model="prestamoDocente" disabled>
                    <label class="btn btn-outline-secondary" for="btnPrestDoc">Docente</label>

                    <input class="btn-check" id="btnPrestAyu" type="checkbox" v-model="prestamoAyudante" disabled>
                    <label class="btn btn-outline-secondary" for="btnPrestAyu">Ayudante</label>
                </div>

                <div v-if="prestamoAyudante">
                    <div class="form-floating">
                        <input id="asiInput" type="text" v-model="cedulaSolicitud" class="form-control" maxlength="10"
                            @input="restrictInput" placeholder="XXXXXXXXXX" />
                        <label for="asiInput">Número de cédula del ayudante: </label>
                    </div>
                    <ListaCartasCompromiso v-if="cedulaRegistrada" :filtrar="true" :cedulaFiltro="cedulaSolicitud"
                        @obtenerIdCarta="recibirIdCarta" style=" height: 100%" />
                    <div v-else>
                        <h3 v-if="cedulaSolicitud.length == 10">Parece que esa cédula no ha sido registrada.</h3>
                    </div>
                </div>
                <div v-if="prestamoDocente">
                    <div class="form-floating">
                        <input id="asiInput" type="text" v-model="cedulaSolicitudDocente" class="form-control"
                            maxlength="10" @input="restrictInput" placeholder="XXXXXXXXXX" />
                        <label for="asiInput">Número de cédula del docente: </label>
                    </div>
                </div>

                <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group"
                style="margin-top: 15px; margin-bottom: 15px; margin-left: -15%; margin-right: -15%;">
                    <input class="btn-check" id="btnProyector" type="checkbox" v-model="buscarProyectores">
                    <label class="btn btn-outline-secondary" for="btnProyector">Proyector</label>

                    <input class="btn-check" id="btnCablePoder" type="checkbox" v-model="buscarCablesPoder">
                    <label class="btn btn-outline-secondary" for="btnCablePoder">Cable de poder</label>

                    <input class="btn-check" id="btnCHDMI" type="checkbox" v-model="buscarcablesHDMI">
                    <label class="btn btn-outline-secondary" for="btnCHDMI">Cable HDMI</label>

                    <input class="btn-check" id="btnAD" type="checkbox" v-model="buscarAdaptador">
                    <label class="btn btn-outline-secondary" for="btnAD">Adaptador</label>

                    <input class="btn-check" id="btnPA" type="checkbox" v-model="buscarParlantes">
                    <label class="btn btn-outline-secondary" for="btnPA">Parlantes</label>

                    <input class="btn-check" id="btnCVGAr" type="checkbox" v-model="buscarCablesVGA">
                    <label class="btn btn-outline-secondary" for="btnCVGAr">Cable VGA</label>

                    <input class="btn-check" id="btnExtension" type="checkbox" v-model="buscarExtensiones">
                    <label class="btn btn-outline-secondary" for="btnExtension">Extensión</label>

                    <input class="btn-check" id="btnCortapicos" type="checkbox" v-model="buscarCortapicos">
                    <label class="btn btn-outline-secondary" for="btnCortapicos">Cortapicos</label>
                </div>
                <div v-if="buscarProyectores && proyectores.length != 0" class="form-floating">
                    <select name="inpProyector" v-model="proyector" class="form-control" placeholder="P000">
                        <option v-for="opcion in proyectores" :key="opcion.id" :value="opcion.codigo">{{ opcion.codigo
                            }}</option>
                    </select>
                    <label for="inpProyector">Escoja el proyector: </label>
                </div>
                <div v-if="buscarCablesPoder && cablesPoder.length != 0" class="form-floating">
                    <select name="inpCablePoder" v-model="cablePoder" class="form-control" placeholder="CP000">
                        <option v-for="opcion in cablesPoder" :key="opcion.id" :value="opcion.codigo">{{ opcion.codigo
                            }}
                        </option>
                    </select>
                    <label for="inpCablePoder">Escoja el cable de poder: </label>
                </div>
                <div v-if="buscarcablesHDMI && cablesHDMI.length != 0" class="form-floating">
                    <select name="inpCableHDMI" v-model="cableHDMI" class="form-control" placeholder="H000">
                        <option v-for="opcion in cablesHDMI" :key="opcion.id" :value="opcion.codigo">{{ opcion.codigo }}
                        </option>
                    </select>
                    <label for="inpCableHDMI">Escoja el cable HDMI: </label>
                </div>
                <div v-if="buscarAdaptador && adaptadores.length != 0" class="form-floating">
                    <select name="inpAD" v-model="adaptador" class="form-control" placeholder="AD000">
                        <option v-for="opcion in adaptadores" :key="opcion.id" :value="opcion.codigo">{{ opcion.codigo
                            }}
                        </option>
                    </select>
                    <label for="inpAD">Escoja el adaptador: </label>
                </div>
                <div v-if="buscarParlantes && parlantes.length != 0" class="form-floating">
                    <select name="inpPA" v-model="parlante" class="form-control" placeholder="PA000">
                        <option v-for="opcion in parlantes" :key="opcion.id" :value="opcion.codigo">{{ opcion.codigo }}
                        </option>
                    </select>
                    <label for="inpPA">Escoja el parlante: </label>
                </div>
                <div v-if="buscarCablesVGA && cablesVGA.length != 0" class="form-floating">
                    <select name="inpCablesVGA" v-model="cableVGA" class="form-control" placeholder="V000">
                        <option v-for="opcion in cablesVGA" :key="opcion.id" :value="opcion.codigo">{{ opcion.codigo }}
                        </option>
                    </select>
                    <label for="inpCablesVGA">Escoja el cable VGA: </label>
                </div>
                <div v-if="buscarExtensiones && extensiones.length != 0" class="form-floating">
                    <select name="inpExtension" v-model="extension" class="form-control" placeholder="E000">
                        <option v-for="opcion in extensiones" :key="opcion.id" :value="opcion.codigo">{{ opcion.codigo
                            }}</option>
                    </select>
                    <label for="inpExtension">Escoja la extensión: </label>
                </div>
                <div v-if="buscarCortapicos && cortapicos.length != 0" class="form-floating">
                    <select name="inpCortapicos" v-model="cortapico" class="form-control" placeholder="C000">
                        <option v-for="opcion in cortapicos" :key="opcion.id" :value="opcion.codigo">{{ opcion.codigo
                            }}</option>
                    </select>
                    <label for="inpCortapicos">Escoja el cortapicos: </label>
                </div>
                <br>
                <div class="btn-group" style="margin-block: 15px;">
                    <input class="btn-check" id="btnDovolver" type="checkbox" v-model="devuelto">
                    <label class="btn btn-outline-secondary" for="btnDovolver">Devuelto</label>
                </div>
                <div v-if="seguro">
                    <button class="btn btn-outline-secondary" @click="actualizarPrestamo"
                        style="margin-bottom: 1%">Actualizar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router/router";
import ListaCartasCompromiso from '@/modules/cartaCompromiso/components/ListaCartasCompromiso.vue'
import { buscarPorPrestamoTipoBienFachada, buscarPorPrestamoTipoDisponiblesBienFachada } from '@/modules/bien/helpers/BienCliente';
import { buscarPorCedulaAyudanteFachada } from '@/modules/ayudante/helpers/AyudanteCliente';
import { actualizarPrestamoFachada, buscarPorIdPrestamoFachada } from '../helpers/PrestamoCliente';
import { buscarPorIdCartaCompromisoFachada } from '@/modules/cartaCompromiso/helpers/CartaCompromisoCliente';
import { buscarPorCedulaDocenteFachada } from '@/modules/docente/helpers/DocenteCliente';

export default {
    components: {
        ListaCartasCompromiso,
    },
    data() {
        return {
            id: this.$route.params.id,
            prestamo: null,
            devuelto: false,
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
            seguro: true
        }
    },
    mounted() {
        this.buscarPrestamo();
    },
    methods: {
        async buscarPrestamo() {
            let prestamo;
            let carta;
            let docente;
            try {
                prestamo = await buscarPorIdPrestamoFachada(this.id);
                if (prestamo.idCartaCompromiso) {
                    carta = await buscarPorIdCartaCompromisoFachada(prestamo.idCartaCompromiso);
                    this.prestamoAyudante = true;
                } else if (prestamo.cedulaDocente) {
                    docente = await buscarPorCedulaDocenteFachada(prestamo.cedulaDocente);
                    this.prestamoDocente = true;
                }
            } catch {
                this.redirigirAError();
                return;
            }

            this.prestamo = prestamo;
            console.log(this.prestamo.tipoBienes);
            if (this.prestamoAyudante) {
                this.cedulaSolicitud = carta.cedulaAyudante;
                this.idCartaCompromiso = carta.id;
            } else if (this.prestamoDocente) {
                this.cedulaSolicitudDocente = docente.cedula;
            }

            this.obtenerVariablesIndependientes(prestamo.codigoBienes);
            this.devuelto = prestamo.devuelto;
        },
        obtenerVariablesIndependientes(lista) {
            var bienes = [];
            lista.forEach(item => {
                const tipo = item.replace(/[0-9]/g, '');
                switch (tipo) {
                    case 'P':
                        this.proyector = item;
                        this.buscarProyectores = true;
                        return;
                    case 'CP':
                        this.cablePoder = item;
                        this.buscarCablesPoder = true;
                        return;
                    case 'H':
                        this.cableHDMI = item;
                        this.buscarcablesHDMI = true;
                        return;
                    case 'AD':
                        this.adaptador = item;
                        this.buscarAdaptador = true;
                        return;
                    case 'PA':
                        this.parlante = item;
                        this.buscarParlantes = true;
                        return;
                    case 'V':
                        this.cableVGA = item;
                        this.buscarCablesVGA = true;
                        return;
                    case 'E':
                        this.extension = item;
                        this.buscarExtensiones = true;
                        return;
                    case 'C':
                        this.cortapico = item;
                        this.buscarCortapicos = true;
                        return;
                    default:
                        return false;
                }
            });
            return bienes;
        },
        recibirIdCarta(idCarta) {
            this.idCartaCompromiso = idCarta;
        },
        async buscarBienes(tipo) {
            const data = await buscarPorPrestamoTipoDisponiblesBienFachada(tipo, this.id);
            return data;
        },
        async buscarBienTipo(tipo) {
            const data = await buscarPorPrestamoTipoBienFachada(tipo, this.id);
            return data;
        },
        async verificarCedula() {
            try {
                const data = await buscarPorCedulaAyudanteFachada(this.cedulaSolicitud);
                this.cedulaRegistrada = data.cedula;
                this.cedulaRegistrada = true;
            } catch {
                this.cedulaRegistrada = false;
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
        async actualizarPrestamo() {
            this.codigoBienes = this.almacenarBienes();
            const log = sessionStorage.getItem("user");
            let data;
            if (this.prestamoAyudante) {
                data = {
                    devuelto: this.devuelto,
                    idCartaCompromiso: this.idCartaCompromiso,
                    codigoBienes: this.codigoBienes,
                    cedulaReceptor: log,
                    cedulaPrestador: this.prestamo.cedulaPrestador
                }
            } else if (this.prestamoDocente) {
                data = {
                    devuelto: this.devuelto,
                    cedulaDocente: this.cedulaSolicitudDocente,
                    cedulaReceptor: log,
                    codigoBienes: this.codigoBienes,
                    cedulaPrestador: this.prestamo.cedulaPrestador
                }
            }
            console.log(data);

            if (this.verificarCampos()) {
                const registro = await actualizarPrestamoFachada(data, this.id);
                if (registro) {
                    alert("Se realizo el prestamo de forma exitosa.");
                    await this.redirigirAListaPrestamos();
                } else {
                    alert("Parece que hubo un problema al intentar el prestamo.")
                }
            } else {
                alert("Asegúrese de llenar todos los campos.")
            }

        },
        verificarCampos() {
            try {
                if ((this.idCartaCompromiso != "" || this.cedulaSolicitudDocente != "") &&
                    this.codigoBienes.length != 0
                ) {
                    return true;
                }
                return false;
            } catch {
                return false;
            }
        },
        async redirigirAError() {
            const ruta = `/error`;
            await router.push({ path: ruta });
        },
        async redirigirAListaPrestamos() {
            const ruta = `/prestamos`;
            await router.push({ path: ruta });
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
    },
    watch: {
        cedulaSolicitud() {
            if (this.cedulaSolicitud.length == 10) {
                this.verificarCedula();
            }
        },
        async buscarProyectores() {
            if (this.buscarProyectores && this.proyectores.length == 0) {
                const data = await this.buscarBienes("P");
                this.proyectores = data;

                try {
                    const bien = await this.buscarBienTipo("P");
                    if (bien) {
                        this.proyector = bien.codigo;
                    }
                } catch { }

                if (this.proyectores.length == 0) {
                    alert("ERROR! No hay proyectores disponibles.");
                    this.buscarProyectores = false;
                }
            }
        },
        async buscarCablesPoder() {
            if (this.buscarCablesPoder && this.cablesPoder.length == 0) {
                const data = await this.buscarBienes("CP");
                this.cablesPoder = data;

                try {
                    const bien = await this.buscarBienTipo("CP");
                    if (bien) {
                        this.cablePoder = bien.codigo;
                    }
                } catch { }

                if (this.cablesPoder.length == 0) {
                    alert("ERROR! No hay cables de poder disponibles.");
                    this.buscarCablesPoder = false;
                }
            }
        },
        async buscarcablesHDMI() {
            if (this.buscarcablesHDMI && this.cablesHDMI.length == 0) {
                const data = await this.buscarBienes("H");
                this.cablesHDMI = data;

                try {
                    const bien = await this.buscarBienTipo("H");
                    if (bien) {
                        this.cableHDMI = bien.codigo;
                    }
                } catch { }

                if (this.cablesHDMI.length == 0) {
                    alert("ERROR! No hay cables HDMI disponibles.");
                    this.buscarcablesHDMI = false;
                }
            }
        },
        async buscarAdaptador() {
            if (this.buscarAdaptador && this.adaptadores.length == 0) {
                const data = await this.buscarBienes("AD");
                this.adaptadores = data;

                try {
                    const bien = await this.buscarBienTipo("AD");
                    if (bien) {
                        this.adaptador = bien.codigo;
                    }
                } catch { }

                if (this.adaptadores.length == 0) {
                    alert("ERROR! No hay adaptadores disponibles.");
                    this.buscarAdaptador = false;
                }
            }
        },
        async buscarParlantes() {
            if (this.buscarParlantes && this.parlantes.length == 0) {
                const data = await this.buscarBienes("PA");
                this.parlantes = data;

                try {
                    const bien = await this.buscarBienTipo("PA");
                    if (bien) {
                        this.parlante = bien.codigo;
                    }
                } catch { }

                if (this.parlantes.length == 0) {
                    alert("ERROR! No hay parlantes disponibles.");
                    this.buscarParlantes = false;
                }
            }
        },
        async buscarCablesVGA() {
            if (this.buscarCablesVGA && this.cablesVGA.length == 0) {
                const data = await this.buscarBienes("V");
                this.cablesVGA = data;

                try {
                    const bien = await this.buscarBienTipo("V");
                    if (bien) {
                        this.cableVGA = bien.codigo;
                    }
                } catch { }

                if (this.cablesVGA.length == 0) {
                    alert("ERROR! No hay cables VGA disponibles.");
                    this.buscarCablesVGA = false;
                }
            }
        },
        async buscarExtensiones() {
            if (this.buscarExtensiones && this.extensiones.length == 0) {
                const data = await this.buscarBienes("E");
                this.extensiones = data;

                try {
                    const bien = await this.buscarBienTipo("E");
                    if (bien) {
                        this.extension = bien.codigo;
                    }
                } catch { }

                if (this.extensiones.length == 0) {
                    alert("ERROR! No hay extensiones disponibles.");
                    this.buscarExtensiones = false;
                }
            }
        },
        async buscarCortapicos() {
            if (this.buscarCortapicos && this.cortapicos.length == 0) {
                const data = await this.buscarBienes("C");
                this.cortapicos = data;

                try {
                    const bien = await this.buscarBienTipo("C");
                    if (bien) {
                        this.cortapico = bien.codigo;
                    }
                } catch { }

                if (this.cortapicos.length == 0) {
                    alert("ERROR! No hay cortapicos disponibles.");
                    this.buscarCortapicos = false;
                }
            }
        }
    }
}
</script>

<style scoped>
.contenedor {
    align-items: center;
    justify-content: center;
    margin-top: 2%;
}

.formulario {
    width: 50%;
    margin-left: 25%;
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