#!/bin/bash

if [ "$2" == "" ]
then
  echo "Usage: start-script.sh SCRIPT TITLE"
  exit 0
fi

SCRIPT=$1
TITLE=$2

. ~/.bashrc
HISTFILE=
echo -en "\033]0;$TITLE\a"

while [ 1 ]
do
  NOW=`date +%y%m%d`
  rm $HOME/logs/${TITLE}.log
  ln -s $HOME/logs/${TITLE}_$NOW.log $HOME/logs/${TITLE}.log
  $1 2>&1 | tee -a $HOME/logs/${TITLE}_$NOW.log
  echo
  echo "The script has terminated. If there was an error, it has been logged. The script will automatically be restarted in 30 seconds..."
  echo
  sleep 30
done
cd $HOME

