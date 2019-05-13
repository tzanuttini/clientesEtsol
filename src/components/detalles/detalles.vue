<template>
  <div id="detalles">
    <span class="glyphicon glyphicon-chevron-left" id="falito" @click="salir"></span>
    <div id="posicion">
      <h1>{{cliente.razonSocial}}</h1>
      <h2>{{cliente.nombreFantasia}}</h2>
      <label>Cuit:</label>
      {{cliente.cuit}}
      <br>
      <label>Documento:</label>
      {{cliente.doc_nro}}
      <br>
      <label>Domicilio:</label>
      {{cliente.domicilios[0].domicilio}}, {{cliente.domicilios[0].localidad.nombre}},
      {{cliente.domicilios[0].localidad.provincia.nombre}}
      <br>
      <label>Email:</label>
      {{cliente.email || 'no email'}}
      <br>
      <label>Telefono:</label>
      {{cliente.telefonos[0].nombre || 'no telefono'}}
      <br>
      <label>Página web:</label>
      {{cliente.web || 'Sin pagina web'}}
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import router from "../../router.js";
import store from "../../main.js";
export default {
  name: "detalles",
  props: {
    id: {
      default: ""
    },
    usuario: {
      default: ""
    },
    clave: {
      default: ""
    }
  },
  data: function() {
    return {
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
                nombre: ""
              }
            }
          }
        ],
        email: "",
        fecha_nacim: "",
        telefonos: [
          {
            nombre: ""
          }
        ],
        web: ""
      }
    };
  },
  beforeRouteUpdate(to,from){
    this.mostrarCliente(to.params.id)
  },
  created: function() {
    this.mostrarCliente(this.id);
  },
  methods: {
    mostrarCliente: function(num) {
      if (num != "") {
        $.get({
          url: "http://10.0.0.197:9003/clientes/" + num,
          crossDomain: true,
          headers: {
            EmpID: 1,
            Authorization: "Basic " + btoa(this.$store.getters.usuario + ":" + this.$store.getters.clave)
          }
        })
          .done(json => {
            this.cliente = json;
          })
          .fail(function(xhr) {
            alert(xhr.message);
          });
      }
    },
    salir: function() {
      router.go(-1)
    }
  }
};
</script>
<style scoped>
  #posicion{
    display: inline-block;
    top:0;
    position:absolute;
  }
</style>
