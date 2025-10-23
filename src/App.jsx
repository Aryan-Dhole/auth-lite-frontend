import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Home from "./pages/home"
import Login from "./pages/Login"
import Profile from "./pages/profile"
import IdeaVault from "./pages/IdeaVault"
import PrivateRoute from "./components/PrivateRoute"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/ideavault"
          element={
            <PrivateRoute>
              <IdeaVault />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
