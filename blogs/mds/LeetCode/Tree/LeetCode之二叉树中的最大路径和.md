# 1. 题目描述
https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/
# 2. 示例代码
递归是真的好用
```
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    private int max  = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root)
    {
        if(root == null)
            return 0;

        slove(root);

        return max;
    }

    private int slove(TreeNode root)
    {
        if(root == null)
            return 0;

        int val = root.val;
        int leftMax = slove(root.left);
        int rightMax = slove(root.right);

        int temp = val + Math.max(0,leftMax) + Math.max(0,rightMax);
        max = Math.max(max,temp);

        return val + Math.max(Math.max(0,leftMax),Math.max(0,rightMax));
    }
}
```

