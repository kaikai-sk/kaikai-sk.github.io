# 1. 题目描述
https://leetcode-cn.com/problems/sort-list/
# 2.示例代码
归并排序还挺麻烦的。可以一试
```
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
     /**
     * 链表的归并排序
     *
     * @param head
     * @return
     */
    public ListNode sortList(ListNode head)
    {
        if(head == null || head.next == null)
        {
            return head;
        }

        ListNode mid = findMiddle(head);
        ListNode right = sortList(mid.next);
        mid.next = null;

        ListNode left = sortList(head);

        return merge(left,right);
    }

    /**
     * 找链表的中间节点
     * @param node
     * @return
     */
    public ListNode findMiddle(ListNode node)
    {
        ListNode fast = node.next;
        ListNode slow = node;

        while(fast != null && fast.next != null)
        {
            fast = fast.next.next;
            slow = slow.next;
        }

        return slow;
    }

    public ListNode merge(ListNode left, ListNode right)
    {
        ListNode a = left;
        ListNode b = right;

        ListNode result = new ListNode(0);
        ListNode temp = result;

        while (a!=null && b != null)
        {
            while (a!= null && a.val <= b.val)
            {
                temp.next = new ListNode(a.val);
                temp = temp.next;
                a = a.next;
            }

            while (a!=null && b!=null && b.val <= a.val)
            {
                temp.next = new ListNode(b.val);
                temp = temp.next;
                b = b.next;
            }

        }

        if(a != null)
            temp.next = a;
        else if(b!=null)
            temp.next = b;

        return result.next;
    }
}
```

