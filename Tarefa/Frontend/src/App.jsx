import { useState } from 'react'
import {Routes, Route} from "react-router-dom";
import LivroForm from "./Pages/LivroForm";
import LivroList from "./Pages/TodoList";
export default function App() {
  
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <header className='max-w-3xl mx-auto mb-6'>
        <nav className='flex items-center justify-between'>
          <h1 className ='text-2xl font-semibold'>
              Tarefa - Livro
          </h1>
        </nav>
      </header>
      <main className='max-w-3xl mx-auto bg-white rouded-lg shadow p-6'>
        <Routes>
          <Route path="/" element={<LivroList />}/>
          <Route path="/new" element={<LivroForm />}/>
        </Routes>
      </main>
    </div>
  )
}