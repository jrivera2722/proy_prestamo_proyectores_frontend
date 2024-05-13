<template>
        <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #3E78B2;">
        <div class="container-fluid">
            <router-link class="nav-link active" aria-current="page" to="/"><img src="../assets/logo_uce.png"
                    alt="no se puede mostrar la imagen" /></router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" @click="entryClose()"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation" style="background-color: #153243;">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent" v-show="show">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li @click="closeNav()"><router-link class="nav-link active" aria-current="page" to="/ayudantes"> Ayudantes </router-link></li>
                    <li @click="closeNav()"><router-link class="nav-link active" aria-current="page" to="/docentes"> Docentes </router-link></li>
                    <li @click="closeNav()"><router-link class="nav-link active" aria-current="page" to="/prestadores"> Prestadores </router-link></li>
                    <li @click="closeNav()"><router-link class="nav-link active" aria-current="page" to="/bienes"> Bienes </router-link></li>
                    <li @click="closeNav()"><router-link class="nav-link active" aria-current="page" to="/cartasCompromiso"> Cartas de Compromiso </router-link></li>
                    <li @click="closeNav()"><router-link class="nav-link active" aria-current="page" to="/prestamos"> Prestamos </router-link></li>
                    <li @click="closeNav()"><router-link class="nav-link active" aria-current="page" to="/registro"> Registros </router-link></li>
                </ul>
            </div>
        </div>
    </nav>    
</template>

<script>
export default {

    data(){
        return {
            show : false,
        }
    },

    methods:{
        entryClose(){
            this.show = true;
        },
        closeNav(){
            this.show = false;
        },
    },
}
</script>

<style scoped>

nav {
    margin-top: -60px;
    font-weight: bold;
    width: 100%;
    height: 70px;
}

img {
    width: 50px;
    height: 50px;
}

li {
    color: black;
}

li:hover {
    color: black;
}

.nav-link {
    border-radius: 20px;
    margin-left: 5px;
    background: #6999db;
}

.navbar-nav .nav-link:hover {
    background-color: white;
    color: black;
}
</style>