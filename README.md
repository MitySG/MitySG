# MitySG - CS3216 Assignment 3 (Group 7)

‘MitySG: Am I There Yet?’ is a localised public transport notification web app that allows commuters to be glued to their screens and yet be aware about their transit arrival. Doing away with simply listing bus arrival timings, ‘MitySG’ pushes notifications the user when their user’s bus is arriving and when they are arriving at their destination (both Bus and MRT).

[Start your Worry-Free Journey today!](https://mitysg.tk/)

Note: Push notification feature does not work on any iOS / MacOS browsers at the moment.

## Group Members
* Chan Jin Jia (A0156579L)
    * UI/UX Designer
    * Created Mockups of the Application
	* Designed assets and logos
    * Handled logic for UX Flow
* Jeremy Jee De Sheng (A0139963N)
    * Setup Java Spring Backend REST Server
	* Data Scraping and Data Collection for Bus Stops & Stations
	* Consumption of REST APIs from LTA, Google Maps and busrouter.sg
	* Algorithm to track buses based on LTA's API
	* REST Endpoints for most backend calls
	* Serialization and Deserialization of the JSON data
	* Request to Push Server for Push Notification
* Oh Han Gyeol (A0144061U)
    * Setup on Push Notification Server
	* Worked on Service Workers
	* Worked on Push Notification Service
	* Setup Digital Ocean Hosing for Rest API Server
	* Setup domain name and SSL encryption for the webpage
* Wang Riwu (A0135766W)
    * Front-end developer
	* Implemented all design mockups for the front-end
	* Implemented front-end logic
	* Implemented front-end API integration with back-end
	* Added Google Analytics
	* Implemented geolocation

## Deployment
cd "backend/BusTracker (Java Spring)" && mvn clean install
