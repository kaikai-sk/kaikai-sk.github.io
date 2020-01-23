![`这里写图片描述`](http://img.blog.csdn.net/20160125103046877)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 变量交换值
{
    class Program
    {
        static void Main(string[] args)
        {
            int n1 = 20;
            int n2 = 10;

            n1 = n1 - n2;
            n2 = n1 + n2;
            n1 = n2 - n1;

            Console.WriteLine("n1的值是：{0}，n2的值是：{1}", n1, n2);
            Console.ReadKey();
        }
    }
}

```
