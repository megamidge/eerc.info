<template>
  <p
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    {{valueFormatted}}
    <q-icon name="mdi-pencil" :color="hover ? 'grey-1' : 'grey-7'"/>
    <q-popup-edit @before-show="editValue = value" color="secondary" content-class="bg-primary" buttons v-model="editValue" @save="$emit('input', $event)">
      <template v-slot="{value, emitValue}">
        <q-input filled :value="formatValue(value)" @input="dateTimeInput($event,emitValue)">
          <template v-slot:prepend>
            <q-icon name="mdi-calendar" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date :value="formatValue(value)" @input="dateTimeInput($event,emitValue)" mask="YYYY/MM/DD HH:mm">
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
                <q-time :value="formatValue(value)" @input="dateTimeInput($event,emitValue)" mask="YYYY/MM/DD HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </template>
    </q-popup-edit>
  </p>
</template>

<script>
import { date } from 'quasar'
export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        seconds: 0,
        nanoseconds: 0
      })
    }
  },
  computed: {
    valueFormatted () {
      const timestamp = new Date(this.value.seconds * 1000)
      const ret = date.formatDate(timestamp, 'DD/MM/YYYY HH:mm')
      return ret
    }
  },
  methods: {
    dateTimeInput (value, emitValue) {
      const dateObj = new Date(value)
      console.log('dti', dateObj.getTime() / 1000)
      emitValue({
        seconds: dateObj.getTime() / 1000,
        nanoseconds: 0
      })
    },
    formatValue (value) {
      const timestamp = new Date(value.seconds * 1000)
      const ret = date.formatDate(timestamp, 'DD/MM/YYYY HH:mm')
      return ret
    }
  },
  data () {
    return {
      hover: false,
      editValue: {
        seconds: 0,
        nanoseconds: 0
      }
    }
  }
}
</script>

<style>

</style>
