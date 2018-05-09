---
layout: post
title: 义和团揭帖
description: 这是看历史过程中看到的。感觉比较搞笑
tags: 历史   
---

<center>Linux进程之间的通信<center/>
====

Linux环境下，进程地址空间相互独立，每个进程各自有不同的用户地址空间。任何一个进程的全局变量在另一个进程中都看不到，所以进程和进程之间不能相互访问，要交换数据必须通过内核，在内核中开辟一块缓冲区，进程1把数据从用户空间拷到内核缓冲区，进程2再从内核缓冲区把数据读走，内核提供的这种机制称为进程间通信（IPC，InterProcess Communication）。  

<center> ![](https://i.imgur.com/dDkq5Vn.png) <center/>
====

在进程间完成数据传递需要借助操作系统提供特殊的方法，如：文件、管道、信号、共享内存、消息队列、套接字、命名管道等。随着计算机的蓬勃发展，一些方法由于自身设计缺陷被淘汰或者弃用。现今常用的进程间通信方式有：  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;① 管道 (使用最简单)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;② 信号 (开销最小)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;③ 共享映射区 (无血缘关系)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;④ 本地套接字 (最稳定)

# 管道（使用最简单）

## 管道的概念

管道是一种最基本的IPC机制，作用于有血缘关系的进程之间，完成数据传递。调用pipe系统函数即可创建一个管道。有如下特质：  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 其本质是一个伪文件(实为内核缓冲区)   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 由两个文件描述符引用，一个表示读端，一个表示写端。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 规定数据从管道的写端流入管道，从读端流出。  

管道的原理:   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;管道实为内核使用环形队列机制，借助内核缓冲区(4k)实现。  

管道的局限性：  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;① 数据自己读不能自己写。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;② 数据一旦被读走，便不在管道中存在，不可反复读取。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;③ 由于管道采用半双工通信方式。因此，数据只能在一个方向上流动。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;④ 只能在有公共祖先的进程间使用管道。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;常见的通信方式有，单工通信、半双工通信、全双工通信。

## pipe函数

### 创建管道  
    `int pipe(int pipefd[2]);` 		成功：0；失败：-1，设置errno   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;函数调用成功返回r/w两个文件描述符。无需open，但需手动close。规定：fd[0] → r； fd[1] → w，就像0对应标准输入，1对应标准输出一样。向管道文件读写数据其实是在读写内核缓冲区。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;管道创建成功以后，创建该管道的进程（父进程）同时掌握着管道的读端和写端。如何实现父子进程间通信呢？通常可以采用如下步骤：  
1. 父进程调用pipe函数创建管道，得到两个文件描述符fd[0]、fd[1]指向管道的读端和写端。  
2. 父进程调用fork创建子进程，那么子进程也有两个文件描述符指向同一管道。  
3. 父进程关闭管道读端，子进程关闭管道写端。父进程可以向管道中写入数据，子进程将管道中的数据读出。由于管道是利用环形队列实现的，数据从写端流入管道，从读端流出，这样就实现了进程间通信。

## 管道的读写行为											

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用管道需要注意以下4种特殊情况（假设都是阻塞I/O操作，没有设置O_NONBLOCK标志）：  
1. 如果所有指向管道写端的文件描述符都关闭了（管道写端引用计数为0），而仍然有进程从管道的读端读数据，那么管道中剩余的数据都被读取后，再次read会返回0，就像读到文件末尾一样。  
2. 如果有指向管道写端的文件描述符没关闭（管道写端引用计数大于0），而持有管道写端的进程也没有向管道中写数据，这时有进程从管道读端读数据，那么管道中剩余的数据都被读取后，再次read会阻塞，直到管道中有数据可读了才读取数据并返回。  
3. 如果所有指向管道读端的文件描述符都关闭了（管道读端引用计数为0），这时有进程向管道的写端write，那么该进程会收到信号SIGPIPE(管道满了，管道破裂)，通常会导致进程异常终止。当然也可以对SIGPIPE信号实施捕捉，不终止进程。具体方法信号章节详细介绍。  
4. 如果有指向管道读端的文件描述符没关闭（管道读端引用计数大于0），而持有管道读端的进程也没有从管道中读数据，这时有进程向管道写端写数据，那么在管道被写满时再次write会阻塞，直到管道中有空位置了才写入数据并返回。 

 
总结：  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;① 读管道：	  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 管道中有数据，read返回实际读到的字节数。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 管道中无数据：  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(1) 管道写端被全部关闭，read返回0 (好像读到文件结尾)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2) 写端没有全部被关闭，read阻塞等待(不久的将来可能有数据送达，此时会让出cpu)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;② 写管道：  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 管道读端全部被关闭， 进程异常终止(也可使用捕捉SIGPIPE信号，使进程不终止)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 管道读端没有全部关闭：   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(1) 管道已满，write阻塞。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2) 管道未满，write将数据写入，并返回实际写入的字节数。

##管道缓冲区大小
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可以使用ulimit –a 命令来查看当前系统中创建管道文件所对应的内核缓冲区大小。通常为:  
			
	pipe size            (512 bytes, -p) 8
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;也可以使用fpathconf函数，借助参数	选项来查看。使用该宏应引入头文件<unistd.h>  
	
	long fpathconf(int fd, int name);	成功：返回管道的大小	失败：-1，设置errno
## 设置管道为非阻塞
1. 默认读写两端都是阻塞的
2. 设置读端为非阻塞
	* fcntl - 变参函数
	  * 复制文件描述符 - dup
	  * 修改文件属性 - open的时候对应的flag属性
	* 设置方法 
	
		    //获取原来的flags	  
		    int flags=fcntl(fd[0],F_GETFL);
		    //设置新的flags
		    flags |= O_NONBLOCK
		    fcntl(fd[0],F_SETFL,flags);
## 管道的优劣
* 优点：简单，相比套接字实现进程间通信，简单很多。

* 缺点：
	1. 只能单向通信，双向通信需建立两个管道。
	2. 只能用于父子、兄弟进程(有共同祖先)间通信。该问题后来使用fifo有名管道解决。

