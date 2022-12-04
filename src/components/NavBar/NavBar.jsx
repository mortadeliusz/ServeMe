import styles from "./NavBar.module.css";
import { Link, useRouteLoaderData } from "react-router-dom";
import PopUp from "../../UI/PopUp/popup";
import LogIn from "../../UI/Login/logIn";
import { useState } from "react";

const NavBar = (props) => {
  console.log("rendering NavBar");
  const { user, logOutHandler, logInHandler } = useRouteLoaderData("rootRoute");
  const [showLoginPopup, setShowLoginPopUp] = useState(false);

  return (
    <div className={styles.navbar} onClick={props.onClick}>
      {/* <span className={styles.item + " material-icons"}>menu</span> */}
      <div className={styles.menu}>
        <Link to="/" className={styles.item}>
          <span className="material-icons">sports_bar</span>
        </Link>
        <Link to="/restaurants" className={styles.item}>
          Restaurants
        </Link>
        <Link to="myorders" className={styles.item}>
          My Orders
        </Link>
      </div>

      <div className={styles["user-panel"]}>
        {user ? (
          <>
            <span>{user?.displayName}</span>
            <img alt="avatar" src={user.photoURL} className={styles.avatar} />
          </>
        ) : (
          <span className={styles.item} onClick={() => setShowLoginPopUp(true)}>
            Log In
          </span>
        )}

        {user && (
          <span className={styles.item} onClick={logOutHandler}>
            Log Out
          </span>
        )}
      </div>
      {showLoginPopup && (
        <LogIn
          onClose={() => setShowLoginPopUp(false)}
          logInHandler={logInHandler}
        />
      )}
    </div>
  );
};

export default NavBar;
