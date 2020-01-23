![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwMTI5MjAwODQ5OTA3?x-oss-process=image/format,png)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 枚举和int以及string类型间的转换
{
    public enum QQState { onLine,offLine,leave,busy,QMe}
    class Program
    {
        static void Main(string[] args)
        {
            #region 将枚举类型转换成int类型
            //QQState state = QQState.onLine;
            //int n = (int)state;
            //Console.WriteLine(n);
            //Console.WriteLine((int)QQState.offLine);
            //Console.WriteLine((int)QQState.leave);
            //Console.WriteLine((int)QQState.busy);
            //Console.WriteLine((int)QQState.QMe);
            #endregion

            #region 将int类型强转为枚举类型
            //int n = 3;
            //QQState state = (QQState)n;
            //Console.WriteLine(state);

            //int n = 8;
            //QQState state = (QQState)n;
            //Console.WriteLine(state);
            #endregion

            #region
            //所有的类型都能够转成string类型
            //int n = 10;
            //double n = 3.14;
            //decimal n = 1.444444444m;
            //string str = n.ToString();
            //Console.WriteLine(str);
            #endregion

            #region 将枚举类型转换为string类型
            //QQState state = QQState.onLine;
            //string str = state.ToString();
            //Console.WriteLine(str);
            #endregion

            #region 将string类型转换为枚举类型
            //string s = "onLine";
            //QQState state = (QQState)Enum.Parse(typeof(QQState), s);
            //Console.WriteLine(state);
            #endregion


        }
    }
}

```
