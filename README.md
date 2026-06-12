# Purpose

This is a web app used to store python scripts for SAM employees. When working with ArcGIS, developers may need to create python scripts for whatever reasons. These scripts could pile up in different file locations and could be hard to find. This dashboard acts as a hub for anyone using these python scripts. Users are able to add scripts and run these scripts directly from here. 

# Backend 
This uses an express backend. This is where we check for the files on your computer. It is stored in the backend folder in server.js. 

# How to run 
If accessing from GitHub, first you will need to clone the repository. 
In order to do that, once looking at the repository, click the green code button and copy the url. 
Then, in a command prompt run the command:

git clone <url.com> where the url is the one you just copied. 

Then, go into that directory in command prompt and then run the command: 

npm install 

and then:

npm run dev

This starts the frontend, or the client facing side of the app. We still need to run the backend so that we can access the data for files. In order to do this, open a command prompt. Then, in that, run cd "<path>" where path is the path to this project. Then run cd backend. Once you have done that run the command:

npm run

and the app should work!