TreeApp.java文件

```
package com.sk.tree;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.ObjectInputStream.GetField;

public class TreeApp
{
	public static void main(String[] args) throws Exception
	{
		int value;
		
		Tree theTree = new Tree();
		
		theTree.insert(50, 1.5);
		theTree.insert(25, 1.2);
		theTree.insert(75, 1.7);
		theTree.insert(12, 1.5);
		theTree.insert(37, 1.2);
		theTree.insert(43, 1.7);
		theTree.insert(30, 1.5);
		theTree.insert(33, 1.2);
		theTree.insert(87, 1.7);
		theTree.insert(93, 1.5);
		theTree.insert(97, 1.5);

		while(true)
		{
			System.out.print("Enter first letter of show,");
			System.out.print("insert,find,delete,or traverse");
			int choice =getChar();
			
			switch(choice)
			{
			case 's':
				theTree.displayTree();
				break;
			case 'i':
				System.out.print("Enter value to insert:");
				value = getInt();
				theTree.insert(value, value+0.9);
				break;
			case 'f':
				System.out.println("Enter value to find:");
				value=getInt();
				Node found=theTree.find(value);
				if(found!=null)
				{
					System.out.print("Found:");
					found.displayNode();
					System.out.println();
				}
				else
				{
					System.out.print("Could not find "+value+"'n");
				}
				break;
			case 'd':
				System.out.print("Enter value to delete:");
				value=getInt();
				boolean didDelete=theTree.delete(value);
				if(didDelete)
					System.out.println("Deleted "+value);
				else
				{
					System.out.print("Could not delete "+value+" \n");
				}
				break;
			case 't':
				System.out.print("Enter type 1,2,or 3:");
				value=getInt();
				theTree.traverse(value);
				break;
			default:
				System.out.println("Invalid entry\n");
			}
			
		}
		
	}

	public static String getString() throws Exception
	{
		BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
		String string=br.readLine();
		return string;
	}
	
	private static int getChar() throws Exception
	{
		String s=getString();
		return s.charAt(0);
	}

	private static int getInt() throws Exception
	{
		String s=getString();
		return Integer.parseInt(s);
	}
}

```

