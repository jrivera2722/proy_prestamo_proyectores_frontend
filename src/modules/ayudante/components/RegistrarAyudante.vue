<template>
  <div class="container">
    <div>
      <div class="formulario">
        <h1>Registro de Ayudantes</h1>
        <div class="form-floating">
          <input id="cedInput" type="text" v-model="cedula" class="form-control" maxlength="10" @input="restrictInput" placeholder="XXXXXXXXXX"/>
          <label for="cedInput">Cédula</label>
        </div>
        <div class="form-floating">
          <input id="nomInput" type="text" v-model="nombre" class="form-control" placeholder="XXXXXXXXXX"/>
          <label for="nomInput">Nombre</label>
        </div>
        <div class="form-floating">
          <input id="numInput" type="text" v-model="telefono" class="form-control" maxlength="10" @input="restrictInput" placeholder="XXXXXXXXXX"/>
          <label for="numInput">Teléfono</label>
        </div>
        <div>
          <button class="btn btn-outline-secondary" 
          @click="registrarAyudante"
          style="margin-bottom: 1%">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  guardarAyudanteFachada,
  buscarPorCedulaAyudanteFachada
} from "../helpers/AyudanteCliente";
export default {
  data() {
    return {
      cedula: "",
      nombre: "",
      telefono:""
    };
  },
  methods: {
    async registrarAyudante() {
      const data = {
        cedula: this.cedula,
        nombre: this.nombre,
        telefono:this.telefono
      };
      if (this.verificarCampos()) {
        try {
          await buscarPorCedulaAyudanteFachada(this.cedula);
          alert("Ya existe un ayudante con esa cédula.");
        } catch {
          const registro = await guardarAyudanteFachada(data);
          if (registro) {
            this.limpiarCampos();
            alert("Registro de ayudante exitoso");
          } else {
            alert("Parece que hubo un problema registrando a ese ayudante.");
          }
        }
      } else {
        if (this.cedula.length < 10 && this.nombre != "" && this.telefono!="") {
          alert("Ingrese un número de cédula válido.");
        } else alert("Asegúrese de llenar todos los campos.");
      }
    },
    verificarCampos() {
      try {
        if (this.cedula.length === 10 && this.nombre.trim() != "" && this.telefono.trim() !="") {
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
      this.telefono="";
    },
    restrictInput(event) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
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