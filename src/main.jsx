import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './css/style.css'
import {
  Button,
} from './utils'

function ToDoList() {
  return (
    <div className="main_block">
      <ToDoBody bodyName='HIGH PRIORITY' placeholder='Добавить важных дел' />
      <ToDoBody bodyName='LOW PRIORITY' placeholder='Добавить' />
    </div>)
}

function ToDoBody(props) {
  const priority = props.bodyName;
  const placeholder = props.placeholder;
  return (
    <div>
      <div className='listHeader'>{priority}</div>
      <div className="coordinate">
        <InputForm placeholder={placeholder} />
      </div>
      <div>
        <ToDoTask />
      </div>
    </div>
  )
}

function InputForm(props) {
  const placeholder = props.placeholder;
  return (
    <form>
      <input className="addTask" placeholder={placeholder} type="text" />
      <Button class='add' type='submit' />
    </form>
  )
}

function ToDoTask(props) {
  return (
    <div className="checkbox coordinate">
      <Button class='btnBig' />
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, quae!</p>
      <Button class='delete' />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ToDoList />);