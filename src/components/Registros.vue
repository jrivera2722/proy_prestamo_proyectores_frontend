<template>
  <div class="container">
    <div>
      <div
        class="btn-group"
        role="group"
        aria-label="Basic checkbox toggle button group"
        style="margin-top: 2.5%"
      >
        <input
          class="btn-check"
          id="inpAyudante"
          type="checkbox"
          v-model="registroAyudante"
          @click="toggleCheckboxes(1)"
        />
        <label class="btn btn-outline-primary" for="inpAyudante"
          >Ayudante</label
        >

        <input
          class="btn-check"
          id="inpDocente"
          type="checkbox"
          v-model="registroDocente"
          @click="toggleCheckboxes(2)"
        />
        <label class="btn btn-outline-primary" for="inpDocente">Docente</label>

        <input
          class="btn-check"
          id="inpPrestador"
          type="checkbox"
          v-model="registroPrestador"
          @click="toggleCheckboxes(3)"
        />
        <label class="btn btn-outline-primary" for="inpPrestador"
          >Prestador</label
        >

        <input
          class="btn-check"
          id="inpBien"
          type="checkbox"
          v-model="registroBien"
          @click="toggleCheckboxes(5)"
          disabled
        />
        <label class="btn btn-outline-primary" for="inpBien" >Bien</label>

        <input
          class="btn-check"
          id="inpCartaCompromiso"
          type="checkbox"
          v-model="registroCartaCompromiso"
          @click="toggleCheckboxes(4)"
        />
        <label class="btn btn-outline-primary" for="inpCartaCompromiso"
          >Carta de Compromiso</label
        >

        <input
          class="btn-check"
          id="inpPrestamo"
          type="checkbox"
          v-model="registroPrestamo"
          @click="toggleCheckboxes(6)"
        />
        <label class="btn btn-outline-primary" for="inpPrestamo"
          >Prestamo</label
        >
      </div>

      <RegistrarAyudante v-if="registroAyudante" />
      <RegistrarDocente v-if="registroDocente" />
      <RegistrarPrestador v-if="registroPrestador" />
      <RegistrarBien v-if="registroBien" />
      <RegistroCartaCompromiso v-if="registroCartaCompromiso" />
      <RegistrarPrestamo v-if="registroPrestamo" />
    </div>
  </div>
</template>

<script>
import RegistrarAyudante from "@/modules/ayudante/components/RegistrarAyudante.vue";
import RegistrarBien from "@/modules/bien/components/RegistrarBien.vue";
import RegistroCartaCompromiso from "@/modules/cartaCompromiso/components/RegistroCartaCompromiso.vue";
import RegistrarDocente from "@/modules/docente/components/RegistrarDocente.vue";
import RegistrarPrestador from "@/modules/prestador/components/RegistrarPrestador.vue";
import RegistrarPrestamo from "@/modules/prestamo/components/RegistrarPrestamo.vue";

export default {
  components: {
    RegistrarAyudante,
    RegistrarBien,
    RegistroCartaCompromiso,
    RegistrarDocente,
    RegistrarPrestador,
    RegistrarPrestamo,
  },
  data() {
    return {
      registroAyudante: true,
      registroDocente: false,
      registroPrestador: false,
      registroCartaCompromiso: false,
      registroBien: false,
      registroPrestamo: false,
    };
  },
  methods: {
    toggleCheckboxes(opcion) {
      switch (opcion) {
        case 1:
          this.registroDocente = false;
          this.registroPrestador = false;
          this.registroCartaCompromiso = false;
          this.registroBien = false;
          this.registroPrestamo = false;
          break;
        case 2:
          this.registroAyudante = false;
          this.registroPrestador = false;
          this.registroCartaCompromiso = false;
          this.registroBien = false;
          this.registroPrestamo = false;
          break;
        case 3:
          this.registroDocente = false;
          this.registroAyudante = false;
          this.registroCartaCompromiso = false;
          this.registroBien = false;
          this.registroPrestamo = false;
          break;
        case 4:
          this.registroDocente = false;
          this.registroPrestador = false;
          this.registroAyudante = false;
          this.registroBien = false;
          this.registroPrestamo = false;
          break;
        case 5:
          this.registroDocente = false;
          this.registroPrestador = false;
          this.registroCartaCompromiso = false;
          this.registroAyudante = false;
          this.registroPrestamo = false;
          break;
        case 6:
          this.registroDocente = false;
          this.registroPrestador = false;
          this.registroCartaCompromiso = false;
          this.registroAyudante = false;
          this.registroBien = false;
          break;
      }
    },
  },
};
</script>

<style scoped>

.container {
  margin-top: 2%;
  height: calc(115vh);
  overflow-y: hidden;
  /* background-color: #6999db; */
}

.btn-group{
  background: #f5f6f7;
}

label {
  font-weight: bold;
}
</style>