import { useCallback, useEffect, useRef, useState } from 'react';

import { AppNotificationMessageProps } from './types';

export const useAppNotificationMessage = ({ notification, onRemove }: AppNotificationMessageProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isRemoving, setRemoving] = useState(false);

  const clearRefs = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(() => onRemove(notification.id), 3000);
    animationRef.current = setTimeout(() => setRemoving(true), 2600);

    return clearRefs;
  }, []);

  const onCancelClick = useCallback(
    (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      event.stopPropagation();

      setRemoving(true);

      timerRef.current = setTimeout(() => onRemove(notification.id), 400);
    },
    [setRemoving, onRemove]
  );

  return {
    onClick: clearRefs,
    isRemoving,
    onCancelClick,
  };
};
