class App {
    constructor() {
        this.getLocation();
        this.lat;
        this.lng;
    }
    getLocation(){
        navigator.geolocation.getCurrentPosition(
            this.gotLocation.bind(this), 
            this.errorLocation.bind(this));
    }
    gotLocation(result){
        this.lat = result.coords.latitude;
        this.lng = result.coords.longitude;
        this.getWeather();
    }
    errorLocation(err){
        console.log(err);
    }
    getWeather(){
    //https://api.darksky.net/forecast/578f34885a24431ca5ea046be74456ce/37.8267,-122.4233
    let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/578f34885a24431ca5ea046be74456ce/${this.lat},${this.lng}?units=si` 
    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let temp =  data.currently.temperature;
        console.log(temp);
        document.querySelector("#temp").innerHTML = 
        temp+ "° outside";

        if (temp < 15) {
            console.log("temp under 15");
            document.getElementById("text").innerHTML = "no cycling weather? no worries get 50% off on your storage today!";
            document.querySelector("#button").style.display = "inline-block";
        }
        else{
            console.log("temp above 15");
            document.getElementById("text").innerHTML = "Time to get your bike outside of our storages! See you tonight!";
           document.querySelector("#button").style.display = "none";

        }
        //localStorage.setItem("currentWeather", JSON.stringify(data));
        //localStorage.setItem("time", time.getTime());
        
            
    }).catch(err => {
        console.log(err);
    });


    }
}


let app = new App();