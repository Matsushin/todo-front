<template>
  <div class="edit-task-container">
    <h2 class="mb-3">
      タスク編集
    </h2>
    <a type="primary" nuxt href="/tasks">
      タスク一覧へ戻る
    </a>
    <Errors :errors="errors" />
    <TaskForm
      @onSubmit="handleSubmit"
      v-model="formData"
      btn-label="この内容で編集する" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Errors from '@/components/shared/Errors'
import TaskForm from '~/components/tasks/TaskForm'

export default {
  components: {
    Errors,
    TaskForm
  },
  data() {
    return {
      formData: {
        title: '',
        body: ''
      },
      errors: []
    }
  },
  computed: {
    ...mapGetters({
      task: 'tasks/task'
    })
  },
  async created() {
    await this.$store.dispatch('tasks/fetchTask', this.$route.params.id)
    this.formData = { ...this.task }
  },
  methods: {
    async handleSubmit() {
      const params = {
        title: this.formData.title || '',
        body: this.formData.body || ''
      }
      await this.updateTask(this.task, params)
    },
    async updateTask(task, params) {
      const res = await this.$store.dispatch('tasks/updateTask', { taskId: task.id, params: params })
      if (res.errors) {
        this.errors = res.errors
      } else {
        this.$store.dispatch('tasks/fetchTask', task.id)
        this.$router.push('/tasks')
        this.$toast.info('タスクを変更しました。')
      }
    }
  }
}
</script>
