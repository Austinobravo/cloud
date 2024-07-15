"use client"
import { Camera, Clapperboard, Download } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  const [isVideo, setIsVideo] = React.useState<boolean>(false)
    const [isImage, setIsImage] = React.useState<boolean>(false)
    const [files, setFiles] = React.useState<Array<string>>([])
    const [title, setTitle] = React.useState<string>('')
    const [triggerSubmit, setTriggerSubmit] = React.useState<boolean>(false);
    const [widget, setWidget] = React.useState<any>(null);
    const [fileUrl, setFileUrl] = React.useState<string | null>(null)

    const submitFile = (result: any) => {
        if (result.event === "success") { 
            setFiles(prevFiles => {
                const newFiles = [...prevFiles, result.info.secure_url];
                return newFiles;
            });
        }
    };

    const handleQueuesEnd = (_:any,widgetInstance: any) => {
        setWidget(widgetInstance);
        setTriggerSubmit(true);
    };

    React.useEffect(() => {
        const submitToBackend = async () => {
            try {
                const response = await fetch('/api/convert', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ files: files, title: title })
                });

                if (!response.ok) {
                    throw new Error('Response failed');
                }

                const data = await response.json();
                // console.log("data", data);
                setFileUrl(data.url)

                if (widget) {
                    widget.close();
                }
            } catch (error) {
                console.error("An error occurred", error);
            }
        };

        if (triggerSubmit) {
            submitToBackend();
            setTriggerSubmit(false);
        }
    }, [files,fileUrl, title, triggerSubmit, widget]);

  return (
    <>
    <section className="pb-20">
    <nav className='bg-white w-full !py-7 !px-8 shadow-md fixed'>
        <Link href={`/`} className=' '>
            <Image src={`/logo-no-background.svg`} alt='' width={100} height={100} className=''/>
        </Link>
    </nav> 
    </section>
    <section className="md:px-8 px-4 pt-5 bg-cover bg-center w-full h-96" style={{"backgroundImage":`url(https://cloudinary-marketing-res.cloudinary.com/image/upload/f_auto,q_auto,w_1800/v1706797510/Background_2toneBlue-home)`}}>
      <div className="text-white flex flex-col justify-center space-y-3 h-72 md:w-[500px]">
          <h3 className="text-5xl leading-snug">Your One time <span className="text-blue-500">Cloudinary</span> Uploader</h3>
          <p className="text-sm">Designed as a personal project to assist in cloud file uploads.</p>
          <Link href={`#file`} className="bg-gradient-to-l from-blue-500 to-slate-900 shadow-lg py-3 px-7 hover:animate-pulse outline-none text-wrap w-fit">Get Started</Link>
      </div>
    </section>
    <section  id='file' className='shadow-md md:w-[350px] rounded-md mx-auto px-4 pt-12 pb-24 my-4 !bg-white'>
   
        <h3 className='!text-center !text-violet-500 pb-4 text-lg font-bold'>Upload Your Files</h3>
        <div className='!shadow flex justify-center items-center gap-1 py-3 text-center my-2 font-bold'>
            <Clapperboard/> 
            <button type='button' onClick={()=> {setIsVideo(!isVideo), setIsImage(false)}}>Videos</button>    
        </div>
        <div className='flex justify-center items-center gap-1 !shadow py-3 text-center font-bold'>
            <Camera/>
            <button type='button' onClick={()=> {setIsImage(!isImage), setIsVideo(false)}}> Images</button>
        </div>
        {isVideo || isImage ?
            <form>
                <label htmlFor='file_name' className='text-sm opacity-70'>File Name</label>
                <input type='text' placeholder='What is your file/files name?' id='file_name' name='file_name' onChange={(event)=>setTitle(event.target.value)} className='mt-1 w-full outline-none border-violet-500 placeholder:text-xs border-b bg-slate-50 px-3' required/>
               Title: {title}
                <div className='border border-dashed border-violet-500 rounded-md flex flex-col justify-center items-center h-32 mt-7'>
                    <Image src={`/file.png`} width={50} height={100} alt='file'/>
                    <CldUploadButton
                    options={{multiple: true}}
                    onSuccess={submitFile}
                    onQueuesEnd={handleQueuesEnd}
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                    >
                        <span className='text-sm'>
                            {isVideo && "Upload Video"}
                            {isImage && "Upload Image"}
                        </span>


                    </CldUploadButton>

                </div>
            </form>
        : 
        null
        }
      {/* <span onClick={()=>setFileUrl(prev => prev ? null : 'here')}>click</span> */}
      {/* <span onClick={()=>handleQueuesEnd('_','_')}>click</span> */}
      <div className={`!duration-1000 !delay-1000 !transition-all !ease-linear ${fileUrl ? 'bottom-0': ''} `}>
        {fileUrl ? 
            <div className='fixed bg-white/70 w-full bottom-0 py-2'>
                <Link href={fileUrl} target='_blank' download={true} className='ml-auto border bg-blue-500 flex items-center space-x-2 w-fit text-white py-2 px-4 rounded-md'>
                    <span>Download</span>
                    <Download size={20}/>
                </Link>
            </div>
        :
        null
        }

      </div>
    </section>
    </>
  )
}

export default Home;