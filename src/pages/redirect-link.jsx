import { use, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLongUrl, storeClicks } from "../db/apiUrls";
import { BarLoader } from "react-spinners";
import useFetch from "../hooks/use-fetch";

const RedirectLink = () => {
  const {id} = useParams();

  const {loading,data,fn} = useFetch(getLongUrl, id);

  const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks,{
    id:data?.id,
    original_Url: data?.original_url,
  })

  useEffect(() => {
    fn()
  },[])

  useEffect(() => {
    if(!loading && data) {
      fnStats();
    }
  },[loading]);

  if(loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    )
  }

  return null;
};

export default RedirectLink;