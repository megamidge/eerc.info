<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="mdi-menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          EERC.INFO
        </q-toolbar-title>
        <q-chip
          :label="email"
          icon="mdi-account-circle"
          class="truncate-chip-labels cursor-pointer"
          style="max-width:30%; border-radius:0"
          square
        >
          <q-menu
            anchor="bottom right"
            self="top right"
            square>
            <q-btn
            no-caps
            size="md"
            label="Logout"
            icon="mdi-logout"
            @click="logout"
            v-close-popup
            />
          </q-menu>
        </q-chip>
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
          <q-item
            v-for="link in links"
            :key="link.title"
            clickable
            :to="link.link"
            exact
            dark>
            <q-item-section avatar>
              <q-icon :name="link.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.title }}</q-item-label>
              <q-item-label caption>
                {{ link.caption }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div class="fixed-bottom full-width flex justify-end desktop-only">
          <q-btn :icon="miniState ? 'mdi-chevron-right' : 'mdi-chevron-left'" @click="miniState = !miniState" unelevated/>
        </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'

export default {
  name: 'MainLayout',

  components: {
    // EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      miniState: true,
      links: [
        {
          title: 'Dashboard',
          icon: 'mdi-home',
          link: '/'
        },
        {
          title: 'Leagues',
          caption: 'View and manage leagues',
          icon: 'mdi-view-list',
          link: '/Leagues'
        },
        {
          title: 'Gallery',
          caption: 'Manage the gallery',
          icon: 'mdi-image',
          link: '/Gallery'
        }
      ]
    }
  },
  computed: {
    email () {
      return this.$firebase.auth().currentUser.email
    }
  },
  methods: {
    logout () {
      this.$firebase.logoutUser().then(() => {
        this.$q.notify({ color: 'neutral', message: 'Logged out' })
      })
    }
  }
}
</script>

<style>
.q-item.q-router-link--active, .q-item--active {
  color: var(--q-color-secondary)
}
</style>
