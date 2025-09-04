import InputBox from '../../components/InputBox/InputBox';
import classes from './RoomInit.module.scss';
import { FormProvider } from 'react-hook-form';
import Header from '../../components/Header/Header';
import { useLocation } from 'react-router-dom';
import { useRoomForm } from '../../hooks/useRoomForm';

function RoomInit() {
  const location = useLocation();
  const path = location.pathname;
  const { pageError, handleFormSubmit, methods } = useRoomForm();

  return (
    <>
      <Header hasBack />
      {pageError ? (
        <div className={classes['room-init__error']}>{pageError}</div>
      ) : (
        <form
          noValidate
          className={classes['room-init']}
          onSubmit={methods.handleSubmit(handleFormSubmit)}
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
