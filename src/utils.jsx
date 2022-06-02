export function Button(props) {
    const buttonClassName = props.class;
    const buttonType = props.type;
  
    return (
      <button className={buttonClassName} type={buttonType} />
    )
  }