3、字符串
1)、字符串的不可变性
当你给一个字符串重新赋值之后，老值并没有销毁，而是重新开辟一块空间存储新值。

当程序结束后，GC扫描整个内存，如果发现有的空间没有被指向，则立即把它销毁。

![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwMjAzMTEyNTAxMjk0?x-oss-process=image/format,png)
