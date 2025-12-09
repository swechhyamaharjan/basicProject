import { Outlet } from "react-router"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"

function App() {
  return (
    <>
    <Header/>
    <main className="my-3"> {/*margin from top and botton */}
    <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default App
