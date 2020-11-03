import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAppContext } from '../contexts/app'
import { githubOAuth } from '../repos/githubOAuth'

const LoginComponent: React.FC = () => {
  const [hasError, setHasError] = useState(false)
  const history = useHistory()
  const { loginByCoop } = useAppContext()
  async function onSubmit(e: any) {
    e.preventDefault()
    setHasError(false)
    const data = await githubOAuth()

    try {
      await loginByCoop({
        type: 'github',
        id: data.id,
        email: data.email,
        name: data.name,
        alias: data.alias
      })
    } catch(e) {
      setHasError(true)
      return
    }
    history.push('/')
  }

  return (
    <>
      <h2>ログイン</h2>
      <Form name="login">
        <a onClick={(e) => onSubmit(e)} className="btn btn-social btn-github"><i className="fab fa-github" /> Login with GitHub</a>
      </Form>
      {hasError && <div className="error">※アカウントが存在しません。</div>}
      <div className="link"><Link to='/signup'>新規登録はこちら</Link></div>
      <div className="caution">※現在上記SNSのアカウントのみログインが可能です</div>
    </>
  )
}

export default LoginComponent