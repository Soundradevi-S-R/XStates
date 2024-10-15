import React, { useState,useEffect } from "react";

function XStates (){

    const [countriesList,setCountriesList] = useState([]);
    const [stateList,setStateList] = useState([]);
    const [cityList,setCityList] = useState([]);
  
    const [country,setCountry] = useState('');
    const [state,setState] = useState('')
    const [city,setCity] = useState('');

   
   
     const endPoint = "https://crio-location-selector.onrender.com/"; 

 
 
    async function getCountryList() {
      
       try{
       const country_endpoint = "https://crio-location-selector.onrender.com/countries"
 
       const result= await fetch(`${country_endpoint}`).then((response) => response.json())
      // console.log(result);   
       setCountriesList(result); 
 
      }catch(e){
       console("Error while fetching the Countries",e);
      }     
 
     } 
 
  async function getStatesAPI  (country) {

    try{
        const response = await fetch(`${endPoint}country=${country}/states`);
     
         let stateData = await response.json();    
         //console.log("got states for selected country", stateData);    
         setStateList(stateData);

    }catch(e){
        console.error("Error while fetching the States", e);        
    }
}

    async function getCityAPI  (state) {

        try{
            const response = await fetch(`${endPoint}country=${country}/state=${state}/cities`);
         
            let cityData = await response.json();    
        //    console.log("got cities for selected state", cityData);          
    
            setCityList(cityData);
    
        }catch(e){
    
           console.error("Error while fetching the Cities", e);        
        }
    
       }
   

  let selectCountry=(e)=>{    
    setCountry(e.target.value);
    console.log("selected country =>"+ country);       
  }

  let selectState = (e) =>{     ;
    setState(e.target.value);
    console.log("selected state =>"+ state);          
  }

  let selectCity =(e) =>{   
    setCity(e.target.value);
    console.log("selected city =>" + city);    
  }

  // set countries while loading initially
    useEffect(()=>{
       
        try{
            getCountryList();
        }catch(e){
        console.log(e.response.message);
        }
    },[]);

// get states when country is selected 
     useEffect(()=>{    
        if(country !== ""){
            console.log("change in country");
            try{
                getStatesAPI(country);
               // setCityList([]);
            }catch(e){
            console.log(e.response.message);
            }
        }   
     },[country]);

// get cities  when state is selected 
     useEffect(() => {
       
            if(state !== ""){
                console.log("change in state");
                try{
                    getCityAPI(state);
                }catch(e){
                console.log(e.response.message);
                } 
            } 
         },[state]);


    return (
    
    <div className="container">
            <h1> Select Location</h1>


        <select name="countries-list" 
                id="countries"
                onChange={selectCountry} 
                value={country}
                
                >
           <option value="Select Country" selected>Select Country</option>
            {
                
                countriesList.map((coun)=>(<option value={coun.value} key={coun.value} >{coun}</option>))
            }
            
        </select>

        <select name="state-list"
                 id="states"
                 onChange={selectState}
                 value={state}>
            <option value="none"  disabled selected>Select State</option>
            {
        stateList.map((st) => (<option value={st.value} key={st.value}>{st}</option>))
            }
            
        </select>
        <select name="city-list" 
                id="cities"
                onChange={selectCity}
                value={city}
               >
        <option value="none"  disabled selected>Select city</option>
            {
        cityList.map((cty) => (<option value={cty.value} key={cty.value}>{cty}</option>))
            }
            
        </select>
        <br/>
        <br/>
        { city!== "" ?              
                (<div with="300px"><span>You selected <b>{city}</b>, {state}, {country}</span></div>): (<></>)
        }      
                
        </div>);


}export default XStates;

//https://x-states-lovat.vercel.app/ 
