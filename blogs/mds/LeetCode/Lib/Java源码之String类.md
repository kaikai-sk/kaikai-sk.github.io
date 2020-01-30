## 基本的数据结构

    /**
    	 *  基本的数据结构
    	 */
    	
        /** The value is used for character storage. */
        private final char value[];
    
        /** Cache the hash code for the string */
        private int hash; // Default to 0
        
## 构造函数

    public String(String original) {
        this.value = original.value;
        this.hash = original.hash;
    }
## equals

     public boolean equals(Object anObject) {
           //地址都一样，不用说了
            if (this == anObject) {
                return true;
            }
            //类型判断
            if (anObject instanceof String) {
                String anotherString = (String)anObject;
                int n = value.length;
                //长度判断
                if (n == anotherString.value.length) {
                    char v1[] = value;
                    char v2[] = anotherString.value;
                    int i = 0;
                    //循环判断字符数组元素是否一样
                    while (n-- != 0) {
                        if (v1[i] != v2[i])
                            return false;
                        i++;
                    }
                    return true;
                }
            }
            return false;
        }

## substring

    public String substring(int beginIndex) {
        if (beginIndex < 0) {
            throw new StringIndexOutOfBoundsException(beginIndex);
        }
        int subLen = value.length - beginIndex;
        if (subLen < 0) {
            throw new StringIndexOutOfBoundsException(subLen);
        }
        return (beginIndex == 0) ? this : new String(value, beginIndex, subLen);
    }

## charAt

    //先判断是否越界
        public char charAt(int index) {
            if ((index < 0) || (index >= value.length)) {
                throw new StringIndexOutOfBoundsException(index);
            }
            return value[index];
        }

## length
    public int length() {
        return value.length;
    }
    
  ## isEmpty实现
    public boolean isEmpty() {
        return value.length == 0;
    }
