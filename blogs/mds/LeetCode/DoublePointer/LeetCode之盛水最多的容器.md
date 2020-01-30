# 1. 题目描述
https://leetcode-cn.com/problems/container-with-most-water
# 2. 示例代码
双指针法
```
class Solution {
    public int maxArea(int[] height) 
    {
        int maxArea = 0, l = 0, r = height.length - 1;
        while(l < r)
        {
            maxArea = Math.max(maxArea,Math.min(height[l],height[r]) * (r -l));
            if(height[l] < height[r])
                l++;
            else
                r--;
        }

        return maxArea;
    }
}
```

