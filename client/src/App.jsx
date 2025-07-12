import { useState } from 'react'
import './App.css'
import { Nav, Search, Steps, Footer, Resource } from './components'

function App() {
  const [videoData, setVideoData] = useState(null)
  return (
    <div className="min-h-screen flex flex-col bg-lighter dark:bg-darker">
      <Nav />

      <main className="flex-grow w-full flex flex-col items-center">
        <h3 className="text-darker dark:text-lighter text-center font-bold text-2xl mt-6">
          UNIVERSAL VIDEO DOWNLOADER
        </h3>
        <p className="font-medium text-center text-darker dark:text-lighter mb-4">
          Download videos from anywhere on the net with UNIDROP
        </p>

        <Search onResult={setVideoData} />
        {videoData && <Resource data={videoData} />}
        <Steps />
      </main>

      <Footer />
    </div>
  )
}

export default App
