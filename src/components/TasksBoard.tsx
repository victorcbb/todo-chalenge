import { v4 as uuidv4 } from 'uuid'
import { PlusCircle } from "phosphor-react"
import { useState } from "react"
import { Trash } from "phosphor-react";

import styles from "./TasksBoard.module.css"

import imageClipboard from "../assets/Clipboard.svg"
import imgCircle from "../assets/circle.png"
import imgCircleChecked from "../assets/circle-checked.png"

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TasksBoard() {
  const [tasksList, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const totalTasks = tasksList.length

  const tasksCompleted = tasksList.filter(task => task.isComplete === true)
  

  function handleAddNewTask() {

    if(!newTaskTitle) {
      return
    }

    const newTasks = {
      id: uuidv4(),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks(prevState => [
      ...prevState, newTasks
    ])

    setNewTaskTitle("")
  }

  function handleToggleTaskCompletion(id: string) {
    const newTasks = tasksList.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task)
    
    setTasks(newTasks)
  }

  function handleDeleteTask (id: string) {
    const newTasks = tasksList.filter(task => task.id !== id)

    setTasks(newTasks)
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.createTask}>
        <input 
          type="text" 
          placeholder="Adicione uma nova tarefa" 
          onChange={e => setNewTaskTitle(e.target.value)}
          value={newTaskTitle}
        />
        <button type="button" onClick={handleAddNewTask}>
          Criar
          <PlusCircle size={16} />
        </button>
      </form>

      <main>
        <div className={styles.header}>
          <div className={styles.tasks}>
            <strong>Tarefas criadas</strong>
            <span>{totalTasks}</span>
          </div>
          <div className={styles.concluded}>
            <strong>Concluídas</strong>
            <span>
              {tasksCompleted.length} de {totalTasks}
              </span>
          </div>
        </div>

        <section className={styles.clipBoard}>
          {
            (totalTasks === 0) && 
            <div className={styles.emptyClipboard}>
              <img src={imageClipboard} alt="desenho de uma prancheta" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          }
          <ul>
          {
            tasksList && tasksList.map(taskList => (
              <li key={taskList.id}>
                <div className={styles.wrapperTask}>
                  <button type="button" className={styles.checkmark} onClick={() => handleToggleTaskCompletion(taskList.id)}>
                    <img src={taskList.isComplete === true ? imgCircleChecked : imgCircle} alt="Checkbox" />
                  </button>
                  <p className={taskList.isComplete === true ? styles.checked : ""}>{taskList.title}</p>
                  <button type="button" onClick={() => handleDeleteTask(taskList.id)}>
                    <Trash size={24} />
                  </button>
                </div>
              </li>
            ))
          }
          </ul>
        </section>
      </main>
    </div>
  )
}