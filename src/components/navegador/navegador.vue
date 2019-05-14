<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <button
        type="button"
        class="navbar-toggle collapsed"
        data-toggle="collapse"
        data-target="#bs-example-navbar-collapse-1"
        aria-expanded="false"
      >
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" @click="logout">Cerrar Sesion</a>
    </div>
  </nav>
</template>
<script>
export default {
    name:'navegador',
    methods:{
        logout:function(){
            this.$store.commit("setUsuario","");
            this.$store.commit("setClave","");
            this.$router.replace({name:'login'});
        }
    }
};
</script>
<style>
</style>
