# 1. 题目描述
https://leetcode-cn.com/problems/multiply-strings
# 2. 示例代码
就是乘法运算的模拟。也可以叫大数的乘法
```
class Solution 
{
  public String multiply(String num1, String num2)
  {
        //base case
        if(num1.equals("0") || num2.equals("0"))
            return "0";

        int length1 = num1.length();
        int length2 = num2.length();

        StringBuilder str = new StringBuilder();

        int[] intArr = new int[length1+length2];

        for(int i = length1 - 1;i>=0;i--)
        {
            for(int z = length2 - 1;z>=0;z--)
            {
                int number1 = num1.charAt(i) - '0';
                int number2 = num2.charAt(z) - '0';

                intArr[i + z] += number1 * number2;
                if(intArr[i+z] >= 10 && (i+z) !=0 )
                {
                    intArr[i+z-1] += intArr[i+z]/10;
                    intArr[i+z] %=10;
                }
            }
        }

        for(int i=0;i<length1 + length2 -1;i++)
            str.append(intArr[i]);
        
        return str.toString();
    }
}
```

