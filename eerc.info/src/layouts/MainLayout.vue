<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          EERC.INFO
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered

      :mini="miniState"
    >
        <q-list>
          <q-item-label header>
            Navigation
          </q-item-label>
          <EssentialLink
            v-for="link in links"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
        <div class="fixed-bottom full-width flex justify-end desktop-only">
          <q-btn :icon="miniState ? 'chevron_right' : 'chevron_left'" @click="miniState = !miniState" unelevated/>
        </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

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
