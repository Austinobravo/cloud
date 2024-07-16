import { NextRequest, NextResponse } from "next/server";
import fs from 'fs'
import path from "path";
export async function POST(params:Request) {
    const data = await params.json()
    const fileName = data.title ? `${data.title}.txt` : 'cloudimages.txt'
    const filePath = path.join(process.cwd(),'public/files', fileName)
    try{
        for(let file of data.files){
            fs.appendFileSync(filePath, file+"\n")
        }
    
        const fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/files/${fileName}`
    
        return  NextResponse.json( {message:'Gotten', url: fileUrl})
    }catch(error){
        return NextResponse.json(error)
    }
    
}