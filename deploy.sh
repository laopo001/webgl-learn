#!/bin/sh

for ((i=0; i<=5; i++)); do
    echo "node_modules/.bin/webpack --env.demo=demo$i --colors"
	node_modules/.bin/webpack --env.demo=demo$i --colors
    echo "gulp upload --demo=$i"
    gulp upload --demo=$i
done