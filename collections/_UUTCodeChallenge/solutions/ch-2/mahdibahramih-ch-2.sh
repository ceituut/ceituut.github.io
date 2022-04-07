while read line
do
	com=$(echo $line | cut -f1 -d ' ')
	if [ $com == "ADD" ]
	then
		echo $line >> entry.txt
		echo "USER $(echo $line | cut -f 5 -d " ") added succsessfully " 
	fi
	if [ $com == "FIND" ]
	then
		cat ./entry.txt  | awk '{print$5}' | grep $(echo $line | cut -f2 -d ' ')
	fi

done
