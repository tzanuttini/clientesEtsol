var login = new Vue({
    el: '#login',
    data: {
        logeado: false,
        usuario: "ADMIN",
        clave: "ADMIN"
    },
    methods: {
        ingresar: function () {
            $.get({
                url: 'http://10.0.0.197:9003/clientes',
                crossDomain: true,
                headers: {
                    EmpID: 1,
                    Authorization: 'Basic ' + btoa(this.usuario + ':' + this.clave)
                }
            }).done(function (resultadoJSON) {
                login.logeado = true;
                // alert("Correcto maese")
                clientes.cargar(resultadoJSON)
                clientes.logeado = true;

            }).fail(function () {
                alert("ERROR !!!!");
            });

        }
    }
})
var clientes = new Vue({
    el: "#tabla-clientes",
    data: {
        logeado: false,
        clientes,
        page: {
            totalPages: 0
        },
        paginaActual: 0,
        filtro: "",
    },
    methods: {
        cargar: function (json) {
            this.clientes = json._embedded.clienteResources;
            this.page = json.page;
        },
        siguiente: function () {
            this.paginaActual++;
            getClientes(this.paginaActual,this.filtro)
        },
        anterior: function () {
            this.paginaActual--;
            getClientes(this.paginaActual,this.filtro)
        },
        buscar: function () {
            this.paginaActual = 0;
            getClientes(this.paginaActual,this.filtro)
        },
        detallar: function (cli) {
            this.logeado = false;
            detalles.mostrarCliente(cli);
            detalles.mostrar = true;
        }
    },
    computed: {
        tieneSiguiente: function () {
            return this.paginaActual + 1 !== this.page.totalPages
        },
        tieneAnterior: function () {
            return this.paginaActual !== 0
        },
    }
})
var detalles = new Vue({
    el: "#detalles",
    data: {
        mostrar: false,
        cliente: {
            razonSocial: "",
            cuit: "",
            nombreFantasia: "",
            domicilios: [
                {
                    domicilio: "",
                    localidad: {
                        nombre: "",
                        provincia: {
                            nombre: "",
                        }
                    }
                }
            ],
            email: "",
            fecha_nacim: "",
            telefonos: [{
                nombre: "",
            }],
            web:""
        }
    },
    methods: {
        mostrarCliente: function (num) {
            this.mostrar = true;
            $.get({
                url: 'http://10.0.0.197:9003/clientes/' + num,
                crossDomain: true,
                headers: {
                    EmpID: 1,
                    Authorization: 'Basic ' + btoa(login.usuario + ':' + login.clave)
                }
            }).done(function (json) {
                detalles.cliente = json;
            }).fail(function () {
                alert("No se puede cargar los datos del cliente")
            })
        },
        salir: function () {
            this.mostrar = false;
            clientes.logeado = true;
        }
    }
})
function getClientes(pagina, nombreFantasia){
    $.get({
        url: 'http://10.0.0.197:9003/clientes',
        crossDomain: true,
        data: {
            page: pagina,
            nom_fantasia: nombreFantasia,
        },
        headers: {
            EmpID: 1,
            Authorization: 'Basic ' + btoa(login.usuario + ':' + login.clave)
        }
    }).done(function (resultado) {
        clientes.cargar(resultado)
    }).fail(function () {
        alert("Error en busqueda")
    })
}
// $( document ).ready(login.ingresar())