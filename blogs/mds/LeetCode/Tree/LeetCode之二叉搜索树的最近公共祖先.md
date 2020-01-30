利用了二叉搜索树的左孩子比根小，右孩子比根大的特性！
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
class Solution 
{
   TreeNode res = null;

    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q)
    {
        lca(root,p,q);
        return res;
    }

    public void lca(TreeNode root, TreeNode p , TreeNode q)
    {
        if((root.val - p.val) * (root.val - q.val) <= 0)
        {
            res = root;
        }
        else if( root.val < p.val && root.val < q.val )
        {
            lca(root.right,p,q);
        }
        else
        {
            lca(root.left,p,q);
        }
    }
}
```

