import React from 'react'
import { LabsWhite } from '../assets'

const Footer = () => {
  return (
    <footer className="bg-darker w-full h-24 flex items-center justify-between px-16">
        <p className="text-lighter">Underground Labs ©2025</p>
        <img src={LabsWhite} alt="Logo" className="h-6" />
    </footer>
  )
}

export default Footer
