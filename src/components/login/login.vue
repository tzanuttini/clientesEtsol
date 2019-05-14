<template>
  <form id="login">
    <div class="form-group">
      <input
        type="text"
        v-model="usuario"
        class="form-control"
        id="usuario"
        aria-describedby="emailHelp"
        placeholder="Usuario"
        required
      >
    </div>

    <div class="form-group">
      <input
        type="password"
        v-model="clave"
        class="form-control"
        id="inputPassword"
        placeholder="Contraseña"
        required
      >
    </div>

    <button v-on:click.prevent="ingresar" class="btn btn-primary">Ingresar</button>
  </form>
</template>
<script>
import $ from "jquery";
export default {
  name: "login",
  props: {},
  data: function() {
    return {
      usuario: "ADMIN",
      clave: "ADMIN"
    };
  },
  methods: {
    ingresar: function() {
      $.post({
        url: "http://10.0.0.197:9003/usuarios/login",
        crossDomain: true,
        data: JSON.stringify({
          origen: "BBJET_B2B"
        }),
        contentType: "application/json",
        headers: {
          EmpID: 1,
          Authorization: "Basic " + btoa(this.usuario + ":" + this.clave)
        }
      })
        .done(() => {
          this.$store.commit("setUsuario", this.usuario);
          this.$store.commit("setClave", this.clave);
          this.$router.push({
            name: "clientes"
          });
        })
        .fail(function() {
          alert("ERROR !!!!");
        });
    }
  }
};
</script>
<style>
#login {
  margin-top: 60px;
  font-size: 20px;
}
</style>
