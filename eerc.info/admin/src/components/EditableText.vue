<template>
    <!-- <q-input
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
    </q-input> -->
    <p
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      {{ value }}
      <q-icon name="mdi-pencil" :color="hover ? 'grey-1' : 'grey-7'"/>
      <q-popup-edit v-model="val" cover auto-save buttons color="secondary" content-class="bg-grey-10" title="">
        <template v-slot="{ value ,emitValue }">
          <q-input :value="value" @input="emitValue" :type="type" class="bg-grey-9 q-px-sm rounded-borders" autofocus @keyup.enter.stop>
          </q-input>
        </template>
      </q-popup-edit>
    </p>
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
    },
    val: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
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
    },
    type: {
      type: String,
      default: () => 'text'
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    },
    shouldStop (event) {
      console.log('shouldStop>', event)
      event.preventDefault()
    }
  }
}
</script>

<style>

</style>
