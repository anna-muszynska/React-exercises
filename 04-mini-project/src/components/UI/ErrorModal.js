import ReactDOM from "react-dom";

import classes from "./ErrorModal.module.css";
import Card from "./Card";
import Button from "./Button";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHandleError} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onHandleError}>Ok</Button>
      </footer>
    </Card>
  );
};

function ErrorModal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onHandleError={props.onHandleError} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onHandleError={props.onHandleError}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
}

export default ErrorModal;
