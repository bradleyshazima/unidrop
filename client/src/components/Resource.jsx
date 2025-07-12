import React from 'react'

const Resource = () => {
  return (
    <section className='w-full flex flex-col items-center gap-10 py-12 select-none'>
        <h4 className='text-darker dark:text-lighter font-semibold text-2xl max-w-[700px] text-wrap text-center'>LEarn React JS Full Course</h4>
        <div className='flex items-center justify-center h-fit w-fit gap-10'>
            <div className="w-[400px] h-[225px] rounded-2xl bg-mid"></div>
            <div className='bg-mid min-w-[240px] h-[225px] flex flex-col items-center rounded-2xl overflow-hidden overflow-y-auto'>
                <ul>
                    <li className='text-lighter border-light border-b-2 py-4 px-2 flex items-center gap-4 justify-between'>
                        <span>1080p</span>
                        <span>250mb</span>
                        <button type="button" className='bg-darker text-lighter rounded-2xl text-[8px] py-2 px-4'>Download</button>
                    </li>
                    <li className='text-lighter border-light border-b-2 py-4 px-2 flex items-center gap-4 justify-between'>
                        <span>720p</span>
                        <span>120mb</span>
                        <button type="button" className='text-lighter bg-darker rounded-2xl text-[8px] py-2 px-4'>Download</button>
                    </li>
                    <li className='text-lighter border-light border-b-2 py-4 px-2 flex items-center gap-4 justify-between'>
                        <span>480p</span>
                        <span>64mb</span>
                        <button type="button" className='text-lighter bg-darker rounded-2xl text-[8px] py-2 px-4'>Download</button>
                    </li>
                    <li className='text-lighter border-light border-b-2 py-4 px-2 flex items-center gap-4 justify-between'>
                        <span>480p</span>
                        <span>64mb</span>
                        <button type="button" className='text-lighter bg-darker rounded-2xl text-[8px] py-2 px-4'>Download</button>
                    </li>
                    <li className='text-lighter border-light border-b-2 py-4 px-2 flex items-center gap-4 justify-between'>
                        <span>480p</span>
                        <span>64mb</span>
                        <button type="button" className='text-lighter bg-darker rounded-2xl text-[8px] py-2 px-4'>Download</button>
                    </li>
                </ul>
            </div>
        </div>
    </section>
  )
}

export default Resource