import { Link } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Flex,
  Stack
} from "@chakra-ui/react";

function CourseCard({ id, name, description, img, expires, handleRemove }) {

  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  const formattedExpires = new Date(expires).toLocaleDateString('pt-BR');

  return (
    <Flex p={{base:'10px'}} justify='center' w={{base:'98%', md:'360px'}}>
        <Box borderRadius='20px' boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'>
            <Flex direction={{base: 'column'}} borderRadius='20px'>
                <Box bg={`url('${img}')`} p='60px' h='240px' bgSize='cover' borderRadius='20px 20px 0 0'>
                </Box>
                <Box p='44px' bg='white' borderRadius='20px'>
                    <Text as='h3' fontSize='24px' lineHeight='30px' fontWeight='500' mb='10px' textAlign='left'>{name}</Text>
                    <Text textAlign='left' as='small' fontWeight='500' mb='10px' color='grey'>Disponível até: {formattedExpires}</Text>
                    <Text textAlign='left' noOfLines='3'>{description}</Text>
                    <Stack as='ul' pt='24px' m='0'>
                        <Link to={`/course/${id}`} style={{ textDecoration: "none" }}>
                            <Button colorScheme='purple' size='lg' w='100%' mt='24px'>Acessar conteúdo</Button>
                        </Link>
                        <Button bg='transparent' color='#cecece' mt='-10px' size='lg' w='100%' onClick={remove}>Remover</Button>
                    </Stack>
                </Box>
            </Flex>
        </Box>
    </Flex>
  );
}

export default CourseCard;
