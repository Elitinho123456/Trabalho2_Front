import React, { useState, useEffect } from 'react';

interface FormField<T> {
    name: keyof T;
    label: string;
    type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select';
    options?: { value: string; label: string }[]; // For select type
    required?: boolean;
    placeholder?: string;
}

interface DataFormProps<T> {
    initialData?: T | null; // For editing existing data
    fields: FormField<T>[];
    onSubmit: (data: T) => void;
    onCancel: () => void;
    submitButtonText?: string;
}

const DataForm = <T extends Record<string, any>>({
    initialData,
    fields,
    onSubmit,
    onCancel,
    submitButtonText = 'Salvar',
}: DataFormProps<T>) => {
    const [formData, setFormData] = useState<T>(initialData || {} as T);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    useEffect(() => {
        setFormData(initialData || {} as T);
        setErrors({}); // Clear errors when initialData changes
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'number' ? Number(value) : value;
        setFormData({ ...formData, [name]: newValue });
        // Clear error for the field being edited
        if (errors[name as keyof T]) {
            setErrors({ ...errors, [name as keyof T]: undefined });
        }
    };

    const validate = () => {
        const newErrors: Partial<Record<keyof T, string>> = {};
        fields.forEach(field => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} é obrigatório.`;
            }
            // Add more specific validations here (e.g., email format, min/max length)
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="data-form">
            {fields.map((field) => (
                <div className="form-group" key={String(field.name)}>
                    <label htmlFor={String(field.name)}>{field.label}{field.required && '*'}</label>
                    {field.type === 'textarea' ? (
                        <textarea
                            id={String(field.name)}
                            name={String(field.name)}
                            value={String(formData[field.name] || '')}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            rows={4}
                        />
                    ) : field.type === 'select' ? (
                        <select
                            id={String(field.name)}
                            name={String(field.name)}
                            value={String(formData[field.name] || '')}
                            onChange={handleChange}
                        >
                            <option value="">Selecione...</option>
                            {field.options?.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            id={String(field.name)}
                            name={String(field.name)}
                            value={String(formData[field.name] || '')}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                        />
                    )}
                    {errors[field.name] && <span className="error-message">{errors[field.name]}</span>}
                </div>
            ))}
            <div className="form-actions">
                <button type="submit" className="btn btn-primary">{submitButtonText}</button>
                <button type="button" onClick={onCancel} className="btn btn-secondary">Cancelar</button>
            </div>
        </form>
    );
};

export default DataForm;