<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <PingPong />
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <div v-if="first.result && first.result.value">
    <div 
      v-for="task in first.result.value.tasks"
      :key="task.id"
    >
      id: {{ task.id }} title: {{ task.fieldSet.title }} description: {{ task.fieldSet.description }}
    </div>
  </div>
  <div>
    second.loading = {{ second.loading}}
  </div>
  <div>
    second.error = {{ second.error }}
  </div>
  <div v-if="second.result.value">
    result = {{ second.result.value.task }}
  </div>
  <div v-if="result">
    Subscription result: {{ result }}
  </div>
</template>

<script>
import { watch } from '@vue/runtime-core'
import gql from 'graphql-tag'
import { useQuery, useSubscription } from '@vue/apollo-composable'
import HelloWorld from './components/HelloWorld.vue'
import PingPong from './components/PingPong.vue'

const TASKS_QUERY = gql`
  query getTasks {
    tasks {
      fieldSet {
        title
        description
      }
    }
  }
`

const TASK_QUERY = gql`
  query getTask($id: String!) {
    task(id: $id) {
      id
      fieldSet {
        title
        description
      }
    }
  }
`

const TASK_SUBSCRIPTION = gql`
  subscription onTaskAdded {
    taskAdded {
      id
      fieldSet {
        title
        description
      }
    }
  }
`

export default {
  name: 'App',
  components: {
    HelloWorld,
    PingPong
  },
  setup() {
    const first = useQuery(TASKS_QUERY)
    const second = useQuery(TASK_QUERY, { id: 'e7f9aay1re7l5tvqto9' })
    const { result } = useSubscription(TASK_SUBSCRIPTION)  

    watch(() => first.result.value, (here) => {
      console.log('watch', here, first)
    })

    return {
      first,
      second,
      result
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
