const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')
const forecast = new Forecast();

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const cityValue = cityForm.city.value.trim();
    cityForm.reset();



    forecast.cityUpdate(cityValue).then(data => {
        updateUI(data);
    }).catch(err => {
        console.log(err);
    })

    //set local storage
    localStorage.setItem('city', cityValue)
})

if (localStorage.getItem('city')) {
    forecast.cityUpdate(localStorage.getItem('city')).then(data => {
        updateUI(data);
    }).catch(err => {
        console.log(err);
    })
}
updateUI = (data) => {
    const cityDets = data.cityDets;
    const weather = data.weather;
    details.innerHTML = `
    <h5 class="my-3">${cityDets.LocalizedName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
    `

    //remove d-none class
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }

    //update time and icon img
    let timeImg;
    // if (weather.IsDayTime) {
    //     timeImg = 'img/day.svg'
    // } else {
    //     timeImg = 'img/night.svg'
    // }
    weather.IsDayTime ? timeImg = 'img/day.svg' : timeImg = 'img/night.svg';
    time.setAttribute('src', timeImg);

    let iconImg = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconImg)
}