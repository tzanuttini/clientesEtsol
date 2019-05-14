<template>
  <div id="detalles">
    <span class="glyphicon glyphicon-chevron-left" style="color:black !important;" id="falito" @click="salir"></span>
    <div id="posicion">
      <h1>{{cliente.razonSocial}}</h1>
      <h2>{{cliente.nombreFantasia}}</h2>
      <div id="datos">
        <label><span class="fa fa-id-card"></span> Cuit:</label>
        <data>{{cliente.cuit}}</data>
        <br>
        <label><span class="fa fa-address-card"></span> Documento:</label>
        <data>{{cliente.doc_nro}}</data>
        <br>
        <label><span class="fa fa-address-book-o"></span> Domicilio:</label> 
        <data>
          {{cliente.domicilios[0].domicilio}}, {{cliente.domicilios[0].localidad.nombre}},
          {{cliente.domicilios[0].localidad.provincia.nombre}}
        </data>
        <br>
        <label><span class="glyphicon glyphicon-envelope"></span> Email:</label>
        <data>{{cliente.email || 'no email'}}</data>
        <br>
        <label><span class="fa fa-phone"></span> Telefono:</label>
        <data>{{cliente.telefonos[0].nombre || 'no telefono'}}</data>
        <br>
        <label><span class="fa fa-internet-explorer" style="color:blue !important"></span> Página web:</label>
        <data>{{cliente.web || 'Sin pagina web'}}</data>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
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
  beforeRouteUpdate(to) {
    this.mostrarCliente(to.params.id);
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
            Authorization:
              "Basic " +
              btoa(
                this.$store.getters.usuario + ":" + this.$store.getters.clave
              )
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
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
#posicion {
  display: inline-block;
  top: 0;
  position: absolute;
}
h1 {
  padding-top:15px;
  padding-bottom: 15px;
  margin-bottom:0px;
}
h2{
  padding-bottom:5px;
  margin-bottom:0px;
  padding-top:5px;
}
h1, h2{
  margin-left:20px;
  border-top:2px solid black;
  border-left:2px solid black;
  border-right:2px solid black;
}
data {
  margin-left: 5px;
  margin-top:4px;
  padding-bottom: 2px;
  border-bottom: 1px solid grey;
}
label{
  font-weight: bolder;
}
#datos{
  text-align: left;
  margin-left:20px;
  border:2px solid black;
  padding-left:10px;
}
.fa ,.glyphicon{
  color:brown;
}
</style>
