sap.ui.define([
	"sap/ui/base/Object",
	"demo/weatherforecast/config/AppConfig"
], function (BaseObject, AppConfig) {
	"use strict";

	const WeatherService = BaseObject.extend("demo.weatherforecast.service.WeatherService", {
		constructor: function () {
			BaseObject.call(this);
		}
	});

	WeatherService.prototype.getForeCastByCityName = function (cityName, countryCode = "IN") {
		if (!cityName) {
			throw Error("City is required!")
		}

		const serviceEndPoint = AppConfig.WeatherServiceEndPoint;
		const apiKey = AppConfig.APIKey;

		return new Promise((resolve, reject) => {
			const url = `${serviceEndPoint}/forecast?q=${cityName},${countryCode}&appid=${apiKey}&units=metric&cnt=40`;
			fetch(url)
				.then(response => resolve(response.json()))
				.catch(error => reject(error));
		});
	};

	return WeatherService;
});
