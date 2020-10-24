import React from 'react'
import { Form } from 'react-bootstrap'

declare global {  
  interface Window {  
    OAuth: any  
  }  
} 

const LoginComponent: React.FC = () => {
  async function onSubmit(e: any) {
    e.preventDefault()
    let data: any
    window.OAuth.initialize(process.env.REACT_APP_OAUTH_API_KEY)
    const provider = await window.OAuth.popup('github')

    data = await provider.me()

    console.log("data: ", data)
    alert("Welcome " + data.name + "!")

    data = await provider.get('/user')
    console.log('self data:', data)
  }

  return (
    <>
      <Form name="login">
        <a onClick={(e) => onSubmit(e)} className="btn btn-social btn-github"><i className="fab fa-github" /> Sign in with Github</a>
      </Form>
    </>
  )
}

export default LoginComponent