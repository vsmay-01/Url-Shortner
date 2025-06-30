import { Link } from 'react-router-dom'
import React from 'react'
import { Copy, Delete, Download, Trash } from 'lucide-react'
import { Button } from './ui/button'
import { deleteUrl } from '../db/apiUrls'
import { BeatLoader } from 'react-spinners'
import useFetch from '../hooks/use-fetch'

const Linkcard = ({url,fetchUrls}) => {

    const downloadImage = ()=> {
      const imageUrl = url?.qr;
      const fileName = url?.title;

      const anchor = document.createElement('a');
      anchor.href = imageUrl;
      anchor.download = fileName;

      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    const {loading :loadingDelete, fn: fnDelete } = useFetch(deleteUrl,url?.id);
  
  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg ">
      <img src={url?.qr}
       className="h-32 object-contain ring-blue-500 self-start"
       alt="qr-code" />
       
       <Link to={`/link/${url?.id}`} className="flex flex-col flex-1 items-start">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">{url?.title}</span>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          https://trimmr.in/{url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">{url?.original_url}</span>
        <span className="flex items-end font-extralight text-sm flex-1">{new Date(url?.created_at).toLocaleString()}</span>
       </Link>

       <div>
        <Button 
          variant="ghost"
          onClick={() => 
            navigator.clipboard.writeText(`https://trimmr.in/${url?.short_url}`)
          }
        >
          <Copy />
        </Button >
        <Button variant="ghost" onClick={downloadImage}>
          <Download />
        </Button>
        <Button variant="ghost" onClick={()=> fnDelete().then(()=>fetchUrls())}>

          {loadingDelete? <BeatLoader /> : <Trash />}
        </Button>
       </div>
      
    </div>
  )
}

export default Linkcard
