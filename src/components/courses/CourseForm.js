import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
} from "@chakra-ui/react";

import styles from "./CourseForm.module.css";

function CourseForm({ handleSubmit, btnText, courseData }) {
  const [categories, setCategories] = useState([]);
  const [course, setCourse] = useState(courseData || {});

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

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(course);
  };

  function handleChange(e) {
    setCourse({ ...course, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setCourse({
      ...course,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Nome do Curso</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Insira o nome do curso"
            value={course.name ? course.name : ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Descrição</FormLabel>
          <Input
            type="text"
            name="description"
            placeholder="Insira a descrição"
            value={course.description ? course.description : ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Imagem</FormLabel>
          <Input
            type="text"
            name="img"
            placeholder="URL da imagem"
            value={course.img ? course.img : ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Expira em</FormLabel>
          <Input
            type="date"
            name="expires"
            placeholder="Data de vencimento do curso"
            value={course.expires ? course.expires : ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Categoria</FormLabel>
          <Select
            name="category_id"
            placeholder="Selecione a categoria"
            value={course.category ? course.category.id : ""}
            onChange={handleCategory}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button colorScheme="purple" type="submit">
          {btnText}
        </Button>
      </VStack>
    </form>
  );
}

export default CourseForm;
