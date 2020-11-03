import React from 'react'
import omitDeep from 'omit-deep-lodash'
import { 
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { ApolloProvider } from '@apollo/react-hooks'
import { getMainDefinition } from 'apollo-utilities'
import { useTokenContext, useAppContext } from '../contexts/app'

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
})

const isDevelopment = process.env.NODE_ENV === 'development'

export const GraphqlProvider: React.FC = ({ children }) => {
  const { token } = useTokenContext()
  const { logout } = useAppContext()
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    }
  })

  const cleanTypenameLink = new ApolloLink((operation, forward) => {
    const def = getMainDefinition(operation.query)
    if (def && def.kind === 'OperationDefinition' && def.operation === 'mutation') {
      operation.variables = omitDeep(operation.variables, '__typename')
    }
    return forward ? forward(operation) : null
  })

  const errorLink = onError(({ response, graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        // console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        return
      })
    }

    const authError = graphQLErrors && graphQLErrors.find(({ message }) => message === 'Unauthorized')
    if (authError) {
      logout()
      if (response) {
        response.errors = undefined
      }
    }
  })

  const client = new ApolloClient({
    connectToDevTools: isDevelopment,
    link: ApolloLink.from([
      authLink,
      errorLink,
      cleanTypenameLink,
      httpLink
    ]),
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
