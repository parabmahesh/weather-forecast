sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"demo/weatherforecast/service/WeatherService",
	"sap/m/GroupHeaderListItem"
], function (Controller, JSONModel, WeatherService, GroupHeaderListItem) {
	"use strict";

	const sortWeatherResultsByDate = (weatherResults) => weatherResults.sort((weatherData1, weatherData2) => new Date(weatherData2.dt_txt) - new Date(weatherData1.dt_txt));

	const filterWeatherResults = (weatherResults) => weatherResults.filter(weatherData => new Date(weatherData.dt_txt) > new Date());

	return Controller.extend("demo.weatherforecast.controller.App", {

		onInit: function () {
			this.initService();
			this.initModels();
			this.fetchWeatherDataByCityName();
		},

		initModels: function () {
			const view = this.getView();
			const pageModel = new JSONModel();
			pageModel.setData({
				"isError": false,
				"selectedCity": "Pune"
			});

			view.setModel(pageModel, "pageModel")
		},

		initService: function () {
			this.service = new WeatherService();
		},

		onCitySelectionChange: function (event) {
			const selectedItem = event.getParameter("selectedItem");
			const cityName = selectedItem.getKey();
			this.setSelectedCity(cityName);
			this.fetchWeatherDataByCityName(cityName);
		},

		setSelectedCity: function (cityName) {
			const view = this.getView();
			view.getModel("pageModel").setProperty("/selectedCity", cityName);
		},

		fetchWeatherDataByCityName: function (cityName = "Pune") {
			const view = this.getView();
			view.setBusy(true);
			this.service.getForeCastByCityName(cityName)
				.then(weatherData => this.setWeatherData(weatherData))
				.then(() => view.setBusy(false))
				.catch(error => this.handleError(error))
		},

		setWeatherData: function (data) {
			const view = this.getView();
			const weatherModel = new JSONModel();
			const weatherData = Object.assign({}, data);
			let sortedResults = sortWeatherResultsByDate((filterWeatherResults(weatherData.list)));
			sortedResults.forEach(data => data.date = new Date(data.dt_txt));
			weatherData.list = sortedResults;
			weatherModel.setData(weatherData);
			view.setModel(weatherModel, "weatherModel");
		},

		getDate: function (oContext) {
			const date = oContext.getProperty('date');
			return new Date(date).toDateString();
		},

		getGroupHeader: function (oGroup) {
			return new GroupHeaderListItem({
				title: oGroup.key,
				upperCase: false
			});
		},

		onListItemPress: function (event) {
			const panel = this.byId("weatherDetailsPanel");
			var selectedItem = event.getSource();
			var bindingContext = selectedItem.getBindingContext("weatherModel");
			var path = bindingContext.getPath();
			panel.bindElement({
				path: path,
				model: "weatherModel"
			});
		},

		onUpdateFinished: function (event) {
			const view = this.getView()
			const panel = view.byId("weatherDetailsPanel");
			const list = view.getModel("weatherModel").getProperty("/list")
			const initialIndex = list.length - 1 || 0;
			panel.bindElement({
				path: `/list/${initialIndex}`,
				model: "weatherModel"
			});
		},

		handleError: function (error) {
			const view = this.getView();
			view.setBusy(false);
			const pageModel = view.getModel("pageModel");
			pageModel.setProperty("/isError", true);
		}
	});

});