## 例子
### fpathconf函数的使用
	#include <stdio.h>
	#include <unistd.h>
	#include <stdlib.h>
	#include <sys/types.h>
	#include <sys/stat.h>
	#include <string.h>
	
	int main()
	{
	        int fd[2];
	        int ret=pipe(fd);
	        if(ret==-1)
	        {
	                perror("pipe error");
	                exit(1);
	        }
	
	        //测试管道缓冲区大小
	        long size=fpathconf(fd[0],_PC_PIPE_BUF);
	        printf("pipe size = %ld\n",size);
	
	        printf("pipe[0] = %d\n",fd[0]);
	        printf("pipe[1] = %d\n",fd[1]);
	
	
	        close(fd[0]);
	        close(fd[1]);
	
	        return 0;
	
	}
### 父子进程进行通信
通过系统调用实现`ps aux | grep bash`
#### 问题
* 单个进程是否可以通过管道完成读写操作  
  可以。不过没有必要
* 父子进程之间通信是否需要sleep函数？  
  父写——写得慢  
  子读——读得快  
  不需要，因为管道是阻塞的  
* 如果不关闭不用的fd会怎么样？
![读端老是阻塞等待去读](https://i.imgur.com/m547nVh.png)
#### 注意事项：
* 父进程是写管道，关闭读端
* 子进程是读管道，关闭写端

		#include <stdio.h>
		#include <unistd.h>
		#include <stdlib.h>
		#include <sys/types.h>
		#include <sys/stat.h>
		#include <string.h>

		int main()
		{
	        int fd[2];
	        int ret=pipe(fd);
	        if(ret==-1)
	        {
	                perror("pipe error");
	                exit(1);
	        }
	
	        pid_t pid=fork();
	        if(pid == -1)
	        {
	                perror("fork error");
	                exit(1);
	        }
	
	        //parent process
	        //ps aux
	        if(pid > 0 )
	        {
	                //写管道的操作,关闭读端
	                close(fd[0]);
	                //文件描述符的重定向，stdout -> fd[1](管道的写端)
	                dup2(fd[1],STDOUT_FILENO);
	                //执行ps aux
	                execlp("ps","ps","aux",NULL);
	                perror("execlp");
	                exit(1);
	        }
	        //child process
	        //grep bash
	        else if(pid ==0)
	 		{
	                //关闭管道的写端
	                close(fd[1]);
	                dup2(fd[0],STDIN_FILENO);
	                execlp("grep","grep","bash","--color=auto",NULL);
	        }
	
	        printf("pipe[0] = %d\n",fd[0]);
	        printf("pipe[1] = %d\n",fd[1]);
	
	
	        close(fd[0]);
	        close(fd[1]);
	
	        return 0;

		}


### 兄弟进程进行通信
兄弟进程通信实现`ps aux | grep bash`
  
	#include <stdio.h>
	#include <unistd.h>
	#include <stdlib.h>
	#include <sys/types.h>
	#include <sys/stat.h>
	#include <string.h>
	#include <sys/wait.h>
	
	int main()
	{
	        int fd[2];
	        int ret=pipe(fd);
	        if(ret==-1)
	        {
	                perror("pipe error");
	                exit(1);
	        }
	
	        int i=0;
	        for(i=0;i<2;i++)
	        {
	                pid_t pid=fork();
	                //子进程就不能再创建子进程了
	                if(pid==0)
	                {
	                        break;
	                }
	                if(pid == -1)
	                {
	                        perror("fork error");
	                        exit(1);
	                }
	        }
	
	
	        //子进程1
	        //ps aux
	        if(i==0 )
	        {
	                //写管道的操作,关闭读端
  					close(fd[0]);
	                //文件描述符的重定向，stdout -> fd[1](管道的写端)
	                dup2(fd[1],STDOUT_FILENO);
	                //执行ps aux
	                execlp("ps","ps","aux",NULL);
	                perror("execlp");
	                exit(1);
       		 }
	        //child process 2
	        //grep bash
	        else if(i ==1)
	        {
	                //关闭管道的写端
	                close(fd[1]);
	                dup2(fd[0],STDIN_FILENO);
	                execlp("grep","grep","bash","--color=auto",NULL);
	        }
	        //父进程
	        else if(i==2)
	        {
	                close(fd[0]);
	                close(fd[1]);
	                //回收子进程
	                pid_t wpid;
	                while((wpid = waitpid(-1,NULL,WNOHANG))!=-1)
	                {
	                        //子进程正在运行
	                        if(wpid==0)
	                        {
	                                continue;
	                        }
	                        printf("child died pid=%d\n",wpid);
	
	                }
	        }
	
	        printf("pipe[0] = %d\n",fd[0]);
	        printf("pipe[1] = %d\n",fd[1]);

	        close(fd[0]);
	        close(fd[1]);
	
	        return 0;
	
	}

# FIFO
FIFO常被称为命名管道，以区分管道(pipe)。管道(pipe)只能用于“有血缘关系”的进程间。但通过FIFO，不相关的进程也能交换数据。  

FIFO是Linux基础文件类型中的一种。但，FIFO文件在磁盘上没有数据块，仅仅用来标识内核中一条通道。各进程可以打开这个文件进行read/write，实际上是在读写内核通道，这样就实现了进程间通信。

创建方式：  

1. 命令：mkfifo 管道名
2. 库函数：`int mkfifo(const char *pathname,  mode_t mode);`
		  成功：0； 失败：-1
		
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一旦使用mkfifo创建了一个FIFO，就可以使用open打开它，常见的文件I/O函数都可用于fifo。如：close、read、write、unlink等。
## 例子
fifo_w.c

	#include <stdio.h>
	#include <unistd.h>
	#include <sys/stat.h>
	#include <sys/types.h>
	#include <fcntl.h>
	#include <stdlib.h>
	#include <string.h>
	
	void sys_err(char *str)
	{
	    perror(str);
	    exit(-1);
	}
	
	int main(int argc, char *argv[])
	{
	    int fd, i;
	    char buf[4096];
	
	    if (argc < 2) {
	        printf("Enter like this: ./a.out fifoname\n");
	        return -1;
	    }
	    fd = open(argv[1], O_WRONLY);
	    if (fd < 0) 
	        sys_err("open");
	
	    i = 0;
	    while (1) {
	        sprintf(buf, "hello itcast %d\n", i++);
	
	        write(fd, buf, strlen(buf));
	        sleep(1);
	    }
	    close(fd);
	
	    return 0;
	}
fifo_r.c

	#include <stdio.h>
	#include <unistd.h>
	#include <sys/stat.h>
	#include <sys/types.h>
	#include <fcntl.h>
	#include <stdlib.h>
	#include <string.h>
	
	void sys_err(char *str)
	{
	    perror(str);
	    exit(1);
	}
	
	int main(int argc, char *argv[])
	{
	    int fd, len;
	    char buf[4096];
	
	    if (argc < 2) {
	        printf("./a.out fifoname\n");
	        return -1;
	    }
	    fd = open(argv[1], O_RDONLY);
	    if (fd < 0) 
	        sys_err("open");
	    while (1) {
	        len = read(fd, buf, sizeof(buf));
	        write(STDOUT_FILENO, buf, len);
	        sleep(3);           //多個读端时应增加睡眠秒数,放大效果.
	    }
	    close(fd);
	
	    return 0;
	}

# 信号（开销最小）
## 信号的概念
信号在我们的生活中随处可见， 如：古代战争中摔杯为号；现代战争中的信号弹；体育比赛中使用的信号枪......他们都有共性：1. 简单 2. 不能携带大量信息 3. 满足某个特设条件才发送。  
   
 信号是信息的载体，Linux/UNIX 环境下，古老、经典的通信方式， 现下依然是主要的通信手段。

Unix早期版本就提供了信号机制，但不可靠，信号可能丢失。Berkeley 和 AT&T都对信号模型做了更改，增加了可靠信号机制。但彼此不兼容。POSIX.1对可靠信号例程进行了标准化。

### 信号的机制
A给B发送信号，B收到信号之前执行自己的代码，收到信号后，不管执行到程序的什么位置，都要暂停运行，去处理信号，处理完毕再继续执行。与硬件中断类似——异步模式。但信号是软件层面上实现的中断，早期常被称为“软中断”。

信号的特质：由于信号是通过软件方法实现，其实现手段导致信号有很强的延时性。但对于用户来说，这个延迟时间非常短，不易察觉。

每个进程收到的所有信号，都是由内核负责发送的，内核处理。

### 与信号相关的事件和状态
#### 信号状态
* 产生信号 
	1. 按键产生，如：Ctrl+c、Ctrl+z、Ctrl+\
	2. 系统调用产生，如：kill、raise、abort
	3. 软件条件产生，如：定时器alarm
	4. 硬件异常产生，如：非法访问内存(段错误)、除0(浮点数例外)、内存对齐出错(总线错误)
	5. 命令产生，如：kill命令
* 递达：递送并且到达进程。
* 未决：产生和递达之间的状态。主要由于阻塞(屏蔽)导致该状态。 
#### 信号的处理方式
	1. 执行默认动作 
	2. 忽略(丢弃) 
	3. 捕捉(调用户处理函数)

Linux内核的进程控制块PCB是一个结构体，task_struct, 除了包含进程id，状态，工作目录，用户id，组id，文件描述符表，还包含了信号相关的信息，主要指阻塞信号集和未决信号集。

#### 阻塞信号集和未决信号集    
阻塞信号集(信号屏蔽字)： 将某些信号加入集合，对他们设置屏蔽，当屏蔽x信号后，再收到该信号，该信号的处理将推后(解除屏蔽后)

未决信号集:<br/>
	1. 信号产生，未决信号集中描述该信号的位立刻翻转为1，表信号处于未决状态。当信号被处理对应位翻转回为0。这一时刻往往非常短暂。   
	2. 信号产生后由于某些原因(主要是阻塞)不能抵达。这类信号的集合称之为未决信号集。在屏蔽解除前，信号一直处于未决状态。
    
### 信号的编号
可以使用kill –l命令查看当前系统可使用的信号有哪些。

	1) SIGHUP	 2) SIGINT	 3) SIGQUIT	 4) SIGILL	 	5) SIGTRAP
 	6) SIGABRT	 7) SIGBUS	 8) SIGFPE	 9) SIGKILL	10) SIGUSR1
	11) SIGSEGV	12) SIGUSR2	13) SIGPIPE	14) SIGALRM	15) SIGTERM
	16) SIGSTKFLT	17) SIGCHLD	18) SIGCONT	19) SIGSTOP	20) SIGTSTP
	21) SIGTTIN	22) SIGTTOU	23) SIGURG	24) SIGXCPU	25) SIGXFSZ
	26) SIGVTALRM	27) SIGPROF	28) SIGWINCH	29) SIGIO	30) SIGPWR
	31) SIGSYS	34) SIGRTMIN	35) SIGRTMIN+1	36) SIGRTMIN+2	37) SIGRTMIN+3
	38) SIGRTMIN+4	39) SIGRTMIN+5	40) SIGRTMIN+6	41) SIGRTMIN+7	42) SIGRTMIN+8
	43) SIGRTMIN+9	44) SIGRTMIN+10	45) SIGRTMIN+11	46) SIGRTMIN+12	47) SIGRTMIN+13
	48) SIGRTMIN+14	49) SIGRTMIN+15	50) SIGRTMAX-14	51) SIGRTMAX-13	52) SIGRTMAX-12
	53) SIGRTMAX-11	54) SIGRTMAX-10	55) SIGRTMAX-9	56) SIGRTMAX-8	57) SIGRTMAX-7
	58) SIGRTMAX-6	59) SIGRTMAX-5	60) SIGRTMAX-4	61) SIGRTMAX-3	62) SIGRTMAX-2
	63) SIGRTMAX-1	64) SIGRTMAX

