## 声明
    public class ArrayList<E> extends AbstractList<E>
            implements List<E>, RandomAccess, Cloneable, java.io.Serializable
## 成员变量

     private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
       transient Object[] elementData; // non-private to simplify nested class access
        private int size;

   
## 构造函数
    //显然是一个空数组
    public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }
## size
        public int size() {
            //先检查一下修改次数
            checkForComodification();
            return this.size;
        }
## add
    public boolean add(E e) {
        ensureCapacityInternal(size + 1);  // Increments modCount!!
        elementData[size++] = e;
        return true;
    }

    private void ensureCapacityInternal(int minCapacity) {
        ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));

    private static int calculateCapacity(Object[] elementData, int minCapacity) {
        //如果是默认的空数组
        if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
            //返回10
            return Math.max(DEFAULT_CAPACITY, minCapacity);
        }
        //返回传进来的数组容量
        return minCapacity;
    }
    
     private void ensureExplicitCapacity(int minCapacity) {
           //记录修改次数
            modCount++;
    
            // overflow-conscious code
            //如果传进来的值大于底层数组的长度，扩容
            if (minCapacity - elementData.length > 0)
                grow(minCapacity);
        }
## grow方法
    private void grow(int minCapacity) {
        // overflow-conscious code
        int oldCapacity = elementData.length;
        int newCapacity = oldCapacity + (oldCapacity >> 1);
        if (newCapacity - minCapacity < 0)
            newCapacity = minCapacity;
        if (newCapacity - MAX_ARRAY_SIZE > 0)
            newCapacity = hugeCapacity(minCapacity);
        // minCapacity is usually close to size, so this is a win:
        //显然，要进行拷贝
        elementData = Arrays.copyOf(elementData, newCapacity);
    }
    
     @SuppressWarnings("unchecked")
        public static <T> T[] copyOf(T[] original, int newLength) {
            return (T[]) copyOf(original, newLength, original.getClass());
        }
        
       public static <T,U> T[] copyOf(U[] original, int newLength, Class<? extends T[]> newType) {
        @SuppressWarnings("unchecked")
        T[] copy = ((Object)newType == (Object)Object[].class)
            ? (T[]) new Object[newLength]
            : (T[]) Array.newInstance(newType.getComponentType(), newLength);
            //性能优良，建议多多使用
        System.arraycopy(original, 0, copy, 0,
                         Math.min(original.length, newLength));
        return copy;
    }

    //native方法，c++实现
        public static native void arraycopy(Object src,  int  srcPos,
                                            Object dest, int destPos,
                                            int length);

