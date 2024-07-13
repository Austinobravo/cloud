import FileButton from "@/Components/FileButton"
import Link from "next/link";

const Home = () => {
  return (
    <>
    <section className="md:px-8 px-4 pt-5 bg-cover bg-center w-full h-96" style={{"backgroundImage":`url(https://cloudinary-marketing-res.cloudinary.com/image/upload/f_auto,q_auto,w_1800/v1706797510/Background_2toneBlue-home)`}}>
      <div className="text-white flex flex-col justify-center space-y-3 h-72 md:w-[500px]">
          <h3 className="text-5xl leading-snug">Your One time <span className="text-blue-500">Cloudinary</span> Uploader</h3>
          <p className="text-sm">Designed as a personal project to assist in cloud file uploads.</p>
          <Link href={`#file`} className="bg-gradient-to-l from-blue-500 to-slate-900 shadow-lg py-3 px-7 hover:animate-pulse outline-none text-wrap w-fit">Get Started</Link>
      </div>
    </section>
    <section>
      <FileButton/>
    </section>
    </>
  )
}

export default Home;