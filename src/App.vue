<template>
  <div class="container mt-5">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  },
};
</script>

<style>
* {
  font-family: 'Open Sans', sans-serif;
}
.btn-back {
  border-radius: 10px;
  background-color: #e63946;
  color: white;
}
.btn-save {
  border-radius: 10px;
  background-color: #4361ee;
  color: white;
}
</style>
