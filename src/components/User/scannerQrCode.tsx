import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

export function Test() {
  const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            setData(result?.text);
          }

          if (error) {
            console.info(error);
          }
        }}
        constraints={{ facingMode: 'environment' }}
        containerStyle={{ width: '100%' }}
      />
      <p>{data}</p>
    </>

  ); 
}
