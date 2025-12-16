import { Outlet } from "react-router"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import { Container } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <main className="my-3"> {/*margin from top and botton */}
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer/>
    </>
  )
}

export default App
