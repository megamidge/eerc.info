<template>
 <router-view/>
</template>

<script>
export default {
  created () {
    this.$fb.listenLeagues(this.$store)
  }
}
</script>