不存在编号为0的信号。其中1-31号信号称之为常规信号（也叫普通信号或标准信号），34-64称之为实时信号，驱动编程与硬件相关。名字上区别不大。而前32个名字各不相同。

### 信号4要素
与变量三要素类似的，每个信号也有其必备4要素，分别是：  
1. 编号 2. 名称 3. 事件 4. 默认处理动作   
可通过man 7 signal查看帮助文档获取。也可查看/usr/src/linux-headers-3.16.0-30/arch/s390/include/uapi/asm/signal.h  

	Signal     	Value     Action   Comment
	────────────────────────────────────────────
	SIGHUP     	 1       Term    Hangup detected on controlling terminal or death of controlling process
	SIGINT       2       Term    Interrupt from keyboard
	SIGQUIT      3       Core    Quit from keyboard
	SIGILL       4       Core    Illegal Instruction
	SIGFPE       8       Core    Floating point exception
	SIGKILL      9       Term    Kill signal
	SIGSEGV    	 11      Core    Invalid memory reference
	SIGPIPE  	 13      Term    Broken pipe: write to pipe with no readers
	SIGALRM   	 14      Term    Timer signal from alarm(2)
	SIGTERM    	 15      Term    Termination signal
	SIGUSR1   30,10,16    Term    User-defined signal 1
	SIGUSR2   31,12,17    Term    User-defined signal 2
	SIGCHLD   20,17,18    Ign     Child stopped or terminated
	SIGCONT   19,18,25    Cont    Continue if stopped
	SIGSTOP   17,19,23    Stop    Stop process
	SIGTSTP   18,20,24    Stop    Stop typed at terminal
	SIGTTIN   21,21,26    Stop    Terminal input for background process
	SIGTTOU   22,22,27   Stop    Terminal output for background process
	The signals SIGKILL and SIGSTOP cannot be caught, blocked, or ignored.  
 	
