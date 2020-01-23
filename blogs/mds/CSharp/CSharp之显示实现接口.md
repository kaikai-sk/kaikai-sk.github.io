```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/// <summary>
/// 显示实现接口就是为了解决方法的重名问题
/// </summary>
namespace 显示实现接口
{
    class Program
    {
        static void Main(string[] args)
        {
            IFlyable bird = new Bird();
            bird.Fly();
            Bird bird1 = new Bird();
            bird1.Fly();
        }
    }

    public class Bird:IFlyable
    {
        public void Fly()
        {
            Console.WriteLine("鸟会飞！！！");
        }

        /// <summary>
        /// 显示实现接口
        /// </summary>
        void IFlyable.Fly()
        {
            Console.WriteLine("我是接口的飞！！！");
        }
    }

    public interface IFlyable
    {
        void Fly();
    }
}

```
