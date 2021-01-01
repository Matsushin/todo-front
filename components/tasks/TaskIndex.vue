<template>
  <div class="task-table">
    <Errors :errors="errors" />
    <div v-if="loading">
      <v-row
        class="mt-10"
        align="center"
        justify="center">
        <v-progress-circular
          indeterminate
          color="primary" />
      </v-row>
    </div>
    <div v-else>
      <v-data-table
        :headers="headers"
        :items="tasks"
        item-key="id"
        loading-text="読込中"
        no-data-text="データがありません。">
        <template v-slot:item.body="{ item }">
          {{ item.body | truncate(20, '...') }}
        </template>
        <template v-slot:item.created_at="{ item }">
          {{ ymdhms(item.created_at) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            :to="`/tasks/${item.id}`"
            class="ma-2"
            color="success"
            nuxt
            dark>
            詳細
          </v-btn>
          <v-btn
            @click="edit(item.id)"
            class="ma-2"
            color="primary"
            dark>
            編集
            <v-icon dark right>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn
            @click="handleDeleteTask(item.id)"
            class="ma-2"
            color="red"
            dark>
            削除
            <v-icon dark right>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Errors from '@/components/shared/Errors'

export default {
  components: {
    Errors
  },
  filters: {
    truncate(value, length, omission) {
      if (value.length <= length) return value
      return value.substring(0, length) + omission
    }
  },
  data() {
    return {
      tasks: [],
      errors: [],
      loading: true,
      headers: [
        {
          text: 'タイトル',
          align: 'start',
          value: 'title'
        },
        { text: '内容', value: 'body' },
        { text: '作成日時', value: 'created_at' },
        { text: '操作', sortable: false, value: 'actions' }
      ]
    }
  },
  // computed: {
  //   ...mapGetters({
  //     tasks: 'tasks/tasks',
  //   })
  // },
  created() {
    this.fetchTasks()
  },
  methods: {
    edit(id) {
      this.$router.push({
        name: 'tasks-id-edit',
        params: {
          id: id
        }
      })
    },
    handleDeleteTask(id) {
      if (confirm('タスクを削除しますか？')) {
        this.deleteTask(id)
      }
    },
    async fetchTasks() {
      //await this.$store.dispatch('tasks/fetchTasks')
      this.tasks = await this.$axios.$get('/api/v1/tasks/')
      this.loading = false
    },
    async deleteTask(id) {
      const res = await this.$store.dispatch('tasks/deleteTask', id)

      if (res.errors) {
        this.errors = res.errors
      } else {
        this.fetchTasks()
        this.$toast.info('タスクを削除しました。')
      }
    }
  }
}
</script>
