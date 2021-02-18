<template>
<div class="row no-wrap items-center">
    <p class="q-ma-none q-mr-md ellipsis text-link" style="max-width:75vw" @click.stop="openURL(value)">{{ hostname }}<q-icon name="mdi-open-in-new"/></p>
    <q-btn color="secondary" icon="mdi-pencil" dense/>
    <q-popup-edit :value="value" @input="emit" auto-save buttons color="secondary" content-class="bg-grey-10" >
        <template v-slot="{value, emitValue}">
        <q-input :value="value" @input="emitValue" type="text" class="bg-grey-9 q-px-sm rounded-borders" autofocus/>
        </template>
    </q-popup-edit>
</div>
</template>

<script>
import { openURL } from 'quasar'
export default {
  data () {
    return {
      openURL: openURL
    }
  },
  props: {
    value: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    hostname () {
      const urlObject = new URL(this.value)
      return urlObject.hostname
    }
  },
  methods: {
    emit (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style>

</style>
