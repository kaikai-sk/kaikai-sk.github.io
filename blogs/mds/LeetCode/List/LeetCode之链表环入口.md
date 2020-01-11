---
layout: post
title: LeetCode之链表环入口
---

# 1. 题目描述

https://leetcode-cn.com/problems/linked-list-cycle-ii/

# 2. 示例代码
```
public class Solution96
{
    public ListNode detectCycle(ListNode head)
    {
        //先判断是否有环
        ListNode slow = head;
        ListNode fast = head;

        boolean isCycle = false;

        while(fast !=null && fast.next != null)
        {
            slow  = slow.next;
            fast = fast.next.next;
            if(slow == fast)
            {
                isCycle = true;
                break;
            }
        }

        if(isCycle)
        {
            //求环的大小
            int cycleSize = 1;
            fast = fast.next;
            while(slow != fast)
            {
                fast = fast.next;
                cycleSize++;
            }

            //根据环的大小，找到环的入口
            slow = head;
            fast = head;

            while ((cycleSize-1) > 0)
            {
                fast = fast.next;
                cycleSize--;
            }

            while(fast.next != slow)
            {
                slow = slow.next;
                fast = fast.next;
            }

            return slow;
        }

        return null;
    }
}

```

