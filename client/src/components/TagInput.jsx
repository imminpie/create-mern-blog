import React, { useState } from 'react';

export default function TagInput({ post, setPost }) {
  const [tags, setTags] = useState('');

  const handleTags = (e) => setTags(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleTagInput();
    }
  };

  const handleTagInput = () => {
    if (tags.trim() && !post.tags.includes(tags)) {
      setPost((prev) => ({ ...prev, tags: [...prev.tags, tags] }));
      setTags('');
    }
  };

  const handleTagClick = (e) => {
    const tagName = e.target.innerHTML.replace('#', '').trim();
    setPost((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== tagName) }));
  };

  return (
    <div className='flex flex-wrap'>
      {post.tags?.map((tag, idx) => (
        <button className='tags mb-3 mt-0 leading-8' type='button' key={idx} onClick={handleTagClick}>
          {`# ${tag}`}
        </button>
      ))}
      <input
        className='mb-3 h-8 bg-transparent text-title outline-none'
        type='text'
        value={tags}
        onChange={handleTags}
        onKeyDown={handleKeyDown}
        placeholder='태그를 입력하세요'
      />
    </div>
  );
}
