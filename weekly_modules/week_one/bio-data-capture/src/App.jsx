import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CaptureBioData from './components/CaptureBioData/CaptureBioData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CaptureBioData />
    </>
  )
}

export default App
