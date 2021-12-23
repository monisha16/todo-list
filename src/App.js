import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoLists from './Components/TodoList/TodoLists';
import './App.css';
import './Components/TodoList/TodoList.module.scss'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TodoLists />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
