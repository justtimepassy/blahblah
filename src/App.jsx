import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Up_part from './up_part'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Up_part/>
    </>
  )
}

export default App