在标准信号中，有一些信号是有三个“Value”，第一个值通常对alpha和sparc架构有效，中间值针对x86、arm和其他架构，最后一个应用于mips架构。一个‘-’表示在对应架构上尚未定义该信号。

不同的操作系统定义了不同的系统信号。因此有些信号出现在Unix系统内，也出现在Linux中，而有的信号出现在FreeBSD或Mac OS中却没有出现在Linux下。这里我们只研究Linux系统中的信号。

默认动作：

	Term：终止进程
	Ign： 忽略信号 (默认即时对该种信号忽略操作)
	Core：终止进程，生成Core文件。(查验进程死亡原因， 用于gdb调试)
	Stop：停止（暂停）进程
	Cont：继续运行进程

注意从man 7 signal帮助文档中可看到 : The signals SIGKILL and SIGSTOP cannot be caught, blocked, or ignored.
   
这里特别强调了9) SIGKILL 和19) SIGSTOP信号，不允许忽略和捕捉，只能执行默认动作。甚至不能将其设置为阻塞。

另外需清楚，只有每个信号所对应的事件发生了，该信号才会被递送(但不一定递达)，不应乱发信号！！
### Linux常规信号一览表
1) SIGHUP: 当用户退出shell时，由该shell启动的所有进程将收到这个信号，默认动作为终止进程  
2) SIGINT：当用户按下了<Ctrl+C>组合键时，用户终端向正在运行中的由该终端启动的程序发出此信号。默认动作为终止进程。  
3) SIGQUIT：当用户按下<ctrl+\>组合键时产生该信号，用户终端向正在运行中的由该终端启动的程序发出些信号。默认动作为终止进程。  
4) SIGILL：CPU检测到某进程执行了非法指令。默认动作为终止进程并产生core文件  
5) SIGTRAP：该信号由断点指令或其他 trap指令产生。默认动作为终止里程 并产生core文件。  
6) SIGABRT: 调用abort函数时产生该信号。默认动作为终止进程并产生core文件。  
7) SIGBUS：非法访问内存地址，包括内存对齐出错，默认动作为终止进程并产生core文件。  
8) SIGFPE：在发生致命的运算错误时发出。不仅包括浮点运算错误，还包括溢出及除数为0等所有的算法错误。默认动作为终止进程并产生core文件。  
9) SIGKILL：无条件终止进程。本信号不能被忽略，处理和阻塞。默认动作为终止进程。它向系统管理员提供了可以杀死任何进程的方法。  
10) SIGUSE1：用户定义 的信号。即程序员可以在程序中定义并使用该信号。默认动作为终止进程。  
11) SIGSEGV：指示进程进行了无效内存访问。默认动作为终止进程并产生core文件。  
12) SIGUSR2：另外一个用户自定义信号，程序员可以在程序中定义并使用该信号。默认动作为终止进程。  
13) SIGPIPE：Broken pipe向一个没有读端的管道写数据。默认动作为终止进程。  
14) SIGALRM: 定时器超时，超时的时间 由系统调用alarm设置。默认动作为终止进程。  
15) SIGTERM：程序结束信号，与SIGKILL不同的是，该信号可以被阻塞和终止。通常用来要示程序正常退出。执行shell命令Kill时，缺省产生这个信号。默认动作为终止进程。  
16) SIGSTKFLT：Linux早期版本出现的信号，现仍保留向后兼容。默认动作为终止进程。  
17) SIGCHLD：子进程结束时，父进程会收到这个信号。默认动作为忽略这个信号。  
18) SIGCONT：如果进程已停止，则使其继续运行。默认动作为继续/忽略。  
19) SIGSTOP：停止进程的执行。信号不能被忽略，处理和阻塞。默认动作为暂停进程。  
20) SIGTSTP：停止终端交互进程的运行。按下<ctrl+z>组合键时发出这个信号。默认动作为暂停进程。  
21) SIGTTIN：后台进程读终端控制台。默认动作为暂停进程。  
22) SIGTTOU: 该信号类似于SIGTTIN，在后台进程要向终端输出数据时发生。默认动作为暂停进程。  
23) SIGURG：套接字上有紧急数据时，向当前正在运行的进程发出些信号，报告有紧急数据到达。如网络带外数据到达，默认动作为忽略该信号。  
24) SIGXCPU：进程执行时间超过了分配给该进程的CPU时间 ，系统产生该信号并发送给该进程。默认动作为终止进程。  
25) SIGXFSZ：超过文件的最大长度设置。默认动作为终止进程。  
26) SIGVTALRM：虚拟时钟超时时产生该信号。类似于SIGALRM，但是该信号只计算该进程占用CPU的使用时间。默认动作为终止进程。  
27) SGIPROF：类似于SIGVTALRM，它不公包括该进程占用CPU时间还包括执行系统调用时间。默认动作为终止进程。  
28) SIGWINCH：窗口变化大小时发出。默认动作为忽略该信号。  
29) SIGIO：此信号向进程指示发出了一个异步IO事件。默认动作为忽略。  
30) SIGPWR：关机。默认动作为终止进程。  
31) SIGSYS：无效的系统调用。默认动作为终止进程并产生core文件。  
34) SIGRTMIN ～ (64) SIGRTMAX：LINUX的实时信号，它们没有固定的含义（可以由用户自定义）。所有的实时信号的默认动作都为终止进程。  
##信号的产生
### 终端按键产生信号
    Ctrl + c  → 2) SIGINT（终止/中断）	 "INT" ----Interrupt
    Ctrl + z  → 20) SIGTSTP（暂停/停止）  "T" ----Terminal 终端。
    Ctrl + \  → 3) SIGQUIT（退出）	
