CSS的几种设置方式(你可以通过怎样的方式向HTML页面中写入CSS代码？？)

 1. 
 内联样式表(在标签内设置元素的样式)
 
 内联样式表缺点：如果要将同样的样式风格设置到网页中所有的段落上，就需要对每个<p>标签都进行重复的设置。
```
    <p style="background:red;font-size:xx-large">今天天气好晴朗，处处好风光</p>
```
![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwMjEyMjE0MDM2ODU5?x-oss-process=image/format,png)

 2.
   嵌入样式表(需要在head标签内写`<style type=”text/css”></style>`)

```
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
	<meta charset="utf-8" />
    **<style type="text/css">
        p
        {
            background-color:yellow;
            font-size:xx-small;
        }
    </style>**
</head>
```
![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwMjEyMjE1MTExMzE1?x-oss-process=image/format,png)

嵌入样式表缺点：如果要为整个网站定义通用的的样式风格，也就是同样的样式风格要被应用到很多网页时，使用嵌入样式表，则需要在每个<head></head>标签中都加入同样的<style></style>代码段。为了解决这个问题，我们可以使用外部样式表

3.外部样式表 link

![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwMjEyMjIwMjEyODk4?x-oss-process=image/format,png)
![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwMjEyMjIwMjI1NTk1?x-oss-process=image/format,png)


