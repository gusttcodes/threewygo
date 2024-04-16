import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Heading,
  VStack,
  HStack,
  useToast,
  Text,
  Flex,
  Spinner,
  Button,
  Select,
} from "@chakra-ui/react";

import Message from "../layout/Message";
import CourseCard from "../courses/CourseCard";
import { Link } from 'react-router-dom';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [courseMessage, setCourseMessage] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const location = useLocation();
  const toast = useToast();

  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/courses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setCourses(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, []);

  function removeCourse(id) {
    fetch(`http://localhost:5000/courses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setCourses(courses.filter((course) => course.id !== id));
        setCourseMessage("Curso Removido com Sucesso!");
        toast({
          title: "Curso removido com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => console.log(err));
  }

  const filteredCourses = filterOption === "all"
    ? courses
    : courses.filter(course => new Date(course.expires) > new Date());

  return (
    <VStack mt={8} minHeight='77vh'>
        <HStack w={{base:'100%', lg:'92%'}} justify='space-between' p={{base:'1.1em', md:'1.1em 2em', lg:'1.1em 2.2em'}}>
          <Flex align='center'>
            <Heading>Cursos</Heading>
            <Select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              w="200px"
              ml="12px"
              >
              <option value="all">Todos</option>
              <option value="active">Disponíveis</option>
            </Select>
          </Flex>
          <Button as={Link} to="/newcourse" colorScheme="yellow" variant="solid">
            Criar
          </Button>
        </HStack>
      <VStack align="center">
        {message && <Message type="success" msg={message} />}
        {courseMessage && <Message type="success" msg={courseMessage} />}
        <Flex w={{base:'100%', xl:'93%'}}>
          <Flex direction={{base:'column', md:'row'}} align='center' justify={{base:'center', '2xl':'center'}} wrap='wrap'>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard
                  id={course.id}
                  name={course.name}
                  img={course.img}
                  expires={course.expires}
                  description={course.description}
                  category={course.category.name}
                  key={course.id}
                  handleRemove={removeCourse}
                />
              ))
            ) : removeLoading ? (
              <Text>Não tem cursos</Text>
            ) : (
              <Spinner size="lg" color="purple.500" />
            )}
          </Flex>
        </Flex>
      </VStack>
    </VStack>
  );
}

export default Courses;
