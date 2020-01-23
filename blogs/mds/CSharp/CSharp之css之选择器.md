 1. html选择器

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
	<meta charset="utf-8" />

    ***<style type="text/css">
        p 
        {
            background-color: yellow;
        }
        tt
        {
            background-color:green;
        }
    </style>***

</head>	

 2 类选择器

```
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
	<meta charset="utf-8" />

    <style type="text/css">
        tt.tt1
        {
            background-color:red;
        }
        tt.tt2
        {
            font-size:xx-large;
        }
        tt.tt3
        {
            background-color:aqua;
        }
    </style>

</head>
<body>
    <tt class="tt1">床前明月光，疑是地上霜，举头望明月，我叫郭德纲</tt>
    <tt class="tt1">床前明月光，疑是地上霜，举头望明月，我叫郭德纲</tt>
    <tt class="tt2">床前明月光，疑是地上霜，举头望明月，我叫郭德纲</tt>
    <tt class="tt3">床前明月光，疑是地上霜，举头望明月，我叫郭德纲</tt>
</body>
</html>

```

 3.ID Selector （需要给要设置样式的元素的id属性赋值）

```
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
	<meta charset="utf-8" />

    <style type="text/css">
        #p1
        {
            background-color:red;
        }
        #p2
        {
            background-color:green;
        }
        #p3
        {
            background-color:blue;
        }
        #p4
        {
            background-color:yellow;
        }
    </style>

</head>
<body>
    <p id="p1">今天天气好晴朗，处处好风光</p>
    <p id="p2">今天天气好晴朗，处处好风光</p>
    <p id="p3">今天天气好晴朗，处处好风光</p>
    <p id="p4">今天天气好晴朗，处处好风光</p>
</body>
</html>

```

4.关联选择器   P EM{background-Color:Yellow}

```
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
	<meta charset="utf-8" />

    <style type="text/css">
        p em
        {
            background-color:red;
        }
    </style>

</head>
<body>
    <p><em>今天天气好晴朗，处处好风光</em></p>
    <em>哈哈哈</em>
    <em>哈哈哈</em>
    <em>哈哈哈</em>
    <em>哈哈哈</em>
    <em>哈哈哈</em>
    <em>哈哈哈</em>
    <p>今天天气好晴朗，处处好风光</p>
    <p>今天天气好晴朗，处处好风光</p>
    <p>今天天气好晴朗，处处好风光</p>
    <p>今天天气好晴朗，处处好风光</p>
</body>
</html>

5.组合选择器

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
	<meta charset="utf-8" />

    <style type="text/css">
        h1,h2,h3,h4,h5,h6,td
        {
            background-color:yellow;
        }
    </style>

</head>
<body>
    <h1>我是一个粉刷匠</h1>
    <h2>我是一个粉刷匠</h2>
    <h3>我是一个粉刷匠</h3>
    <h4>我是一个粉刷匠</h4>
    <h5>我是一个粉刷匠</h5>
    <h6>我是一个粉刷匠</h6>
    <table border="1px" cellpadding="10px" cellspacing="10px">
        <tr>
            <td>粉刷本领强</td>
            <td>粉刷本领强</td>
            <td>粉刷本领强</td>
            <td>粉刷本领强</td>
            <td>粉刷本领强</td>
        </tr>
        <tr>
            <td>粉刷本领强</td>
            <td>粉刷本领强</td>
            <td>粉刷本领强</td>
            <td>粉刷本领强</td>
            <td>粉刷本领强</td>
        </tr>
        <tr>
            <td>粉刷本领强</td>
            <td>粉刷本领强</td>
            <td>粉刷本领强</td>
            <td>粉刷本领强</td>
            <td>粉刷本领强</td>
        </tr>
    </table>
</body>
</html>

```

6.伪元素选择器

伪元素选择器是指对同一个HTML元素的各种状态和其所包括的部分内容的一种定义方式。例如，对于超链接标签(`<a></a>`)的正常状态(没有任何动作前)、访问过的状态、选中状态、光标移到超链接文本上的状态，对于段落的首字母和首行，都可以使用伪元素选择器来定义。
目前常用的伪元素有以下几种：
A:active 选中超链接时的状态
A:hover 光标移动到超链接上的状态
A:link 超链接的正常状态
A:visited 访问过的超链接状态
P:first-line 段落中的第一行文本
P:first-letter 段落中的第一个字母

```
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
	<meta charset="utf-8" />

    <style type="text/css">
        a:active 
        {
            text-decoration:none;
        }
        a:hover
        {
            font-size:xx-large;
        }
        p::first-letter
        {
            font-size:xx-large;
        }
        p::first-line
        {
            background-color:mediumspringgreen;
        }
    </style>

</head>
<body>
    <p>晋太元中，武陵人捕鱼为业，缘溪行，忽逢桃花林，夹岸数百步
        <br/>
        面若中秋之月，色如春晓之花，鬓若刀裁，眉如墨画，鼻如悬胆，睛若秋波。虽怒时而似笑，即瞋视而有情。<br/>
        面若中秋之月，色如春晓之花，鬓若刀裁，眉如墨画，鼻如悬胆，睛若秋波。虽怒时而似笑，即瞋视而有情。
    </p>
    <p>晋太元中，武陵人捕鱼为业，缘溪行，忽逢桃花林，夹岸数百步</p>
    <p>晋太元中，武陵人捕鱼为业，缘溪行，忽逢桃花林，夹岸数百步</p>
    <p>晋太元中，武陵人捕鱼为业，缘溪行，忽逢桃花林，夹岸数百步</p>
    <p>晋太元中，武陵人捕鱼为业，缘溪行，忽逢桃花林，夹岸数百步</p>
    <a href="#">超链接</a>
    <a href="#">超链接</a>
    <a href="#">超链接</a>
    <a href="#">超链接</a>
    <a href="#">超链接</a>
</body>
</html>

```
