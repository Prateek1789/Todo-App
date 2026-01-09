import './App.css'
import { AppProvider } from './context/TodoContext'

import Header from './components/Header'
import TaskArea from './components/TaskArea'
import TodoForm from './components/TodoForm'

function App() {
  return (
    <AppProvider>
      <main className="max-w-2xl w-full h-full py-8 flex flex-col gap-8">
        <Header />
        <TodoForm />
        <TaskArea />
      </main>
    </AppProvider>
  )
}

export default App
