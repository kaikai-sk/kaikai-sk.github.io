![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwMTMwMTQxMzE4MjQ3?x-oss-process=image/format,png)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ref参数
{
    class Program
    {
        static void Main(string[] args)
        {
            //double salary = 5000;
            //JiangJin(ref salary);
            //Console.WriteLine(salary);

            int n1 = 10, n2 = 20;
            swapVar(ref n1, ref n2);
            Console.WriteLine("n1={0},n2={1}",n1,n2);
        }

        public static void swapVar(ref int n1,ref int n2)
        {
            n1 = n1 - n2;
            n2 = n1 + n2;
            n1 = n2 - n1;
        }

        public static void JiangJin(ref double s)
        {
            s += 500;
        }
    }
}

```
