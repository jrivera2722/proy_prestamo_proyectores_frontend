import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: "/",
        component: () => import("../components/BienvenidoPagina.vue")
    },
    //PATH Ayudante
    {
        path: "/ayudantes",
        component: () => import("../modules/ayudante/components/ListaAyudantes.vue")
    },
    {
        path: "/ayudantes/actualizar/:cedula",
        component: () => import("../modules/ayudante/components/ActualizarAyudante.vue")
    },
    //PATH Bienes
    {
        path: "/bienes",
        component: () => import("../modules/bien/components/ListaBienes.vue")
    },
    {
        path: "/bienes/actualizar/:id",
        component: () => import("../modules/bien/components/ActualizarBien.vue")
    },
    //PATH Carta de compromiso
    {
        path: "/cartasCompromiso/actualizar/:id",
        component: () => import("../modules/cartaCompromiso/components/ActualizarCartaCompromiso.vue")
    },
    {
        path: "/cartasCompromiso",
        component: () => import("../modules/cartaCompromiso/components/ListaCartasCompromiso.vue")
    },
    //PATH Docente
    {
        path: "/docentes",
        component: () => import("../modules/docente/components/ListaDocentes.vue")
    },
    {
        path: "/docentes/actualizar/:cedula",
        component: () => import("../modules/docente/components/ActualizarDocente.vue")
    },
    //PATH Prestadores
    {
        path: "/prestadores",
        component: () => import("../modules/prestador/components/ListaPrestadores.vue")
    },
    {
        path: "/prestadores/actualizar/:cedula",
        component: () => import("../modules/prestador/components/ActualizarPrestadores.vue")
    },
    //PATH Prestamo
    {
        path: "/prestamos",
        component: () => import("../modules/prestamo/components/ListaPrestamos.vue")
    },
    {
        path: "/prestamos/actualizar/:id",
        component: () => import("../modules/prestamo/components/ActualizarPrestamos.vue")
    },
    {
        path: "/prestamos/registro",
        component: () => import("../modules/prestamo/components/RegistrarPrestamo.vue")
    },
    //PATH Registro
    {
        path: "/registro",
        component: () => import("../components/Registros.vue")
    },
    // PATH Error
    {
        path: "/:pathMatch(.*)*",
        component: () => import("../components/NotFound.vue")
    },
    /*{
        path: "/ayudante/:cedula",
        component: () => import("../modules/ayudante/components/ListaAyudantes.vue")
    },
    {
        path: "/bienes/:codigo",
        component: () => import("../modules/bien/components/ListaBienes.vue")
    },
    {
        path: "/cartasCompromiso/:id",
        component: () => import("../modules/cartaCompromiso/components/ListaCartasCompromiso.vue")
    },
    {
        path: "/docentes/:cedula",
        component: () => import("../modules/docente/components/ListaDocentes.vue")
    },
    {
        path: "/prestadores/:cedula",
        component: () => import("../modules/prestador/components/ListaPrestadores.vue")
    },
    {
        path: "/prestamos/:id",
        component: () => import("../modules/prestamo/components/ListaPrestamos.vue")
    },
    {
        path: "/bienes/:codigo",
        component: () => import("../modules/components/InformacionBien.vue")
    },
    {
        path: "/bienes/registro",
        component: () => import("../modules/components/RegistrarBien.vue")
    },
    {
        path: "/responsables",
        component: () => import("../modules/components/MostrarResponsables.vue")
    },
    {
        path: "/responsables/:cedulaRuc",
        component: () => import("../modules/components/InformacionResponsable.vue"),
    },
    {
        path: "/responsables/registro",
        component: () => import("../modules/components/IngresarResponsable.vue")
    },
    {
        path: "/responsables/actualizar/:cedulaRuc",
        component: () => import("../modules/components/EditarResponsable.vue")
    },
 
    {
        path: "/actualizaciones",
        component: () => import("../modules/components/MostrarActualizaciones.vue")
    }*/
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router