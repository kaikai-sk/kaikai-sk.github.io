# 题目描述
https://leetcode-cn.com/problems/intersection-of-two-linked-lists/
# 示例代码
取巧的一个做法
```
public ListNode getIntersectionNode(ListNode headA, ListNode headB)
    {
        Set<ListNode> set = new HashSet<>();
        while(headA!=null)
        {
            set.add(headA);
            headA = headA.next;
        }
        while (headB!=null)
        {
            if(set.contains(headB))
            {
                return headB;
            }
            else
            {
                headB = headB.next;
            }
        }

        return null;
    }
```

