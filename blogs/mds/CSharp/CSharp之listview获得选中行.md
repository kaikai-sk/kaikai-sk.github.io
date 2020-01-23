首先必须要判断listView1.SelectedItems.Count>0或是listview1.SelectedIndices.Count>0,否则第一次点击会选不中。
其次，好像itemSelectionChanged或者SelectedIndexChanged事件都可以触发。

```
private void listView1_ItemSelectionChanged(object sender,EventArgs e)
{  if (listView1.SelectedItems.Count == 0) return;  
  else 
 { 
 string site = listView1.SelectedItems[0].Text;
 string type = listView1.SelectedItems[0].SubItems[1].Text;
 }
}
```

//选中点击那一行的第一列的值，索引值必须是0，而且无论点这一行的第几列，选中的都是这一行第一列的值 ，如果想获取这一行除第一列外的值，则用subitems获取，[]中为索引，从1开始。
