import { useState } from "react";


function App() {
  return (
    
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/new" element={<TodoNew />} />        {/* ROTA "Nova tarefa" */}
          <Route path="/edit/:id" element={<TodoEdit />} />
        </Routes>
      </div>
   
  );
}

export default App;
