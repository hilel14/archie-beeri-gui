#!/bin/bash

ng build --prod --base-href /
scp -r -i ~/.ssh/beeri.ec2.pem dist/ admin@archie.beeri.org.il:
ssh -i ~/.ssh/beeri.ec2.pem admin@archie.beeri.org.il