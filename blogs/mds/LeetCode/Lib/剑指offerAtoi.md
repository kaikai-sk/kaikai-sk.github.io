思路要全面, 多考虑代码的鲁棒性

空指针,空串,符号,溢出

测试用例:
* 功能测试(正数 负数 和0)
* 边界测试(最大正整数,最小负整数)
* 特殊输入测试(NULL,"",字符串中有特殊字符)

```
public class Solution
{
    /**
     * 注意检测空指针 空串"" 正负号 溢出
     * @param str
     * @return
     */
    public int StrToInt(String str)
    {
        //异常值检测
        if(str==null || str.length()<=0)
        {
            return 0;
        }

        boolean isPositive = true;
        int index=0;
        int number=0;
        if(str.charAt(index)=='+')
        {
            isPositive=true;
            index++;
        }
        else if (str.charAt(index)=='-')
        {
            isPositive=false;
            index++;
        }

        //判断是否只有'+'或者'-'
        if(index>=str.length())
        {
            return 0;
        }

        //处理字符串中的数字
        while(index<str.length())
        {
            if(str.charAt(index)>= '0' && str.charAt(index)<='9')
            {
                number = number*10 + str.charAt(index)-'0';
                index++;

                //考虑溢出情况
                if(number<Integer.MIN_VALUE || number>Integer.MAX_VALUE)
                {
                    return 0;
                }
            }
            else
            {
                return 0;
            }
        }

        if (isPositive==false)
        {
            number = -number;
        }

        return number;
    }

    public static void main(String[] args)
    {
        Solution s = new Solution();
        String str1 = "+";
        System.out.println(str1 + " : " + s.StrToInt(str1));
        String str2 = "+10";
        System.out.println(str2 + " : " + s.StrToInt(str2));
        String str3 = "-100";
        System.out.println(str3 + " : " + s.StrToInt(str3));
        String str4 = "10";
        System.out.println(str4 + " : " + s.StrToInt(str4));
        String str5 = "123";
        System.out.println(str5 + " : " + s.StrToInt(str5));
        String str6 = "111a2";
        System.out.println(str6 + " : " + s.StrToInt(str6));
        String str7 = "++";
        System.out.println(str7 + " : " + s.StrToInt(str7));
        String str8 = "";
        System.out.println(str8 + " : " + s.StrToInt(str8));
        String str9 = null;
        System.out.println(str9 + " : " + s.StrToInt(str9));
    }

}
```

