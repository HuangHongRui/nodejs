#!/bin/sh
cd /Users/leo/Rui/learn/nodejs/blog/log
cp access.log $(date +%Y-%m-%d).access.log

echo "" > access.log