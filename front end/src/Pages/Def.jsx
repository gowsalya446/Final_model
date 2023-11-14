import { useState,useEffect } from "react";
function Def(){
   const[movie,setmovie]=useState([])
   const token = localStorage.getItem("Access_token");

   useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/movies/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })
    .then((response)=>response.json())
    .then((response)=>{
        console.log(response)
    })

   }
   )
    return(
        <>
        <h1>default page</h1>

        </>
    )
}
export default Def;