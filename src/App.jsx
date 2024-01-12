import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Random from './Components/Random'
import Tag from './Components/Tag'

function App() {
  
  return (
    <>
      <div>
        <Random />
        <Tag />
      </div>
    </>
  )
}

export default App
