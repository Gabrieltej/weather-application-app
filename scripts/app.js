// forecast Js is for interacting with the API and app/js is for DOM manipulation

const cityForm=document.querySelector('form')
const card=document.querySelector('.card')
const details=document.querySelector('.details')
const time=document.querySelector('.tryit')
const icon=document.querySelector('.fufu')


const updateUI=(data)=>{
  //concept of destructuring
  const { cityDetails, weather } = data

  //update details templates
  details.innerHTML = `
 <h5 class="my-3">${cityDetails.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span class="text-uppercase">${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
`
  let iconSrc = `iconssvg/${weather.WeatherIcon}.svg`
  icon.setAttribute('src', iconSrc)

  let timeSrc = null
  if (weather.IsDayTime) {
    timeSrc = 'icons/day.svg'
  } else {
    timeSrc = 'icons/night.svg'
  }

  time.setAttribute('src', timeSrc)

  //remove the d-none class if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none')
  }
}

//setting up the asynchronous function to get data from the website
const updateCity=async(enteredcity)=>{
 const cityDetails=await getCity(enteredcity)
 const weather=await getWeather(cityDetails.Key)
 return {cityDetails, weather} //this is an object shorthand notation that is there is no two things, just only one thing representing their two
}


cityForm.addEventListener('submit',(e)=>{
e.preventDefault()

// get thecity value
const city=cityForm.city.value.trim()
// .trim is used to get rid of white spaces
cityForm.reset()
// update the UI with the info
updateCity(city).then((data)=>{
 updateUI(data)
 console.log(data)
}).catch((err)=>{
 console.log(err)
})



//setting up the local storage
localStorage.setItem('city',city)
})  

if(localStorage.getItem('city')){
  updateCity(localStorage.getItem('city'))
  .then(data=>updateUI(data))
  .catch(err=>console.log(err)
  )}