
import { useEffect, useState } from 'react';
import './App.css';
import XStates from './XStates.jsx'

function App() {

  const [countries, setCountries] = useState([]);


  useEffect(()=>{

    apiCall();
  },[])


    async function apiCall() {
     
      try{
      const endPoint = "https://crio-location-selector.onrender.com/countries"

      const result= await fetch(`${endPoint}`).then((response) => response.json())
      console.log(result);   
      setCountries(result); 

     }catch(e){
      console(e.response.message);
     }     

    } 



  return (
    <div className="App" >
     <XStates countries={countries}/>
    </div>
  );
}

export default App;
