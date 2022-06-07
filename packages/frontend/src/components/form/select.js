import React, { useRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import { useField } from '@unform/core';

export default function Select({ name, label, placeholder, ...rest }) {
    const selectRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            getValue: (ref) => {
                if (rest.isMulti) {
                    if (!ref.state.value) {
                        return [];
                    }
                    return ref.state.value.map((option) => option.value);
                }
                if (!ref.state.value) {
                    return '';
                }
                return ref.state.value.value;
            },
        });
    }, [fieldName, registerField, rest.isMulti]);

    return (
        <>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <ReactSelect
                placeholder={placeholder}
                defaultValue={defaultValue}
                ref={selectRef}
                classNamePrefix="react-select"
                {...rest}
            /></>
    );
};