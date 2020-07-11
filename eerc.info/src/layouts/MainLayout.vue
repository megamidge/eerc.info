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
        <q-chip
          :label="email"
          icon="account_circle"
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
            icon="logout"
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
            :active="false"
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
          <q-btn :icon="miniState ? 'chevron_right' : 'chevron_left'" @click="miniState = !miniState" unelevated/>
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
          icon: 'home',
          link: '/'
        },
        {
          title: 'Leagues',
          caption: 'View and manage leagues',
          icon: 'list',
          link: '/leagues'
        },
        {
          title: 'Gallery',
          caption: 'Manage the gallery',
          icon: 'image',
          link: '/gallery'
        }
      ]
    }
  },
  computed: {
    email () {
      return this.$fb.auth().currentUser.email
    }
  },
  methods: {
    logout () {
      this.$fb.logoutUser().then(() => {
        this.$q.notify({ color: 'neutral', message: 'Logged out' })
      })
    }
  }
}
</script>
