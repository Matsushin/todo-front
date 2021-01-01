<template>
  <div>
    <h2 class="mb-3">
      タスク一覧
    </h2>
    <v-btn
      to="/tasks/new"
      color="primary"
      nuxt
      dark>
      タスク新規登録
      <v-icon dark right>
        mdi-plus
      </v-icon>
    </v-btn>
    <div>
      <TaskIndex />
    </div>
  </div>
</template>
<script>
import TaskIndex from '~/components/tasks/TaskIndex'

export default {
  components: {
    TaskIndex
  }
}
</script>
