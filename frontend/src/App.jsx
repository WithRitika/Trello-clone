import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BoardPage from "./pages/BoardPage";
import UsersPage from './pages/UsersPage'
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/board/:id" element={<BoardPage />}/>
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
