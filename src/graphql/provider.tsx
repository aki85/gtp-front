import React from 'react'
import omitDeep from 'omit-deep-lodash'
import { 
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider } from '@apollo/react-hooks'
import { getMainDefinition } from 'apollo-utilities'
import { useAuthServiceContext } from '../contexts/app'

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
});

const isDevelopment = process.env.NODE_ENV === 'development'

export const GraphqlProvider: React.FC = ({ children }) => {
  const { getToken } = useAuthServiceContext()
  const token = getToken()
  
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

  const client = new ApolloClient({
    connectToDevTools: isDevelopment,
    link: ApolloLink.from([
      authLink,
      cleanTypenameLink,
      httpLink
    ]),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}
