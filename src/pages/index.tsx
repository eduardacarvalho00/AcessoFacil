import {
  Flex, IconButton, InputGroup, InputRightElement, Link, Stack, Text, 
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { useContext, useState } from 'react';
import { ButtonForm } from '../components/Form/button';
import { Input } from '../components/Form/input';
import { signInSchema } from '../validation/schema';
import { AuthContext } from '../contexts/Auth/AuthContext';

interface Inputs{
  email: string;
  password: string;
}

export function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  
  const {
    register, handleSubmit, watch, formState: { errors }, 
  } = useForm<Inputs>({
    resolver: yupResolver(signInSchema),
  });

  const email = watch('email');
  const password = watch('password');
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (email && password) {
      console.log('oi');
      const isLogged = await auth.signIn(email, password);
      if (isLogged) {
        navigate('/private');
        console.log(data);
      } else {
        console.log('deu ruim');
      }
    }
  };
  
  return (
    <Flex
      as="section"
      w="100%"
      h="100vh"
      bg="orange.600"
      justify="center"
      align="center"
    >
      
      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        flexDir="column"
        align="center"
        w="487px"
        p="80px 70px"
        borderRadius={32}
        bg="gray.400"
      >

        <Stack spacing={10} mb="70px">
          <Input
            type="email"
            label="e-mail"
            {...register('email')}
            errors={errors.email} 
          />
          
          <InputGroup>
            <Input 
              type={show ? 'text' : 'password'} 
              label="password" 
              {...register('password')} 
              current-password="true" 
              errors={errors.password} 
            />
            <InputRightElement width="4.5rem" mt="50px">
              <IconButton
                onClick={handleClick}
                aria-label="view password"
                mr={7}
                bg="gray.200"
              >
                {show ? <ViewOffIcon w="35px" h="40px" /> : <ViewIcon w="35px" h="40px" />}
              </IconButton>
            </InputRightElement>
          </InputGroup>
        </Stack>
        
        <ButtonForm text="ENTRAR" />

        <Text mt={1} fontSize={16}>primeira vez? <Link href="/registration" color="orange.800">Cadastre-se</Link>
        </Text>
      </Flex>
    </Flex>
  );
}
