---
title: 02. Numpy
author: PanicAthe
date: 2024-04-10 18:00:00 +0900
categories: [Study]
tags: [데이터프로그래밍, Python]
last_modified_at: 2024-04-15 18:00:00 +0900
toc: true
---

**Num**erical **Py**thon
The array object in NumPy is called **ndarray**.
We can create a NumPy ndarray object by using the **array()** function.

```python
import numpy as np
print(np.__version__)

arr = np.array([1, 2, 3, 4, 5], dtype=np.int8)
print(type(arr))  #return <class 'numpy.ndarray'>

#0-D arrays, or Scalars, are the elements in an array.
arr = np.array(42)

#1-D array
np.arange(5) 
# array([0, 1, 2, 3, 4])
np.arange(2, 10, dtype=float) 
# array([2., 3., 4., 5., 6., 7., 8., 9.])
np.arange(2, 3, 0.1) 
# array([2. , 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9])
np.linspace(1., 4., 6) 
# array([1. , 1.6, 2.2, 2.8, 3.4, 4. ])

#2-D array
np.eye(3) 
# array([[1., 0., 0.], [0., 1., 0.], [0., 0., 1.]])
np.diag([1, 5, 3]) 
# array([[1, 0, 0], [0, 5, 0], [0, 0, 3]])
a = np.array([[1, 2], [3, 4]]) 
np.diag(a) #return array([1, 4])

#An array that has 2-D arrays (matrices) as its elements is called 3-D array.
arr = np.array([[[1, 2, 3], [4, 5, 6]], [[1, 2, 3], [4, 5, 6]]])
```


### Array creation routines

```python
# Create an 2-by-2 array of all zeros
a = np.zeros((2,2), dtype=np.int8)

# Create an 2-by-2 array of all ones
a = np.ones((2,2))

# Create an 2-by-2 array with random numbers
a = np.random.random((2,2))
a = np.random.rand(2, 2)

# Create an 1-by-6 array with elements 1 to 6
a = np.array([1, 2, 3, 4, 5, 6])
a = np.arange(1, 7)
print(a.shape)   #return (6,)

# Create a two rows array with elements 1 to 6
b = np.array([[1,2,3],[4,5,6]])
b = np.arange(1, 7).reshape((2, 3))

#  Create an array of zeros with the same shape and type as b
c = np.zeros_like(b)
d = np.ones_like(b)

# Create a new array of 2*5 uints, filled with 6.
a = np.full((2, 5), 6)
b = np.ones([2, 5], dtype=np.int8) * 6
```


### Array from existing data
```python

x = [1, 2]
x = np.asarray(x)   #Convert it into an array

#Convert it into an array of float
y = np.asarray(x, dtype=float)
x = np.asfarray(x)
print(type(x[0]))   #return <class 'numpy.float64'>

x = np.array([[1, 2], [3, 4]])
x = np.asmatrix(x)  #Convert it into a matrix

#Convert it into scalar of its single element
x = np.array([30])
x = x.item()    
```

### Array indexing
```python

#first 2 rows and columns 1 and 2
a = np.arange(1,13).reshape(3,4)
b = a[:2, 1:3]  #[[2 3], [6 7]]

# From an array, print all rows which sum up to less or equal two
x = np.array([[0, 1], [1, 1], [2, 2]])
rowsum = x.sum(-1)  #[1 2 4]
print(x[rowsum <= 2, :]) #[[0 1], [1 1]]
```

### Array math
```python
x = np.array([[1,2], [3,4]], dtype=np.float64)
y = np.array([[5,6], [7,8]], dtype=np.float64)

# Compute sum of all elements in x
z = np.sum(x)           #10.0
# Compute sum of each column in x;
z = np.sum(x, axis=0)   #[4. 6.]
# Compute sum of each row in x
z = np.sum(x, axis=1)   #[3. 7.]
# Elementwise product of x and y
z = x * y         #[[ 5. 12.], [21. 32.]]
# Matrix product of x and y
z = np.dot(x, y)  #[[19. 22.],[43. 50.]]
```

### Broadcasting
The term broadcasting refers to the ability of NumPy to treat arrays with different dimensions during arithmetic operations.

```python
x = np.array([[1,2,3],
              [4,5,6],
              [7,8,9],
              [10, 11, 12]]) # 4 x 3
v = np.array([1, 0, 1])      # 1 x 3

# Add the vector v to each row of the matrix x with an explicit loop
y = np.empty_like(x)  #"랜덤"보다는 "미정의"
for i in range(4):
    y[i, :] = x[i, :] + v   #x의 i번째 행 + v

#Stacking v multiple times
vv = np.tile(v, (4, 1))
#[[1 0 1]
# [1 0 1]
# [1 0 1]
# [1 0 1]]

print(y) # = print(x+v) = print(x+vv)
#[[ 2  2  4]
# [ 5  5  7]
# [ 8  8 10]
# [11 11 13]]
```