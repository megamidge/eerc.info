<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  meta: {
    // sets document title
    title: 'Index Page',
    // optional; sets final title as "Index Page - My Website", useful for multiple level meta
    titleTemplate: title => `${title}`,
    // meta tags
    meta: {
      description: { name: 'description', content: 'European Electronic Racing Community. EERC hosts leagues across a multitude of titles and disciplines.' },
      keywords: { name: 'keywords', content: 'EERC E-Sports E-Racing Sim Sim-Racing Racing Dirt Rally RFactor2 Formula 1' },
      equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
    },
    // JS tags
    script: {
      ldJson: {
        type: 'application/ld+json',
        innerHTML: '{ "@context": "http://schema.org" }'
      }
    },
    // <noscript> tags
    noscript: {
      default: 'Hey. Sorry, but you will need to enable JavaScript to view this website.'
    }
  },
  name: 'App'
}
</script>
