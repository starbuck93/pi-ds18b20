#!/bin/bash
curl -sLS https://apt.adafruit.com/add | sudo bash
sudo apt-get install apache2 node -y
cd /var/www
sudo npm install -g ds18b20 socket.io socket.io-client
