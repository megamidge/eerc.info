<template>
  <p
    @mouseover="hover = true"
    @mouseleave="hover = false"
    v-if="usePopup"
  >
    {{value}}
    <q-icon name="mdi-pencil" :color="hover ? 'grey-1' : 'grey-7'"/>
    <q-popup-edit
        buttons
        color="secondary"
        content-class="bg-primary"
        v-model="editValue"
        @before-show="editValue = value"
        @save="$emit('input', editValue)">
        <template v-slot="{ value ,emitValue }">
            <q-input :value="value" @input="emitValue"/>
        </template>
    </q-popup-edit>
  </p>
  <q-input v-else dense :value="value" @input="$emit('input', $event)"/>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: () => '00:00:00.000'
    },
    usePopup: {
      type: Boolean,
      default: () => true
    }
  },
  data () {
    return {
      hover: false,
      editValue: ''
    }
  }
}
</script>

<style>

</style>
