<template>
<div class="row no-wrap items-center">
    <q-icon class="q-mr-xs" :name="`img:/icons/flag/${value.countryCode}.svg`"/>
    {{ value.name }}
    <q-popup-edit @before-show="editValue = value" color="secondary" content-class="bg-primary" buttons v-model="editValue" @save="$emit('input', $event)">
        <template v-slot="{ value, emitValue }">
            <div class="row">
                <q-select
                    :value="value.countryCode"
                    @input="countryInput($event, emitValue)"
                    popup-content-class="bg-primary" color="secondary" class="q-mr-md text-capitalize" filled :options="countryCodes" label="Country">
                    <template v-slot:prepend>
                        <q-icon :name="`img:/icons/flag/${value.countryCode}.svg`"/>
                    </template>
                    <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                            <q-item-section avatar>
                                <q-icon :name="`img:/icons/flag/${scope.opt}.svg`"/>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="text-capitalize">{{scope.opt}}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
                <q-input :value="value.name" @input="nameInput($event, emitValue)"/>
            </div>
        </template>
    </q-popup-edit>
</div>
</template>

<script>
import countryCodes from 'assets/countryCodes.json'
export default {
  data () {
    return {
      countryCodes: countryCodes.codes,
      editValue: {
        name: 'Driver Name',
        countryCode: 'european-union'
      }
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          name: 'Driver Name',
          countryCode: 'european-union'
        }
      }
    }
  },
  methods: {
    nameInput (val, emitValue) {
      emitValue({ name: val, countryCode: this.editValue.countryCode })
    },
    countryInput (val, emitValue) {
      emitValue({ name: this.editValue.name, countryCode: val })
    }
  }
}
</script>

<style>

</style>
