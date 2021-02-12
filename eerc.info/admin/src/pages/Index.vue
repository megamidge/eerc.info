<template>
  <q-page class="flex flex-center row">
    <h1>Admin area</h1>
    <img
      alt="Quasar logo"
      src="~assets/eerc.png"
      class="logo"
    >
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  meta: {
    title: 'Admin Portal | admin.eerc.info',
    description: { name: 'description', content: 'EERC Admin Portal.' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
  }
}
</script>

<style>
.logo {
  max-width: 15rem;
}
</style>
