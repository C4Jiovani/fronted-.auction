<template>
  <div>
    <!-- <center> -->
    <center>
      <br /><br />
      <h1 style="font-size: 24px; font-weight: 700">Bonjour!</h1>
      <h1 style="font-size: 13px; color: black; opacity: 64%">
        Bon retour parmis nous
      </h1>
    </center>
    <h3></h3>
    <LoginCompoTwo></LoginCompoTwo>
    <!-- </center> -->
  </div>
</template>
<script>
import LoginCompoTwo from "@/components/LoginCompoTwo.vue";
export default {
  name: "loginVue",
  data() {
    return {};
  },
  components: { LoginCompoTwo },
};
</script>