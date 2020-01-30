```
/**
 * 链表的插入排序
 */
public class Solution67
{
    public static void main(String[] args)
    {
        ListNode head = new ListNode(5);
        head.next = new ListNode(2);
        head.next.next = new ListNode(1);
        head.next.next.next = new ListNode(3);
        head.next.next.next.next = new ListNode(6);

        head = new Solution67().insertionSortList(head);

        printList(head);
    }

    public static void printList(ListNode head)
    {
        ListNode current = head;
        while(current !=null)
        {
            System.out.print(current.val + " ");
            current = current.next;
        }
        System.out.println();
    }

    public ListNode insertionSortList(ListNode head)
    {
        //哑节点
        ListNode dumy = new ListNode(Integer.MIN_VALUE);
        ListNode current = head;
        ListNode pre = dumy;

        while(current != null)
        {
            //保存当前节点的下一个结点
            ListNode next = current.next;
            pre = dumy;

            //寻找当前节点正确位置的一个节点
            while(pre.next !=null && pre.next.val < current.val)
            {
                pre = pre.next;
            }

            //将当前节点加入到链表中
            current.next = pre.next;
            pre.next = current;
            //处理下一个节点
            current = next;
        }

        return dumy.next;
    }
}

```

