#!/bin/bash
# Simple script for automatic git update

while [ 1 ]
do
git pull
python autoRefresher.py
now=$(date +"%D %T")
git add ../data/*
git add ../cache/*
git commit -m "$now"
git push
sleep 3600
done
