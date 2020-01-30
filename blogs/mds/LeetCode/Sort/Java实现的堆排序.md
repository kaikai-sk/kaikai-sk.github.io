原文图文并茂
https://www.cnblogs.com/chengxiao/p/6129630.html?tdsourcetag=s_pcqq_aiomsg

```
import java.util.Arrays;

public class HeapSort
{
    public static void main(String[] args)
    {
         int[] arr = {9,8,7,6,5,4,3,2,1};
         sort(arr);
        System.out.println(Arrays.toString(arr));
    }

    public static void sort(int[] arr)
    {
        //构建大顶堆
        for(int i= arr.length/2-1;i>=0;i--)
        {
            adjustHeap(arr,i,arr.length);
        }

        //调整堆结构+交换堆顶元素与末尾元素
        for(int j = arr.length-1;j>0;j--)
        {
            swap(arr,0,j);
            adjustHeap(arr,0,j);
        }

    }

    /**
     * 调整大顶堆（仅是调整过程，建立在大顶堆已经构建的基础上）
     * @param arr
     * @param i
     * @param length
     */
    public static void adjustHeap(int[] arr,int i, int length)
    {
        //取出当前元素
        int temp  = arr[i];

        //从i的左子节点开始，也就是2 * i + 1处开始
        for(int k = 2*i+1; k<length;k=2*k+1)
        {
            //如果左子节点小于右子节点，k指向右子节点
            if(k+1 < length && arr[k] < arr[k+1])
            {
               k++;
            }

            //如果子节点大于父节点，将子节点的值赋给父节点
            if(arr[k] > temp)
            {
                arr[i] = arr[k];
                i = k;
            }
            else
                break;
        }

        //将temp值放到最终的位置
        arr[i] = temp;
    }

    public static void swap(int[] arr,int a, int b)
    {
        int temp  = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }
}

```

