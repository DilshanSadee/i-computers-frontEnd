import { createClient } from "@supabase/supabase-js";


  const url =  "https://tqtnermufdxuejwsoivg.supabase.co"
 const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxdG5lcm11ZmR4dWVqd3NvaXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Mzc0NDQsImV4cCI6MjA3ODAxMzQ0NH0.au8x4TknQu9otvTzCLVjchV5b5HldY7uq944IxO6iWI"

    const supabase = createClient(url, key)

    export default function uploadFile(file){
      return new Promise (
        (resolve ,reject)=>{
          const timeStamp = Date.now();
          const fileName = timeStamp + "_" + file.name;
          console.log(fileName);
        supabase.storage.from("images").upload(fileName, file, {
            cacheControl : "3600",
            upsert : false,
        }).then(()=>{
           const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
          resolve(publicUrl)
        }).catch((error)=>{
          reject(error);
        })
        })
    }