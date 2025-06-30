import { Input } from "@/components/ui/input"
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if(longUrl) navigate(`/auth?createNew=${longUrl}`);
  }
    

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">The only URL Shortner <br /> you'll ever need! 👇
      </h2>

      <form onSubmit={handleShorten} className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter your long URL"
          onChange = {(e) => setLongUrl(e.target.value) }
          className="h-full flex-1 py-4 px-4"
        />
        <Button className="h-full" type="submit" variant="destructive">Shorten</Button>
      </form>

      <img src="/banner.jpeg" alt="banner" className="w-full my-11 sm:px-16" />

      <Accordion type="multiple" collapsible className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does the Trimmr Work</AccordionTrigger>
          <AccordionContent>
            Trimmr is a URL shortener that takes long URLs and converts them into short, manageable links. It uses a unique algorithm to generate short links that redirect to the original URL.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Do I need a account to use this app?</AccordionTrigger>
          <AccordionContent>
            No, you can use the app without creating an account. However, creating an account allows you to manage your links and access additional features.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </div>
  )
};

export default LandingPage;