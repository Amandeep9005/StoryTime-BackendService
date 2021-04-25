# StoryTime-BackendService

This is a node backend service for 5 person Story Writing Game.

# Architecture
![image](https://user-images.githubusercontent.com/78565205/116010977-45fee980-a5f0-11eb-85a0-6fb209909ac3.png)


# Quick Start
Clone the repository git clone git@github.com:Amandeep9005/StoryTime-BackendService.git

# Install dependencies
npm install

# Run the server
node .

It supports 5 connection at the same time. Once all sockets are joined/open one Socket gets 10 secs to write/emit anything after that the next socket is given the chance
