import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { RouteProps } from 'react-router'

import { useAccountContext } from '../../contexts/app'

type Props = RouteProps & { fallbackPath: string }

const PrivateRoute: React.FC<Props> = (props: Props) => {
  const { component, children, fallbackPath, ...rest } = props
  const { token } = useAccountContext()

  const renderNextRoute = (routeProps: RouteProps) => {
    if (!token) {
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

export default PrivateRoute
