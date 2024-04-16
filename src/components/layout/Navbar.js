import {Link} from 'react-router-dom'
import Container from './Container'
import styles from './Navbar.module.css'
import logo from'../../img/logo.png'
import { Flex, Box } from '@chakra-ui/react'

function Navbar (){

    return(
        <Box as="nav" bg='#f3f3f3' p={{base:'1em', md:'1.2em 2.4em'}}>
            <Container>
                <Flex w="100%">
                    <Link to="/"><img src={logo} width='128px' alt="threewygo" /></Link>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                        <Link to="/"> Gestão de cursos </Link>
                        </li>
                    </ul>
                </Flex>
            </Container>
      </Box>
    )

}

export default Navbar


                
               
                
                