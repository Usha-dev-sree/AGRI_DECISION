import React from 'react';
import './FormInput.css';

const FormInput = React.forwardRef(({ 
  label, 
  error, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <input 
        ref={ref}
        className={`form-input ${error ? 'input-error' : ''}`}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
