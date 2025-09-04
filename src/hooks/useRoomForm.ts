import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  RoomInitSchema,
  type RoomInitFormType
} from '../pages/RoomInit/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRoomActions } from './useRoomActions';

export const useRoomForm = () => {
  const location = useLocation();
  const { formCreateRoom, formJoinRoom } = useRoomActions();

  const path = location.pathname;

  const [pageError, setPageError] = useState<string | null>(null);

  const methods = useForm<RoomInitFormType>({
    resolver: zodResolver(RoomInitSchema),
    defaultValues: {
      nickname: '',
      roomID:
        path === '/createRoom'
          ? Math.random().toString(36).substring(2, 6).toUpperCase()
          : ''
    }
  });

  const handleFormSubmit = async (data: RoomInitFormType) => {
    if (path === '/createRoom') {
      try {
        await formCreateRoom(data.nickname, data.roomID);
        setPageError(null);
      } catch (error) {
        if (error instanceof Error) {
          setPageError(error.message);
        } else {
          setPageError('An unexpected error occurred');
        }
      }
    } else {
      try {
        await formJoinRoom(data.nickname, data.roomID);
        setPageError(null);
      } catch (error) {
        if (error instanceof Error) {
          setPageError(error.message);
        } else {
          setPageError('An unexpected error occurred');
        }
      }
    }
  };

  return {
    methods,
    handleFormSubmit,
    pageError
  };
};
