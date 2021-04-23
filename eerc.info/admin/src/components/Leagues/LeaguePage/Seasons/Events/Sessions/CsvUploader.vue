<template>
  <q-card>
    <q-card-section>
      <p class="q-ma-none text-h5">Csv Uploader</p>
      <p class="q-ma-none text-subtitle">Select the CSV file you'd like to use.</p>
    </q-card-section>
    <q-card-section>
      <q-file v-model="file" label="CSV File" accept=".csv">
        <template v-slot:prepend>
          <q-icon name="mdi-file-plus" />
        </template>
        <template v-slot:file="{ index, file }">
          <div class="column full-width q-ma-none items-start q-pr-lg">
            <p class="q-ma-none text-subtitle1">File Preview: {{ file.name }}</p>
            <div class="column no-wrap justify-start items-stretch">
              <p class="q-ma-xs" v-for="line in fileLines" :key="line">
                {{ line }}
              </p>
            </div>
          </div>
        </template>
      </q-file>
    </q-card-section>
    <q-card-actions>
      <q-space />
      <q-btn label="Submit" color="secondary" @click="submit" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      fileContent: ''
    }
  },
  computed: {
    fileLines() {
      const lines = this.fileContent.split('\r\n')
      return lines
    }
  },
  methods: {
    submit() {
      this.$emit('input', this.fileLines)
    }
  },
  watch: {
    file() {
      this.file.text().then((t) => (this.fileContent = t))
    }
  }
}
</script>

<style></style>
