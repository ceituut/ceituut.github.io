import java.util.Scanner;
public class StrangeString
{
    static void Answer(String[] s1, String[] s2)
    {
        String[] arr = new String[s1.length*2];
        for(int i=0; i<s1.length*2; i++)
        {
            if(i % 2 == 0)
                arr[i] = s1[i/2];
            if(i % 2 == 1)
                arr[i] = s2[i/2];
        }
        String first_arr = arr[0];
        String second_arr = arr[1];
        for(int i=2; i<arr.length; i+=2)
        {
            if(first_arr.equals(arr[i]))
            {
                if(!second_arr.equals(arr[i+1]))
                {
                    System.out.println("False");
                    System.exit(0);
                }
                continue;
            }
            if(!first_arr.equals(arr[i]))
            {
                if(second_arr.equals(arr[i+1]))
                {
                    System.out.println("False");
                    System.exit(0);
                }
                continue;
            }
        }
        System.out.println("True");
    }
    public static void main(String args[])
    {
        Scanner scan = new Scanner(System.in);
        String[] input1 = scan.nextLine().split("");  // ex: a b b a
        String[] input2 = scan.nextLine().split(" "); // ex: dog fish fish dog
        Answer(input1,input2);
        scan.close();
    }
}