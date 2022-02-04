import {useState, useRef} from "react";

const SimpleInput = (props) => {
    const nameInputRef = useRef();
    const [enteredName, setEnteredName] = useState("");
    const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);

    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

    const nameInputChangeHandler = (event) => {
        setEnteredName(event.target.value);

        if (event.target.value !== "") {
            setEnteredNameIsValid(true);
        }
    };

    const nameInputBlurHandler = () => {
        setEnteredNameTouched(true);

        if (enteredName.trim() === "") {
            setEnteredNameIsValid(false);
        }
    };

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        setEnteredNameTouched(true);

        if (enteredName.trim() === "") {
            setEnteredNameIsValid(false);
            return;
        }

        setEnteredNameIsValid(true);

        console.log(enteredName);

        const enteredValue = nameInputRef.current.value;
        console.log(enteredValue);

        // nameInputRef.current.value = ""; //NOT IDEAL, YOU SHOULD NOT MANIPULATE THE DOM (ONLY REACT SHOULD)
        setEnteredName("");
    }

    const nameInputClasses = nameInputIsInvalid ? "form-control invalid" : "form-control";

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    ref={nameInputRef}
                    type='text'
                    id='name'
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                    value={enteredName}
                />
                {nameInputIsInvalid && <p className="error-text">Name must not be empty</p>}
            </div>
            <div className="form-actions">
                <button>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
