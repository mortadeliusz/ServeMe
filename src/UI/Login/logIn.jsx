import { Form } from "react-router-dom";
import classes from "./logIn.module.css";
import btn_SignInWithGoogle from "./btn_google_signin_light_normal_web.png";
import Card from "../Card/Card";
import { googleAuth } from "../../firebase/main/firebase";
import PopUp from "../PopUp/popup";

export default function LogIn(props) {
  return (
    <PopUp onClose={props.onClose}>
      <Card>
        <Form className={classes.form}>
          <label htmlFor="email">email</label>
          <input type="email" id="email:" />
          <label htmlFor="password">password</label>
          <input type="password" id="password:" />
          <button type="submit">Log In/Register</button>
        </Form>
        <div className={classes["third-party-auth-actions"]}>
          <img
            src={btn_SignInWithGoogle}
            alt="Sign in with google"
            onClick={() =>
              googleAuth().then((resp) => {
                props.logInHandler(resp);
                props.onClose();
              })
            }
          />
        </div>
      </Card>
    </PopUp>
  );
}
