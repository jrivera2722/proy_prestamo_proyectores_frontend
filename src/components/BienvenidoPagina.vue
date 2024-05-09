<template>
  <div class="contenedor-externo">
    <div class="contenedor">
      <h1>
        Bienvenido, {{ nombreUsuario }} <br />
        al Sistema de Prestamo de Proyectores
      </h1>
    </div>
  <Footer></Footer>
  </div>
</template>

<script>
import { buscarPorCedulaPrestadorFachada } from "@/modules/prestador/helpers/PrestadorCliente";
import Footer from "./Footer.vue";

export default {
  components: {
    Footer,
  },
  data() {
    return {
      nombreUsuario: "",
    };
  },
  methods: {
    async consultarNombre() {
      const user = sessionStorage.getItem("user");
      const data = await buscarPorCedulaPrestadorFachada(user);
      this.nombreUsuario = data.nombre;
    },
  },
  mounted() {
    this.consultarNombre();
  },
};
</script>

<style scoped>
.contenedor-externo {
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
}
.contenedor {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1d3557;
  color: white;
  text-align: center;
}

</style>