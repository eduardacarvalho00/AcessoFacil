/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
import {
  Tr, Td, Icon, Link,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { TbExternalLink, TbTrash } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { api } from '../../hooks/useApi';
import { useGetQrCode } from '../../pages/Requester/useGetQrCode';

export function TableQrCode() {
  const navigate = useNavigate();
  const { qrCode, setQrCode, userId } = useGetQrCode();
  const [answers, setAnswers] = useState([]);
  
  function handleNavigate() {
    navigate('/requesterHome/informationQrCode');
  }

  // const listNumbersAnswers = async (id : number) => {
  //   const qrId = id;
  //   try {
  //     const { data } = await api.get('/qrcode/numberanswers', { params: { qrId } });
  //     setAnswers(data);
  //   } catch {
  //     console.log('Error trying to search for this category!');
  //   }
  // };

  // const timer = setTimeout(async () => {
  // //   try {
  // //     const { data } = await api.get(`api/solicitations/${id}`);
  // //     setResults(data.response.documents);
  // //     setSolicitationId(data.response.id);

  // //     handleRemoveLoading();
  // //   } catch {
  // //     console.log('Error trying to search for this category!');
  // //     setRemoveLoading(false);
  // //   }
  // // }, 5000);
  // // return () => {
  // //   clearTimeout(timer);
  // // };

  const handleDeleteQrCode = async (id : number) => {
    const qrId = id;
    try {
      console.log(qrCode);
      await api.delete('/qrcode', { params: { qrId } });
      const { data } = await api.get('/qrcode/listqrcode', { params: { userId } });
      setQrCode(data);
      console.log(qrCode);
    } catch {
      console.log('Error trying to search for this category!');
    }
  };
  
  return (
    <>
      {qrCode?.map((item) => {
        const nameData = item?.data;
        const separatingName = nameData.split(',');
        const nameDocument = separatingName.map((item) => {
          if (item === 'name') {
            return 'Nome, ';
          } if (item === 'cpf') {
            return 'CPF, ';
          } if (item === 'rg') {
            return 'RG, ';
          } if (item === 'dataEmail') {
            return 'E-mail, ';
          } if (item === 'phoneNumber') {
            return 'Telefone/Celular, ';
          } if (item === 'birthDate') {
            return 'Data de Nascimento, ';
          } if (item === 'nationality') {
            return 'Nacionalidade, ';
          } if (item === 'cnh') {
            return 'CNH, ';
          } if (item === 'cep') {
            return 'CEP, ';
          } if (item === 'streetNumber') {
            return 'Rua n°, ';
          } if (item === 'civilStatus') {
            return 'Estado Civil, ';
          }
          return false;
        });
        
        // listNumbersAnswers(item.id);
        return (
          <Tr key={item.id}>
            <Td>{item?.name}</Td>
            <Td>{nameDocument}</Td>
            <Td textAlign="center">{answers.count}</Td>
            <Td w="100px">
              <Link onClick={() => handleNavigate(item.id)}>
                <Icon as={TbExternalLink} color="gray.700" w="20px" h="20px" mr="20px" />
              </Link>
              <Link onClick={() => handleDeleteQrCode(item?.id)}>
                <Icon as={TbTrash} color="gray.700" w="20px" h="20px" />
              </Link>
            </Td>
          </Tr>
        );
      })}
    </>
   
  );
}
