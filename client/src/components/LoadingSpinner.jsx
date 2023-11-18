import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

export default function LoadingSpinner() {
  return (
    <div className='absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white'>
      <BeatLoader color='#55b988' aria-label='Loading Spinner' data-testid='loader' />
    </div>
  );
}
