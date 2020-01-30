Given n points on a 2D plane, find the maximum number of points that lie on the same straight line.

```
import java.util.HashMap;
import java.util.Map;

class Point
{
    int x;
    int y;
    Point() { x = 0; y = 0; }
    Point(int a, int b) { x = a; y = b; }
}

/**
 *
 *   需要两重循环，第一重循环遍历起始点a，第二重循环遍历剩余点b。
 *
 *     a和b如果不重合，就可以确定一条直线。
 *
 *     对于每个点a，构建 斜率->点数 的map。
 *
 *     (1)b与a重合，以a起始的所有直线点数+1 (用dup统一相加)
 *
 *     (2)b与a不重合，a与b确定的直线点数+1
 */
public class Solution61
{
    public int maxPoints(Point[] points)
    {
        int n = points.length;
        if(n<2)
            return n;

        int ret = 0;
        for(int i=0;i<n;i++)
        {
            //分别统计与点i重合以及垂直的点的个数
            int dup = 1, vtl = 0;
            Map<Float,Integer> map = new HashMap<>();
            Point a = points[i];

            for(int j=0;j<n;j++)
            {
                if(i == j)
                    continue;
                Point b = points[j];
                if(a.x == b.x)
                {
                    if(a.y == b.y)
                        dup ++;
                    else
                        vtl++;
                }
                else
                {
                    float k = (float) (a.y - b.y)/(a.x - b.x);
                    if(map.get(k) == null)
                        map.put(k,1);
                    else
                        map.put(k,map.get(k)+1);
                }
            }

            int max = vtl;
            for(float k: map.keySet())
            {
                max = Math.max(max,map.get(k));
            }

            ret = Math.max(ret,max + dup);
        }

        return ret;
    }
}






```

