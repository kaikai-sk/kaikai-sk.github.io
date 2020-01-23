```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 枚举
{
    enum Gender
    {
        男,
        女
    }
    public enum Sesons
    {
        春,
        夏,
        秋,
        冬
    }
    public enum QQState
    {
        onLine,
        offLine,
        QMe,
        leave,
        busy,
    }

    class Program
    {
        static void Main(string[] args)
        {
            Gender gender = Gender.女;
            QQState state = QQState.QMe;
            Sesons senson = Sesons.春;
        }
    }
}

```
