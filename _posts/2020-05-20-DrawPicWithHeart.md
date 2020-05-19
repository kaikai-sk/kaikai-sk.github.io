@[TOC]

# 1 笛卡尔心形线
## 1.1 故事
**迩来流浪于吴越，一片闲云空皎洁。** 

几百年前，斯德哥尔摩的街头，落魄的笛卡尔过着乞讨的生活。他不会乞讨，知识沉浸在数学王国之中

**有美一人，婉如清扬。邂逅相遇，与子偕臧。**

瑞典的小公主，国王最宠爱的女儿克里斯汀在街头碰到了笛卡尔，被其草稿纸上的数学所吸引，遂聘请笛卡尔为数学老师。

**情不知所起,一往而深**

两个人整天在一起，耳鬓厮磨，结果可想而知

**念去去，千里烟波，暮霭沉沉楚天阔。**
笛卡尔和公主的恋情收到了国王的阻拦，国王驱逐了笛卡尔。

中世纪的欧洲，黑死病流行，病痛中的笛卡尔只能在脑海中见到他的公主了。

**欲知心里事,看取腹中书. **
笛卡尔寄出了无数封信，只有最后一封送到了公主的手里。等到公主收到信的时候，笛卡尔早已去世。

最后一封信的内容只有：r = a(1-sinθ)

国王去世后，克里斯汀继承王位，便立刻派人去法国寻找心上人的下落，收到的却是笛卡尔去世的消息，留下了一个永远的遗憾……

## 1.2 python实现

* 代码

```
# 绘制笛卡尔心形线
# r = a(1-sinθ)
def draw_dikaer_love_func():
    T = np.linspace(0 , 2 * np.pi, 1024)
    # 极坐标
    plt.axes(polar = True)
    a = 3.0
    plt.plot(T, a * (1. - np.sin(T)), color="r")
    plt.savefig("dikaer.png")
    plt.show()
```
* 效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200519091242412.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2thaWthaV9zaw==,size_16,color_FFFFFF,t_70#pic_center)

# 2 一束玫瑰

## 2.1 Python实现

* 代码

```
def eps_to_jpg(eps_filename,jpg_filename):
    from PIL import Image
    im = Image.open(eps_filename)
    im.save(jpg_filename, "JPEG")

# 绘制一束玫瑰花
def draw_flower():

    import turtle
    
    # 设置初始位置
    turtle.penup()
    turtle.left(90)
    turtle.fd(200)
    turtle.pendown()
    turtle.right(90)
    
    # 花蕊
    turtle.fillcolor("red")
    turtle.begin_fill()
    turtle.circle(10,180)
    turtle.circle(25,110)
    turtle.left(50)
    turtle.circle(60,45)
    turtle.circle(20,170)
    turtle.right(24)
    turtle.fd(30)
    turtle.left(10)
    turtle.circle(30,110)
    turtle.fd(20)
    turtle.left(40)
    turtle.circle(90,70)
    turtle.circle(30,150)
    turtle.right(30)
    turtle.fd(15)
    turtle.circle(80,90)
    turtle.left(15)
    turtle.fd(45)
    turtle.right(165)
    turtle.fd(20)
    turtle.left(155)
    turtle.circle(150,80)
    turtle.left(50)
    turtle.circle(150,90)
    turtle.end_fill()

    
    # 花瓣1
    turtle.left(150)
    turtle.circle(-90,70)
    turtle.left(20)
    turtle.circle(75,105)
    turtle.setheading(60)
    turtle.circle(80,98)
    turtle.circle(-90,40)
    
    # 花瓣2
    turtle.left(180)
    turtle.circle(90,40)
    turtle.circle(-80,98)
    turtle.setheading(-83)

    
    # 叶子1
    turtle.fd(30)
    turtle.left(90)
    turtle.fd(25)
    turtle.left(45)
    turtle.fillcolor("green")
    turtle.begin_fill()
    turtle.circle(-80,90)
    turtle.right(90)
    turtle.circle(-80,90)
    turtle.end_fill()
    
    turtle.right(135)
    turtle.fd(60)
    turtle.left(180)
    turtle.fd(85)
    turtle.left(90)
    turtle.fd(80)

    
    # 叶子2
    turtle.right(90)
    turtle.right(45)
    turtle.fillcolor("green")
    turtle.begin_fill()
    turtle.circle(80,90)
    turtle.left(90)
    turtle.circle(80,90)
    turtle.end_fill()
    
    turtle.left(135)
    turtle.fd(60)
    turtle.left(180)
    turtle.fd(60)
    turtle.right(90)
    turtle.circle(200,60)
    # time.sleep(3)

    # 保存图片
    # forward(100)
    ts = turtle.getscreen()
    #.eps文件即postscript脚本
    ts.getcanvas().postscript(file="duck.eps") 

    eps_to_jpg("duck.eps","flower.jpg")
```

* 效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200519095610174.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2thaWthaV9zaw==,size_16,color_FFFFFF,t_70#pic_center)
