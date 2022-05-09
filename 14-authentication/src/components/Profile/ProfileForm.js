import classes from './ProfileForm.module.css';
import {useContext, useRef} from "react";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
      e.preventDefault();

      const enteredNewPassword = newPasswordInputRef.current.value;

      // optional add validation

      fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=', {
          method: 'POST',
          body: JSON.stringify({
              idToken: authCtx.token,
              password: enteredNewPassword,
              returnSecureToken: false,
          }),
          headers: {
              'Content-Type': 'application/json'
          },
      }).then((res) => {
          if (res.ok) {
              return res.json();
          } else {
              res.json().then((data) => {
                  let errorMessage = 'Change password failed!'
                  if (data && data.error && data.error.message) {
                      errorMessage = data.error.message;
                  }
                  throw new Error(errorMessage);
              })
          }
      }).catch((err) => {
          console.log(err.message)
      })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
