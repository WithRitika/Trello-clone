import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BoardPage from "./pages/BoardPage";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/board/:id" element={<BoardPage />}/>
      </Routes>
    </BrowserRouter>
  )
};

export default App;
