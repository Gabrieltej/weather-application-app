 // forecast js is for interacting with the API while app.js is for interacting with the DOM

const key = 'pM0XHuDkk2XTckNXTGNbRjx5HrNFnBAQ'

// get weather information
const getWeather= async(id)=>{
const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
const query=`${id}?apikey=${key}`
const response=await fetch(base+query)
const data=await response.json()
// console.log(data[0])
return data[0]
}



// get city information
const getCity=async(city)=>{
const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
const query=`?apikey=${key}&q=${city}`
const response=await fetch(base+query)
const data=await response.json()
return data[0]
}

