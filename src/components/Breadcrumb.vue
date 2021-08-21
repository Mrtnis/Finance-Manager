<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
      <li class="breadcrumb-item"><router-link to="/about">About</router-link></li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',
};
</script>
