[原文地址](http://www.cnblogs.com/imihiroblog/archive/2012/06/13/2547868.html%20%E5%8E%9F%E6%96%87%E5%9C%B0%E5%9D%80)

//必须先设置Format属性为Custom,然后才能自定义格式

```
     this.dtPicker.Format = DateTimePickerFormat.Custom;
            this.dtPicker.CustomFormat = "yyyy-MM-dd";
```

效果为：2012-06-13

yyyy代表年

MM 代表月 (区分大小写)

dd代表日期  (dddd代表星期几)

具体请继续尝试
