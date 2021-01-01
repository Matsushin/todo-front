<template>
  <div class="new-task-container">
    <h2 class="mb-3">
      タスク新規登録
    </h2>
    <a type="primary" nuxt href="/tasks">
      タスク一覧へ戻る
    </a>
    <Errors :errors="errors" />
    <TaskForm
      @onSubmit="handleSubmit"
      v-model="formData"
      btn-label="この内容で登録する" />
  </div>
</template>

<script>
import Errors from '@/components/shared/Errors'
import TaskForm from '~/components/tasks/TaskForm'

export default {
  components: {
    Errors,
    TaskForm
  },
  data() {
    return {
      formData: {},
      errors: []
    }
  },
  methods: {
    async handleSubmit() {
      const params = {
        title: this.formData.title || '',
        body: this.formData.body || ''
      }
      await this.createtask(params)
    },
    async createtask(params) {
      const res = await this.$store.dispatch('tasks/createTask', params)
      if (res.errors) {
        this.errors = res.errors
      } else {
        this.$router.push('/tasks')
        this.$toast.info('タスクを新規登録しました。')
      }
    }
  }
}
</script>
