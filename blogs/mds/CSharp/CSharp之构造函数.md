 1. 实例构造函数
 
 class Student
{
    long id;
    char gender;
    int classID;
    public Student() : this(0, 'F', 0)
    { }
    public Student(long aID, char aGender, int aClassID)
    {
        id = aID;
        gender = aGender;
        classID = aClassID;
    }
}
 
 2. 私有构造函数

私有构造函数
       在某些特殊的情况下，使用私有构造函数能够达到意想不到的效果。比如，想建立这样一个类：不允许被其他类实例化，但提供对外的静态接口成员。在.NET框架类库中就存在这样的类，如System.Math类就不能够实例化，它的所有成员都是静态的。
       用关键字private修饰的构造函数就是私有构造函数。

 3. 静态构造函数
 
