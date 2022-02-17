import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { loadGarments, removeGarment, triggerFavorite, wearGarment } from '@/lib/controller/garment';
import { loadTags } from '@/lib/controller/tag';
import { useDoubleClick } from '@/lib/hooks/useDoubleClick';
import { isTouchEvent, useHoldClick } from 'lib/hooks/useHoldClick';
import { ROUTE_PATHS } from 'routes/constants';
import { useAppNotification } from 'store/appNotification';
import { Garment } from 'types/garment';

export const useMain = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const addNotification = useAppNotification(state => state.addNotification);
  const deleteNotificationByKey = useAppNotification(state => state.deleteNotificationByKey);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeGarmentId, setActiveGarmentId] = useState<string>('');
  const [isFavoriteFirst, setFavoriteFirst] = useState<boolean>(false);
  const [anchorPosition, setAnchorPosition] = useState<{ top: number; left: number }>({
    left: 0,
    top: 0,
  });

  const loadGarmentsQueryParams = {
    filter: selectedTags.join(','),
    orderBy: (isFavoriteFirst && 'isFavorite') || undefined,
    orderDirection: (isFavoriteFirst && 'DESC') || undefined,
  };

  const { data: tagsData } = useQuery('tags', loadTags);
  const { data: garmentsData } = useQuery(
    ['garments', loadGarmentsQueryParams],
    () => loadGarments(loadGarmentsQueryParams),
    {
      onSuccess: () => {
        deleteNotificationByKey('garment loading');
      },
    }
  );

  const { mutate: wearGarmentMutate } = useMutation<Response, Error, string, { previousGarments: Garment[] }>(
    wearGarment,
    {
      onMutate: async garmentId => {
        await queryClient.cancelQueries('garments');
        const previousGarments = queryClient.getQueryData<Garment[]>('garments');
        queryClient.setQueryData(
          'garments',
          (old: Garment[] | undefined) =>
            old?.map(garment =>
              garment.id === garmentId ? { ...garment, wearingAmount: garment.wearingAmount + 1 } : garment
            ) || []
        );

        return previousGarments && { previousGarments };
      },
      onSettled: () => {
        queryClient.invalidateQueries('garments');
      },
      onError: (_, __, context) => {
        if (context) {
          queryClient.setQueryData('garments', context.previousGarments);
        }
      },
    }
  );

  const { mutate: triggerFavoriteMutate } = useMutation(triggerFavorite, {
    onSettled: () => {
      queryClient.invalidateQueries('garments');
    },
    onMutate: () => {
      setIsOpened(false);
    },
  });

  const { mutate: removeGarmentMutate } = useMutation(removeGarment, {
    onSettled: () => {
      queryClient.invalidateQueries('garments');
    },
    onMutate: () => {
      setIsOpened(false);
    },
  });

  const popoverList = [
    {
      onClick: (): void => {
        router.push(ROUTE_PATHS.editGarment(activeGarmentId));
      },
      children: 'Edit',
    },
    {
      onClick: (): void => removeGarmentMutate(activeGarmentId),
      children: 'Delete',
    },
  ];

  const onClick = useDoubleClick(wearGarmentMutate, 400);

  const hold = useHoldClick(
    (garmentId: string) =>
      (event): void => {
        setAnchorPosition({
          left: isTouchEvent(event) ? event.touches[0].clientX : event.clientX,
          top: isTouchEvent(event) ? event.touches[0].clientY : event.clientY,
        });
        setIsOpened(true);
        setActiveGarmentId(garmentId);
      },
    200
  );

  const toggleFavorite = useCallback((garmentId: string): void => triggerFavoriteMutate(garmentId), []);

  useEffect(() => {
    addNotification({
      message: 'Loading garments',
      type: 'loading',
      key: 'garment loading',
    });

    const preventDefault = (e: MouseEvent) => e.preventDefault();

    window.addEventListener('contextmenu', preventDefault);

    return () => {
      deleteNotificationByKey('garment loading');
      window.removeEventListener('contextmenu', preventDefault);
    };
  }, []);

  return {
    hold,
    onClick,
    isOpened,
    tagsData,
    setIsOpened,
    popoverList,
    garmentsData,
    selectedTags,
    anchorPosition,
    toggleFavorite,
    setSelectedTags,
    isFavoriteFirst,
    setFavoriteFirst,
  };
};
