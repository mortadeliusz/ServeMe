import styles from "./FreepikImage.module.css";

const AttributedImage = (props) => {
  return (
    <div className={props.className + " " + styles["attributed-image"]}>
      <img src={props.src} alt={props.alt} />
      <span>
        Image by <a href={props.attributionURL}>Freepik</a>
      </span>
    </div>
  );
};

export default AttributedImage;
