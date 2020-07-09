<template>
  <q-layout view="hHh lpR fFf">

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
      leftDrawerOpen: false,
      miniState: true,
      links: [
        {
          title: 'Dashboard',
          icon: 'home'
        },
        {
          title: 'Leagues',
          caption: 'View and manage leagues',
          icon: 'list',
          link: 'leagues'
        },
        {
          title: 'Gallery',
          caption: 'Manage the gallery',
          icon: 'image',
          link: 'gallery'
        },
        {
          title: 'Current Website',
          caption: 'eerc.info',
          icon: 'public',
          link: 'https://eerc.info',
          openInNewTab: true
        }
      ]
    }
  }
}
</script>
