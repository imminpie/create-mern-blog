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
        <button type='button' key={idx} onClick={handleTagClick} className='bg-accent mb-3 mr-3 h-8 rounded-2xl px-4 text-sm text-white'>
          {`# ${tag}`}
        </button>
      ))}
      <input type='text' value={tags} onChange={handleTags} onKeyDown={handleKeyDown} placeholder='태그를 입력하세요' className='mb-3 h-8 bg-transparent text-title outline-none' />
    </div>
  );
}
