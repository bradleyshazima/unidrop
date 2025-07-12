import React, { useState } from 'react'

const Search = () => {
  const [value, setValue] = useState('')

  const handleClear = () => {
    setValue('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    console.log('Searching for:', value)
    // Call your backend here
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[700px] h-20 overflow-hidden rounded-2xl flex items-center my-16 bg-light dark:bg-mid"
    >
      <div className="relative h-full flex-1">
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="eg: https://youtu.be/videourl"
          className="h-full w-full bg-light outline-0 border-0 px-8 pr-12"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-darker"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      <button
        type="submit"
        className="text-lighter font-semibold bg-dark px-8 h-full cursor-pointer"
      >
        FIND
      </button>
    </form>
  )
}

export default Search
