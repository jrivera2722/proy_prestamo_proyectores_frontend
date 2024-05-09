<template>
  <div class="container">
    <div>
      <div class="formulario">
        <h1>Actualizar Docente</h1>
        <div class="form-floating">
          <input id="cedInput" type="text" v-model="cedula" maxlength="10" class="form-control" placeholder="XXXXXXXXXX"
            @input="restrictInput" :disabled="admin">
          <label for="cedInput">Cédula</label>
        </div>
        <div class="form-floating">
          <input id="nomInput" type="text" v-model="nombre" class="form-control" placeholder="XXXXXXXXXX">
          <label for="nomInput">Nombre</label>
        </div>
        <button class="btn btn-dark" @click="actualizarDocente">Editar</button>
      </div>
    </div>
  </div>
</template>


<script>
import router from "@/router/router";
import { buscarPorCedulaPrestadorFachada } from "@/modules/prestador/helpers/PrestadorCliente";
import { actualizarDocenteFachada, buscarPorCedulaDocenteFachada }
  from '../helpers/DocenteCliente'


export default {
  data() {
    return {
      cedula: this.$route.params.cedula,
      nombre: "",
      admin:true
    }

  },
  mounted() {
    this.consultarAdmin();
    this.buscarDocente();
  },
  methods: {
    async actualizarDocente() {
      const data = {
        cedula: this.cedula,
        nombre: this.nombre
      }
      try {
        if (this.verificarCampos()) {
          const registro = await actualizarDocenteFachada(data, this.cedula);
          if (registro) {
            alert("Actualización de docente exitoso");
            this.redirigirDocente();
          } else {
            alert("Existen campos vacios.");
          }
        }
      } catch {
        alert("No se pudo actualizar");
      }

    },
    async buscarDocente() {
      let docente;
      try {
        docente = await buscarPorCedulaDocenteFachada(this.cedula);
      } catch {
        this.redirigirAError();
        return;
      }
      this.cedula = docente.cedula;
      this.nombre = docente.nombre;
    },
    async redirigirDocente() {
      const ruta = `/docentes`;
      await router.push({ path: ruta });
    },
    verificarCampos() {
      try {
        if (this.cedula.length === 10 && this.nombre.trim() != "") {
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
    limpiarCampos() {
      this.cedula = "";
      this.nombre = "";
    },
    restrictInput(event) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
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