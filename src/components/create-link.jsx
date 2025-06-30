import React, { useEffect, useRef } from 'react'
import { QRCode } from 'react-qrcode-logo';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import Error from './error';
import {useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { useState } from 'react';
import { UrlState } from '../context';
import useFetch from '../hooks/use-fetch';
import { createUrl } from '../db/apiUrls';
import { BeatLoader } from 'react-spinners';


const CreateLink = () => {

  const {user} = UrlState();

  const [errors, setErrors] = useState({});

  const ref = useRef();

  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [formValues, setFormValues] = useState({
    title:"",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  })

  const schema = yup .object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup.string().url("Invalid URL").required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    })
  }

  const{
    loading,
    error,
    data,
    fn: fnCreateUrl,
    } = useFetch(createUrl, { ...formValues,user_id:user.id});

  useEffect(() =>{
    if(error == null && data) {
      navigate(`/link/${data[0].id}`);
    }
  },[error,data]);


  const createNewLink = async() => {
    setErrors([]);
    try{
      await schema.validate(formValues,{abortEarly :false});
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
    } 
    catch(e){
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      })
    }
  }


  return (
      <Dialog 
        defaultOpen={longLink}
        onOpenChange={(res) => {
          if(!res) setSearchParams({});
        }}
      >
        <DialogTrigger>
          <Button variant="destructive">Create New Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:mx-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
          </DialogHeader>
          {formValues?.longUrl && (
            <QRCode value={formValues?.longUrl} size={250} ref={ref} /> 
          )}
          

          <Input 
            id="title"
            value={formValues.title}
            onChange={handleChange}
            placeholder="Short Links's Title"
            />
          {errors.title && <Error  message={errors.title}/>}
          <Input 
            id="longUrl"
            value={formValues.longUrl}
            onChange={handleChange}
            placeholder="Enter your Long URl" />
          {errors.longUrl && <Error  message={errors.longUrl}/>}

          <div className="flex items-center gap-2">
            <Card className="p-2">trimrr.in</Card>/
            <Input 
              id="customUrl"
              placeholder="Custom Link (optional)"
              value = {formValues.customUrl}
              onChange={handleChange} 
              />
          </div>

          {error && <Error  message={error.message}/>}
          <DialogFooter className="sm:justify-start">
          <Button 
           disabled={loading}
           onClick={createNewLink}
           variant="destructive" 
          //  type="submit"
          >
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default CreateLink
