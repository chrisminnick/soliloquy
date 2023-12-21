const InputField = ({ label, type = 'text', value, onChange, id }) => (
  <div className="form-group mb-3">
    <label>{label}</label>
    <input
      type={type}
      id={id ? id : undefined}
      {...(value !== undefined && { value })}
      onChange={onChange ? onChange : undefined}
      className="form-control"
      required
    />
  </div>
);
export default InputField;
