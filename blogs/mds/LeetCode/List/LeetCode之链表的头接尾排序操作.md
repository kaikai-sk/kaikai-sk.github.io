Given a singly linked list L: L 0→L 1→…→L n-1→L n,
reorder it to: L 0→L n →L 1→L n-1→L 2→L n-2→…

You must do this in-place without altering the nodes' values.

For example,
Given{1,2,3,4}, reorder it to{1,4,2,3}.

```
import javax.xml.soap.Node;

public class Solution68
{
    public static void main(String[] args)
    {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
//        head.next.next = new ListNode(3);
//        head.next.next.next = new ListNode(4);

        new Solution68().reorderList(head);

//        head = reverse(head);

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

    public void reorderList(ListNode head)
    {
        if(head == null || head.next == null)
            return;

        //快慢指针找到中间节点
        ListNode fast = head;
        ListNode slow = head;
        while (fast.next!=null && fast.next.next!=null)
        {
            fast = fast.next.next;
            slow = slow.next;
        }

        //拆分链表，并反转中间节点之后的链表
        ListNode after = slow.next;
        slow.next = null;

        //头插法反转链表
        after = reverse(after);

        //合并两个链表
        ListNode first = head;
        while (first != null && after != null)
        {
            ListNode ftemp = first.next;
            ListNode aftemp = after.next;
            first.next = after;
            first = ftemp;
            after.next = first;
            after = aftemp;
        }


    }

    /**
     * 头插法进行链表的逆置
     * @param head
     * @return
     */
    public static ListNode reverse(ListNode head)
    {
        ListNode newHead = new ListNode(Integer.MIN_VALUE);
        newHead.next = head;

        if(newHead == null || newHead.next==null || newHead.next.next == null)
            return newHead.next;

        //current指向链表中第二个元素
        ListNode current = newHead.next.next;
        //令第一个元素的next为空
        newHead.next.next = null;

        /**
         * 头插法
         */
        while (current!= null)
        {
            ListNode after = current.next;
            current.next = newHead.next;
            newHead.next = current;
            current = after;
        }

        return newHead.next;
    }


//    public static ListNode reverse(ListNode head)
//    {
//        if(head == null || head.next == null)
//        {
//            return head;
//        }
//
//        //一直入栈
//        ListNode reverseHead = reverse(head.next);
//
//        //出栈并赋值next对象/
//        head.next.next = head;
//        head.next = null;
//
//        return reverseHead;
//    }

}

```

