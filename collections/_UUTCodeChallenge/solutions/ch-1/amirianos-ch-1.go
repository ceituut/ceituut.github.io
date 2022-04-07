package main

import (
	"fmt"
	"strings"
)

func main() {
	first := "abc"
	second := "ali alti alir"
	res := strings.Split(second, " ")
	flag := true
	for i, letter := range first {
		for j, let := range first {
			if string(letter) == string(let) {
				if res[j] != res[i] {
					flag = false
				}
			}
		}
	}
	for i, letter := range res {
		for j, let := range res {
			if string(letter) == string(let) {
				if string(first[j]) != string(first[i]) {
					flag = false
				}
			}
		}
	}
	fmt.Println(flag)
}
