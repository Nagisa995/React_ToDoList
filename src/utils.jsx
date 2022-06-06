import {
  taskInProgress,
  taskDone
} from './const'

export function Button(props) {
  const buttonClassName = props.class;
  const buttonType = props.type;

  return (
    <button className={buttonClassName} type={buttonType} />
  )
}

export function taskUIBlockClass(status) {
  if (status === 'done') {
    return taskDone.block;
  } else {
    return taskInProgress.block;
  }
}

export function checkboxButtonClass(status) {
  if (status === 'done') {
    return taskDone.checkbox;
  } else {
    return taskInProgress.checkbox;
  }
}

export function isNotValidInput(value) {
  return (value.split(' ').join('') === '');
}

export function taskInformation(task, priority) {
  return {
    id:Date.now(),
    task: task,
    priority: priority,
    status: 'active'
  };
}