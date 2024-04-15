---
title: 03. Pandas
author: PanicAthe
date: 2024-04-15 18:00:00 +0900
categories: [Study]
tags: [데이터프로그래밍, Python]
toc: true
---


### Series

```python
import numpy as np
import pandas as pd

# Create a Series with [1, "John", 3.5, "Hey"]
obj = pd.Series([1, "John", 3.5, "Hey"])

print(obj)
#0       1
#1    John
#2     3.5
#3     Hey
#dtype: object

print(obj.values)  #[1 'John' 3.5 'Hey']

obj2 = pd.Series([1, "John", 3.5, "Hey"],index=["a", "b", "c", "d"])

print(obj2)
#a       1
#b    John
#c     3.5
#d     Hey
#dtype: object
print(obj2["b"])   #John
print(obj2.index) # Index(['a', 'b', 'c', 'd'], dtype='object')


score = {"Jane": 90,
         "Bill": 80,
         "Elon": 85,
         "Tom": 75,
         "Tim": 95}

# Convert the given dictionary to Series
names = pd.Series(score)

print(names)
#Jane    90
#Bill      80
#Elon    85
#Tom    75
#Tim     95
#dtype: int64

print(names["Tom"])   #75

# Change a score of whom is lower than 80 to 83
names[names <= 80] = 83
print(names)
#Jane    90
#Bill      83
#Elon    85
#Tom    83
#Tim     95
#dtype: int64
```


### DataFrame
```python
data={"name": ["Bill", "Tom", "Tim", "John", "Alex", "Vanessa", "Kate"],
      "score": [90, 80, 85, 75, 95, 60, 65],
      "sport": ["Wrestling", "Football", "Skiing", "Swimming", "Tennis",
               "Karete", "Surfing"],
      "sex":["M", "M", "M", "M", "F", "F", "F"]}

# Create a DataFrame using the given data
df = pd.DataFrame(data)

# Create a DataFrame with explicit columns
# 해당 열의 데이터를 모두 포함해서 작성한 순서대로 index 바뀜.
df = pd.DataFrame(data, columns=["name", "sport", "sex", "score"])
print(df)

#      name      sport sex  score
#0     Bill  Wrestling   M     90
#1      Tom   Football   M     80
#2      Tim     Skiing   M     85
#3     John   Swimming   M     75
#4     Alex     Tennis   F     95
#5  Vanessa     Karete   F     60
#6     Kate    Surfing   F     65

# Print the first five rows
print(df.head())       #df.tail()은 last five rows

# Append gender adn age column on the given data and
# designate the index as ["one", "two", "three", "four", "five", "six", "seven"]
df = pd.DataFrame(data, columns=["name", "sport", "gender", "score", "age"],
                index=["one", "two", "three", "four", "five", "six", "seven"])

#          name      sport gender  score  age
#one       Bill  Wrestling    NaN     90  NaN
#two        Tom   Football    NaN     80  NaN
#three      Tim     Skiing    NaN     85  NaN
#four      John   Swimming    NaN     75  NaN
#five      Alex     Tennis    NaN     95  NaN
#six    Vanessa     Karete    NaN     60  NaN
#seven     Kate    Surfing    NaN     65  NaN
```

