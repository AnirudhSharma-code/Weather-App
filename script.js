let apiid = "&appid=24ea83bd88af6afc1ebca5cefadb19c8";
let apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let temp = document.querySelector(".tempinc");
let city = document.querySelector(".city");
let moist = document.querySelector(".moist");
let wspeed = document.querySelector(".wspeed");
let inputdata = document.querySelector(".input");
let img=document.querySelector(".weather-img");
console.log(img);


document.querySelector(".button").addEventListener("click", () => {
    if (inputdata.value.trim().length === 0) {
        document.querySelector(".trans").classList.remove("update")
        console.log("Input is empty");
        inputdata.classList.add("wr-info");
        return;
    } else {
        async function weatherdata() {
            try {
                let weather = await fetch(apiurl + encodeURIComponent(inputdata.value.trim()) + apiid);
                let data = await weather.json();
                document.querySelector(".error").classList.remove("hide")
                console.log(data);

                if (data.cod === 200) {
                    document.querySelector(".error").classList.remove("hide")
                    document.querySelector(".trans").classList.add("update")
                    inputdata.classList.remove("wr-info")
                    temp.innerHTML = data.main.temp + "°C";
                    city.innerHTML = data.name;
                    moist.innerHTML = data.main.humidity + "%";
                    wspeed.innerHTML = data.wind.speed + "km/h";
                    if(data.weather[0].main=="Clouds"){
                        img.src="https://th.bing.com/th/id/OIP.dxwLuK0X7RSmsU8qozvhmAHaHa?rs=1&pid=ImgDetMain"
                    }
                    if(data.weather[0].main=="Clear"){
                        img.src="https://play-lh.googleusercontent.com/OzONoL7nqifa-wgpO24W6OQZUk2r8lTj9TPXrh4LmlOPL81c-vB04LUEXsZ8C6HjlHU"
                    }
                    if(data.weather[0].main=="Rain"){
                        img.src="https://th.bing.com/th/id/OIP.Qpdyra7LiwdpcyeyYbiiMAHaDn?w=344&h=170&c=7&r=0&o=5&dpr=1.4&pid=1.7"
                    }
                    if(data.weather[0].main=="Drizzle"){
                        img.src="https://th.bing.com/th/id/OIP.e2fqnUvU5GsM8aHAw6YqpwHaHa?w=170&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7"
                    }
                    if(data.weather[0].main=="Mist"){
                        img.src="https://th.bing.com/th/id/OIP.0OQSLqX5GUO4RSFWcltKhQAAAA?w=181&h=181&c=7&r=0&o=5&dpr=1.4&pid=1.7"
                    }
                    
                } else {
                    document.querySelector(".error").classList.remove("hide")
                    document.querySelector(".trans").classList.remove("update")
                    inputdata.classList.add("wr-info");
                    setTimeout(() => {
                        inputdata.classList.remove("wr-info");
                    }, 1000);
                    console.log("City not found:", data.message);
                }
            } catch (err) {
                document.querySelector(".error").classList.add("hide")
                console.log("Error fetching data:", err);
            }
        }
        weatherdata();
    }
});
