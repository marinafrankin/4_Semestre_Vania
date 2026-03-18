import {Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import CreateBook from "./Pages/CreateBook";
import FindByAuthor from "./Pages/FindByAuthor";
import LivroEdit from "./Pages/LivroEdit";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/criar" element={<CreateBook/>}></Route>
          <Route path="/buscarPorAutor" element={<FindByAuthor/>}></Route>
          <Route path="/edit/:id" element={<LivroEdit/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App