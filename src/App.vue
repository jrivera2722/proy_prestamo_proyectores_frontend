<template>
  <div v-if="login" class="contenedor">
    <NavBar />
    <router-view></router-view>

    <div class="logout">
      <button @click="log_out" class="btn btn-danger">Cerrar Sesión</button>
    </div>
  </div>
  <div v-else>
    <nav class="navLogin">
      <img src="./assets/logo_uce.png" alt="">
      <h1>Sistema de Préstamos</h1>
    </nav>
    <div class="contenedorLogin">
      <div>
        <h1>Ingresa tu cédula y contraseña</h1>
        <div class="form-floating">
          <input type="text" id="inpUser" v-model="cedula" class="form-control" maxlength="10" placeholder="XXXXXXXXXX">
          <label for="inpUser">Usuario</label>
        </div>
        <div class="form-floating">
          <input type="password" id="inpPass" v-model="password" class="form-control" placeholder="********">
          <label for="inpPass">Contraseña</label>
        </div>
      </div>
      <button type="button" class="btn btn-outline-secondary" @click="log_in">
        Iniciar Sesión
      </button>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import router from "@/router/router";

import { loginPrestadorFachada } from './modules/prestador/helpers/PrestadorCliente';


export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      login: false,
      cedula: "",
      password: ""
    }
  },
  methods: {
    async log_in() {
      const data = {
        cedula: this.cedula,
        password: this.password,
      };

      try {
        const login = await loginPrestadorFachada(data);
        this.login = login;
        this.redirigirAHome();
      } catch { }

      if (!this.login) {
        alert("Usuario y contraseña incorrectos");
      } else {
        sessionStorage.setItem("user", this.cedula);
        sessionStorage.setItem("login", this.login);
        this.reiniciar();
      }
    },
    log_out() {
      this.login = false;
      sessionStorage.setItem("user", null);
      sessionStorage.setItem("login", this.login);
    },
    reiniciar() {
      this.cedula = "";
      this.password = "";
    },
    async redirigirAHome() {
      const ruta = `/`;
      await router.push({ path: ruta });
    },
  },
  mounted() {
    const log = sessionStorage.getItem("login");
    if (log == "false" || log == null) {
      this.login = false;
    } else {
      this.login = true;
    }
  },
};
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #6999db;
}

.logout {
  position: absolute;
  top: 4px;
  right: 10px;
  padding: 10px;

}

.contenedorLogin {
  width: 60%;
  margin-left: 20%;
  margin-top: 124px;
}

.contenedorLogin div input {
  margin-bottom: 10px;
}

.contenedorLogin button {
  padding: 5px 10px;
  font-weight: bold;
}

.contenedorLogin div label {
  color: #3E78B2;
  font-weight: bold;
}

.contenedorLogin h1 {
  font-size: 25px;
  margin-bottom: 20px;
  
}

.navLogin {
  position: absolute;
  top: 0;
  width: 100%;
  height: 65px;
  margin-left: 0;
  background: #3E78B2;
}

.navLogin img {
  position: absolute;
  left: 5px;
  height: 65px;
  padding: 5px;
  
}

.navLogin h1 {
  margin-top: 10px;
  color: white;
  font-weight: bold;
  
}

@media screen and (max-width: 991px) {
  .logout {
    right: 80px;
  }
}
</style>
