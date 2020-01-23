![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwMTMwMTM1NDAwMzQw?x-oss-process=image/format,png)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace out参数的使用
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
            //写一个方法，求一个数组的最大值、最小值、总和和平均值
            //int[] res = GetMaxMinSumAvg(numbers);
            //Console.WriteLine("最大值是{0}，最小值是{1}，总和是{2}，平均值是{3}",res[0],res[1],
            //    res[2],res[3]);

            int max = 0;
            int min = 0;
            int sum = 0;
            int avg = 0;
            GetMaxMinSumAvg(numbers, out max, out min, out sum, out avg);
            Console.WriteLine("最大值是{0}，最小值是{1}，总和是{2}，平均值是{3}",
                max, min,sum, avg);
        }

        /// <summary>
        ///  一个方法，求一个数组的最大值、最小值、总和和平均值
        /// </summary>
        /// <param name="nums">要求的数组</param>
        /// <param name="max">要返回的最大值</param>
        /// <param name="min">要返回的最小值</param>
        /// <param name="sum">要返回的总和</param>
        /// <param name="avg">要返回的平均值</param>
        public static void GetMaxMinSumAvg(int[] nums,out int max,out int min,out int sum,out int avg)
        {
            max = nums[0];
            min = nums[1];
            sum = 0;
            for (int i = 0; i < nums.Length; i++)
            {
                if (nums[i] > max)
                {
                    max = nums[i];
                }
                if (nums[i] < min)
                {
                    min = nums[i];
                }
                sum += nums[i];
            }
            avg = sum / nums.Length;
        }

        /// <summary>
        /// 一个方法，求一个数组的最大值、最小值、总和和平均值
        /// </summary>
        /// <param name="nums">待求的数组</param>
        /// <returns>四个结果所在的数组</returns>
        public static int[] GetMaxMinSumAvg(int[] nums)
        {
            int[] res = new int[4];
            //假设res[0]--最大值 res[1]--最小值 res[2]--总和 res[3]--平均值
            res[0] = nums[0];
            res[1] = nums[1];
            res[2] = 0;
            for(int i=0;i<nums.Length;i++)
            {
                if(nums[i]>res[0])
                {
                    res[0] = nums[i];
                }
                if(nums[i]<res[1])
                {
                    res[1] = nums[i];
                }
                res[2] += nums[i];
            }
            res[3] = res[2] / nums.Length;
            return res;
        }
    }
}

```
