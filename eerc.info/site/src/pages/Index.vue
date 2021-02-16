<template>
  <q-page class="column items-stretch">
    <q-carousel v-model="carousel"
      animated
      navigation
      infinite
      swipeable

      arrows
      style="max-width:100vw; height:92vh;"
    >
      <q-carousel-slide :name="1"
        class="column no-wrap justify-center items-start q-px-xl"
        img-src="/images/carousel/main-hero.png"
      >
          <h1 class="text-uppercase text-bold q-ma-none">EERC</h1>
          <h4 v-if="!$q.platform.is.mobile && !$q.screen.xs" class="text-uppercase q-ma-none">European Electronic Racing Community</h4>
          <p class="self-end text-right text-justify" style="max-width:20rem">
            EERC hosts leagues across a multitude of titles and disciplines. Check out the leagues page to see if we have something for you.
          </p>
          <q-btn class="self-end" label="Check out our leagues" color="accent" icon-right="mdi-arrow-right" to="/leagues"/>
      </q-carousel-slide>
      <q-carousel-slide :name="2"
        class="column no-wrap justifycenter items-start q-px-xl q-py-xl"
        img-src="/images/carousel/discord-hero.png"
      >
        <div class="column no-wrap" style="max-width:75vw">
          <h1 class="text-uppercase text-bold q-ma-none"
            :class="{ 'text-h2':$q.screen.xs || $q.platform.is.mobile }"
          >Discord</h1>
          <h6 class="q-ma-none text-uppercase text-justify">Join our discord server and be a part of the community.</h6>
        </div>
        <q-space/>
        <q-btn class="self-end" size="xl" label="join" icon="mdi-discord" flat
        :class="$q.screen.xs || $q.platform.is.mobile ? 'self-center' : 'self-end'"
        @click="openURL('https://discord.gg/sZ8N33xPGf')"/>
        <q-space/>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="q-px-xl column items-center justify-center no-wrap cursor-pointer"
        style="background: #FF0000"
        @click="openURL('https://youtube.com/c/EERCOfficial?sub_confirmation=1')"
      >
        <div class="row items-center justify-center">
          <h1 class="q-ma-none"
            :class="{ 'text-h2':$q.screen.xs || $q.platform.is.mobile }"
          >YouTube</h1>
          <q-icon name="mdi-youtube" size="10rem"/>
        </div>
        <h6 class="q-ma-none text-uppercase">Subscribe to EERC</h6>
      </q-carousel-slide>
      <q-carousel-slide :name="4"
        class="q-px-xl row items-stretch"
        img-src="/images/carousel/socials-hero.png"
      >
        <div v-if="!$q.platform.is.mobile && !$q.screen.xs" class="column justify-center col-6">
          <h2 class="q-ma-none text-right">Twitter</h2>
        </div>
        <div class="column justify-center col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6 items-start">
          <q-btn icon="mdi-twitter" size="2.2rem" flat @click="openURL('https://twitter.com/EERC_Official')"/>
        </div>
        <div class="col-2 column justify-center" v-if="$q.platform.is.mobile || $q.screen.xs">
          <q-separator class="rotate-90"/>
        </div>
        <div class="column justify-center col-xs-5 col-sm-6 col-md-6 col-lg-6 col-xl-6 items-end">
          <q-btn icon="mdi-instagram" size="2.2rem" flat @click="openURL('https://instagram.com/eerc_official/')"/>
        </div>
        <div v-if="!$q.platform.is.mobile && !$q.screen.xs" class="column justify-center col-6">
          <h2 class="q-ma-none text-left">Instagram</h2>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="5"
        class="q-px-sl column items-center justify-center"
        img-src="/images/carousel/paypal-hero.png"
      >
        <p class="q-ma-none text-subtitle1">Consider donating with PayPal</p>
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="top" class="q-py-md">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="WT96RWAPDAZ8S" />
            <q-btn label="Donate" type="submit" icon="mdi-charity" color="accent" class="text-bold text-h6" padding="sm" size="2.6rem"/>
        </form>
        <p class="q-ma-none text-caption">Donations help EERC serve the community.</p>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'PageIndex',
  data () {
    return {
      carousel: 1,
      openURL: openURL
    }
  }
}
</script>
<style lang="scss">
body {
  background-color: rgb(var(--q-color-primary));
  background: linear-gradient(rgba(var(--q-color-primary), 0.65), rgba(var(--q-color-primary), 0.65)), url('/images/background/eerc_background.png') no-repeat fixed,
    rgb(var(--q-color-primary));
  background-position: center top;
  background-size: 150%;
}
</style>
