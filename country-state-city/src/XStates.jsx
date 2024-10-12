import React, { useState,useEffect } from "react";

function XStates ({countries}){

    const [stateList,setStateList] = useState([]);
    const [cityList,setCityList] = useState([]);

   const [country,setCountry] = useState('');
   const [state,setState] = useState('')
   const [city,setCity] = useState('');

   const endPoint = "https://crio-location-selector.onrender.com/"


  async function apiData  (country) {

    try{
        const response = await fetch(`${endPoint}country=${country}/states`);
     
        let stateData = await response.json();    
        console.log("got states for selected country", stateData);
        //return stateData;

        setStateList(stateData);

    }catch(e){

        console.error(e.message);        
    }
}

    async function CityData  (state) {

        try{
            const response = await fetch(`${endPoint}country=${country}/state=${state}/cities`);
         
            let cityData = await response.json();    
            console.log("got cities for selected state", cityData);
            //return stateData;
    
            setCityList(cityData);
    
        }catch(e){
    
           console.error(e.message);        
        }
    
       }
   

  const selectCountry=(e)=>{
    const ctry = e.target.value;
    setCountry(ctry);
    console.log("selected country =>"+ ctry);
        try{
            apiData(ctry);
        }catch(e){
        console.log(e.response.message);
        }   
  }

  const selectState = (e) =>{
    const s_state = e.target.value;
    setState(s_state);
    console.log("selected state =>"+ s_state);
        try{
            CityData(s_state);
        }catch(e){
        console.log(e.response.message);
        }   
  }

  const selectCity =(e) =>{
    const s_city = e.target.value;
    setCity(s_city);
    console.log("selected city =>" + s_city);    
  }

    useEffect(()=>{
        setStateList([]);
        setCityList([]);
        setCity("");

    },[country]);


    return (
    
    <div className="container">
            <h1> Select Location</h1>


        <select name="countries-list" 
                id="countries"
                onChange={selectCountry} 
                >
            <option value="none" selected hidden>Select Country</option>
            {
                
            countries.map((coun)=>(<option value={coun.value} >{coun}</option>))
            }
            
        </select>

        <select name="state-list"
                 id="states"
                 onChange={selectState}>
            <option value="none"  disabled selected>Select State</option>
            {
        stateList.map((st) => (<option value={st.value}>{st}</option>))
            }
            
        </select>
        <select name="city-list" 
                id="cities"
                onChange={selectCity}>
        <option value="none"  disabled selected>Select city</option>
            {
        cityList.map((cty) => (<option value={cty.value}>{cty}</option>))
            }
            
        </select>
        <br/>
        <br/>
        { city!== "" ?              
                (<div with="300px"><span>You selected <b>{city}</b>, {state}, {country}</span></div>): (<></>)}           
                
        
  
    
    </div>);


}export default XStates;

//https://x-states-lovat.vercel.app/ 
