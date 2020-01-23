写入文件和这个对象 StreamWriter
using (StreamWriter sw = new StreamWriter(NewFilePath,true))
{
         sw.WriteLine(LogString);
}
这个看到那个蓝色的true了没,恩那个就是追加的标记,如果不写的话,那么你所有写一次,之前的都会被覆盖掉
!

C#写文件方式：用StreamWriter
1.	//实例化一个保存文件对话框  
2.	SaveFileDialog sf = new SaveFileDialog();  
3.	//设置文件保存类型  
4.	sf.Filter = "txt文件|*.txt|所有文件|*.*";  
5.	//如果用户没有输入扩展名，自动追加后缀  
6.	sf.AddExtension = true;  
7.	//设置标题  
8.	sf.Title = "写文件";  
9.	//如果用户点击了保存按钮  
10.	if (sf.ShowDialog() == DialogResult.OK)  
11.	{  
12.	//实例化一个文件流--->与写入文件相关联  
13.	FileStream fs = new FileStream(sf.FileName, FileMode.Create);  
14.	//实例化一个StreamWriter-->与fs相关联  
15.	StreamWriter sw = new StreamWriter(fs);  
16.	//开始写入  
17.	sw.Write(this.textBox1.Text);  
18.	//清空缓冲区  
19.	sw.Flush();  
20.	//关闭流  
21.	sw.Close();  
22.	fs.Close();  
23.	}  
24.	 


