---
layout: post
title: LeetCode之螺旋矩阵II
---

# 1. 题目描述
https://leetcode-cn.com/problems/spiral-matrix-ii/
# 2. 示例代码
```
class Solution {
    public int[][] generateMatrix(int n)
    {
        int[][] res = new int[n][n];

        int above_row = 0;
        int below_row = n-1;
        int left_col = 0;
        int right_col = n-1;
        int num =1;

        while(above_row <= below_row && left_col <= right_col)
        {
            //从左到右
            for(int i = left_col;i<=right_col;i++)
            {
                res[above_row][i] = num;
                num++;
            }
            above_row++;

            //从上到下
            for(int i= above_row;i<=below_row;i++)
            {
                res[i][right_col] = num;
                num++;
            }
            right_col--;

            //从右到左
            for(int i = right_col;i>=left_col;i--)
            {
                res[below_row][i] = num;
                num++;
            }
            below_row--;

            //从下到上
            for(int i = below_row;i>=above_row;i--)
            {
                res[i][left_col] = num;
                num++;
            }
            left_col++;

        }

        return res;
    }
}
```

