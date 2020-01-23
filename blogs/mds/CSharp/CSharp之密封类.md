7、sealed密封类 
不能够被其他类继承，但是可以继承于其他类。

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 密封类
{
    class Program
    {
        static void Main(string[] args)
        {
        }
    }

    public sealed class Person
    {

    }

    public class Test:Person
    {

    }
}

```
