import AuthForm from '@/components/AuthForm'
import { AUTH_TYPE } from '@/constants'
import React from 'react'

const SignUpPage = () => {
  return (
    <AuthForm type={AUTH_TYPE.SIGN_UP} />
  )
}

export default SignUpPage