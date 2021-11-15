import { useState } from "react";

import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

function NewExpense(props) {
  const [showForm, setShowForm] = useState(false);
  const showFormHandler = () => {
    setShowForm(true);
  };
  const hideFormHandler = () => {
    setShowForm(false);
  };

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = { ...enteredExpenseData, id: Math.random().toString() };
    props.onAddExpense(expenseData);
    setShowForm(false);
  };

  const addExpenseButton = (
    <button onClick={showFormHandler}>Add expense</button>
  );

  const expenseForm = (
    <ExpenseForm
      onSaveExpenseData={saveExpenseDataHandler}
      hideForm={hideFormHandler}
    />
  );

  return (
    <div className="new-expense">
      {showForm ? expenseForm : addExpenseButton}
    </div>
  );
}

export default NewExpense;
