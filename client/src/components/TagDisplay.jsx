import React from 'react';
import { Link } from 'react-router-dom';

export default function TagDisplay({ tags }) {
  return (
    <div>
      {tags.map((tag, idx) => (
        <Link className='tags' to={`/tags/${tag}`} key={idx}>
          # {tag}
        </Link>
      ))}
    </div>
  );
}
