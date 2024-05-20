<template>
  <div class="container">
    <div>
      <div class="formulario">
        <h1>Actualizar Prestador</h1>
        <div class="form-floating">
          <input id="cedInput" type="text" v-model="cedula" maxlength="10" class="form-control" placeholder="XXXXXXXXXX"
            @input="restrictInput" :disabled="admin" />
          <label for="cedInput">Cédula</label>
        </div>
        <div class="form-floating">
          <input id="nomInput" type="text" v-model="nombre" class="form-control" placeholder="XXXXXXXXXX"
            @input="mayusculas" />
          <label for="nomInput">Nombre</label>
        </div>
        <div class="btn-group" style="margin-top: 1%;">
          <input id="admInput" type="checkbox" v-model="administrador" class="btn-check" />
          <label class="btn btn-outline-secondary" for="admInput">Administrador</label>
        </div>
        <div class="form-floating">
          <input id="pasInput" type="password" v-model="password" class="form-control" placeholder="XXXXXXXXXX" />
          <label for="pasInput">Contraseña</label>
        </div>
        <div class="form-floating">
          <input id="newPasInput" type="password" v-model="newPassword" class="form-control" placeholder="XXXXXXXXXX" />
          <label for="newPasInputF">Nueva contraseña</label>
        </div>
        <div>
          <button class="btn btn-dark" @click="actualizarPrestador">Editar</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import router from "@/router/router";
import {
  actualizarPrestadorFachada,
  buscarPorCedulaPrestadorFachada
} from "../helpers/PrestadorCliente";

export default {
  data() {
    return {
      cedula: this.$route.params.cedula,
      nombre: "",
      password: "",
      newPassword: "",
      salt: "",
      administrador: false,
      admin:true
    };
  },
  mounted() {
    this.consultarAdmin();
    this.buscarPrestador();
  },
  methods: {
    async actualizarPrestador() {
      const data = {
        cedula: this.cedula,
        nombre: this.nombre,
        password: this.password,
        newPassword: this.newPassword,
        administrador: this.administrador
      };
      try {
        if (this.verificarCampos()) {
          const registro = await actualizarPrestadorFachada(data, this.cedula);
          if (registro) {
            alert("Actualización de prestador exitoso");
            this.redirigirPrestador();
          } else {
            alert("Existen campos vacios.");
          }
        }
      } catch {
        alert("No se pudo actualizar");
      }
    },
    async buscarPrestador() {
      let prestador;
      try {
        prestador = await buscarPorCedulaPrestadorFachada(this.cedula);
      } catch {
        this.redirigirAError();
        return;
      }
      this.cedula = prestador.cedula;
      this.nombre = prestador.nombre;
      this.password = prestador.password;
      this.salt = prestador.salt;
      this.administrador = prestador.administrador;
    },
    async redirigirPrestador() {
      const ruta = `/prestadores`;
      await router.push({ path: ruta });
    },
    async redirigirAError() {
      const ruta = `/error`;
      await router.push({ path: ruta });
    },
    verificarCampos() {
      try {
        if (this.cedula.length === 10
          && this.nombre.trim() != ""
          && this.password != ""
          && this.newPassword != ""
          && this.salt != "") {
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
    },
    restrictInput(event) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    },
    async consultarAdmin() {
      const user = sessionStorage.getItem("user");
      const data = await buscarPorCedulaPrestadorFachada(user);
      this.admin=!data.administrador;
    },
    mayusculas() {
      this.nombre = this.nombre.toUpperCase();
    },
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