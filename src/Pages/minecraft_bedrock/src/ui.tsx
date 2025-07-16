// src/ui.tsx
import React from 'react';
import { Field, ErrorMessage } from 'formik';

// --- Button Component ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, loading = false, ...rest }) => {
  return (
    <button
      className={`button ${variant} ${className} ${loading ? 'loading' : ''}`.trim()}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? <div className="spinner"></div> : children}
    </button>
  );
};

// --- Card Component ---
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = '', children }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

// --- FormField Component ---
interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  as?: string;
  placeholder?: string;
  children?: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, name, type = 'text', as, placeholder, children }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {children || (
        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          as={as}
          className="form-input"
        />
      )}
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
};

// --- Notification Component ---
interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      {onClose && <button className="notification-close" onClick={onClose} aria-label="Fechar notificação">×</button>}
    </div>
  );
};