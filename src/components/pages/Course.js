import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import CourseForm from "../courses/CourseForm";
import LessonForm from "../lesson/LessonForm";
import LessonCard from "../lesson/LessonCard";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Course() {
  const { id } = useParams();

  const [course, setCourse] = useState({});
  const [lessons, setLessons] = useState([]);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/courses/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setCourse(data);
          setLessons(data.lessons);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, [id]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  function editPost(course) {
    setMessage("Curso Atualizado!");
    setType("success");

    fetch(`http://localhost:5000/courses/${course.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCourse(data);
        setShowCourseForm(false);
      })
      .catch((err) => console.log(err));
  }

  function createLesson(course) {
    setMessage("Aula adicionada!");
    setType("success");

    const lastLesson = course.lessons[course.lessons.length - 1];
    lastLesson.id = uuidv4();

    fetch(`http://localhost:5000/courses/${course.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setLessons(data.lessons);
        setShowLessonForm(!showLessonForm);
      })
      .catch((err) => console.log(err));
  }

  function removeLesson(id) {
    setMessage("Serviço Removido com Sucesso!");
    setType("success");

    const lessonsUpdated = course.lessons.filter(
      (lesson) => lesson.id !== id
    );
    const courseUpdated = { ...course };
    courseUpdated.lessons = lessonsUpdated;


    fetch(`http://localhost:5000/courses/${courseUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCourse(courseUpdated);
        setLessons(lessonsUpdated);
      })
      .catch((err) => console.log(err));
  }

  function toggleCourseForm() {
    setShowCourseForm(!showCourseForm);
  }

  function toggleLessonForm() {
    setShowLessonForm(!showLessonForm);
  }

  const totalStorage = 10;
  const usedStorage = lessons.length;
  const remainingStorage = totalStorage - usedStorage;
  const remainingLessons = Math.min(remainingStorage, 10);

  let spaceStyle = {};
  if (remainingStorage >= 6) {
    spaceStyle = { background: "#d5f7e7" };
  } else if (remainingStorage >= 4) {
    spaceStyle = { background: "#fff2cc" };
  } else {
    spaceStyle = { background: "#f4cccc" };
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box p={{base:'1em', md:'.8rem 6em', lg:'.8em 8em', xl:'.8em 14.9em'}}>
          {course.name && (
            <Container customClass="column" >
              <VStack align="flex-start" spacing={4} pb="16px" borderBottom='1px solid #cecece'>
                <HStack
                  mt="26px"
                  w="100%"
                  align="center"
                  justify="space-between"
                >
                  <Text as="h1" fontSize="3xl" fontWeight="700">
                    {course.name}
                  </Text>
                  <Button colorScheme="purple" onClick={toggleCourseForm}>
                    {!showCourseForm ? "✏️ Editar Curso" : "Fechar"}
                  </Button>
                </HStack>
                {!showCourseForm ? (
                  <VStack align="flex-start" spacing={4} >
                    <Text>
                      <span>{course.description}</span>
                    </Text>
                  </VStack>
                ) : (
                  <CourseForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    courseData={course}
                  />
                )}
              </VStack>
              <HStack
                mt="30px"
                w="100%"
                align="center"
                justify="space-between"
              >
                <Text as="h2" fontSize="xl" fontWeight="semibold">
                  Aulas do curso
                </Text>
                <Button colorScheme="purple" onClick={toggleLessonForm}>
                  {!showLessonForm ? "📹 Adicionar Aula" : "Fechar"}
                </Button>
              </HStack>
              <VStack align="flex-start" w="100%" spacing={4} mt={8}>
                <Grid
                  templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                  gap={4}
                  alignItems="center"
                ></Grid>
                {showLessonForm && (
                  <LessonForm
                    handleSubmit={createLesson}
                    btnText="Adicionar Aula"
                    courseData={course}
                  />
                )}
              </VStack>
              <VStack>
                {lessons.length > 0 ? (
                  lessons.map((lesson) => (
                    <LessonCard
                      
                      id={lesson.id}
                      name={lesson.name}
                      url={lesson.url}
                      description={lesson.description}
                      key={lesson.id}
                      handleRemove={removeLesson}
                    />
                  ))
                ) : (
                  <Text>Não existem aulas</Text>
                )}
              </VStack>
              <VStack align="center" w="100%" mt='36px' mb='22px'>
                <Text fontSize="sm" textAlign='center'>
                  Espaço utilizado: {usedStorage}/{totalStorage}GB
                </Text>
                <Text p='6px 12px' borderRadius='8px' fontSize="lg" style={spaceStyle}>
                  Espaço restante: {remainingLessons}GB
                </Text>
              </VStack>
              {message && (
                <Alert status={type} w="320px" position="absolute" top="80px" right="16px" borderRadius="md" boxShadow="md" zIndex="999">
                  <AlertIcon />
                  <AlertTitle fontWeight='400'>{message}</AlertTitle>
                </Alert>
              )}
            </Container>
          )}
        </Box>
      )}
    </>
  );
}

export default Course;
