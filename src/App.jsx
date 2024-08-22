import React from 'react'
import CreateForm from './components/CreateForm'
import FormList from './components/FormList'
import { FormProvider } from './context/FormContext'
import './App.css'

function App() {
  return (
    <FormProvider>
      <div className="App">
        <h1>Form Creator</h1>
        <CreateForm />
        <FormList />
      </div>
    </FormProvider>
  )
}

export default App