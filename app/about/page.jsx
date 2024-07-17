
'use client'
import React from 'react'
import withAuth from '../middleware/withAuth'

function Aboutpage() {
  return (
    <div>page</div>
  )
}

export default withAuth(Aboutpage,['user'])