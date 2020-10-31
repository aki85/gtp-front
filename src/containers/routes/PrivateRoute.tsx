import React from 'react'
import { Route } from 'react-router-dom'
// import { Route, Redirect } from 'react-router-dom'
import { RouteProps } from 'react-router'

// import { useAccountServiceContext } from '../../contexts/app'

type Props = RouteProps & { fallbackPath: string }

const PrivateRoute: React.FC<Props> = (props: Props) => {
  const { component, children, fallbackPath, ...rest } = props
  // const accountService = useAccountServiceContext()

  const renderNextRoute = (routeProps: RouteProps) => {
    // if (!accountService.loadAuth()) {
    //   return <Redirect to={{
    //       pathname: fallbackPath,
    //       state: { from: routeProps.location }
    //     }}
    //   />
    // }
    return <Route {...props} />
  }

  return <Route {...rest} render={renderNextRoute} />
}

export default PrivateRoute
