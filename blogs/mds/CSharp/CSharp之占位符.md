﻿![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwMTI1MTAxNTM1NzQ1?x-oss-process=image/format,png)

示例代码：

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 占位符
{
    class Program
    {
        static void Main(string[] args)
        {
            int n1 = 10;
            int n2 = 20;
            int n3 = 30;
            Console.WriteLine("第一个数字是：{0}，第二个数字是：{1}，第三个数字是：{2}\n", n1, n2, n3);
            Console.WriteLine("第一个数字是：{0}，第二个数字是：{2}，第三个数字是：{1}\n", n1, n2, n3);
            Console.ReadKey();
        }
    }
}

```
