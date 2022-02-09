import {useState} from 'react';

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

const ExpenseItem = props => {

  const [title, setTitle] = useState(props.title);

  console.log('this is title in the expense item' , title);
  
  const clickHandler = () => {
    console.log('calling clickHandler');
    setTitle('updated title');
    console.log('this is title in the clickhandler: ', title);
  }

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <h2>{title}</h2>
      <div className="expense-item__desription">
        <div className="expense-item__price">${props.amount}</div>
      </div>
      <button onClick={clickHandler}>change title</button>
    </Card>
  );
}

export default ExpenseItem;
