#!/bin/bash

npm install
ng build --prod --base-href /
rm -rf /var/www/archie/beeri/*
mv dist/archie-beeri-ui/* /var/www/archie/beeri
