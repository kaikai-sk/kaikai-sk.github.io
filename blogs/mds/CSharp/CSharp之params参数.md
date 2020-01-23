3)、params可变参数
将实参列表中跟可变参数数组类型一致的元素都当做数组的元素去处理。
params可变参数必须是形参列表中的最后一个元素。

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace params可变参数
{
    class Program
    {
        static void Main(string[] args)
        {
            Test("张三", 99, 99, 99, 99, 99);
        }

        public static void Test(string name,params int[] socre)
        {
            int sum = 0;
            for(int i=0;i<socre.Length;i++)
            {
                sum += socre[i];
            }
            Console.WriteLine("{0}的总成绩是：{1}",name,sum);
        }
    }
}

```
