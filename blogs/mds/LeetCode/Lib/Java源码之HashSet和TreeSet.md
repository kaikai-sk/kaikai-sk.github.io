构造函数
```
    public HashSet() {
        map = new HashMap<>();
    }
```
add方法
```
private static final Object PRESENT = new Object();

    public boolean add(E e) {
        return map.put(e, PRESENT)==null;
    }
```
size方法等直接调用HashMap的方法
```
    public int size() {
        return map.size();
    }
      public boolean isEmpty() {
        return map.isEmpty();
    }
      public boolean contains(Object o) {
        return map.containsKey(o);
    }
      public boolean remove(Object o) {
        return map.remove(o)==PRESENT;
    }
     public void clear() {
        map.clear();
    }
```
TreeSet的构造函数

```
    TreeSet(NavigableMap<E,Object> m) {
        this.m = m;
    }
    public TreeSet() {
        this(new TreeMap<E,Object>());
    }
```
核心数据成员
```
   private transient NavigableMap<E,Object> m;
```
NavigableMap是一个接口
```
public interface NavigableMap<K,V> extends SortedMap<K,V> 
```
TreeMap实现了NavigableMap接口
```
public class TreeMap<K,V>
    extends AbstractMap<K,V>
    implements NavigableMap<K,V>, Cloneable, java.io.Serializable
```

```
  public int size() {
        return m.size();
    }
     public boolean isEmpty() {
        return m.isEmpty();
    }
        public boolean contains(Object o) {
        return m.containsKey(o);
    }	
```

小结：HashSet底层声明了一个HashMap，HashSet做了一层包装，操作HashSet里的元素时其实是在操作HashMap里的元素。TreeSet底层也是声明了一个TreeMap，操作TreeSet里的元素其实是操作TreeMap里的元素。

