import React, { useEffect, useState } from 'react'
import { LabsBlack, LabsWhite, SunMoon } from '../assets'

const Nav = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
    localStorage.setItem('theme', !isDark ? 'dark' : 'light')
  }

  return (
    <div
      className={`w-full h-[96px] flex items-center justify-between px-[64px] bg-lighter dark:bg-darker sticky top-0 z-50 transition-shadow ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <a href="#">
        <h3 className='text-lg font-bold text-darker dark:text-lighter'>UNIDROP</h3>
      </a>
      <img src={isDark ? LabsWhite : LabsBlack} alt="Logo" />
      <button
        onClick={toggleDarkMode}
        className="justify-center items-center h-12 w-12 rounded-full bg-darker dark:bg-lighter flex"
      >
        <img src={SunMoon} alt="Dark/Light" className="w-8" />
      </button>
    </div>
  )
}

export default Nav
