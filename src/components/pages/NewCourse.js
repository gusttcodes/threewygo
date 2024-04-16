import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Button,
  Center,
} from '@chakra-ui/react';
import CourseForm from '../courses/CourseForm';

function NewCourse() {
  const navigate = useNavigate();

  function createPost(course) {
    course.lessons = [];

    fetch('http://localhost:5000/courses', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(course),
    })
      .then((resp) => resp.json())
      .then((data) => {

        navigate('/', { state: { message: 'Curso Criado com sucesso' } });
      })
      .catch((err) => console.log(err));
  }

  return (
    <Box mt='32px' w='100%' p={{base:'1em', md:'.8rem 6em', lg:'.8em 8em', xl:'.8em 14.9em'}}>
      <Heading mb={4}>Criar curso</Heading>
      <CourseForm handleSubmit={createPost} btnText="✅  Confirmar criação" />
      <Center>
        <Button colorScheme="purple" mt={4} mb={8} onClick={() => navigate('/')}>
        ⬅️  Voltar para cursos
        </Button>
      </Center>
    </Box>
  );
}

export default NewCourse;
