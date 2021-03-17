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

        if (temp < 10) {
            document.querySelector(".ad").innerHTML = 
            "kleiner dan 10"
        }
        else{
            document.querySelector(".ad").innerHTML = 
            "groter dan 10"
        }
        
            
    }).catch(err => {
        console.log(err);
    });


    }
}


let app = new App();