import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './css/style.css'
import {
  Button,
  taskUIBlockClass,
  checkboxButtonClass,
  isNotValidInput,
  taskInformation,
  getTaskID
} from './utils'

function ToDoApp() {
  const [taskList, setTaskList] = useState([]);
  const [inputHighValue, setInputHighValue] = useState('');
  const [inputLowValue, setInputLowValue] = useState('');

  function handleHighSubmit(e) {
    setInputHighValue(e.target.value);
  }

  function handleLowSubmit(e) {
    setInputLowValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formPriority = e.target.id;
    const formPriorityIsHigh = formPriority === 'high';

    const inputIsNotValid = formPriorityIsHigh ? isNotValidInput(inputHighValue) : isNotValidInput(inputLowValue);

    if (inputIsNotValid) {
      return
    }

    if (formPriorityIsHigh) {
      const newTaskList = [...taskList, taskInformation(inputHighValue, formPriority)];
      setTaskList(newTaskList);
      setInputHighValue('');
    } else {
      const newTaskList = [...taskList, taskInformation(inputLowValue, formPriority)];
      setTaskList(newTaskList);
      setInputLowValue('');
    }
  }

  function changeTaskStatus(e) {
    const taskID = getTaskID(e.target);
    const currentTaskList = [...taskList];

    const taskIDinList = currentTaskList.findIndex(element => { if (element.id === +taskID) return true });
    const currentTaskStatus = currentTaskList[taskIDinList].status;

    const statusIsDone = currentTaskStatus === 'done';
    if (statusIsDone) {
      currentTaskList[taskIDinList].status = 'active';
    } else {
      currentTaskList[taskIDinList].status = 'done';
    }

    setTaskList(currentTaskList);
  }

  function deleteTask(e) {
    const taskID = getTaskID(e.target);
    const currentTaskList = [...taskList];

    const taskIDinList = currentTaskList.findIndex(element => { if (element.id === +taskID) return true });

    currentTaskList.splice(taskIDinList, 1);

    setTaskList(currentTaskList);
  }

  return (
    <div className="main_block">
      <ToDoBlock bodyName='HIGH PRIORITY' placeholder='Добавить важных дел' id='high' change={handleHighSubmit} value={inputHighValue} submit={handleSubmit} taskList={taskList} taskStatus={changeTaskStatus} taskDelete={deleteTask}/>
      <ToDoBlock bodyName='LOW PRIORITY' placeholder='Добавить' id='low' change={handleLowSubmit} value={inputLowValue} submit={handleSubmit} taskList={taskList} taskStatus={changeTaskStatus} taskDelete={deleteTask}/>
    </div>)
}

function ToDoBlock(props) {
  const blockName = props.bodyName;
  const placeholder = props.placeholder;
  const id = props.id;
  const value = props.value;
  const taskList = props.taskList;
  const taskOnUI = [];
  taskList.forEach(element => {
    if (element.priority === id) {
      taskOnUI.push(<ToDoTask task={element.task} status={element.status} id={element.id} statusChange={props.taskStatus} deleteTask={props.taskDelete}/>)
    }
  })

  return (
    <div>
      <div className='listHeader'>{blockName}</div>
      <div className="coordinate">
        <ToDoHeader placeholder={placeholder} change={props.change} id={id} value={value} submit={props.submit} />
      </div>
      {taskOnUI}
    </div>
  )
}

function ToDoHeader(props) {
  const placeholder = props.placeholder;
  const id = props.id;
  const value = props.value;

  return (
    <form onSubmit={props.submit} id={id}>
      <input className="addTask" placeholder={placeholder} type="text" onChange={props.change} value={value} />
      <Button class='add' type='submit' />
    </form>
  )
}

function ToDoTask(props) {
  const task = props.task;
  const status = props.status;
  const id = props.id;

  return (
    <div className={taskUIBlockClass(status)} id={id} >
      <Button class={checkboxButtonClass(status)} click={props.statusChange} />
      <p>{task}</p>
      <Button class='delete' click={props.deleteTask}/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ToDoApp />);