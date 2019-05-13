<template>
  <div id="tabla-clientes" class="center">
    <form style="display:inline-block;float:left">
      <div id="busqueda">
        Search:
        <input v-model="filtro">
        <button v-on:click.prevent="buscar" type="submit" class="btn btn-primary">
          Buscar
          <span class="glyphicon glyphicon-search"></span>
        </button>
      </div>
    </form>
    <div class="pager" style="display:inline-block;float:right">
      <a
        class="glyphicon glyphicon-arrow-left"
        v-if="tieneAnterior"
        @click="anterior"
        style="border-top:1px solid black;border-bottom:1px solid black;border-left:1px solid black;cursor:pointer"
      ></a>
      <span class="badge" style="border-top:1px solid black;border-bottom:1px solid black;">
        {{paginaActual+1}}
        de {{page.totalPages}}
      </span>
      <a
        class="glyphicon glyphicon-arrow-right"
        v-if="tieneSiguiente"
        v-on:click="siguiente"
        style="border-top:1px solid black;border-bottom:1px solid black;border-right:1px solid black;cursor:pointer"
      ></a>
    </div>
    <table class="table table-dark table-hover">
      <thead>
        <tr>
          <th scope="col">ID Cliente</th>
          <th scope="col">Razon Social</th>
          <th scope="col">Nombre Fantasia</th>
          <th scope="col">Domicilio</th>
          <th scope="col">Localidad</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="cliente in clientes"
          @click="mostrarDetalles(cliente.cliId)"
          v-bind:key="cliente.cliId"
          class="niceColor"
        >
          <td>{{ cliente.cliId }}</td>
          <td>{{ cliente.razonSocial }}</td>
          <td>{{ cliente.nombreFantasia }}</td>
          <td>{{ cliente.domicilios[0].domicilio }}</td>
          <td>{{ cliente.domicilios[0].localidad.nombre }}</td>
          <td>{{ cliente.email || 'no email' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import $ from "jquery";
import router from "../../router.js";
import store from "../../main.js";
export default {
  name: "clientes",
  data: function() {
    return {
      clientes: [],
      page: {
        totalPages: 0
      },
      paginaActual: 0,
      filtro: ""
    };
  },
  props: {
    usuario: String,
    clave: String
  },
  created: function() {
    this.getClientes(0, "");
  },
  methods: {
    cargar: function(json) {
      this.clientes = json._embedded.clienteResources;
      this.page = json.page;
    },
    getClientes: function(pagina, nombreFantasia) {
      $.get({
        url: "http://10.0.0.197:9003/clientes",
        crossDomain: true,
        data: {
          page: pagina,
          nom_fantasia: nombreFantasia
        },
        headers: {
          EmpID: 1,
          Authorization: "Basic " + btoa(this.$store.getters.usuario + ":" + this.$store.getters.clave)
        }
      })
        .done(resultado => {
          this.cargar(resultado);
        })
        .fail(function() {
          alert("Error en busqueda");
        });
    },
    mostrarDetalles:function (num){
      router.push({name:"detalles",params:{id:num}})
    },
    siguiente: function() {
      this.paginaActual++;
      this.getClientes(this.paginaActual, this.filtro);
    },
    anterior: function() {
      this.paginaActual--;
      this.getClientes(this.paginaActual, this.filtro);
    },
    buscar: function() {
      this.paginaActual = 0;
      this.getClientes(this.paginaActual, this.filtro);
    }
  },
  computed: {
    tieneSiguiente: function() {
      return this.paginaActual + 1 !== this.page.totalPages;
    },
    tieneAnterior: function() {
      return this.paginaActual !== 0;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
