```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 类型转换2
{
    class Program
    {
        static void Main(string[] args)
        {
            //int number = int.Parse("123");
            //Console.WriteLine(number);
            //Console.ReadKey();

            int number = 0;
            //转换成功返回true，值赋给number，不成功返回false
            bool b=int.TryParse("123abc", out number);
            Console.WriteLine(b);
            Console.WriteLine(number);
            Console.ReadKey();
        }
    }
}

```
