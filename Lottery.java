import java.util.Random;

/**
    Lottery
    This program simulates a lottery. The user
    chooses 10 numbers that will be compared with
    10 random lottery numbers to see if they have
    won the lottery.
*/

public class Lottery
{
    // assigns a total amount of lottery numbers to int
    private final int TOTAL_LOT_NUMS = 10;
    // creates integer array for lotteryNumbers
    private int[] lotteryNumbers;
    // creates Random object to generate numbers
    Random randGenerator = new Random();

    public Lottery()
    {
        // initialises new integer array for lotteryNumbers
        // with set amount of elements
        lotteryNumbers = new int[TOTAL_LOT_NUMS];

        // generates 10 random lottery numbers
        for(int count = 0; count < TOTAL_LOT_NUMS; count++)
            lotteryNumbers[count] = randGenerator.nextInt(10);
    }

    /**
        The matches method returns the amount of
        matching numbers from the users numbers
        and the lottery numbers.
        @param userNums Array containing user's chosen numbers
        @param lotto Array containing lottery numbers
    */
    public static int matches(int[] userNums, Lottery lotto)
    {
        int matches = 0;

        for(int i = 0; i < 10; i++)
        {
            if (lotto.getNum(i) == userNums[i])
                matches++;
        }
        return matches;
    }

    /**
        The getNum method retrieves an integer
        element from the lotteryNumbers.
    */
    public int getNum(int index)
    {
        return lotteryNumbers[index];
    }
}
