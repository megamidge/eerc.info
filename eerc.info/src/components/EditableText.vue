<template>
  <q-input
    @mouseover.native="hover = true"
    @mouseleave.native="hover = false"
    @keydown.enter="submit"
    @focus="edit = true"
    @blur="edit = false"
    :filled="edit"
    :style="{width:`${value.length/2+3}em`, minWidth:'6rem', maxWidth:'100%'}"
    :loading="loading"
    :readonly="loading"
    borderless
    :value="value"
    @input="$emit('input', $event)">
      <template v-slot:append>
        <q-icon v-if="hover && !edit" name="edit"/>
      </template>
  </q-input>
</template>

<script>
export default {
  data () {
    return {
      hover: false,
      edit: false
    }
  },
  props: {
    loading: {
      type: Boolean
    },
    value: {
      type: String
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    }
  }
}
</script>

<style>

</style>
