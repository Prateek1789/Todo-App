import './App.css'
import { AppProvider } from './context/todoContext'

import Header from './components/Header'
import TaskArea from './components/TaskArea'
import AddButton from './components/AddButton'
import TodoForm from './components/TodoForm'

function App() {
  return (
    <AppProvider>
      <Header />
      <TaskArea />
      <AddButton />
      <TodoForm />
    </AppProvider>
  )
}

export default App
