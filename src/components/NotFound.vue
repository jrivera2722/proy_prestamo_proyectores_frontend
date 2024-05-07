<template>
    <div class="container">
        <div class="formulario">
            <h1>ERROR 404</h1>
            <h2>La página que buscas no existe</h2>
            <img src="../assets/404.png" alt="No se puede mostrar la imagen">
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
    align-items: center;
    justify-content: center;
    margin-top: 4%;
}

.formulario {
    width: 60%;
    margin-left: 20%;
}

h1 {
    font-size: 40px;
    color: #3E78B2;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

h2 {
    font-size: 30px;
    font-style: italic;
    margin-bottom: 40px;
}

img {
    border-radius: 20px;
    height: 400px;
    box-shadow: gray 6px 10px 6px 0px;
}
</style>