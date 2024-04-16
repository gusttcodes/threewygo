import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NewCourse from './components/pages/NewCourse'
import Courses from './components/pages/Courses'
import Course from './components/pages/Course'

import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar/>
        <Container customClass="min-height">
          <Routes>
            <Route  path="/" element={<Courses/>}/>
            <Route  path="/newcourse" element={<NewCourse/>}/>
            <Route  path="/course/:id" element={<Course/>}/>
          </Routes>
        </Container>
        <Footer/>

      </Router>
    </ChakraProvider>
  )
}

export default App;
