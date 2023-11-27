import { useField } from 'formik';
import React from 'react';

export default function InputField({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.name}>{label}</label>
      <input type='text' {...field} {...props} />
      {meta.touched && meta.error ? <div className='mt-1 text-danger'>{meta.error}</div> : null}
    </div>
  );
}
