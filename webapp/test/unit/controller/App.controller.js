sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/mvc/Controller",
	"demo/weatherforecast/controller/App.controller",
	"demo/weatherforecast/service/WeatherService",
	"sap/ui/model/json/JSONModel"
], function (ManagedObject, Controller, AppController, WeatherService, JSONModel) {
	"use strict";

	QUnit.module("Test model modification", {

		beforeEach: function () {
			this.oAppController = new AppController();
			this.oViewStub = new ManagedObject({});
			sinon.stub(Controller.prototype, "getView").returns(this.oViewStub);

			this.oJSONModelStub = new JSONModel({
				list: []
			});
			this.oViewStub.setModel(this.oJSONModelStub);

			this.oWeatherService = new WeatherService();
		},

		afterEach: function () {
			Controller.prototype.getView.restore();

			this.oViewStub.destroy();

			this.oWeatherService = null;

			delete this.oWeatherService;
		}
	});

	QUnit.test("Should throw error when city is not passed", function (assert) {
		// Arrange
		// initial assumption: to-do list is empty
		assert.strictEqual(this.oJSONModelStub.getObject("/list").length, 0, "There must be no weather data");

		// Act
		assert.throws(
			function () {
				this.oWeatherService.getForeCastByCityName()
			},
			"raised error message contains 'description'"
		);

	});

	QUnit.test("Should fetch a weather for given city", function (assert) {
		const done = assert.async();
		const cityName = "Pune";
		this.oWeatherService.getForeCastByCityName(cityName)
			.then(data => {
				assert.equal(data.city.name, cityName, "Data fetched");
				done();
			});
	});
});
