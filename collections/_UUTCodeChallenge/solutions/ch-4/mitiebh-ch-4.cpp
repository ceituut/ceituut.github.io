#include <iostream>
#include <math.h>
#include <string>
#include <chrono>
using namespace std::chrono;
using namespace std;

static bool isPrime(int number)
{
    int pc;
    if (number == 2) return true;
    if (number < 2) return false;
    if(number%2 != 0)
    {
        for(int i=3; i<=number/i; i+=2)
        {
            if(number%i == 0) return false;
        }
        return true;
    }
    else return false;
}
int main()
{
    int N,pc2,prime;
    cin >> N;
    int to_range = pow(10,N);
    int from_range = pow(10,N-1)+1;
    if (from_range == 2)
    {
        cout << from_range << endl;
        from_range = 3;
    }
    //auto start = high_resolution_clock::now();
    while(from_range < to_range)
    {
        if (isPrime(from_range))
        {
            pc2 = 1;
            prime = from_range;
            prime /= 10;
            while (isPrime(prime))
            {
                pc2++;
                prime /= 10;
            }
            if (pc2 == to_string(from_range).length())
            {
                cout << from_range << endl;
            }
        }
        from_range += 2;
    }
    /*
    auto stop = high_resolution_clock::now();
    auto duration = duration_cast<seconds>(stop - start);
    cout << "Time taken by algorithm: " << duration.count() << " seconds" << endl;
    */
    return 0;
}