### 硬件异常产生信号
    除0操作   → 8) SIGFPE (浮点数例外)	"F" -----float 浮点数。
    非法访问内存  → 11) SIGSEGV (段错误)
    总线错误  → 7) SIGBUS	
### kill函数/命令产生信号
kill命令产生信号：kill -SIGKILL pid

kill函数：给指定进程发送指定信号(不一定杀死)
   
 	int kill(pid_t pid, int sig);	 成功：0；失败：-1 (ID非法，信号非法，普通用户杀init进程等权级问题)，设置errno
	sig：不推荐直接使用数字，应使用宏名，因为不同操作系统信号编号可能不同，但名称一致。
    pid > 0:  发送信号给指定的进程。
	pid = 0:  发送信号给 与调用kill函数进程属于同一进程组的所有进程。
	pid < 0:  取|pid|发给对应进程组。
	pid = -1：发送给进程有权限发送的系统中所有进程。
   
进程组：每个进程都属于一个进程组，进程组是一个或多个进程集合，他们相互关联，共同完成一个实体任务，每个进程组都有一个进程组长，默认进程组ID与进程组长ID相同。

权限保护：super用户(root)可以发送信号给任意用户，普通用户是不能向系统用户发送信号的。 kill -9 (root用户的pid)  是不可以的。同样，普通用户也不能向其他普通用户发送信号，终止其进程。 只能向自己创建的进程发送信号。普通用户基本规则是：发送者实际或有效用户ID == 接收者实际或有效用户ID

### raise和abort函数
	raise 函数：给当前进程发送指定信号(自己给自己发)	raise(signo) == kill(getpid(), signo);
    	int raise(int sig); 成功：0，失败非0值
	abort 函数：给自己发送异常终止信号 6) SIGABRT 信号，终止并产生core文件
    	void abort(void); 该函数无返回

### 软件条件产生信号  
* alarm函数	
设置定时器(闹钟)。在指定seconds后，内核会给当前进程发送14）SIGALRM信号。进程收到该信号，默认动作终止。

每个进程都有且只有唯一个定时器。

unsigned int alarm(unsigned int seconds); 返回0或剩余的秒数，无失败。

	常用：取消定时器alarm(0)，返回旧闹钟余下秒数。
	例：alarm(5) → 3sec → alarm(4) → 5sec → alarm(5) → alarm(0)
    定时，与进程状态无关(自然定时法)！就绪、运行、挂起(阻塞、暂停)、终止、僵尸...无论进程处于何种状态，alarm都计时。

	使用time命令查看程序执行的时间。	程序运行的瓶颈在于IO，优化程序，首选优化IO。
	实际执行时间 = 系统时间 + 用户时间 + 等待时间
* setitimer函数

设置定时器(闹钟)。 可代替alarm函数。精度微秒us，可以实现周期定时。

	int setitimer(int which, const struct itimerval *new_value, struct itimerval *old_value);	
	成功：0；失败：-1，设置errno
	参数：which：指定定时方式
		① 自然定时：ITIMER_REAL → 14）SIGLARM				 		计算自然时间
		② 虚拟空间计时(用户空间)：ITIMER_VIRTUAL → 26）SIGVTALRM  	 只计算进程占用cpu的时间
		③ 运行时计时(用户+内核)：ITIMER_PROF → 27）SIGPROF		 计算占用cpu及执行系统调用的时间
## 信号集操作函数
内核通过读取未决信号集来判断信号是否应被处理。信号屏蔽字mask可以影响未决信号集。而我们可以在应用程序中自定义set来改变mask。已达到屏蔽指定信号的目的。
### 信号集设定

	sigset_t  set;		// typedef unsigned long sigset_t; 
	int sigemptyset(sigset_t *set);			将某个信号集清0		 		成功：0；失败：-1
    int sigfillset(sigset_t *set);				将某个信号集置1		  		成功：0；失败：-1
    int sigaddset(sigset_t *set, int signum);		将某个信号加入信号集  		成功：0；失败：-1
    int sigdelset(sigset_t *set, int signum);		将某个信号清出信号集   		成功：0；失败：-1
    int sigismember(const sigset_t *set, int signum);判断某个信号是否在信号集中	返回值：在集合：1；不在：0；出错：-1  
    sigset_t类型的本质是位图。但不应该直接使用位操作，而应该使用上述函数，保证跨系统操作有效。
    对比认知select 函数。
### sigprocmask函数

用来屏蔽信号、解除屏蔽也使用该函数。其本质，读取或修改进程的信号屏蔽字(PCB中)

