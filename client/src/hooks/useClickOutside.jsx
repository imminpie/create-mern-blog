import { useRef, useState, useCallback, useEffect } from 'react';

export default function useClickOutside(initialState) {
  const menuRef = useRef(null);
  const [isShowing, setIsShowing] = useState(initialState);

  const handleClickOutside = useCallback((e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsShowing(false);
    }
  }, [menuRef]);

  const handleToggleMenu = () => setIsShowing((show) => !show);

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);
    return () => document.removeEventListener('mouseup', handleClickOutside);
  }, [handleClickOutside]);
  return [menuRef, isShowing, handleToggleMenu];
}
