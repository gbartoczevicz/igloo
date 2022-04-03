import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
  <>
    <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ref={inputRef} defaultValue={defaultValue} {...rest} />
    {
      error &&
      <small className="error text-red-400">{`*${error ? error : ""}`}</small>
    }
  </>
  )
}