import styles from "./numberPicker.module.css";

const NumberPicker = (props) => {
  function onPlus(event) {
    event.stopPropagation(); //to prevent whatever the parent onClick does if number picker was clicked
    props.onPlusHandler();
  }
  function onMinus(event) {
    event.stopPropagation(); //to prevent whatever the parent onClick does if number picker was clicked
    props.onMinusHandler();
  }

  return (
    <div className={styles["number-picker"]}>
      <button
        className={styles["number-picker__button"] + " material-icons"}
        onClick={onMinus}
      >
        remove
      </button>
      <span className={styles["number-picker__value"]}>{props.value}</span>
      <button
        className={styles["number-picker__button"] + " material-icons"}
        onClick={onPlus}
      >
        add
      </button>
    </div>
  );
};
export default NumberPicker;
