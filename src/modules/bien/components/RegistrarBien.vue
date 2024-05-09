<template>
    <div class="container">
        <div>
            <div class="formulario">
                <h1>Registro de Bienes</h1>
                <div class="form-floating">
                    <input id="codInput" type="text" v-model="codigo" class="form-control" placeholder="XXXXXXXXXX">
                    <label for="codInput">Código</label>
                </div>
                <div class="form-floating">
                    <input id="nomInput" type="text" v-model="nombre" class="form-control" placeholder="XXXXXXXXXX">
                    <label for="nomInput">Nombre</label>
                </div>
                <div class="form-floating">
                    <input id="numSerInput" type="text" v-model="numSerie" class="form-control"
                        placeholder="XXXXXXXXXX">
                    <label for="numSerInput">Número de Serie</label>
                </div>
                <div class="form-floating">
                    <select name="estInput" id="estInput" v-model="estado" class="form-control" placeholder="Bueno">
                        <option v-for="opcion in opcionesEstado" :key="opcion" :value="opcion">{{ opcion }}</option>
                    </select>
                    <label style="color: #462255;" for="estInput">Estado</label>
                </div>
                <div class="form-floating">
                    <select name="tipInput" id="tipInput" v-model="tipo" class="form-control" placeholder="Proyector">
                        <option v-for="opcion in opcionesTipo" :key="opcion" :value="opcion">{{ opcion }}</option>
                    </select>
                    <label style="color: #462255;" for="tipInput">Tipo</label>
                </div>
                <div>
                    <button class="btn btn-outline-secondary" @click="registrarBien"
                        style="margin-bottom: 1%">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { guardarBienFachada, buscarPorCodigoBienFachada } from '../helpers/BienCliente';

export default {
    data() {
        return {
            codigo: "",
            nombre: "",
            numSerie: "",
            estado: "",
            disponible: false,
            tipo: "",
            opcionesEstado: ["Bueno", "Regular", "De baja", "Chatarrización"],
            opcionesTipo:
                [
                    "Proyector",
                    "Cable de Poder",
                    "Cable HDMI",
                    "Adaptador",
                    "Parlantes",
                    "Cable VGA",
                    "Extensión",
                    "Cortapicos"
                ]
        }
    },
    methods: {
        async registrarBien() {
            const data = {
                codigo: this.codigo,
                nombre: this.nombre,
                numSerie: this.numSerie,
                estado: this.estado,
                tipo: this.cambiarTipo(this.tipo)
            }

            if (this.verificarCampos()) {
                try {
                    await buscarPorCodigoBienFachada(this.codigo);
                    alert("Ya existe un bien con ese código.");
                } catch {
                    const registro = await guardarBienFachada(data);
                    if (registro) {
                        this.limpiarCampos();
                        alert("Registro de bien exitoso");
                    } else {
                        alert("Parece que hubo un problema registrando este bien.");
                    }
                }
            } else {
                alert("Asegúrese de llenar todos los campos.");
            }
        },
        verificarCampos() {
            try {
                if (this.codigo.trim() != "" &&
                    this.nombre.trim() != "" &&
                    this.numSerie.trim() != "" &&
                    this.estado.trim() != "" &&
                    this.tipo.trim() != ""
                ) {
                    return true;
                }
                return false;
            } catch {
                return false;
            }
        },
        limpiarCampos() {
            this.codigo = "";
            this.nombre = "";
            this.numSerie = "";
            this.estado = "";
            this.tipo = "";
        },
        cambiarTipo(tipo) {
            if (tipo !== "") {
                switch (tipo) {
                    case "Proyector":
                        return "P";
                    case "Cable HDMI":
                        return "H";
                    case "Cable VGA":
                        return "V";
                    case "Extensión":
                        return "E";
                    case "Cortapicos":
                        return "C";
                    case "Parlantes":
                        return "PA";
                    case "Adaptador":
                        return "AD";
                    case "Cable de Poder":
                        return "CP";
                    default:
                        return;
                }
            }
        }
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
    font-family: Georgia, 'Times New Roman', Times, serif;
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
    color: black;
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