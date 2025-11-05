import React from 'react'
import { Suspense } from 'react'
import ForgotPassword from './_forgot-password'

const page = () => {
  return (
    <Suspense>
        <ForgotPassword />
    </Suspense>
  )
}

export default page