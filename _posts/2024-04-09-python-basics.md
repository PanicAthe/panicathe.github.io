---
title: 01. Python basics
author: PanicAthe
date: 2024-04-09 18:00:00 +0900
categories: [Study]
tags: [데이터프로그래밍, Python]
toc: true
last_modified_at: 2024-04-15 18:00:00 +0900
---

### 01. Python 
Python does not require you to declare the type when defining variables.
In Python, variable names **cannot** start with a number, and cannot include hyphens or spaces. Where in other programming languages the indentation in code is for **readability** only, in Python, indentation is very **important**.


### 02. Python Comments
Comments start with a #, and Python will ignore them.
Python does not really have a syntax for multiline comments. To add a multiline comment you could insert a # for each line or use ctrl + /
Or, not quite as intended, Since **Python will ignore string literals that are not assigned to a variable**, you can use a multiline string.
```python
"""
태정태세비욘세
"""
print("Hello, World!")
```


### 03. Python Data Types
    
* Text Type: str
* Numeric Types: int, float, complex(복소수)
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

### 04. String
You can return a range of characters by using the slice syntax. specify the start index and the end index, separated by a colon, to return a part of the string.
```python
a = "Hello, World!" #or 'hello, World!'
print(a[2:5]) #return "llo"
print(a[:5])  #return "Hello"
```
Python has a set of built-in methods that you can use on strings.

* The upper() method returns the string in upper case
* The lower() method returns the string in lower case
* The strip() method removes any whitespace from the beginning or the end
* The replace() method replaces a specified phrase with another specified phrase.
* The split() method splits the string at a specified separator, and returns a list of substrings.

```python
a = " Hello, World! "
print(a.strip()) # returns "Hello, World!"
print(a.replace("H", "J")) #returns " Jello, World! "
print(a.split(",")) # returns [' Hello', ' World! ']
```
We can combine strings and numbers by using the format() method. The format() method takes the passed arguments, formats them, and places them in the string where the placeholders {} are:
```python
quantity = 3
itemno = 567
price = 49.95
myorder = "I want to pay {2} dollars for {0} pieces of item {1}."
print(myorder.format(quantity, itemno, price))
```

To concatenate, or combine, two strings you can use the + operator.
```python
a = "Hello"
b = "World"
c = a + " " + b
print(c)  #return "Hello World"
```

We can check the length and if a certain phrase or character is present in a string.
```python
print(len(a))
if "Hello" in a:
    print("Yes, 'Hello' is present.")
```


### 05. Operators
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
print(x ** y) # x^y

# 바닥 나눗셈, //
print(x // y) # ex) 3/2=1.5 , 3//2=1
```

### 06. List
A list is the Python equivalent of an array, but is resizable and can contain **changeable** elements of different types.
```python
#Create
xs = [3, 1, 2] # xs = list((3,1,2))
print(xs[-1])  #return 2
    
#Add
xs.append('bar') # xs.insert(3,'bar') or xs.extend(['bar'])
print(xs)      #return [3, 1, 2, 'bar']

#Remove
x = xs.pop()
print(x, xs)   #return bar [3, 1, 2]
xs.clear()
print(xs)  #return []
del xs #remove list xs

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
print(squares)  #return [0, 1, 4, 9, 16]
```

### 07. Tuple
Collection which is ordered and **unchangeable.**

```python
#Create
t = (1,2,3) # t = tuple((1,2,3))

#Add
temp = list(t) # t += ('bar', ) 
temp.append('bar')
t = tuple(temp) 
print(t) #return (1, 2, 3, 'bar')

#remove
temp = list(t)
temp.remove(1)
t = tuple(temp)
print(t) #return (2, 3, 'bar')
```

### 08. Set
Collection which is unordered, unchangeable, and **not indexed**(can access with a for loop).
```python
#Create
s = {1, 2, 3} # s = set((1, 2, 3))

#Add
s.add('bar') # s.update({'bar'})
print(s)     #return (1, 2, 3, 'bar')

#remove
s.remove(1)
s.discard(1) #no error
print(s)     #return (2, 3, 'bar')
s.pop()      #remove a random item
s.clear()    #empty the set
print(s)     #return set()
del s        #delete the set
```


### 09.  Dictionary
A dictionary stores (key, value) pairs
```python
d = {'cat': 'cute', 'dog': 'furry'} # d = dict(cat = 'cute', dog = 'furry')
print(d['cat']) #return 'cute'

#Access
print(d.get('cat'))
print(d.keys())
print(d.values())
print(d.items()) #All items
    
#Add 
d['fish'] = 'wet' #d.update({'fish':'wet'})

#Remove 
del d['fish'] #d.pop('fish')
d.clear()     #remove the dict

#Get an element with a default; prints "N/A" if not exists
print(d.get('monkey', 'N/A')) #return 'N/A'

d = {'person': 2, 'cat': 4, 'spider': 8}
#Loop over keys of the dictionary
for animal in d:
    legs = d[animal]
    print('A %s has %d legs' % (animal, legs))

#Loop over keys and values of the dictionary
for animal, legs in d.items():
    print('A %s has %d legs' % (animal, legs))
#Make a dictionary of key:squares of even numbers in the list
nums = [0, 1, 2, 3, 4]
even_num_to_square = {x: x ** 2 for x in nums if x % 2 == 0}
print(even_num_to_square) #return {0: 0, 2: 4, 4: 16}
```

### 10. Function
Python functions are defined using the def keyword.

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

def hello(name="jin", loud=False):
  if loud:
      print('HELLO, %s' % name.upper())
  else:
      print('Hello, %s!' % name)
hello('Bob')             #return 'Hello, Bob!'
hello('Fred', loud=True) #return 'HELLO, FRED'
hello()                  #return 'Hello, jin!'

def my_function(*args):
    for arg in args:
        print(arg)

```

In Python, prefixing a parameter name with an asterisk (\*) in a function definition means that the parameter can accept a variable number of positional arguments. This is known as "variable positional arguments" or "argument packing". Essentially, no matter how many positional arguments are passed to the function, they are bundled into a **tuple** and can be used within the function. Additionally, using a double asterisk(\*\*) in the function definition allows it to receive keyword arguments as a **dictionary**.


### 11. Object oriented programming

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def printname(self):
        print(self.name)

p1 = Person("Jin", 25)
print(p1.name) # return Jin
p1.printname()        # return Jin

class Student(Person): # Inheritance
    def __init__(self, name, age, year):
        super().__init__(name, age)
        self.graduationyear = year

s1 = Student("bin", 20)
s1.printname() #return bin
```