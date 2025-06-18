import { useState } from 'react'
import { AppHeader } from './components/Pages/AppHeader/AppHeader'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import { InfiniteGallery } from './components/Pages/InfinityGallery/InfiniteGallery'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={
        <>
          <AppHeader />
          <InfiniteGallery/>
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
