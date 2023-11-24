import React from 'react';
import { Link } from 'react-router-dom';

export default function TagLink({ tag }) {
  return (
    <Link to={`/tags/${tag}`} className='tags'>
      # {tag}
    </Link>
  );
}
