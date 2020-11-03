import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useAppContext } from '../contexts/app'

declare global {  
  interface Window {  
    OAuth: any  
  }  
} 

const RegisterComponent: React.FC = () => {
  const history = useHistory()
  const { token } = useParams()
  const [isInvalid, setIsInvalid] = useState(false)
  const { register } = useAppContext()

  if (!isInvalid && token) {
    register(token).then(res => {
      history.push('/')
    }).catch(() => {
      setIsInvalid(true)
    })
  }

  return (
    <>
      {!token &&
        <div>
          githubに登録しているメールアドレス宛に確認用のアドレスを送信しました。<br />
          24時間経過すると確認用のアドレスは無効になります。
        </div>
      }
      {!isInvalid && token &&
        <div>
          アカウントを作成中です。お待ちください。
        </div>
      }
      {isInvalid &&
        <div>
          URLが無効です。受け取ったメールを確認してください。
        </div>
      }
    </>
  )
}

export default RegisterComponent