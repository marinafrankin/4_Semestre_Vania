import { useState } from 'react'
import {Routes, Route} from "react-router-dom";
import BairroForm from "./Pages/BairroForm";
import BairroList from "./Pages/BairroList";
import BairroTipoList from "./Pages/BairroTipoList";


export default function App() {
  
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <header className='max-w-3xl mx-auto mb-6'>
        <nav className='flex items-center justify-between'>
          <h1 className ='text-2xl font-semibold'>
              Reclamações de Bairros
          </h1>
        </nav>
      </header>
      <main className='max-w-3xl mx-auto bg-white rounded-lg shadow p-6'>
        <Routes>
            <Route path="/" element={<BairroList />} />
            <Route path="/new" element={<BairroForm />} />
            <Route path="/buscarPorTipo" element={<BairroTipoList />} />
      </Routes>
      </main>
    </div>
  )
}