FPM-Pilot
=========

Pilot project for FP mining

Process data in Mahout
--------------
- cd test
- node test1.js > in.dat
- ssh namenode
- sudo su hdfs
- cd ~
- ............ get in.dat ...............
- ............ start hadoop service if it was not...........
- hadoop fs -mkdir .
- hadoop fs -put in.dat .
- export JAVA_HOME=/etc/alternatives/jre
- ............ -k 10 means that for each item i, we find the top 10 association rules: the sets of items including the item i which occurs in the biggest number of transactions.
- ............ -s 2 means that we only consider the sets of items which appears in more than 2 transactions
- /usr/lib/mahout/bin/mahout fpg -i in.dat -o patterns -k 50 -method mapreduce -s 2
- mahout seqdumper -i patterns/frequentpatterns/part-r-00000 > seqdumper.log
- ............ exit ssh and return to frontend .............
- node test3.js
- node test4.js
- cp fp.json ../db
- cp items.json ../db
