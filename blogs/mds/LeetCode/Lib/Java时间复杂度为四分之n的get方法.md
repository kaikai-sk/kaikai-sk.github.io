## get方法
        public E get(int index) {
        checkElementIndex(index);
        return node(index).item;
    }
    /**
     * Returns the (non-null) Node at the specified element index.
     * index 小于（n/2）时，从前向后找；否则从后向前找。
     * 平均查找长度（n/4）
     */
    Node<E> node(int index) {
        // assert isElementIndex(index);
    
        if (index < (size >> 1)) {
            Node<E> x = first;
            for (int i = 0; i < index; i++)
                x = x.next;
            return x;
        } else {
            Node<E> x = last;
            for (int i = size - 1; i > index; i--)
                x = x.prev;
            return x;
        }
    }

