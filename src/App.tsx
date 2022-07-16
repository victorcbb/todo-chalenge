import styles from "./App.module.css"
import { Header } from "./components/Header"
import { TasksBoard } from "./components/TasksBoard"

export function App() {

  return (
    <div>
      <Header />
      <TasksBoard />
    </div>
  )
}
