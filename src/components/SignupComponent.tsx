import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuthServiceContext } from '../contexts/app'
import { githubOAuth } from '../repos/githubOAuth'

const SignupComponent: React.FC = () => {
  const [hasError, setHasError] = useState(false)
  const history = useHistory()
  const { signupByCoop } = useAuthServiceContext()
  async function onSubmit(e: any) {
    e.preventDefault()
    setHasError(false)
    const data = await githubOAuth()

    try {
      await signupByCoop({
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
    history.push('/register')
  }

  return (
    <>
      <h2>アカウント作成</h2>
      <div className="explain">GitHubアカウントを用いてアカウントの作成が可能です</div>
      <Form name="signup">
        <a onClick={(e) => onSubmit(e)} className="btn btn-social btn-github"><i className="fab fa-github" /> Sign up using GitHub</a>
      </Form>
      {hasError && <div className="error">※既に登録済みのアカウントです</div>}
      <div className="link"><Link to='/login'>アカウントをお持ちの方はこちら: ログイン</Link></div>
      <div className="caution">※GitHubに紐づけられているメールアドレスに対して、確認用のアドレスが送信されます。</div>
    </>
  )
}

export default SignupComponent