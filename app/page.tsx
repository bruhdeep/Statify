import UserInfo from '@/components/UserInfo'
import Link from 'next/link'
import React from 'react'

const Landing = () => {
  return (
    <div className='grid'>
      Hello
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </div>
  )
}

export default Landing
