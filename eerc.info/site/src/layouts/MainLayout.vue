<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-img src="/logos/logo_dark.svg" :ratio="1 / 1" class="logo q-ma-md" style="cursor:pointer;" to="/"/>
        <q-btn
          v-for="headerLink in headerLinks"
          :key="headerLink.label"
          :label="headerLink.label"
          flat
          class="text-h6"
          :to="headerLink.link"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      headerLinks: [
        {
          label: 'Home',
          link: '/'
        },
        {
          label: 'Leagues',
          link: '/Leagues'
        },
        {
          label: 'Gallery',
          link: '/Gallery'
        },
        {
          label: 'About',
          link: '/About'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.logo {
  max-height: 5rem;
  max-width: 5rem;
}
</style>
