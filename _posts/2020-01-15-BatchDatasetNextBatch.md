---
layout: post
title: 自己实现next_batch函数的方法
date: 2020-01-15
tags: 机器学习   
---

### 前言
在用tensorflow实现机器学习算法的时候，通常是面临着处理大数据集的情况，这种时候需要批量的加载数据集到内存中，tensorflow中内置的mnist数据集中是实现了
next_batch函数的，这个函数是非常好用的，但是在读取自己的数据集的时候是没有现成的next_batch函数可以用的，需要自己实现之。


### 实现1

```
import numpy as np 

class Dataset:

def __init__(self,data):
    self._index_in_epoch = 0
    self._epochs_completed = 0
    self._data = data
    self._num_examples = data.shape[0]
    pass


@property
def data(self):
    return self._data

def next_batch(self,batch_size,shuffle = True):
    start = self._index_in_epoch
    if start == 0 and self._epochs_completed == 0:
        idx = np.arange(0, self._num_examples)  # get all possible indexes
        np.random.shuffle(idx)  # shuffle indexe
        self._data = self.data[idx]  # get list of `num` random samples

    # go to the next batch
    if start + batch_size > self._num_examples:
        self._epochs_completed += 1
        rest_num_examples = self._num_examples - start
        data_rest_part = self.data[start:self._num_examples]
        idx0 = np.arange(0, self._num_examples)  # get all possible indexes
        np.random.shuffle(idx0)  # shuffle indexes
        self._data = self.data[idx0]  # get list of `num` random samples

        start = 0
        self._index_in_epoch = batch_size - rest_num_examples #avoid the case where the #sample != integar times of batch_size
        end =  self._index_in_epoch  
        data_new_part =  self._data[start:end]  
        return np.concatenate((data_rest_part, data_new_part), axis=0)
    else:
        self._index_in_epoch += batch_size
        end = self._index_in_epoch
        return self._data[start:end]

dataset = Dataset(np.arange(0, 10))
for i in range(10):
    print(dataset.next_batch(5))
```


### 本文地址

https://kaikai-sk.github.io/2020/01/BatchDatasetNextBatch/