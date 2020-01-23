```
 public Student(string name,int age,char gender,int chinese,int math,int english)
        {
            this.Name = name;
            this.Age = age;
            this.Gender = gender;
            this.Chinese = chinese;
            this.Math = math;
            this.English = english;
        }

        public Student(int chinese,int math,int english):this("",0,'0',chinese,math,english)
        {

        }
```
