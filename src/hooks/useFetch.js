import { useState, useEffect } from "react"

export default function useFetch(url){
    const [ loading, setLoading ] = useState(true);
    const [ result, setResult ] = useState(null);
    const [ error, setError ] = useState(null);

   
    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response =  await fetch(url);
                const data = await response.json();
                setResult(data);
                setLoading(false);
            }catch(err){
                setError(err);
                setLoading(false);
            }
        }
        fetchData();    

    },[url]);

    return {loading, result, error};  
}