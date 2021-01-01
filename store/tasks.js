export const state = () => ({
  tasks: [],
  task: {}
})

export const actions = {
  async fetchTasks({ commit }) {
    const res = await this.$axios.$get('/api/v1/tasks')
    commit('setTasks', res)
  },
  async fetchTask({ commit }, id) {
    const res = await this.$axios.$get('/api/v1/tasks/' + id)
    commit('setTask', res)
  },
  async createTask({ commit }, params) {
    const url = '/api/v1/tasks'
    const res = await this.$axios.$post(url, { task: params }).catch(() => {
      return { errors: ['エラーが発生しました'] }
    })
    if (res.errors && res.errors.length !== 0) {
      return {
        errors: res.errors
      }
    }
    return {}
  },
  async updateTask({ commit }, { taskId, params }) {
    const url = `/api/v1/tasks/${taskId}`
    const res = await this.$axios.$patch(url, { task: params }).catch(() => {
      return { errors: ['エラーが発生しました'] }
    })
    if (res.errors && res.errors.length !== 0) {
      return {
        errors: res.errors
      }
    }
    return {}
  },
  async deleteTask({ commit }, taskId) {
    const url = `/api/v1/tasks/${taskId}`
    const res = await this.$axios.$delete(url).catch(() => {
      return { errors: ['エラーが発生しました'] }
    })
    if (res.errors && res.errors.length !== 0) {
      return {
        errors: res.errors
      }
    }
    return {}
  }
}

export const getters = {
  tasks(state) {
    return state.tasks
  },
  task(state) {
    return state.task
  }
}

export const mutations = {
  setTasks(state, payload) {
    state.tasks = payload
  },
  setTask(state, payload) {
    state.task = payload
  }
}
