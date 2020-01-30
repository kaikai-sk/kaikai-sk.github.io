这是看的别人的解法，比较好
```
public class Solution87
{
    public static void main(String[] args)
    {
        ListNode head1= new ListNode(2);
//        head1.next = new ListNode(4);
//        head1.next.next = new ListNode(5);

        ListNode head2 = null;
//        ListNode head2= new ListNode(1);
//        head2.next = new ListNode(3);
//        head2.next.next = new ListNode(4);

        ListNode head3 = new ListNode(-1);
//        head3.next = new ListNode(6);

//        ListNode newList = new Solution81().mergeTwoLists(head1,head2);
        ListNode newList = new Solution87().mergeKLists(new ListNode[]{head1,head2,head3});
        printList(newList);

    }

    public static void printList(ListNode head)
    {
        ListNode currentNode = head;
        while(currentNode != null)
        {
            System.out.print(currentNode.val + " ");
            currentNode = currentNode.next;
        }
        System.out.println();
    }


    public ListNode mergeKLists(ListNode[] lists)
    {
        if(lists.length == 0)
            return null;
        //归并
        return solve(lists,0,lists.length-1);
    }

    /**
     * k个链表的归并排序
     * @param arr
     * @param left
     * @param right
     * @return
     */
    public ListNode solve(ListNode[] arr,int left,int right)
    {
        if(left == right)
            return arr[left];

        int mid = (left + right) >> 1;
        ListNode leftNode = solve(arr,left,mid);
        ListNode rightNode = solve(arr, mid+1, right);

        return merge(leftNode,rightNode);
    }

    /**
     * 两个有序链表的归并排序
     * @param node1
     * @param node2
     * @return
     */
    public ListNode merge(ListNode node1, ListNode node2)
    {
        if(node1 == null)
            return node2;
        if(node2 == null)
            return node1;

        if(node1.val < node2.val)
        {
            node1.next = merge(node1.next,node2);
            return node1;
        }
        else
        {
            node2.next = merge(node1,node2.next);
            return node2;
        }
    }

}

```

