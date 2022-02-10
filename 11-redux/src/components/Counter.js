import classes from './Counter.module.css';
import {useSelector, useDispatch} from "react-redux";

const Counter = () => {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const incrementHandler = () => {
      dispatch({type: "INCREMENT"})
  };

  const increaseHandler = () => {
      dispatch({type: "INCREASE", amount: 5})
  };

  const decrementHandler = () => {
      dispatch({type: "DECREMENT"})
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div className={classes.value}>
          <button onClick={incrementHandler}>Increment</button>
          <button onClick={increaseHandler}>Increase by 5</button>
          <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
