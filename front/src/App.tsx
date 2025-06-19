import { AppHeader } from "./components/AppHeader/AppHeader";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { InfiniteGallery } from "./Pages/InfinityGallery/InfiniteGallery";
import { useDispatch } from "./services/store";
import { useEffect } from "react";
import { getLikesAction } from "./actions/ApiActions";
import { registerUserAction } from "./actions/ApiActions";
import { Favorites } from "./Pages/Favorites/Favorites";
import { getCatsAction } from "./actions/ApiActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      console.log("Вход прошел успешно");
      dispatch(getLikesAction())
    } else {
      console.log("Регистрируем пользователя");
      dispatch(
        registerUserAction({
          login: "superuser",
          password: Math.random().toString(),
        })
      );
    }
    dispatch(getCatsAction());
    return () => {};
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <AppHeader />
            <InfiniteGallery />
          </>
        }
      />
      <Route
        path="/favorites"
        element={
          <>
            <AppHeader />
            <Favorites />
          </>
        }
      />
      <Route path="*" element={<>Страница не найдена</>} />
    </Routes>
  );
}

export default App;
