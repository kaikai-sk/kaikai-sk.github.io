---
layout: post
title: UML（user mode Linux）内核调试
description: Linux环境下，在用户态调试Linux内核
date: 2018-06-07
tags: Linux内核调试   
---

一.搭建UML实验环境
-----------

1.下载Linux Kernel源码
访问https://www.kernel.org/网站，看到现在（2014-3-10）最新的版本为3.13.6，那么就下载它了：

```
	cd ~/uml/           
	wget https://www.kernel.org/pub/linux/kernel/v3.x/linux-3.13.6.tar.xz
```

2.编译UM配置的Kernel
解压下载的内核源码：tar xvf linux-3.13.6.tar.xz
配置及编译内核源码：

```
cd linux-3.13.6
make ARCH=um defconfig
```

生成UM默认的配置文件，运行后有如下信息：

```
xinu@slam:~/uml/linux-3.13.6$ make ARCH=um defconfig
HOSTCC scripts/basic/fixdep
HOSTCC scripts/kconfig/conf.o
SHIPPED scripts/kconfig/zconf.tab.c
SHIPPED scripts/kconfig/zconf.lex.c
SHIPPED scripts/kconfig/zconf.hash.c
HOSTCC scripts/kconfig/zconf.tab.o
HOSTLD scripts/kconfig/conf
*** Default configuration is based on 'x86_64_defconfig'
#
# configuration written to .config
#
```

配置文件生成后，就是编译了，执行如下命令：

```
make ARCH=um
```

编译完成后会在当前目录下生成linux可执行文件。
3.准备根文件系统
编译完成后，需要一个根文件系统，此时可以从http://fs.devloop.org.uk/下载一个现成的资源，由于看到Ubuntu Saucy对UML的兼容不好（没有命令行界面，即运行后输入无响应），故而下载与Ubuntu同系的Debian Wheezy，下载及解压命令如下：

```
cd ..
wget http://fs.devloop.org.uk/filesystems/Debian-Wheezy/Debian-Wheezy-AMD64-root_fs.bz2
bunzip2 Debian-Wheezy-AMD64-root_fs.bz2
```

解压后是名为 Debian-Wheezy-AMD64-root_fs 文件。
4.运行UML

```
cd linux-3.13.6/
./linux ubda=../Debian-Wheezy-AMD64-root_fs mem=256m
```

运行起来后，到最后有如下提示：

```
Serial line 0 assigned device '/dev/pts/4'
Debian GNU/Linux 7 changeme tty0

changeme login:
```

此时我们输入root，回车后有如下提示：

```
Last login: Mon Mar 10 09:14:54 UTC 2014 on tty0
Linux changeme 3.13.6 #3 Mon Mar 10 16:46:54 CST 2014 x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
root@changeme:~#
```

这就表示UML启动成功了，当然从上面提供的网站下载的文件系统有些未必匹配使用，我这边测试了还能使用的有busybox的，该包跟我们嵌入式平台平时移植的Busybox一致，不过版本会旧些，我们还是继续先使用Debian的。
先到这，我们把UML关机先，输入halt命令，提示如下：

```
root@changeme:~# halt

Broadcast message from root@changeme (tty0) (Mon Mar 10 09:23:30 2014):

The system is going down for system halt NOW!
INIT: Switching to runlevel: 0
INIT: Sending processes the TERM signal
[info] Using makefile-style concurrent boot in runlevel 0.
[ ok ] Asking all remaining processes to terminate...done.
[ ok ] All processes ended within 1 seconds...done.
[ ok ] Stopping enhanced syslogd: rsyslogd.
[info] Saving the system clock.
hwclock: Cannot access the Hardware Clock via any known method.
hwclock: Use the --debug option to see the details of our search for an access method.
[ ok ] Deconfiguring network interfaces...done.
[ ok ] Unmounting temporary filesystems...done.
[ ok ] Deactivating swap...done.
EXT4-fs (ubda): re-mounted. Opts: (null)
[info] Will now halt.
reboot: System halted

xinu@slam:~/uml/linux-3.13.6$
```

至此，UML环境搭建并测试成功了。

二.GDB调试UML
----------

