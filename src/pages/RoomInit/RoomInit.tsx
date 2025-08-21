import { useLocation } from 'react-router-dom';
import InputBox from '../../components/InputBox/InputBox';
import classes from './RoomInit.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { RoomInitSchema, type RoomInitFormType } from './validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRoomActions } from '../../hooks/useRoomActions';
import Header from '../../components/Header/Header';

function RoomInit() {
  const location = useLocation();
  const path = location.pathname;
  const [pageError, setPageError] = useState<string | null>(null);

  const { formCreateRoom, formJoinRoom } = useRoomActions();

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

  const { handleSubmit } = methods;

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
        console.log('test');
      } catch (error) {
        if (error instanceof Error) {
          setPageError(error.message);
        } else {
          setPageError('An unexpected error occurred');
        }
      }
    }
  };

  return (
    <>
      <Header hasBack />
      {pageError ? (
        <div className={classes['room-init__error']}>{pageError}</div>
      ) : (
        <form
          noValidate
          className={classes['room-init']}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <FormProvider {...methods}>
            {path === '/joinRoom' && (
              <InputBox
                label="Game ID"
                placeholder="Join game by ID..."
                registerName="roomID"
              />
            )}
            <InputBox
              label="Nickname"
              placeholder="Set nickname for the game..."
              registerName="nickname"
            />
          </FormProvider>
          <button type="submit" className={classes['room-init__submit']}>
            {path === '/createRoom' ? 'Create Room' : 'Join Room'}
          </button>
        </form>
      )}
    </>
  );
}

export default RoomInit;
