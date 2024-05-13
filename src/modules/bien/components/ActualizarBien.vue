<template>
    <div class="container">
        <div>
            <div class="formulario">
                <h1>Actualizar Bien</h1>
                <div class="form-floating">
                    <input id="codInput" type="text" v-model="codigo" 
                    class="form-control" placeholder="XXXXXXXXXX" :disabled="admin">
                    <label for="codInput">Código</label>
                </div>
                <div class="form-floating">
                    <input id="nomInput" type="text" v-model="nombre" class="form-control" placeholder="XXXXXXXXXX">
                    <label for="nomInput">Nombre</label>
                </div>
                <div class="form-floating">
                    <input id="numSerInput" type="text" v-model="numSerie" class="form-control"
                        placeholder="XXXXXXXXXX" :disabled="admin">
                    <label for="numSerInput">Número de Serie</label>
                </div>
                <div class="form-floating">
                    <select name="estInput" id="estInput" v-model="estado" class="form-control"
                        placeholder="XXXXXXXXXX">
                        <option v-for="opcion in opcionesEstado" :key="opcion" :value="opcion">{{ opcion }}</option>
                    </select>
                    <label for="estInput">Estado</label>
                </div>
                <div class="form-floating">
                    <select name="tipInput" id="tipInput" v-model="tipo" class="form-control" placeholder="XXXXXXXXXX">
                        <option v-for="opcion in opcionesTipo" :key="opcion" :value="opcion">{{ opcion }}</option>
                    </select>
                    <label for="tipInput">Tipo</label>
                </div>
                <button class="btn btn-dark" @click="actualizarBien">Actualizar</button>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router/router";
import { buscarPorCedulaPrestadorFachada } from "@/modules/prestador/helpers/PrestadorCliente";
import { actualizarBienPorIDFachada, buscarPorIdBienFachada }
    from '../helpers/BienCliente';

export default {
    data() {
        return {
            id:this.$route.params.id,
            codigo: "",
            nombre: "",
            numSerie: "",
            estado: "",
            disponible: false,
            tipo: "",
            opcionesEstado: ["Buena", "Regular", "Mala", "De baja", "Chatarrización"],
            opcionesTipo: ["Proyector", "Cable HDMI"
            , "Cable VGA", "Extensión"
            , "Cortapicos","Parlantes"
            ,"Adaptador", "Cable de Poder"
            , "Otros"],
            admin:true
        }
    },
    mounted() {
        this.consultarAdmin();
        this.buscarBien();
    },
    methods: {
        async actualizarBien() {
            const data = {
                codigo: this.codigo,
                nombre: this.nombre,
                numSerie: this.numSerie,
                estado: this.estado,
                disponible:this.disponible,
                tipo: this.cambiarTipo(this.tipo)
            };
            try {
                if (this.verificarCampos()) {
                    const registro = await actualizarBienPorIDFachada(data, this.id);
                    if (registro) {
                        alert("Actualización de bien exitoso");
                        this.redirigirAVerBien();
                    } else {
                        alert("Existen campos vacios.");
                    }
                }
            } catch {
                alert("No se pudo actualizar");
            }

        },
        async buscarBien() {
            let bien;
            try {
                bien = await buscarPorIdBienFachada(this.id);
            } catch {
                this.redirigirAError();
                return;
            }
            this.codigo = bien.codigo;
            this.nombre = bien.nombre;
            this.numSerie = bien.numSerie;
            this.estado = bien.estado;
            this.disponible=bien.disponible;
            this.tipo = this.cambiarTipoATexto(bien.tipo);
        },
        async redirigirAVerBien() {
            const ruta = `/bienes`;
            await router.push({ path: ruta });
        },
        async redirigirAError() {
            const ruta = `/error`;
            await router.push({ path: ruta });
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
        async consultarAdmin() {
            const user = sessionStorage.getItem("user");
            const data = await buscarPorCedulaPrestadorFachada(user);
            this.admin=!data.administrador;
        }
    }
};
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