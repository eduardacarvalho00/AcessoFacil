/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { api } from '../../hooks/useApi';
import { useGetDataUser } from '../User/useGetDataUser';

interface PropsPhotoQrCode{
  photo: string;
}

export function useGetPhotoNewQrCode() {
  const [qrCodePhoto, setQrCodePhoto] = useState<PropsPhotoQrCode>();
  const qrId = localStorage.getItem('qrId');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/qrcode', { params: { qrId } });
        setQrCodePhoto(data);
        return data;
      } catch {
        console.log('Error trying to search for this category!');
      }
    })();
  }, []);

  return {
    qrCodePhoto,
  };
}

interface PropsQrCode{
  id: number & string;
  user_id: number;
  name: string;
  data: string,
}

export function useGetQrCode() {
  const { userData } = useGetDataUser();
  const [qrCode, setQrCode] = useState<PropsQrCode[]>([]);

  const qrId = qrCode.map((item) => {
    return item.id;
  });

  if (userData?.user.id !== undefined) {
    localStorage.setItem('userid', userData?.user.id);
  }
  const userId = localStorage.getItem('id');
  
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/qrcode/listqrcode', { params: { userId } });
        setQrCode(data);
        return data;
      } catch {
        console.log('Error trying to search for this category!');
      }
    })();
  }, []);

  return {
    qrCode, qrId, setQrCode, userId,
  };
}
