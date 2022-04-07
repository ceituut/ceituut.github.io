string_a=input() ## abba
string_b=input() ## dog fish fish dog
array_b = string_b.split()
dict_a={}
counter = 0 
for i in string_a :
    if i in dict_a :
        v=dict_a[i]
        if v == array_b[counter] :
            counter = counter + 1
            continue
        else :
            print("False")
            exit()
    else:
        dict_a[i]=array_b[counter]
    counter = counter + 1

counter = 0 
for i in array_b :
    if i in dict_a :
        v=dict_a[i]
        if v == string_a[counter] :
            counter = counter + 1
            continue
        else :
            print("False")
            exit()
    else:
        dict_a[i]=string_a[counter]
    counter = counter + 1

print("True")
