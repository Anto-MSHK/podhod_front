import React, {FC} from 'react';
import {Input, InputProps} from 'reactstrap';

interface FormInputI extends InputProps{
    placeholder: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    minLength?: number
    required?: boolean
}

export const FormInput: FC<FormInputI> = ({placeholder, value, onChange, type = 'text', minLength, required = false})=> {

    return (
        <div>
            <p>{placeholder}</p>
            <Input value={value} onChange={onChange} type={type} minLength={minLength} required={required} />
        </div>
    );
};