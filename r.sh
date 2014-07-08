#!/bin/bash 

sudo rsync -avp -e 'ssh -p22 -i /Users/alouisos/.ssh/programming_instance.pem' "." ubuntu@54.227.234.21:"~/ctu_app"
