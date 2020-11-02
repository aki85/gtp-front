import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { RouteProps } from 'react-router'

import { useAuthServiceContext } from '../../contexts/app'

type Props = RouteProps & { fallbackPath: string }

const UnSignedRoute: React.FC<Props> = (props: Props) => {
  const { component, children, fallbackPath, ...rest } = props
  const { getToken } = useAuthServiceContext()

  const renderNextRoute = (routeProps: RouteProps) => {
    if (routeProps.location?.pathname === '/') return <Route {...props} />
    if (getToken()) {
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
