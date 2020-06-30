# weatherforecast
A demo app for weather forecast

[DEMO](http://www.weather-forecast.com.s3-website.ap-south-1.amazonaws.com/webapp/index.html)

## Prerequisites
To run this app please install UI5 tooling globally as below
- npm install --global @ui5/cli

### Verify installation
ui5 --help

- The **UI5 CLI** of the [UI5 Tooling](https://github.com/SAP/ui5-tooling#installing-the-ui5-cli).
    - For installation instructions please see: [Installing the UI5 CLI](https://github.com/SAP/ui5-tooling#installing-the-ui5-cli).

## Getting started
1. Clone this repository and navigate into it
    ```sh
    git clone https://github.com/SAP/weatherforecast.git
    cd weatherforecast
    ```
1. Install all dependencies
    ```sh
    npm install
    ```

1. Start a local server and run the application (http://localhost:8080/index.html)
    ```sh
    npm start
    ```

## Testing
* Run  tests to eslint as well ass running qUnit tests and code coverage
    ```sh
    npm run test
    ```

## Building
### Option 1: Standard preload build
* Execute the build
    ```sh
    npm run build
    ```