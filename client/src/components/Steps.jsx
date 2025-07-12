import React from 'react'

const Steps = () => {
  return (
    <section className='w-full h-fit flex flex-col items-center gap-8 my-16'>
        <h3 className='text-darker dark:text-lighter text-xl font-bold'>IN 3 SIMPLE STEPS</h3>
        <ul className='flex items-center gap-8'>
            <li>
                <div className='max-w-80 h-24 rounded-2xl text-wrap px-8 py-4 flex items-center justify-center text-center bg-dark dark:bg-mid text-lighter'>1. Paste the video link.</div>
            </li>
            <li>
                <div className='max-w-80 h-24 rounded-2xl text-wrap px-8 py-4 flex items-center justify-center text-center bg-dark dark:bg-mid text-lighter'>2. Tap Find.</div>
            </li>
            <li>
                <div className='max-w-80 h-24 rounded-2xl text-wrap px-8 py-4 flex items-center justify-center text-center bg-dark dark:bg-mid text-lighter'>3. Pick a resolution — then download.</div>
            </li>
        </ul>
    </section>
  )
}

export default Steps