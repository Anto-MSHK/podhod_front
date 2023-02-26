import React, {FC} from 'react';
import { Input } from 'reactstrap';

interface FormInputI {
    placeholder: string
}
export const FormInput: FC<FormInputI> = ({placeholder})=> {

    return (
        <div>
            <p>{placeholder}</p>
            <Input />
        </div>
    );
};