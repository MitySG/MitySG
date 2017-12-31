# MitySG - CS3216 Assignment 3 (Group 7)

MitySG: Am I There Yet?’ is a localised public transport notification web app that allows commuters to be glued to their screens and yet be aware about their transit arrival. Doing away with simply listing bus arrival timings, MitySG pushes notifications to the users when their buses are arriving and when they are arriving at their destinations (both Bus and MRT).

[Start your Worry-Free Journey today!](https://mitysg.tk/)

Note: Push notification feature does not work on any iOS / MacOS browsers at the moment.

## Group Members

* Chan Jin Jia (A0156579L)
  * UI/UX Designer
  * Created Mockups of the Application \* Designed assets and logos
  * Handled logic for UX Flow
* Jeremy Jee De Sheng (A0139963N)
  * Setup Java Spring Backend REST Server
    _ Data Scraping and Data Collection for Bus Stops & Stations
    _ Consumption of REST APIs from LTA, Google Maps and busrouter.sg
    _ Algorithm to track buses based on LTA's API
    _ REST Endpoints for most backend calls
    _ Serialization and Deserialization of the JSON data
    _ Request to Push Server for Push Notification
* Oh Han Gyeol (A0144061U)
  * Setup on Push Notification Server
    _ Worked on Service Workers
    _ Worked on Push Notification Service
    _ Setup Digital Ocean Hosing for Rest API Server
    _ Setup domain name and SSL encryption for the webpage
* Wang Riwu (A0135766W)
  * Front-end developer
    _ Implemented all design mockups for the front-end
    _ Implemented front-end logic
    _ Implemented front-end API integration with back-end
    _ Added Google Analytics \* Implemented geolocation

## Deployment

cd "backend/BusTracker (Java Spring)" && mvn clean install
