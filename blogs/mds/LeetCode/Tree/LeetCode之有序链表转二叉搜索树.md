Given a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.

```
public class Solution {
    public TreeNode sortedListToBST(ListNode head)
    {
        return toBST(head,null);
    }

    private TreeNode toBST(ListNode head, ListNode tail)
    {
        if(head == tail)
            return null;

        //快慢指针找中点
        ListNode fast = head;
        ListNode slow = head;
        while (fast != tail && fast.next!=tail)
        {
            fast = fast.next.next;
            slow = slow.next;
        }

        TreeNode root = new TreeNode(slow.val);
        root.left = toBST(head,slow);
        root.right = toBST(slow.next,tail);

        return root;
    }
}
```

