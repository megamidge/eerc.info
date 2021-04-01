<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated reveal>
      <q-toolbar v-if="!$q.platform.is.mobile && !$q.screen.xs">
        <q-img src="/logos/logo_dark.svg" :ratio="1 / 1" class="logo q-ma-md" style="cursor:pointer;" @click="$router.push('/')"/>
        <q-btn
          v-for="headerLink in headerLinks"
          :key="headerLink.label"
          :label="headerLink.label"
          flat
          class="text-h6"
          :to="headerLink.link"
        />
        <q-space/>
        <q-img src="/logos/grid-finder-partner-logo.png" :ratio="1 / 1" class="logo q-ma-md" style="cursor:pointer;" @click="openURL(socials.gridFinder)"/>
        <q-btn icon="mdi-discord" @click="openURL(socials.discord)" flat :label="!$q.screen.sm ? 'Join our Discord!' : ''"/>
      </q-toolbar>
      <q-toolbar elevated v-else>
        <q-img src="/logos/logo_dark.svg" :ratio="1 / 1" class="logo mobile" style="cursor:pointer;" @click="$router.push('/')"/>
        <q-space/>
        <q-btn icon="mdi-menu" @click="drawer = true" flat padding="0"/>
      </q-toolbar>
    </q-header>

    <q-page-container class="page-container">
      <router-view />
    </q-page-container>

    <q-drawer v-model="drawer" v-if="$q.platform.is.mobile || $q.screen.xs" side="right" elevated content-class="column items-stretch justify-center q-pa-md bg-primary">
      <q-list separator class="self-stretch justify-center full-height column">
        <q-item
          v-for="headerLink in headerLinks"
          :key="headerLink.label"
          :to="headerLink.link"
          class="text-h4 text-bold"
          active-class="text-accent"
          exact
        >
          <q-item-label class="text-right fit">
            {{ headerLink.label }}
          </q-item-label>
        </q-item>
        <q-space/>
        <q-img src="/logos/grid-finder-partner-logo.png" :ratio="1 / 1" class="logo q-ma-md" style="cursor:pointer;"/>
        <q-item class="text-h4 text-bold text-left"
        clickable
        @click="openURL(socials.discord)">
          <q-item-section>
            <q-item-label>
              Discord
            </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon name="mdi-discord" size="2.4rem"/>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-footer>
      <q-toolbar :class="{ 'column': $q.platform.is.mobile || $q.screen.xs}">
        <q-toolbar-title>
          <p class="text-caption q-ma-none">European Electronic Racing Community</p>
        </q-toolbar-title>
        <div>
          <q-btn icon="mdi-discord" @click="openURL(socials.discord)" flat/>
          <q-btn icon="mdi-twitter" @click="openURL(socials.twitter)" flat/>
          <q-btn icon="mdi-instagram" @click="openURL(socials.instagram)" flat/>
          <q-btn icon="mdi-youtube" @click="openURL(socials.youtube)" flat/>
        </div>
      </q-toolbar>
      <q-toolbar class="row fill">
        <div class="row items-center full-width" :class="$q.platform.is.mobile || $q.screen.xs ? 'justify-center text-center' : 'justify-between'">
          <div class="column q-py-md">
            <small>Help fund EERC, donate with PayPal.</small>
            <small>Donations ensure EERC can continue to serve it's community and host events.</small>
          </div>
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="top" class="q-py-md">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="WT96RWAPDAZ8S" />
            <q-btn label="Donate" type="submit" icon="mdi-charity" color="accent" class="text-bold text-h6" padding="sm"/>
          </form>
        </div>
      </q-toolbar>
      <q-toolbar class="row fill justify-center">
        <q-space v-if="!$q.platform.is.mobile && !$q.screen.xs"/>
        <q-icon name="img:/icons/flag/1.png" class="q-mr-sm"/>
        <div class="flagsAttribute text-italic text-caption">Icons made by <a class="text-bold" target="_blank" href="https://www.freepik.com" title="Freepik">Freepik</a> from <a class="text-bold" target="_blank" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </q-toolbar>
      <q-toolbar>
        {{ $q.screen.name }}
      </q-toolbar>
      <q-toolbar class="bg-black">
        <q-icon color="primary" name="mdi-circle"/>
        <q-icon color="secondary" name="mdi-circle"/>
        <q-icon color="accent" name="mdi-circle"/>
        <q-icon color="dark" name="mdi-circle"/>
        <q-icon color="positive" name="mdi-circle"/>
        <q-icon color="negative" name="mdi-circle"/>
        <q-icon color="info" name="mdi-circle"/>
        <q-icon color="warning" name="mdi-circle"/>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'MainLayout',
  data () {
    return {
      drawer: false,
      openURL: openURL,
      socials: {
        discord: 'https://discord.gg/sZ8N33xPGf',
        twitter: 'https://twitter.com/EERC_Official',
        instagram: 'https://instagram.com/eerc_official/',
        youtube: 'https://youtube.com/c/EERCOfficial?sub_confirmation=1',
        gridFinder: 'https://www.grid-finder.com/'
      },
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
  object-fit:contain;
  &.mobile {
    max-height: 2rem;
    max-width:2rem;
  }
}

@media screen and (min-width: $breakpoint-lg-min) {
    %max-width {
      margin: 0 auto;
      max-width: $breakpoint-lg;
    }
    .q-page{
      @extend %max-width;
    }
    .q-header, .q-footer{
      .q-toolbar {
        @extend %max-width;
      }
    }
}

.page-container {
  background: linear-gradient(rgba(18,18,18, 0.65), rgba(18,18,18, 0.65)),
    url('/images/background/eerc_background.png') no-repeat fixed,
  rgb(18,18,18);
  background-position:center top;
  background-size:150%;
}

.flagsAttribute {
  a {
    color: unset;
    text-decoration: none;
  }
  a:visited {
    color: unset;
  }
  a:hover {
    // color: var(--text-hover);
  }
}
</style>
