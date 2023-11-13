import { useCallback, useState } from 'react';

export default function useModals() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalStateChange = useCallback(() => {
    setIsOpen((open) => !open);
  }, [setIsOpen]);

  return [isOpen, handleModalStateChange];
}
