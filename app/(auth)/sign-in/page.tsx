import AuthForm from '@/components/AuthForm'
import { AUTH_TYPE } from '@/constants'
import React from 'react'

const SignInPage = () => {
  return (
    <AuthForm type={AUTH_TYPE.SIGN_IN} />
  )
}

export default SignInPage