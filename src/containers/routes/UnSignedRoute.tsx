import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { RouteProps } from 'react-router'

import { useTokenContext } from '../../contexts/app'

type Props = RouteProps & { fallbackPath: string }

const UnSignedRoute: React.FC<Props> = (props: Props) => {
  const { component, children, fallbackPath, ...rest } = props
  const { token } = useTokenContext()

  const renderNextRoute = (routeProps: RouteProps) => {
    if (routeProps.location?.pathname === '/') return <Route {...props} />
    if (token) {
      return <Redirect to={{
          pathname: fallbackPath,
          state: { from: routeProps.location }
        }}
      />
    }
    return <Route {...props} />
  }

  return <Route {...rest} render={renderNextRoute} />
}

export default UnSignedRoute
