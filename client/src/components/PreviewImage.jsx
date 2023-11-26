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
    <div>
      <img src={preview} alt='preview' />
    </div>
  );
}
