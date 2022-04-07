/* 
* Code by mohsen farajollahi 
*/
import java.util.Scanner;

public class C20Esfand {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int tekrar = in.nextInt() ;
        boolean caps = false ;
        String password = "" ;
        for (int i = 0 ; i < tekrar ; i ++) {
            String text = in.next() ;
            if (text.equals("CAPS")) {
                caps = !caps ;
                continue;
            }
            if (caps) {
                password += text.toUpperCase() ;
            }
            else {
                password += text.toLowerCase() ;
            }
        }
        System.out.println(password);
    }
    
}
