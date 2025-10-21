import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./components/Register"
import Home from "./pages/home"
import Login from "./components/Login"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
