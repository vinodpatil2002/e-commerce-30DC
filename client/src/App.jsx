import React from 'react'
import Header from './components/headers/Header'
import Pages from './components/mainpages/Pages'
import { BrowserRouter } from 'react-router-dom'


export default function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Pages />
      </div>
    </BrowserRouter>
  )
}