Tree.java文件
```
package com.sk.tree;

import java.util.Stack;

import com.sk.tree.*;

public class Tree
{
	//first node of tree
	private Node root;
	
	public void displayTree()
	{
		Stack globalStack=new Stack();
		
		globalStack.push(root);
		
		int nBlanks=32;
		boolean isRowEmpty=false;
		
		System.out.println("...............................................");
		while(isRowEmpty==false)
		{
			Stack localStack=new Stack();
			isRowEmpty=true;
			
			for(int j=0;j<nBlanks;j++)
				System.out.print(' ');
			
			while(globalStack.isEmpty()==false)
			{
				Node temp=(Node) globalStack.pop();
				if(temp!=null)
				{
					System.out.print(temp.iData);
					localStack.push(temp.leftChild);
					localStack.push(temp.rightChild);
					
					if(temp.leftChild!= null ||
							temp.rightChild!=null)
					{
						isRowEmpty=false;
					}
				}
				else
				{
					System.out.print("--");
					localStack.push(null);
					localStack.push(null);
				}
				for(int j=0;j<nBlanks*2-2;j++)
				{
					System.out.print(' ');
				}
			}
			System.out.println();
			nBlanks/=2;
			while(localStack.isEmpty()==false)
			{
				globalStack.push(localStack.pop());
			}
			
		}
		System.out.println("...............................................");
	}
	
	public void traverse(int traverseType)
	{
		switch (traverseType)
		{
		case 1:
			System.out.print("\nPreorder traversal: ");
			preOrder(root);
			break;
		case 2:
			System.out.print("\nInorder traversal: ");
			inOrder(root);
		case 3:
			System.out.print("\nPostorder traversal: ");
			postOrder(root);
		default:
			break;
		}
		System.out.println();
	}
	
	
	private void postOrder(Node localRoot)
	{
		if(localRoot!=null)
		{
			postOrder(localRoot.leftChild);
			postOrder(localRoot.rightChild);
			System.out.print(localRoot.iData+" ");
		}
	}


	private void inOrder(Node localRoot)
	{
		if(localRoot!=null)
		{
			inOrder(localRoot.leftChild);
			System.out.print(localRoot.iData+" ");
			inOrder(localRoot.rightChild);
		}
		
	}


	private void preOrder(Node localRoot)
	{
		if(localRoot!=null)
		{
			System.out.print(localRoot.iData+" ");
			preOrder(localRoot.leftChild);
			preOrder(localRoot.rightChild);
		}
	}


	public boolean delete(int key)
	{
		Node current=root;
		Node parent=root;
		boolean isLeftChild=true;
		
		while(current.iData!=key)
		{
			parent=current;
			
			if(key<current.iData)
			{
				isLeftChild=true;
				current=current.leftChild;
			}
			else
			{
				isLeftChild=false;
				current=current.rightChild;
			}
			if(current==null)
			{
				return false;
			}
		}
		
		//if no children ,simple delete it
		if(current.leftChild==null && current.rightChild==null)
		{
			if(current==root)
				root=null;
			else if(isLeftChild)
				parent.leftChild=null;
			else
				parent.rightChild=null;
		}
		//if no right child,replace with left subtree
		else if(current.rightChild==null)
		{
			if(current==root)
				root=current.leftChild;
			else if(isLeftChild)
				parent.leftChild=current.leftChild;
			else
				parent.rightChild=current.leftChild;
				
			
		}
		//if no left child ,replace with right subtree
		else if(current.leftChild==null)
		{
			if(current==root)
				root=current.rightChild;
			else if(isLeftChild)
				parent.leftChild=current.rightChild;
			else 
				parent.rightChild=current.rightChild;
		}
		//two children ,so replace with inorder successor
		else
		{
			//get successor of node to delete
			Node successor=getSuccessor(current);
			
			if(current == root)
				root=successor;
			else if(isLeftChild)
				parent.leftChild=successor;
			else 
				parent.rightChild=successor;
			
			successor.leftChild=current.leftChild;
		}
		return true;
		
	}
	
	//goes to right child,then right child's left descendents
	private Node getSuccessor(Node delNode)
	{
		Node successorParent=delNode;
		Node successor=delNode;
		Node current=delNode.rightChild;
		
		while(current!=null)
		{
			successorParent=successor;
			successor=current;
			current=current.leftChild;
		}
		//this scope,process the pointer
		if(successor!=delNode.rightChild)
		{
			successorParent.leftChild=successor.rightChild;
			successor.rightChild=delNode.rightChild;
		}
		return successor;
	}

	public void insert(int id,double dd)
	{
		Node newNode=new Node();
		newNode.iData=id;
		newNode.dData=dd;
		
		if(root==null)
		{
			root=newNode;
		}
		else
		{
			Node current=root;
			Node parent;
			
			while(true)
			{
				parent=current;
				if(id<current.iData)
				{
					current=current.leftChild;
					if(current==null)
					{
						parent.leftChild=newNode;
						return ;
					}
				}
				else
				{
					current=current.rightChild;
					if(current==null)
					{
						parent.rightChild=newNode;
						return ;
					}
				}
			}
		}
		
	}
	
	
	public Node find(int key)
	{
		Node current=root;
		
		while(current.iData!=key)
		{
			if(key<current.iData)
			{
				current=current.leftChild;
			}
			else
			{
				current=current.rightChild;
			}
			if(current==null)
				return null;
		}
		return current;
	}
	
	
	public Tree()
	{
		root=null;
	}
}

```

Node.java文件
```
package com.sk.tree;

public class Node
{
	//key
	public int iData;
	//value
	public double dData;
	public Node leftChild;
	public Node rightChild;
	
	//dispaly ourself
	public void displayNode()
	{
		System.out.print('{');
		System.out.print(iData);
		System.out.print(", ");
		System.out.print(dData);
		System.out.print('}');
	}
}

```

运行结果
```
Enter first letter of show,insert,find,delete,or traverses
...............................................
                                50                                                              
                25                              75                              
        12              37              --              87              
    --      --      30      43      --      --      --      93      
  --  --  --  --  --  33  --  --  --  --  --  --  --  --  --  97  
...............................................
Enter first letter of show,insert,find,delete,or traversed
Enter value to delete:25
Deleted 25
Enter first letter of show,insert,find,delete,or traverses
...............................................
                                50                                                              
                30                              75                              
        12              37              --              87              
    --      --      33      43      --      --      --      93      
  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  97  
...............................................
Enter first letter of show,insert,find,delete,or traverse
```
