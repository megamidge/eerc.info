<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
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
        <q-btn icon="mdi-discord" @click="openURL(socials.discord)" flat label="Join our Discord!"/>
      </q-toolbar>
    </q-header>

    <q-page-container class="page-container">
      <router-view />
    </q-page-container>

    <q-footer>
      <q-toolbar>
        <q-toolbar-title>
          <p class="text-caption q-ma-none">European Electronic Racing Community</p>
        </q-toolbar-title>
        <q-btn icon="mdi-discord" @click="openURL(socials.discord)" flat/>
        <q-btn icon="mdi-twitter" @click="openURL(socials.twitter)" flat/>
        <q-btn icon="mdi-instagram" @click="openURL(socials.instagram)" flat/>
        <q-btn icon="mdi-youtube" @click="openURL(socials.youtube)" flat/>
      </q-toolbar>
      <q-toolbar class="flex-center">
        <div class="paypal column justify-center items-center">
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <img alt border="0" src="https://www.paypal.com/en_GB/i/scr/pixel.gif" width="1" height="1" />
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="WT96RWAPDAZ8S" />
            <input type="image" src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
          </form>
          <small>Help fund the league by donating via PayPal</small>
          <small>Donators may be entered into exclusive prize draws and more</small>
          </div>
      </q-toolbar>
      <q-toolbar class="bg-black">
        Primary<q-icon color="primary" name="mdi-circle"/>,
        Secondary<q-icon color="secondary" name="mdi-circle"/>,
        Accent<q-icon color="accent" name="mdi-circle"/>,
        Dark<q-icon color="dark" name="mdi-circle"/>,
        Positive<q-icon color="positive" name="mdi-circle"/>,
        Negative<q-icon color="negative" name="mdi-circle"/>,
        Info<q-icon color="info" name="mdi-circle"/>,
        Warning<q-icon color="warning" name="mdi-circle"/>
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
      openURL: openURL,
      socials: {
        discord: 'https://discord.gg/sZ8N33xPGf',
        twitter: 'https://twitter.com/EERC_Official',
        instagram: 'https://www.instagram.com/eerc_official/',
        youtube: 'https://www.youtube.com/channel/UC4kk8xdkgP1arwEgD7G4Nlw?sub_confirmation=1'
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
}
.page-container {
  background: linear-gradient(rgba(18,18,18, 0.65), rgba(18,18,18, 0.65)),
    url('/images/background/eerc_background.png') no-repeat fixed,
  rgb(18,18,18);
  background-position:center top;
  background-size:150%;
}
</style>
