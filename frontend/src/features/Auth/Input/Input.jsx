import './Input.css';

function Input({ title, name, type, placeholder, color, width }) {
  return (
    <div className="group">
      <input
        style={{ color: color, width: width }}
        type={type}
        className="group__input"
        required
        name={name}
        placeholder={placeholder}
      />
      <span className="highlight"></span>
      <span className="bar"></span>
      <label>{title}</label>
    </div>
  );
}

export default Input;
