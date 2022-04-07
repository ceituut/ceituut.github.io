import java.io.*;
import java.util.ArrayList;
import java.util.Scanner;
public class solve
{
    public static void main(String args[]) throws Exception
    {
        Scanner scan = new Scanner(System.in);

        FileWriter file_wr = new FileWriter("users.txt");
        FileWriter output = new FileWriter("out.txt");

        ArrayList<String> ids = new ArrayList<String>();
        int command_counter = 0;
        int found;
        while(true)
        {
            String[] input = scan.nextLine().split(" ");

            if(input[0].equals(""))
                break;
    
            if(input[0].equals("Add"))
            {
                // store user.
                for(int i=1; i<input.length; i++)
                    file_wr.write(input[i] + " ");
                output.write("User " + input[input.length-1] + " added successfully" + "\n");
                file_wr.write(System.lineSeparator());
                ids.add(input[input.length-1]);
            }
            if(input[0].equals("Find"))
            {
                // search for user with id.
                found = 0;
                command_counter++;
                for(int i=0; i<ids.size(); i++)
                {
                    if(ids.get(i).contains(input[1]))
                    {
                        found++;
                        output.write(command_counter + " " + ids.get(i) + " Found" +  "\n");
                    }
                }
                if(found == 0)
                    output.write(command_counter + " " + "No user found" + "\n");
            }
        }
        output.close();
        file_wr.close();
        // print output file
        BufferedReader br = new BufferedReader(new FileReader("out.txt"));
        String line;
        while ((line = br.readLine()) != null)
            System.out.println(line);
        br.close();
        scan.close();
    } 
}