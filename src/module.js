async function getWeather() {
	try {
		const search = document.getElementById('search').value;
		const form = document.getElementById('mainBody');

		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&cnt=5&appid=f36cabee0bdc20db9a756fb2ce2b4d57`
		);

		const data = await response.json();
		form.reset();

		const weather = {
			location: data.name,
			temperature: data.main.temp,
			min: Math.round(data.main.temp_min),
			max: Math.round(data.main.temp_max),
			weather: data.weather[0].description,
			lat: data.coord.lat,
			lon: data.coord.lon
		};

		const response2 = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.lat}&lon=${weather.lon}&exclude=hourly,minutely&units=metric&appid=f36cabee0bdc20db9a756fb2ce2b4d57`
		);
		const data2 = await response2.json();

		const content = document.getElementById('content');
		content.innerHTML = '';
		const content2 = document.getElementById('content2');
		content2.innerHTML = '';
		const div = document.createElement('div');
		div.className = 'dataTab';
		div.id = weather.location;
		div.innerHTML = `<div><h1>${weather.location}</h1><a>TODAY</a></div> 
      <div><h2>${weather.temperature}°C</h2></div> 
      <div>L:${weather.min}°C -- H:${weather.max}°C</div> 
      <div class="descriptionWeather">${weather.weather.toUpperCase()}</div>`;

		content.append(div);

		for (let i = 1; i < 8; i += 1) {
			const forecast = {
				location: data2.timezone,
				temperature: data2.daily[i].temp.day,
				min: Math.round(data2.daily[i].temp.min),
				max: Math.round(data2.daily[i].temp.max),
				weather: data2.daily[i].weather[0].description,
				date: new Date(data2.daily[i].dt * 1000).toLocaleDateString('en-us', {
					weekday: 'long',
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				})
			};

			const div2 = document.createElement('div');
			div2.className = 'forecast';
			div2.id = weather.location;
			div2.innerHTML = `<div><h1>${weather.location}</h1><a>${forecast.date}</a></div> 
      <div><h2>${forecast.temperature}°C</h2></div> 
      <div>L:${forecast.min}°C -- H:${forecast.max}°C</div> 
      <div class="descriptionWeather">${forecast.weather.toUpperCase()}</div>`;

			content2.append(div2);
		}
	} catch (err) {
		console.log(err);
	}
}

export default getWeather;
