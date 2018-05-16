#!/bin/bash

i="0"
while [ $i -lt 500 ]
do
curl https://srinis-test.apigee.net/demo-seamless-deploy >> ping_results.txt
i=$[$i+1]
done