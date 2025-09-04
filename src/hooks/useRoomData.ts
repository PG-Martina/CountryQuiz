import { doc, type DocumentReference } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../services/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import type { RoomType } from '../types/roomTypes';

export const useRoomData = () => {
  const { roomID } = useParams();

  const roomRef: DocumentReference<RoomType> = doc(
    db,
    'rooms',
    roomID!
  ) as DocumentReference<RoomType>;

  const [room, loading, error] = useDocumentData<RoomType>(roomRef);

  return {
    room,
    loading,
    error
  };
};
