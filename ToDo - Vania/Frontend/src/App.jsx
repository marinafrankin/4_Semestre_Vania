import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import TodoForm from "./Pages/TodoForm";
import TodoList from './Pages/TodoList';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <header className='max-w-3x1 mx-auto mb-6'>
        <nav className='flex items-center justify-between'>
          <h1 className='tex-2x1 font-semibold'>
            ToDo
          </h1>
        </nav>
      </header>
      <main className='max-w-3x1 mx-auto bg-white rouded-1g shadow p-6'>
        <Routes>
          <Route path="/" element={<TodoList/>}/>
          <Route path="/new" element={<TodoForm/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
