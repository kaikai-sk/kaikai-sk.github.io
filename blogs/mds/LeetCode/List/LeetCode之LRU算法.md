# 题目
https://leetcode-cn.com/problems/lru-cache/
# 示例代码
```
class Node
{
    int key;
    int value;
    Node next;
    Node prev;

    Node(int key,int value)
    {
        this.key = key;
        this.value = value;
    }
}

class LRUCache
{
    private int size;
    private int capacity;
    private HashMap<Integer, Node> map;
    private Node head;
    private Node tail;

    public LRUCache(int capacity)
    {
        this.capacity = capacity;
        this.size = 0;
        map = new HashMap<>(capacity,0.75F);
    }
    
    public int get(int key)
    {
        Node node = getNode(key);
        return node == null? -1 : node.value;
    }

    private Node getNode(int key)
    {
        Node node = map.get(key);
        if(node == null)
            return null;

        if(tail != node)
        {
            /**
             * 如果页在头,删除头节点并放入链表尾
             */
            if(head == node)
            {
                head = head.next;
                head.prev = null;
            }
            else
            {
                node.prev.next = node.next;
                node.next.prev = node.prev;
            }

            appendTail(node);
        }

        return node;
    }

    private void appendTail(Node node)
    {
        if(size == 0)
        {
            head = tail = node;
        }
        else
        {
            node.prev = tail;
            tail.next = node;
            node.next = null;
            tail = node;
        }
    }

    public void put(int key, int value)
    {
        Node node = new Node(key,value);
        Node prev = getNode(key);

        if(prev == null)
        {
            map.put(key,node);
            appendTail(node);
            size++;
            trimToSize();
        }
        else
        {
            prev.value = value;
        }
    }

    /**
     * 当链表中的节点个数size>capacity的时候删除头节点
     */
    public void trimToSize()
    {
        if(size > capacity)
        {
            Node prev = head;
            head = head.next;
            head.prev = null;
            size--;
            map.remove(prev.key);
        }
    }
}
```

