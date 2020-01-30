构造函数
```
    public LinkedList() {
    }
```

```
 transient int size = 0;
 transient Node<E> first;
 transient Node<E> last;
```
静态内部类，双向链表
```
    private static class Node<E> {
        E item;
        Node<E> next;
        Node<E> prev;

        Node(Node<E> prev, E element, Node<E> next) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }
    }
```
add方法

```
    public boolean add(E e) {
        linkLast(e);
        return true;
    }
```
```
 /**
     * Links e as last element.
     */
    void linkLast(E e) {
        final Node<E> l = last;
        final Node<E> newNode = new Node<>(l, e, null);
        last = newNode;
        if (l == null)
            first = newNode;
        else
            l.next = newNode;
        size++;
        modCount++;
    }
```

