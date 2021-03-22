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
        this.timeCalc();
        this.getQuote();
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
        let time = new Date();
        
        localStorage.setItem("temperature", temp);
        localStorage.setItem("time", time.getTime());
        this.adInput(temp);
        console.log("new data");

            
    }).catch(err => {
        console.log(err);
    });
    


    }
    getFromLocal(){
        let temp = localStorage.getItem("temperature");
        this.adInput(temp);
        console.log("old data");
    }
    getQuote(){
        let quoteUrl = `https://api.quotable.io/random?tags=famous-quotes`
        fetch(quoteUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data.content);
            let author = data.author;
            let quote = data.content;
            document.querySelector("#quoteAuth").innerHTML = "relax and enjoy your quote by " + author;
            document.querySelector("#quote").innerHTML = quote;
        })
    }
    timeCalc(){
        let storageTimestamp = localStorage.getItem("time");
        console.log(storageTimestamp);
        let currentDate = new Date();
        let currentTime = currentDate.getTime();
        let timeCanPass = 3600000;
        let calc = parseInt(currentTime) - parseInt(storageTimestamp);
        console.log(calc + " new time");
    
        
        if(calc > timeCanPass | storageTimestamp == null){
            localStorage.clear();
            this.getWeather();
        }
        else{
            this.getFromLocal();
        }


        
    }
    adInput(temp){
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
    }

}


let app = new App();