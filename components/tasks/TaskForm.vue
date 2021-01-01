<template>
  <v-form ref="form">
    <div class="box-wrapper">
      <div class="box">
        <div class="panel panel-input-list">
          <v-text-field
            v-model="value.title"
            :counter="20"
            label="タイトル"
            placeholder="ここにタスクのタイトルが入ります"
            required />
          <v-textarea
            v-model="value.body"
            label="本文"
            placeholder="ここにタスク内容が入ります" />
        </div>
      </div>
    </div>

    <div class="mt-8">
      <v-btn @click="$emit('onSubmit')" color="primary">
        {{ btnLabel }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: null
    },
    btnLabel: {
      type: String,
      default: null
    }
  }
}
</script>
