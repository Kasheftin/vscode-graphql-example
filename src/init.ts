import gql from 'graphql-tag'

export const query = gql`
  query getTasks {
    task {
      id      
    }
  }
`
