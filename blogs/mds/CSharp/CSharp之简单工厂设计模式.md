![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwMjAzMjEzNTI5NzEw?x-oss-process=image/format,png)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 简单工厂设计模式
{
    class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                Console.WriteLine("请输入您所需要的电脑品牌：");
                string brand = Console.ReadLine();
                Laptop lp = GetLaptop(brand);
                lp.SayHello();
            }

        }

        /// <summary>
        /// 简单工厂的核心（工厂），根据用户输入创建对象赋值给父类
        /// </summary>
        /// <param name="brand">电脑品牌</param>
        /// <returns></returns>
        public static Laptop GetLaptop(string brand)
        {
            Laptop lp = null;
            switch (brand)
            {
                case "Lenovo":
                    {
                        lp = new Lenovo();
                        break;
                    }
                case "IBM":
                    {
                        lp = new IBM();
                        break;
                    }
                case "Dell":
                    {
                        lp = new Dell();
                        break;
                    }
                case "Acer":
                    {
                        lp = new Acer();
                        break;
                    }
            }
            return lp;
        }
    }

    public abstract class Laptop
    {
        public abstract void SayHello();
    }

    public class Lenovo : Laptop
    {
        public override void SayHello()
        {
            Console.WriteLine("我是联想笔记本，你连想也不要想！");
        }
    }

    public class Acer : Laptop
    {
        public override void SayHello()
        {
            Console.WriteLine("我是宏基笔记本电脑");
        }
    }

    public class Dell : Laptop
    {
        public override void SayHello()
        {
            Console.WriteLine("我是Dell笔记本电脑");
        }
    }

    public class IBM : Laptop
    {
        public override void SayHello()
        {
            Console.WriteLine("我是IBM笔记本电脑");
        }
    }
}

```
