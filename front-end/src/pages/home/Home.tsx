import { Footer } from "../../components/footer/Footer"
import { Header } from "../../components/header/Header"
import './home-style.scss'
export const Home = () => {
    return (
       <div className='homeWrap'>
         <Header />
         <Footer />
       </div>
    )
}