import { AppHeader } from './components/Pages/AppHeader/AppHeader'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import { InfiniteGallery } from './components/Pages/InfinityGallery/InfiniteGallery'
import { useSelector, useDispatch } from './services/store'
import { useEffect } from 'react'
import { getLikesAction } from './actions/ApiActions'
import { registerUserAction } from './actions/ApiActions'


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('TOKEN OK')
      dispatch(getLikesAction());
    } else {
      dispatch(registerUserAction({login: 'superuser', password: Math.random().toString()}));
    }
  }, [dispatch]);


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
