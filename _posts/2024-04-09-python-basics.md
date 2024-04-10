---
title: 01. Python basics
author: PanicAthe
date: 2024-04-09 18:00:00 +0900
categories: [Study]
tags: [데이터프로그래밍, Python]
toc: true
---

### 1. Python Indentation
Where in other programming languages the indentation in code is for **readability** only, the indentation in Python is very **important**.


### 2. Python Comments
Comments starts with a #, and Python will ignore them.
Python does not really have a syntax for multiline comments. To add a multiline comment you could insert a # for each line or use ctrl + /
Or, not quite as intended, you can use a multiline string. Since Python will ignore string literals that are not assigned to a variable, you can add a multiline string (triple quotes) in your code, and place your comment inside it.
```python
"""
태정태세비욘세
"""
print("Hello, World!")
```


### 3. Python Data Types
    
* Text Type: str
* Numeric Types: int, float, complex
* Sequence Types: list, tuple, range
* Mapping Type: dict
* Set Types: set, frozenset
* Boolean Type: bool
* Binary Types: bytes, bytearray, memoryview
* None Type: NoneType
  
```python
x = str(3)    # x will be '3'
y = int(3)    # y will be 3
z = float(3)  # z will be 3.0
```

### 4. String
You can return a range of characters by using the slice syntax. specify the start index and the end index, separated by a colon, to return a part of the string.
```python
a = "Hello, World!"
print(a[2:5]) #return "llo"
print(a[:5])  #return "Hello"
```
Python has a set of built-in methods that you can use on strings.

* The upper() method returns the string in upper case
* The lower() method returns the string in lower case
* The strip() method removes any whitespace from the beginning or the end

```python
a = " Hello, World! "
print(a.strip()) # returns "Hello, World!"
```
To concatenate, or combine, two strings you can use the + operator.
```python
a = "Hello"
b = "World"
c = a + " " + b
print(c)  #return "Hello Wrold"
```

We can combine strings and numbers by using the format() method. The format() method takes the passed arguments, formats them, and places them in the string where the placeholders {} are:
```python
quantity = 3
itemno = 567
price = 49.95
myorder = "I want to pay {2} dollars for {0} pieces of item {1}."
print(myorder.format(quantity, itemno, price))
```

### 5. Operators
```python
x = 5
y = 3

# 덧셈, +
print(x + y)

# 뺄셈, -
print(x - y)

# 곱하기, *
print(x * y)

# 나누기, /
print(x / y)

# 나머지, %
print(x % y)

# 거듭제곱, **
print(x ** y)

# 바닥 나눗셈, //
print(x // y) # 바닥 나눗셈 // 는 결과를 가장 가까운 정수로 내림합니다.
```

### 6. List
A list is the Python equivalent of an array, but is resizeable and can contain elements of different types
```python
xs = [3, 1, 2]
print(xs[-1])  #return 2
    
xs.append('bar')
print(xs)      #return [3, 1, 2, 'bar']

x = xs.pop()
print(x, xs)   #return bar [3, 1, 2]

nums = list(range(5))
print(nums)    #return [0, 1, 2, 3, 4]

nums[2:4] = [8, 9]
print(nums)    #return [0, 1, 8, 9, 4]

animals = ['cat', 'dog', 'monkey']
# Loop over and print the index and value of each elements of the list:
for idx, animal in enumerate(animals):
    print('#%d: %s' % (idx + 1, animal))

nums = [0, 1, 2, 3, 4]
# Make this code simpler using a list comprehension
squares = [x ** 2 for x in nums]
print(squares)  #retrun [0, 1, 4, 9, 16]
```

### 7.  Dictionary
A dictionary stores (key, value) pairs
 ```python
d = {'cat': 'cute', 'dog': 'furry'}
print(d['cat'])  #return 'cute'
    
# Add another key:value pair
d['fish'] = 'wet'
# Remove 'fish' from the dictionary
del d['fish']

# Get an element with a default; prints "N/A" if not exists
print(d.get('monkey', 'N/A')) #return 'N/A'

d = {'person': 2, 'cat': 4, 'spider': 8}

# Loop over keys of the dictionary
# Access the values with the keys
for animal in d:
    legs = d[animal]
    print('A %s has %d legs' % (animal, legs))

# Loop over keys and values of the dictionary
for animal, legs in d.items():
    print('A %s has %d legs' % (animal, legs))

# Make a dictionary of key:squares of even numbers in the list
nums = [0, 1, 2, 3, 4]
even_num_to_square = {x: x ** 2 for x in nums if x % 2 == 0}
print(even_num_to_square) #return {0: 0, 2: 4, 4: 16}

```

### 8. Function
Python functions are defined using the def keyword
```python
def sign(x):
if x > 0:
    return 'positive'
elif x < 0:
    return 'negative'
else:
    return 'zero'

for x in [-1, 0, 1]:
print(sign(x)) 


def hello(name, loud=False):
if loud:
    print('HELLO, %s' % name.upper())
else:
    print('Hello, %s!' % name)

hello('Bob')             #return 'Hello, Bob!'
hello('Fred', loud=True) #return 'HELLO, FRED'

```