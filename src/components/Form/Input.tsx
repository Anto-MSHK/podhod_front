import React, { FC } from 'react';
import {Input, InputProps} from 'reactstrap';
import styles from './Form.module.css';

interface FormInputI extends InputProps {
    placeholder: string;
    name?: string;
    value: string;
    minLength?: number;
    required?: boolean;
}

export const FormInput: FC<FormInputI> = ({
                                         placeholder,
                                         name,
                                         value,
                                         onChange,
                                         type = 'text',
                                         minLength,
                                         required = false,
                                     }) => {
    return (
        <div>
            <p>{placeholder}</p>
            <Input
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                minLength={minLength}
                required={required}
                className={styles.inputElements}
            />
        </div>
    );
};
