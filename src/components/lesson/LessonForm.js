import { useState, useEffect } from "react";
import { VStack, Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

function LessonForm({ handleSubmit, btnText, courseData }) {
  const [lesson, setLesson] = useState({});
  const [categories, setCategories] = useState([]);

  if (!courseData.lessons) {
    courseData.lessons = [];
  }

  const submit = (e) => {
    e.preventDefault();
    courseData.lessons.push(lesson);
    handleSubmit(courseData);
  };

  function handleChange(e) {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <form onSubmit={submit} style={{ width: "100%" }}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Nome da aula</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Insira o nome da aula"
            value={lesson.name || ""}
            onChange={handleChange}
            w="100%"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Descrição da aula</FormLabel>
          <Input
            type="text"
            name="description"
            placeholder="Descreva a aula"
            value={lesson.description || ""}
            onChange={handleChange}
            w="100%"
          />
        </FormControl>
        <FormControl>
          <FormLabel>URL da aula</FormLabel>
          <Input
            type="text"
            name="url"
            placeholder="Cole a URL"
            value={lesson.url || ""}
            onChange={handleChange}
            w="100%"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Categoria</FormLabel>
          <Select
            name="category_id"
            placeholder="Selecione a categoria"
            value={lesson.category_id || ""}
            onChange={handleChange}
            w="100%"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <VStack w="100%" justifyContent="center">
          <Button colorScheme="purple" type="submit" mb='30px'>
            {btnText}
          </Button>
        </VStack>
      </VStack>
    </form>
  );
}

export default LessonForm;