1.运行UML并确认其对应的进程
打开一终端，使用./linux ubda=../Debian-Wheezy-AMD64-root_fs mem=256m命令运行起UML后，再打开另一终端，并运行ps uf | grep linux | grep -v grep | grep -v git命令，会有如下输出：

```
xinu@slam:~$ ps uf | grep linux | grep -v grep | grep -v git
xinu 7160 4.2 1.7 276996 36476 pts/5 S+ 16:05 0:17 \_ ./linux ubda=../Debian-Wheezy-AMD64-root_fs mem=256m
xinu 7167 0.0 1.7 276996 36476 pts/5 S+ 16:05 0:00 \_ ./linux ubda=../Debian-Wheezy-AMD64-root_fs mem=256m
xinu 7168 0.0 1.7 276996 36476 pts/5 S+ 16:05 0:00 \_ ./linux ubda=../Debian-Wheezy-AMD64-root_fs mem=256m
xinu 7169 0.0 1.7 276996 36476 pts/5 S+ 16:05 0:00 \_ ./linux ubda=../Debian-Wheezy-AMD64-root_fs mem=256m
xinu 7170 0.0 0.0 15528 972 pts/5 t+ 16:05 0:00 \_ ./linux ubda=../Debian-Wheezy-AMD64-root_fs mem=256m
xinu 7359 0.0 0.0 15804 1124 pts/5 t+ 16:05 0:00 \_ ./linux ubda=../Debian-Wheezy-AMD64-root_fs mem=256m
xinu 7432 0.0 0.0 15552 840 pts/5 t+ 16:05 0:00 \_ ./linux ubda=../Debian-Wheezy-AMD64-root_fs mem=256m
xinu 7439 0.0 0.0 15512 848 pts/5 t+ 16:05 0:00 \_ ./linux ubda=../Debian-Wheezy-AMD64-root_fs mem=256m
xinu 9501 0.0 0.0 16352 692 pts/5 t+ 16:05 0:00 \_ ./linux ubda=../Debian-Wheezy-AMD64-root_fs mem=256m
xinu 9581 0.0 0.0 15572 988 pts/5 t+ 16:05 0:00 \_ ./linux ubda=../Debian-Wheezy-AMD64-root_fs mem=256m
xinu 9632 0.0 0.0 15568 1024 pts/5 t+ 16:05 0:00 \_ ./linux ubda=../Debian-Wheezy-AMD64-root_fs mem=256m
xinu 9639 0.0 0.0 16212 1340 pts/5 t+ 16:06 0:00 \_ ./linux ubda=../Debian-Wheezy-AMD64-root_fs mem=256m
xinu 9641 0.0 0.0 16676 2020 pts/5 t+ 16:06 0:00 \_ ./linux ubda=../Debian-Wheezy-AMD64-root_fs mem=256m
```

从上面的输出内容可知对应主进程的PID为7160。
2.连接调试
使用GDB连接上已运行的UML环境并进行调试尝试。在新打开的另一终端输入如下命令：

```
sudo gdb -p 7160
```

此时如果gdb attach上UML后会有如下输出（注意需root权限）：

