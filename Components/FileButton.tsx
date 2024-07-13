'use client'
import { Camera, Clapperboard, Download, Link2 } from 'lucide-react'
import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FileButton = () => {
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
                // console.log("Updated files array:", newFiles);
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
            console.log("Before backend submission, files:", files);
            console.log("Before backend submission, title:", title);

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
    // submitToBackend(3,3)


  return (
      <>
      <section id='file' className='shadow-md md:w-[350px] rounded-md mx-auto px-4 pt-12 pb-24 my-4 bg-white'>
        <h3 className='text-center text-violet-500 pb-4 text-lg font-bold'>Upload Your Files</h3>
        <div className='shadow flex justify-center items-center gap-1 py-3 text-center my-2 font-bold'>
            <Clapperboard/> 
            <button type='button' onClick={()=> {setIsVideo(!isVideo), setIsImage(false)}}>Videos</button>    
        </div>
        <div className='flex justify-center items-center gap-1 shadow py-3 text-center font-bold'>
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
      </section>
      {/* <span onClick={()=>setFileUrl(prev => prev ? null : 'here')}>click</span> */}
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
      {/* <Suspense fallback="Loading button"> */}
      {/* </Suspense> */}
    </>
  )
}

export default FileButton