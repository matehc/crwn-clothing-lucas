import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  console.log("Other properties", otherProps);
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {/* if there is something inside our input, then shrink the label */}
      {/* also if label exists then render the below label*/}
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
