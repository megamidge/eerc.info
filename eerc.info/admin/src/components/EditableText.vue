<template>
    <q-input
      @mouseover.native="hover = true"
      @mouseleave.native="hover = false"
      @keydown.enter="submit"
      @focus="edit = true"
      @blur="edit = false"
      :filled="edit"
      :loading="loading"
      :style="style"
      :readonly="loading"
      borderless
      :autogrow="multiline"
      :value="value"
      @input="$emit('input', $event)">
        <template v-slot:append>
          <q-icon v-if="!edit" name="mdi-pencil" :color="hover ?'grey-1':'grey-7'"/>
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
  computed: {
    style () {
      if (!this.multiline) {
        return {
          width: `${this.value.length / 2 + 3}em`, minWidth: '6rem', maxWidth: '100%'
        }
      } else return {}
    }
  },
  props: {
    loading: {
      type: Boolean
    },
    value: {
      type: String
    },
    multiline: {
      type: Boolean,
      default: () => false
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
