import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './css/style.css'
import {
  Button,
  taskUIBlockClass,
  checkboxButtonClass,
  isNotValidInput,
  taskInformation
} from './utils'
import {
} from './const'


function ToDoApp() {
  const [taskListHigh, setTaskListHigh] = useState([]);
  const [taskListLow, setTaskListLow] = useState([]);
  const [inputHighPriorityValue, setInputHighPriorityValue] = useState('');
  const [inputLowPriorityValue, setInputLowPriorityValue] = useState('');

  function handleChange(event) {
    const currentInputPriority = event.target.id;
    if (currentInputPriority === 'high') {
      setInputHighPriorityValue(event.target.value);
    } else {
      setInputLowPriorityValue(event.target.value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const currentFormPriorityIsHigh = event.target.id === 'high';

    const inputIsNotValid = currentFormPriorityIsHigh ? isNotValidInput(inputHighPriorityValue) : isNotValidInput(inputLowPriorityValue);

    if (inputIsNotValid) {
      return
    }

    if (currentFormPriorityIsHigh) {
      setTaskListHigh(taskListHigh.push(taskInformation(inputHighPriorityValue, 'high')));
      setInputHighPriorityValue('');
    } else {
      setTaskListLow(taskListLow.push(taskInformation(inputLowPriorityValue, 'low')));
      setInputLowPriorityValue('');
    }
  }

  return (
    <div className="main_block">
      <ToDoBlock bodyName='HIGH PRIORITY' placeholder='Добавить важных дел' submit={handleSubmit} input={handleChange} inputValue={inputHighPriorityValue} prioprity='high' taskList={taskListHigh} />
      <ToDoBlock bodyName='LOW PRIORITY' placeholder='Добавить' submit={handleSubmit} input={handleChange} inputValue={inputLowPriorityValue} prioprity='low' taskList={taskListLow}/>
    </div>)
}

function ToDoBlock(props) {
  const blockName = props.bodyName;
  const placeholder = props.placeholder;
  const submitHandle = props.submit;
  const inputHandle = props.input;
  const inputValue = props.value;
  const priotity = props.prioprity
  const taskList = props.taskList;

  const taskListOnUI = taskList.map(element=><ToDoTask key={element.id} task={element.task} status={element.status} />);  

  return (
    <div>
      <div className='listHeader'>{blockName}</div>
      <div className="coordinate">
        <ToDoHeader placeholder={placeholder} submit={submitHandle} input={inputHandle} value={inputValue} priorityMarker={priotity} />
      </div>
      {taskListOnUI}
    </div>
  )
}

function ToDoHeader(props) {
  const placeholder = props.placeholder;
  const submit = props.submit;
  const inputChange = props.input;
  const inputValue = props.value;
  const priority = props.priorityMarker;

  return (
    <form onSubmit={submit} id={priority}>
      <input className="addTask" placeholder={placeholder} type="text" onChange={inputChange} value={inputValue} id={priority} />
      <Button class='add' type='submit' />
    </form>
  )
}

function ToDoTask(props) {
  const key = props.key;
  const task = props.task;
  const status = props.status;

  return (
    <div className={taskUIBlockClass(status)} key={key}>
      <Button class={checkboxButtonClass(status)} />
      <p>{task}</p>
      <Button class='delete'/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ToDoApp />);