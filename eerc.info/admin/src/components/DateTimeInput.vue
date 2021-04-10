<template>
  <q-input :label="label" :value="formatValue(value)" @input="dateTimeInput($event)">
    <template v-slot:prepend>
    <q-icon name="mdi-calendar" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
        <q-date :value="formatValue(value)" @input="dateTimeInput($event)" :mask="datetimeFormat">
            <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
        </q-date>
        </q-popup-proxy>
    </q-icon>
    </template>

    <template v-slot:append>
    <q-icon name="mdi-clock-outline" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
        <q-time :value="formatValue(value)" @input="dateTimeInput($event)" :mask="datetimeFormat" format24h>
            <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
        </q-time>
        </q-popup-proxy>
    </q-icon>
    </template>
  </q-input>
</template>

<script>
import { date } from 'quasar'
export default {
  props: {
    label: {
      default: () => false
    },
    value: {
      type: Object,
      default: () => ({ seconds: 0, nanoseconds: 0 })
    }
  },
  data () {
    return { datetimeFormat: 'DD/MM/YYYY HH:mm' }
  },
  methods: {
    dateTimeInput (value) {
      const dateObj = date.extractDate(value, this.datetimeFormat)
      const out = {
        seconds: dateObj.getTime() / 1000,
        nanoseconds: 0
      }
      this.$emit('input', out)
    },
    formatValue (value) {
      const timestamp = new Date(value.seconds * 1000)
      const ret = date.formatDate(timestamp, this.datetimeFormat)
      return ret
    }
  }
}
</script>

<style>

</style>
