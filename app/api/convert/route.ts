import { NextRequest, NextResponse } from "next/server";
import fs from 'fs'
import path from "path";
export async function POST(params:Request) {
    const data = await params.json()
    const fileName = data.title ? `${data.title}.txt` : 'cloudimages.txt'
    const filePath = path.join(process.cwd(),'public/files', fileName)
    for(let file of data.files){
        console.log('fiele', file)
        fs.appendFileSync(filePath, file+"\n")
    }

    const fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${fileName}`
    
    // console.log("data", data)
    return  NextResponse.json( {message:'Gotten', url: fileUrl})
    
}