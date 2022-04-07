n = int(input())
result = ""
flag = False
for i in range(n):
    n_input = input()
    if n_input == 'CAPS':
        flag = not flag
    else:
        if flag == True:
            result += n_input.capitalize()
        else:
            result += n_input
print(result)