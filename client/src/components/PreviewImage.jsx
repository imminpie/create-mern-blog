import React, { useState } from 'react';

export default function PreviewImage({ file, avatar }) {
  const [preview, setPreview] = useState(`${avatar}`);
  const reader = new FileReader();

  if (file) {
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }

  return (
    <div className='h-36 w-36'>
      <img src={preview} alt='preview' className='h-full w-full object-cover' />
    </div>
  );
}