严格注意，屏蔽信号：只是将信号处理延后执行(延至解除屏蔽)；而忽略表示将信号丢处理。

	int sigprocmask(int how, const sigset_t *set, sigset_t *oldset);	成功：0；失败：-1，设置errno
	参数：
			set：传入参数，是一个位图，set中哪位置1，就表示当前进程屏蔽哪个信号。
			oldset：传出参数，保存旧的信号屏蔽集。
			how参数取值：	假设当前的信号屏蔽字为mask
	1.	SIG_BLOCK: 当how设置为此值，set表示需要屏蔽的信号。相当于 mask = mask|set
	2.	SIG_UNBLOCK: 当how设置为此，set表示需要解除屏蔽的信号。相当于 mask = mask & ~set
	3.	SIG_SETMASK: 当how设置为此，set表示用于替代原始屏蔽及的新屏蔽集。相当于 mask = set若，调用sigprocmask解除了对当前若干个信号的阻塞，则在sigprocmask返回前，至少将其中一个信号递达。
### sigpending函数
读取当前进程的未决信号集

	int sigpending(sigset_t *set);	set传出参数。   返回值：成功：0；失败：-1，设置errno
## 信号捕捉
### signal函数
注册一个信号捕捉函数：

	typedef void (*sighandler_t)(int);
	sighandler_t signal(int signum, sighandler_t handler);
	该函数由ANSI定义，由于历史原因在不同版本的Unix和不同版本的Linux中可能有不同的行为。因此应该尽量避免使用它，取而代之使用sigaction函数。
    void (*signal(int signum, void (*sighandler_t)(int))) (int);
    能看出这个函数代表什么意思吗？  注意多在复杂结构中使用typedef。
### sigaction函数 	
修改信号处理动作（通常在Linux用其来注册一个信号的捕捉函数）

    int sigaction(int signum, const struct sigaction *act, struct sigaction *oldact);  成功：0；失败：-1，设置errno
	参数：
	act：传入参数，新的处理方式。
			oldact：传出参数，旧的处理方式。													【signal.c】
	struct sigaction结构体
	    struct sigaction {
	        void     (*sa_handler)(int);
	        void     (*sa_sigaction)(int, siginfo_t *, void *);
	        sigset_t   sa_mask; 
	        int       sa_flags; 
	        void     (*sa_restorer)(void);
	    };
		sa_restorer：该元素是过时的，不应该使用，POSIX.1标准将不指定该元素。(弃用)
		sa_sigaction：当sa_flags被指定为SA_SIGINFO标志时，使用该信号处理程序。(很少使用)  
重点掌握：

	① sa_handler：指定信号捕捉后的处理函数名(即注册函数)。也可赋值为SIG_IGN表忽略 或 SIG_DFL表执行默认动作
	② sa_mask: 调用信号处理函数时，所要屏蔽的信号集合(信号屏蔽字)。注意：仅在处理函数被调用期间屏蔽生效，是临时性设置。
	③ sa_flags：通常设置为0，表使用默认属性。	
### 信号捕捉特性
1.	进程正常运行时，默认PCB中有一个信号屏蔽字，假定为☆，它决定了进程自动屏蔽哪些信号。当注册了某个信号捕捉函数，捕捉到该信号以后，要调用该函数。而该函数有可能执行很长时间，在这期间所屏蔽的信号不由☆来指定。而是用sa_mask来指定。调用完信号处理函数，再恢复为☆。

2.	XXX信号捕捉函数执行期间，XXX信号自动被屏蔽。

