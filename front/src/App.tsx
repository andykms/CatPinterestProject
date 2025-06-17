import { useState } from 'react'
import { AppHeader } from './components/Pages/AppHeader/AppHeader'
import './App.css'
import {Routes, Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={
        <>
          <AppHeader />
        </>
        } />
      <Route path="/favorites" element={
        <>
          <AppHeader />
        </>
        } />
      <Route path="*" element={
        <>
          Страница не найдена
        </>
        } />
    </Routes>
  )
}

export default App
