import React, { useState, FormEvent } from 'react';

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const App: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Error state
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Track which fields have been touched
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  // Form submission status
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle field blur (mark as touched)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate the field that was just blurred
    validateField(name, formData[name as keyof FormState]);
  };

  // Validate a single field
  const validateField = (name: string, value: string) => {
    let newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;
        
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Email is invalid';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        } else {
          delete newErrors.password;
          
          // Also check confirm password if it exists
          if (formData.confirmPassword && formData.confirmPassword !== value) {
            newErrors.confirmPassword = 'Passwords do not match';
          } else if (formData.confirmPassword) {
            delete newErrors.confirmPassword;
          }
        }
        break;
        
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate all fields
  const validateForm = () => {
    let newErrors: FormErrors = {};
    let isValid = true;
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      isValid = false;
    }
    
    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);
    
    // Validate form
    const isValid = validateForm();
    
    if (isValid) {
      // Form is valid, proceed with submission
      setIsSubmitted(true);
      console.log('Form submitted successfully:', formData);
      
      // You would typically send this data to a server here
      // For now, we'll just show a success message
    }
  };

  // Should an error be shown for a specific field?
  const shouldShowError = (fieldName: keyof FormState) => {
    return (touched[fieldName] || isSubmitted) && errors[fieldName];
  };

  return (
    <div className="form-container" style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Sign Up</h2>
      
      {isSubmitted && Object.keys(errors).length === 0 && (
        <div className="success-message" style={{ 
          backgroundColor: '#d4edda', 
          color: '#155724', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px' 
        }}>
          Form submitted successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: `1px solid ${shouldShowError('name') ? 'red' : '#ccc'}`, 
              borderRadius: '4px' 
            }}
          />
          {shouldShowError('name') && (
            <div className="error-message" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
              {errors.name}
            </div>
          )}
        </div>
        
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: `1px solid ${shouldShowError('email') ? 'red' : '#ccc'}`, 
              borderRadius: '4px' 
            }}
          />
          {shouldShowError('email') && (
            <div className="error-message" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
              {errors.email}
            </div>
          )}
        </div>
        
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: `1px solid ${shouldShowError('password') ? 'red' : '#ccc'}`, 
              borderRadius: '4px' 
            }}
          />
          {shouldShowError('password') && (
            <div className="error-message" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
              {errors.password}
            </div>
          )}
        </div>
        
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: `1px solid ${shouldShowError('confirmPassword') ? 'red' : '#ccc'}`, 
              borderRadius: '4px' 
            }}
          />
          {shouldShowError('confirmPassword') && (
            <div className="error-message" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
              {errors.confirmPassword}
            </div>
          )}
        </div>
        
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;