3.	阻塞的常规信号不支持排队，产生多次只记录一次。（后32个实时信号支持排队）
### 内核实现信号捕捉过程
<center>![](https://i.imgur.com/3Iu2yRK.png)
====
## 例子
* 练习：编写程序，测试你使用的计算机1秒钟能数多少个数。

		#include <stdio.h>
		#include <unistd.h>
		#include <stdlib.h>
		#include <sys/types.h>
		#include <sys/stat.h>
		#include <string.h>
		#include <signal.h>
		#include <sys/wait.h>
		
		int main(int argc,char* argv[])
		{
		        alarm(1);
		
		        int i=0;
		        while(1)
		        {
		                printf("%d\n",i++);
		        }
		
		
		        return 0;
		
		}

							
* 练习: 使用setitimer函数实现alarm函数，重复计算机1秒数数程序。					

		#include <stdio.h>
		#include <unistd.h>
		#include <stdlib.h>
		#include <sys/types.h>
		#include <sys/stat.h>
		#include <string.h>
		#include <signal.h>
		#include <sys/wait.h>
		#include <sys/time.h>
		
		int main(int argc,char* argv[])
		{
		        //设置定时器
		        struct itimerval new_val;
		        //第一次触发的时间
		        new_val.it_value.tv_sec=2;
		        new_val.it_value.tv_usec=0;
		
		        //周期性定时
		        new_val.it_interval.tv_sec = 1;
		        new_val.it_interval.tv_usec = 0;
		
		        //倒计时2s
		        setitimer(ITIMER_REAL,&new_val,NULL);
		
		        while(1)
		        {
		                printf("Hello World!\n");
		                sleep(1);
		        }
		
		        return 0;
		
		}

* 练习：编写程序。把所有常规信号的未决状态打印至屏幕。
* 							
		#include <stdio.h>
		#include <unistd.h>
		#include <stdlib.h>
		#include <sys/types.h>
		#include <sys/stat.h>
		#include <string.h>
		#include <signal.h>
		#include <sys/wait.h>
		
		int main(int argc,char* argv[])
		{
		        //手动屏蔽信号
		        //自定义信号集合
		        sigset_t myset;
		        //清空集合
		        sigemptyset(&myset);
		        //添加要阻塞的信号
		        sigaddset(&myset,SIGINT);//CTRL+C
		        sigaddset(&myset,SIGQUIT);//ctrl+"\"
		        sigaddset(&myset,SIGKILL);
		
		        //自定义集合数据设置给内核的阻塞信号集
		        sigprocmask(SIG_BLOCK,&myset,NULL);
		
		        //每隔1s读一次内存的未决信号集
		        while(1)
		        {
		                sigset_t pendset;
		                sigpending(&pendset);
		                //1-31
		                for(int i=1;i<32;i++)
		                {
		                        //对每一个信号进行判断
		                        if(sigismember(&pendset,i))
		                        {
		                                printf("1");
		                        }
		                        else
		                        {
		                                printf("0");
		            			}
		                }
		
		                printf("\n");
		                sleep(1);
		        }
		        return 0;
		}


练习1：为某个信号设置捕捉函数	
	
		#include <stdio.h>
		#include <unistd.h>
		#include <stdlib.h>
		#include <sys/types.h>
		#include <sys/stat.h>
		#include <string.h>
		#include <signal.h>
		#include <sys/wait.h>
		
		void myfunc(int no)
		{
		        printf("catch signal: %d\n",no);
		}
		
		int main(int argc,char* argv[])
		{
		        //捕捉ctrl+c
		        //注册捕捉函数
		        signal(2,myfunc);
		
		        while(1)
		        {
		                printf("hello\n");
		                sleep(1);
		        }
		
		        return 0;
		}

* 练习3：验证sa_mask在捕捉函数执行期间的屏蔽作用。										

		#include <stdio.h>
		#include <unistd.h>
		#include <stdlib.h>
		#include <sys/types.h>
		#include <sys/stat.h>
		#include <string.h>
		#include <signal.h>
		#include <sys/wait.h>
		
		void myfunc(int no)
		{
		        printf("catch signal: %d\n",no);
		        sleep(3);
		        printf("wake up\n");
		}
		
		int main(int argc,char* argv[])
		{
		        //init
		        struct sigaction act;
		        act.sa_flags=0;
		        sigemptyset(&act.sa_mask);
		        //添加临时屏蔽信号
		        sigaddset(&act.sa_mask,SIGQUIT);
		        act.sa_handler = myfunc;
		
		        sigaction(2,&act,NULL);
		
		        while(1);
		
		        return 0;
		}


# 共享映射区（无血缘关系）
## 文件进程间通信
使用文件也可以完成IPC，理论依据是，fork后，父子进程共享文件描述符。也就共享打开的文件。
## 存储映射I/O
存储映射I/O (Memory-mapped I/O) 使一个磁盘文件与存储空间中的一个缓冲区相映射。于是当从缓冲区中取数据，就相当于读文件中的相应字节。于此类似，将数据存入缓冲区，则相应的字节就自动写入文件。这样，就可在不适用read和write函数的情况下，使用地址（指针）完成I/O操作。

使用这种方法，首先应通知内核，将一个指定文件映射到存储区域中。这个映射工作可以通过mmap函数来实现。  
<center>![](https://i.imgur.com/pc4L5PY.png)
====
## mmap函数
    void *mmap(void *adrr, size_t length, int prot, int flags, int fd, off_t offset); 
返回：成功：返回创建的映射区首地址；失败：MAP_FAILED宏
参数：
	
	addr: 	建立映射区的首地址，由Linux内核指定。使用时，直接传递NULL
	length： 欲创建映射区的大小,内核会根据实际情况分配4K的整数倍
	prot：	映射区权限PROT_READ、PROT_WRITE、PROT_READ|PROT_WRITE
	flags：	标志位参数(常用于设定更新物理区域、设置共享、创建匿名映射区)
		  	MAP_SHARED:  会将映射区所做的操作反映到物理设备（磁盘）上。
		  	MAP_PRIVATE: 映射区所做的修改不会反映到物理设备。
	fd： 	用来建立映射区的文件描述符
	offset： 	映射文件的偏移(4k的整数倍)
## munmap函数
同malloc函数申请内存空间类似的，mmap建立的映射区在使用结束后也应调用类似free的函数来释放。
`int munmap(void *addr, size_t length);`	成功：0； 失败：-1
## mmap注意事项
### 思考  
1. 可以open的时候O_CREAT一个新文件来创建映射区吗?  
   可以。但是必须要做文件扩展（lseek truncate）。文件的大小不能是0  
2. 如果open时O_RDONLY, mmap时PROT参数指定PROT_READ|PROT_WRITE会怎样？  
   报错，权限问题。  
3. 文件描述符先关闭，对mmap映射有没有影响？  
   没有  
4. 如果文件偏移量为1000会怎样？
   报错，参数错误。因为这个offset的参数必须是4K大小
5. 对mem越界操作会怎样？  
   一般来说会发声段错误。如果巧合越界的内存可以访问，就会没有报错
6. 如果映射区首地址ptr++，munmap可否成功？  
   不会成功，参数错误
7. mmap什么情况下会调用失败？
   参数填写有误  
8. 如果不检测mmap的返回值，会怎样？
   如果映射建立成功之后，不检测返回值不怎么样。如果不保存返回值不行，毕竟是内存的首地址啊。
   如果映射建立不成功，检测不到映射失败，不好。
### 总结
使用mmap时务必注意以下事项：  
1.	创建映射区的过程中，隐含着一次对映射文件的读操作。  
2.	当MAP_SHARED时,要求映射区的权限应 <= 文件打开的权限(出于对映射区的保护)。而MAP_PRIVATE则无所谓，因为mmap中的权限是对内存的限制。  
3.	映射区的释放与文件关闭无关。只要映射建立成功，文件可以立即关闭。  
4.	特别注意，当映射文件大小为0时，不能创建映射区。所以：用于映射的文件必须要有实际大小！！	mmap使用时常常会出现总线错误，通常是由于共享文件存储空间大小引起的。  
5.	munmap传入的地址一定是mmap的返回地址。坚决杜绝指针++操作。  
6.	如果文件偏移量必须为4K的整数倍  
7.	mmap创建映射区出错概率非常高，一定要检查返回值，确保映射区建立成功再进行后续操作。
## mmap有血缘关系进程间的通信
父子进程通信  
父子等有血缘关系的进程之间也可以通过mmap建立的映射区来完成数据通信。但相应的要在创建映射区的时候指定对应的标志位参数flags：

	MAP_PRIVATE:  (私有映射)  父子进程各自独占映射区；
	MAP_SHARED:  (共享映射)  父子进程共享映射区；
结论：  
父子进程共享：1. 打开的文件  2. mmap建立的映射区(但必须要使用MAP_SHARED)
## 匿名映射
通过使用我们发现，使用映射区来完成文件读写操作十分方便，父子进程间通信也较容易。但缺陷是，每次创建映射区一定要依赖一个文件才能实现。通常为了建立映射区要open一个temp文件，创建好了再unlink、close掉，比较麻烦。 可以直接使用匿名映射来代替。其实Linux系统给我们提供了创建匿名映射区的方法，无需依赖一个文件即可创建映射区。同样需要借助标志位参数flags来指定。

使用MAP_ANONYMOUS (或MAP_ANON)， 如: 

	int *p = mmap(NULL, 4, PROT_READ|PROT_WRITE, MAP_SHARED|MAP_ANONYMOUS, -1, 0); 
    "4"随意举例，该位置表大小，可依实际需要填写。
需注意的是，MAP_ANONYMOUS和MAP_ANON这两个宏是Linux操作系统特有的宏。在类Unix系统中如无该宏定义，可使用如下两步来完成匿名映射区的建立。

	① fd = open("/dev/zero", O_RDWR);
	② p = mmap(NULL, size, PROT_READ|PROT_WRITE, MMAP_SHARED, fd, 0);
## mmap无血缘关系进程间通信
实质上mmap是内核借助文件帮我们创建了一个映射区，多个进程之间利用该映射区完成数据传递。由于内核空间多进程共享，因此无血缘关系的进程间也可以使用mmap来完成通信。只要设置相应的标志位参数flags即可。若想实现共享，当然应该使用MAP_SHARED了。
## 例子
### mmap方式的父子进程通信
练习：父进程创建映射区，然后fork子进程，子进程修改映射区内容，而后，父进程读取映射区内容，查验是否共享。

	#include <stdlib.h>
	#include <sys/types.h>
	#include <sys/stat.h>
	#include <string.h>
	#include <sys/mman.h>
	#include <fcntl.h>
	#include <sys/wait.h>
	
	int main(int argc,char* argv)
	{
	        //打开一个文件
	        int fd=open("english.txt",O_RDWR);
	        //int fd=open("english.txt",O_RDWR);
	        int len=lseek(fd,0,SEEK_END);
	
	        //创建内存映射区
	        void* ptr=mmap(NULL,len,PROT_READ | PROT_WRITE,MAP_SHARED,fd,0);
	        if(ptr==MAP_FAILED)
	        {
	                perror("mmap error");
	                exit(1);
	        }
	
	        //printf("%s",(char*)ptr);
	
	        //创建子进程
	        pid_t pid=fork();
	        if(pid == -1)
	        {
	                perror("fork error");
	                exit(1);
	        }
	        else if(pid > 0)
	        {
	                //写数据
	                strcpy((char *)ptr,"你是我儿子吗？");
	                //回收子进程
	                wait(NULL);
	        }
	        else if(pid == 0)
	 		{
	                //读数据
	                printf("%s",(char*)ptr);
	        }
	
	        //ptr++;
	
	        //释放内存映射区
	        int ret = munmap(ptr,len);
	        if(ret == -1)
	        {
	                perror("munmap error");
	                exit(1);
	        }
	        close(fd);
	
	        return 0;
	}

### mmap无血缘关系的进程之间的通信
mmap\_r_ipc.c

	#include <stdio.h>
	#include <stdlib.h>
	#include <string.h>
	#include <unistd.h>
	#include <sys/types.h>
	#include <sys/mman.h>
	#include <fcntl.h>
	
	int main(int argc,char* argv[])
	{
	        int fd = open("temp",O_RDWR | O_CREAT,0664);
	        ftruncate(fd,4096);
	        int len=lseek(fd,0,SEEK_END);
	
	        void* ptr=mmap(NULL,len,PROT_READ | PROT_WRITE,MAP_SHARED,fd,0);
	        if(ptr == MAP_FAILED)
	        {
	                perror("mmap");
	                exit(1);
	        }
	
	        while(1)
	        {
	                sleep(1);
	                printf("%s\n",(char*)ptr+1024);
	        }
	
	        //释放
	        int ret=munmap(ptr,len);
	        if(ret == -1)
	        {
	                perror("munmap");
	                exit(1);
	        }
	
	        return 0;
	}
mmap\_w_ipc.c

	#include <stdio.h>
	#include <stdlib.h>
	#include <string.h>
	#include <unistd.h>
	#include <sys/types.h>
	#include <sys/mman.h>
	#include <fcntl.h>
	
	int main(int argc,char* argv[])
	{
	        int fd = open("temp",O_RDWR | O_CREAT,0664);
	
	
	        void* ptr=mmap(NULL,4096,PROT_READ | PROT_WRITE,MAP_SHARED,fd,0);
	        if(ptr == MAP_FAILED)
	        {
	                perror("mmap");
	                exit(1);
	        }
	
	        while(1)
	        {
	                char* p=(char *)ptr;
	                p+=1024;
	                strcpy(p,"hello parent,i am your 朋友！！！\n");
	                sleep(2);
	        }
	
	        //释放
	        int ret=munmap(ptr,4096);
	        if(ret == -1)
	        {
	                perror("munmap");
	                exit(1);
	        }
	
	        return 0;
	}
### mmap读文件
通过mmap的方式读取文件的内容
	#include <stdlib.h>
	#include <sys/types.h>
	#include <sys/stat.h>
	#include <string.h>
	#include <sys/mman.h>
	#include <fcntl.h>
	
	int main(int argc,char* argv)
	{
	        //打开一个文件
	        int fd=open("english.txt",O_RDWR);
	        int len=lseek(fd,0,SEEK_END);
	
	        //创建内存映射区
	        void* ptr=mmap(NULL,len,PROT_READ | PROT_WRITE,MAP_SHARED,fd,0);
	        if(ptr==MAP_FAILED)
	        {
	                perror("mmap error");
	                exit(1);
	        }
	
	        printf("%s",(char*)ptr);
	
	        //释放内存映射区
	        munmap(ptr,len);
	        close(fd);
	
	        return 0;
	}

# 本地套接字（最稳定）

