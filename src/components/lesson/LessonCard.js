import styles from "../courses/CourseCard.module.css";
import { BsFillTrashFill } from "react-icons/bs";
import {
  Box,
  Text,
  Flex,
  AspectRatio
} from "@chakra-ui/react";

function LessonCard({ id, name, url, description, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <Box boxShadow='md' w='100%' mb='10px' borderRadius='6px'>
      <Flex className={styles.course_card} w='100%' h='auto' p='12px' direction='row' justify='space-between'>
        <Flex w='100%'>
          <Flex direction={{base:'column', lg:'row'}} align={{base:'center', md:'flex-start'}} w='100%'>
            <AspectRatio w={{base:'100%', lg:'40%'}} ratio={1.77}>
              <iframe
                title='video'
                src={url}
                allowFullScreen
              />
            </AspectRatio>
            <Flex ml={{base:'0px', lg:'32px'}} direction='column' w={{base:'98%', lg:'420px'}}>
              <Text as="h2" fontWeight='500' mb='8px'> {name} </Text>
              <small> {description} </small>
              <Box p='12px 0'>
                <button onClick={remove}>
                  <BsFillTrashFill />
                </button>
              </Box>
            </Flex>
          </Flex>
        </Flex>

      </Flex>
    </Box>
  );
}

export default LessonCard;
