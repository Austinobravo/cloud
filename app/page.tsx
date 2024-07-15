import FileButton from "@/Components/FileButton"
import Hero from "@/Components/Hero";
import Navbar from "@/Components/Navbar";
import Link from "next/link";

const Home = () => {
  return (
    <>
    <section className="md:px-8 px-4 pt-5 bg-cover bg-center w-full h-96" style={{"backgroundImage":`url(https://cloudinary-marketing-res.cloudinary.com/image/upload/f_auto,q_auto,w_1800/v1706797510/Background_2toneBlue-home)`}}>
      <Hero/>
    </section>
    <section  id='file' className='shadow-md md:w-[350px] rounded-md mx-auto px-4 pt-12 pb-24 my-4 !bg-white'>
      <FileButton/>
    </section>
    </>
  )
}

export default Home;