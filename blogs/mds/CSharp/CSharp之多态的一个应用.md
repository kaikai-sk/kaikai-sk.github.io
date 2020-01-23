![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwMjA2MjAzNzIwMzYw?x-oss-process=image/format,png)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 电脑_U盘_移动硬盘_MP3
{
    class Program
    {
        static void Main(string[] args)
        {
            MobileStorage ms = new UDisk();
            Computer cp = new Computer();
            cp.CpuRead(ms);
            cp.CpuWrite(ms);
        }
    }

    /// <summary>
    /// 抽象父类，移动存储设备
    /// </summary>
    public abstract class MobileStorage
    {
        public abstract void Read();
        public abstract void Write();

    }

    public class MobileDisk : MobileStorage
    {
        public override void Read()
        {
            Console.WriteLine("移动硬盘在读取数据");
        }

        public override void Write()
        {
            Console.WriteLine("移动硬盘在写入数据！！");
        }
    }

    public class UDisk : MobileStorage
    {
        public override void Read()
        {
            Console.WriteLine("u盘在读取数据");
        }

        public override void Write()
        {
            Console.WriteLine("U盘在写入数据");
        }
    }

    public class MP3 : MobileStorage
    {
        public override void Read()
        {
            Console.WriteLine("MP3在读取数据");
        }

        public override void Write()
        {
            Console.WriteLine("MP3在写入数据");
        }

        public void PlayMusic()
        {
            Console.WriteLine("MP3在播放音乐");
        }
    }

    public class Computer
    {
        public void CpuRead(MobileStorage ms)
        {
            ms.Write();
        }

        public void CpuWrite(MobileStorage ms)
        {
            ms.Read();
        }
    }
}

```
