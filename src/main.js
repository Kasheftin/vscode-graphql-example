import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client/core'
import { WebSocketLink } from '@apollo/client/link/ws'
import App from './App.vue'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql'
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3000/`,
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.mount('#app')
