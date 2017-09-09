import java.util.Scanner;

public class LotteryDemo
{
    /**
        The inputUserNums method enables user to enter
        10 numbers and stores these in userNumbers array.
        @param userNums The array to contain user numbers
        @param keyboard The Scanner object that allows user input
    */
    public static void inputUserNums(int[] userNums, Scanner keyboard)
    {
        for(int num, count = 0; count < 10; count++)
        {
            System.out.print("Enter digit " + (count + 1) + ": ");
            num = keyboard.nextInt();
            // loop to validate user input
            while (num < 0 || num > 9)
            {
                System.out.println("Enter a number between 0-9:");
                num = keyboard.nextInt();
            }
            userNums[count] = num;
        }
    }

    /**
        The displayLottery displays the 10 randomly generated
        lottery numbers.
        @param numbers The Lottery object that comprises
        the lottery numbers.
    */
    public static void displayLottery(Lottery numbers)
    {
        System.out.print("Lottery numbers: ");
        for(int count = 0; count < 10; count++)
            System.out.print(numbers.getNum(count) + " ");
    }

    /**
        The grandPrize method displays the grand prize
		message if the user's 10 numbers matches
        the lottery's 10 numbers.
        @param numMatches The number of matching numbers
        from the user's numbers and the lottery numbers.
    */
    public static void grandPrize(int numMatches)
    {
        if (numMatches == 10)
            System.out.println("You have won!");
    }

    public static void main(String args[])
    {
        // create new Scanner object for user input
        Scanner keyboard = new Scanner(System.in);
        // initialize new int array for user numbers
        int[] userNumbers = new int[10];
        // initalise variable for number of matches
        int matches;

        // create new Lottery object to generate lottery numbers
        Lottery lotNumbers = new Lottery();

        // allow user to input numbers for lottery
        inputUserNums(userNumbers, keyboard);

        // display lottery numbers
        displayLottery(lotNumbers);

        // display number of matching numbers
        matches = Lottery.matches(userNumbers, lotNumbers);
        System.out.println("\nNumber of matching digits: " + matches);

        // display grand prize message if user has won
        grandPrize(matches);
    }
}
