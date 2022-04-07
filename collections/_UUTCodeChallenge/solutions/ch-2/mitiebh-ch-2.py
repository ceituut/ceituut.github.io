import sys
users,output,c = [],[],0
while True:
    inputLine = sys.stdin.readline().strip()
    if inputLine == '':
        break
    inputLine = list(inputLine.split(' '))

    if inputLine[0] == 'Add':
        users.append(inputLine[1:])
        output.append("User " + inputLine[4] + ' added successfully') # output
        users.sort()

    if inputLine[0] == 'Find':
        line,f,c,found = " ",False,c+1,0
        for i in range(len(users)):
            if inputLine[1] == users[i][3][:len(inputLine[1])]:
                if found < 10:
                    output.append(str(c) + ' ' + line.join(users[i])) # output
                f = True
                found += 1
        if f == False:
            output.append(str(c) + ' No user found') # output
for out_line in output:
    print(out_line)