import {isEmpty, size} from 'lodash'
import React, {useState} from 'react' //Huck de estado
import shortid, {isValid} from 'shortid'


function App() {
  const [task, setTask]= useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  const validForm = () => {    
    let isValid = true
    setError(null)

    if(isEmpty(task)){
     setError("Por favor, Insira uma Tarefa")
     isValid = false
    }
    return isValid
  }
  
// Adicionar Tarefas
  const addTask = (e) => {
    e.preventDefault()
    
    if (!validForm()) {
      return
    }    

    const newTask = {
      id: shortid.generate(),
      name: task
    }
    setTasks([ ...tasks, newTask ])
    setTask("")
  }
// Salvar alterações de Tarefas
  const saveTask = (e) => {
    e.preventDefault()
    
    if (!validForm()) {
      return
    }

    const editedTasks = tasks.map(item => item.id === id ? {id, name: task} : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")
  }
// Deletar Tarefas
  const deleteTask = (id) => {
    const filterTasks = tasks.filter(task => task.id !== id)
    setTasks(filterTasks)
  }

  const editTask = (theTask) => {
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }

  return (
    <div className="container mt-5">
      <h1>Tarefas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tarefas</h4>
          {
            size(tasks) === 0 ? (
              <li className="list-group-item text-center text-info">Não Existe Tarefas Inseridas</li>
            ) : ( 
            <ul className="list-group">
              {
                tasks.map((task) =>(
                <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>              
                  <button className="btn btn-danger btn-sm float-right mx-2"
                  onClick={() =>deleteTask(task.id)}
                  >
                    Eliminar
                  </button> 

                  <button className="btn btn-warning btn-sm float-right"
                  onClick={() =>editTask(task)}
                  >
                    Editar
                  </button>             
                </li>
              ))
              }
            </ul>
            )
          }
        </div>
        <div className="col-4">
          <h4 className="text-center">
            { editMode ? "Modificar Tarefa" : "Agendar Tarefas" }
          </h4>
          {
            error && <span className="text-danger">{error}</span>
          }

          <form onSubmit={editMode ? saveTask : addTask}>
            <input type="text" className="form-control mb-2" 
            placeholder="Insira nova tarefa" 
            onChange={(text) => setTask(text.target.value)}
            value={task}
            />

            <button className={ editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"} type="submit">
              { editMode ? "Guardar" : "Adiconar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