```
xinu@slam:~$ sudo gdb -p 7160
[sudo] password for xinu:
GNU gdb (GDB) 7.6.1-ubuntu
Copyright (C) 2013 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law. Type "show copying"
and "show warranty" for details.
This GDB was configured as "x86_64-linux-gnu".
For bug reporting instructions, please see:
<http://www.gnu.org/software/gdb/bugs/>.
Attaching to process 7160
Reading symbols from /home/xinu/Linux内核启示说/build/uml/linux-3.13.6/linux...done.
Reading symbols from /lib/x86_64-linux-gnu/libutil.so.1...Reading symbols from /usr/lib/debug/lib/x86_64-linux-gnu/libutil-2.17.so...done.
done.
Loaded symbols for /lib/x86_64-linux-gnu/libutil.so.1
Reading symbols from /lib/x86_64-linux-gnu/libc.so.6...Reading symbols from /usr/lib/debug/lib/x86_64-linux-gnu/libc-2.17.so...done.
done.
Loaded symbols for /lib/x86_64-linux-gnu/libc.so.6
Reading symbols from /lib64/ld-linux-x86-64.so.2...Reading symbols from /usr/lib/debug/lib/x86_64-linux-gnu/ld-2.17.so...done.
done.
Loaded symbols for /lib64/ld-linux-x86-64.so.2
Reading symbols from /lib/x86_64-linux-gnu/libnss_compat.so.2...Reading symbols from /usr/lib/debug/lib/x86_64-linux-gnu/libnss_compat-2.17.so...done.
done.
Loaded symbols for /lib/x86_64-linux-gnu/libnss_compat.so.2
Reading symbols from /lib/x86_64-linux-gnu/libnsl.so.1...Reading symbols from /usr/lib/debug/lib/x86_64-linux-gnu/libnsl-2.17.so...done.
done.
Loaded symbols for /lib/x86_64-linux-gnu/libnsl.so.1
Reading symbols from /lib/x86_64-linux-gnu/libnss_nis.so.2...Reading symbols from /usr/lib/debug/lib/x86_64-linux-gnu/libnss_nis-2.17.so...done.
done.
Loaded symbols for /lib/x86_64-linux-gnu/libnss_nis.so.2
Reading symbols from /lib/x86_64-linux-gnu/libnss_files.so.2...Reading symbols from /usr/lib/debug/lib/x86_64-linux-gnu/libnss_files-2.17.so...done.
done.
Loaded symbols for /lib/x86_64-linux-gnu/libnss_files.so.2
0x00007fd1da9f9840 in __nanosleep_nocancel ()
at ../sysdeps/unix/syscall-template.S:81
81 ../sysdeps/unix/syscall-template.S: No such file or directory.
(gdb)
```

连接上后，我们就开始尝试了，在上面的(gdb)后面运行指令set follow-fork-mode parent，确保等会gdb一直在该进程，即在fork创建新的子进程后继续调试父进程，子进程不受影响。
接下来，在(gdb)后面继续运行指令break sys_clone创建一个断点，此时会输出如下内容：

```
(gdb) break sys_clone
Breakpoint 1 at 0x6003526d: file kernel/fork.c, line 1679.
```

接下来在(gdb)后面继续运行info break查看刚创建的断点，有如下内容输出：

```
(gdb) info break
Num Type Disp Enb Address What
1 breakpoint keep y 0x000000006003526d in SyS_clone
at kernel/fork.c:1679
```

接下来在(gdb)后面输入continue，让程序继续运行，处于被调试状态，此时会有如下内容输出：

```
(gdb) continue
Continuing.
```

接下来在运行起来的UML里输入命令ls -l，会有如下内容输出：

```
root@changeme:~# ls -l
```

此时没有任何输出，一直处于闪烁光标等待内容输出的状态，而gdb端有如下输出：

```
(gdb) continue
Continuing.

Breakpoint 1, SyS_clone (clone_flags=18874385, newsp=0, parent_tidptr=0,
child_tidptr=1073899664, tls_val=0) at kernel/fork.c:1679
1679 SYSCALL_DEFINE5(clone, unsigned long, clone_flags, unsigned long, newsp,
(gdb)
```

即此时在UML里运行的ls -l命令停在了刚在gdb设置的断点处，接下来我们可以在gdb里查看断点处的相关信息，在(gdb)后面输入l后会有如下输出：

```
(gdb) l
1674 int, stack_size,
1675 int __user *, parent_tidptr,
1676 int __user *, child_tidptr,
1677 int, tls_val)
1678 #else
1679 SYSCALL_DEFINE5(clone, unsigned long, clone_flags, unsigned long, newsp,
1680 int __user *, parent_tidptr,
1681 int __user *, child_tidptr,
1682 int, tls_val)
1683 #endif
(gdb)
```

此时可以看到断点所在1679行处前后的相关代码行源码，便于我们定位问题。至此，演示了在用户空间下调试UML里Kernel，体验了个回gdb。

### 其他 

杀死指定名称的进程

```
    ps -ef|grep DeviceConnectionLimitTest |grep -v grep|cut -c 9-15|xargs kill -9 
```
