<template>
  
  <div id="tabla-clientes" class="center">
    <navegador></navegador>
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
        {{paginaActual}}
        de {{page.totalPages}}
      </span>
      <a
        class="glyphicon glyphicon-arrow-right"
        v-if="tieneSiguiente"
        v-on:click="siguiente"
        style="border-top:1px solid black;border-bottom:1px solid black;border-right:1px solid black;cursor:pointer"
      ></a>
      <input
        type="text"
        v-model="paginaActual"
        @change="getClientes(paginaActual,filtro,orden)"
        class="form-control"
        style="text-align:right;width:40px"
      >
    </div>
    <div class="table-responsive">
      <table class="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col" @click="sort('id')">ID Cliente</th>
            <th scope="col">Razon Social</th>
            <th scope="col" @click="sort('nombreFantasia')">Nombre Fantasia</th>
            <th scope="col">Domicilio</th>
            <th scope="col">Localidad</th>
            <th scope="col" @click="sort('email')">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cliente in clientes"
            @click="mostrarDetalles(cliente.cliId)"
            v-bind:key="cliente.cliId"
            class="niceColor"
          >
            <td scope="row" style="text-align:center;">{{ cliente.cliId }}</td>
            <td>{{ cliente.razonSocial }}</td>
            <td>{{ cliente.nombreFantasia }}</td>
            <td>{{ cliente.domicilios[0].domicilio }}</td>
            <td>{{ cliente.domicilios[0].localidad.nombre }}</td>
            <td>{{ cliente.email || 'no email' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import navegador from "../navegador/navegador.vue";
export default {
  name: "clientes",
  components: {
    navegador
  },
  data: function() {
    return {
      clientes: [],
      page: {
        totalPages: 0
      },
      paginaActual: 1,
      filtro: "",
      orden: ""
    };
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
          page: pagina - 1,
          nom_fantasia: nombreFantasia,
          sort: this.orden
        },
        headers: {
          EmpID: 1,
          Authorization:
            "Basic " +
            btoa(this.$store.getters.usuario + ":" + this.$store.getters.clave)
        }
      })
        .done(resultado => {
          this.cargar(resultado);
        })
        .fail(function() {
          alert("Error en busqueda");
        });
    },
    mostrarDetalles: function(num) {
      this.$router.push({ name: "detalles", params: { id: num } });
    },
    sort: function(sort) {
      this.orden = sort;
      this.getClientes(this.paginaActual, this.filtro, this.orden);
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
      this.paginaActual = 1;
      this.getClientes(this.paginaActual, this.filtro);
    }
  },
  computed: {
    tieneSiguiente: function() {
      return this.paginaActual < this.page.totalPages;
    },
    tieneAnterior: function() {
      return this.paginaActual > 1;
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
