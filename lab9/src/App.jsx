import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ControlsBar from './components/ControlBars.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
      <ControlsBar/>
  )
}

export default App
