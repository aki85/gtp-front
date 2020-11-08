import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { RouteProps } from 'react-router'

import { useAccountContext } from '../../contexts/app'

type Props = RouteProps & { fallbackPath: string }

const validateEnablePrivatePath = (pathname: string|undefined) => {
  if (!pathname) return false
  const rules = [
    pathname === '/',
    !!pathname.match(/^\/view\/[^\/]/)
  ]
  return rules.includes(true)
}

const UnSignedRoute: React.FC<Props> = (props: Props) => {
  const { component, children, fallbackPath, ...rest } = props
  const { token } = useAccountContext()

  const renderNextRoute = (routeProps: RouteProps) => {
    if (validateEnablePrivatePath(routeProps.location?.pathname)) return <Route {...props} />
    const transitionState: any = rest.location?.state
    const signedPath = validateEnablePrivatePath(transitionState?.from?.pathname) ? transitionState?.from?.pathname : ''
    const signedSearch = transitionState?.from?.search
    if (token) {
      return <Redirect to={{
          pathname: signedPath || fallbackPath,
          search: signedSearch || '',
          state: { from: routeProps.location }
        }}
      />
    }
    return <Route {...props} />
  }

  return <Route {...rest} render={renderNextRoute} />
}

export default UnSignedRoute
