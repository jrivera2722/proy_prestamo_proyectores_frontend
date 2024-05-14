<template>
    <div class="container">
        <div>
            <div class="formulario">
                <h1>Actualización de Ayudante</h1>
                <div class="form-floating">
                    <input id="cedInput" type="text" v-model="cedula" maxlength="10" @input="restrictInput"
                        class="form-control" placeholder="XXXXXXXXXX" :disabled="admin" />
                    <label for="cedInput">Cédula</label>
                </div>
                <div class="form-floating">
                    <input id="nomInput" type="text" v-model="nombre" class="form-control" placeholder="XXXXXXXXXX"
                        @input="mayusculas" />
                    <label for="nomInput">Nombre</label>
                </div>
                <div class="form-floating">
                    <input id="numInput" type="text" v-model="telefono" class="form-control" placeholder="XXXXXXXXXX" />
                    <label for="numInput">Teléfono</label>
                </div>
                <button class="btn btn-dark" @click="actualizarAyudante">Actualizar</button>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router/router";
import { buscarPorCedulaPrestadorFachada } from "@/modules/prestador/helpers/PrestadorCliente";
import {
    actualizarAyudanteFachada,
    buscarPorCedulaAyudanteFachada
} from "../helpers/AyudanteCliente";
export default {
    data() {
        return {
            cedula: this.$route.params.cedula,
            telefono: "",
            nombre: "",
            admin:true
        };
    },
    mounted() {
        this.consultarAdmin();
        this.buscarAyudante();
    },
    methods: {
        async actualizarAyudante() {
            const data = {
                cedula: this.cedula,
                nombre: this.nombre,
                telefono: this.telefono
            };
            try {
                if (this.verificarCampos()) {
                    const registro = await actualizarAyudanteFachada(data, this.cedula);
                    if (registro) {
                        alert("Actualización de ayudante exitoso");
                        this.redirigirAVerAyudantes();
                    } else {
                        alert("Existen campos vacios.");
                    }
                }
            } catch {
                alert("No se pudo actualizar");
            }

        },
        async buscarAyudante() {
            let ayudante;
            try {
                ayudante = await buscarPorCedulaAyudanteFachada(this.cedula);
            } catch {
                this.redirigirAError();
                return;
            }
            this.cedula = ayudante.cedula;
            this.nombre = ayudante.nombre;
            this.telefono = ayudante.telefono;
        },
        async redirigirAVerAyudantes() {
            const ruta = `/ayudantes`;
            await router.push({ path: ruta });
        },
        async redirigirAError() {
            const ruta = `/error`;
            await router.push({ path: ruta });
        },
        verificarCampos() {
            try {
                if (this.cedula.length === 10 && this.nombre.trim() != ""
                    && this.telefono.length === 10) {
                    return true;
                }
                return false;
            } catch {
                return false;
            }
        },
        limpiarCampos() {
            this.cedula = "";
            this.nombre = "";
            this.telefono = "";
        },
        restrictInput(event) {
            event.target.value = event.target.value.replace(/[^0-9]/g, '');
        },
        mayusculas(event) {
            event.target.value = event.target.value.toUpperCase();
        },
        async consultarAdmin() {
            const user = sessionStorage.getItem("user");
            const data = await buscarPorCedulaPrestadorFachada(user);
            this.admin = !data.administrador;
        }
    },
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