---
title: 03. Pandas
author: PanicAthe
date: 2024-04-15 18:00:00 +0900
categories: [Study]
tags: [Python]
toc: true
last_modified_at: 2024-04-16 16:00:00 +0900
---

**Pan**el **Da**ta

### Series

```python
import numpy as np
import pandas as pd

obj = pd.Series([1, "John", 3.5, "Hey"],index=["a", "b", "c", "d"])

print(obj)
#a       1
#b    John
#c     3.5
#d     Hey
#dtype: object
print(obj["b"])   #John
print(obj.values)  #[1 'John' 3.5 'Hey']
print(obj.index) # Index(['a', 'b', 'c', 'd'], dtype='object')


score = {"Jane": 90,
         "Bill": 80,
         "Elon": 75}

# Convert the given dictionary to Series
names = pd.Series(score, index=["Jane","Bill","d","Elon"])

print(names)
#Jane    90.0
#Bill    80.0
#d        NaN
#Elon    75.0
#dtype: float64

print(names["Bill"])   #80

# Change a score of whom is lower than 80 to 83
names[names <= 80] = 83
print(names)
#Jane    90
#Bill    83
#d       NaN
#Elon    83
#dtype: float64

names[names>names.median()]
names[[2,1]]
np.exp(names)

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

df["pass"] = df.socre > 80  #Add column

# Append gender and age column on the given data and
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

#Functions#
# df.sum()
# df.cumsum() - 누적 합
# df.mena()
# df.idmax()
# df.head() - 첫 5개 행
# df.tail() - 마지막 5개 행
# df.shape - 행과 열의 개수를 튜플로 (행수, 열수)
# df.info() - 기본 정보를 출력
# df.index 
# df.columns 
# df.describe() - 요약 통계를 반환. 평균값, 표준편차, 최소값, 최대값 등.
# df.nunique() - 각 열의 고유한 값의 수

#Indexing#
# df.loc[] - 열 이름을 매개변수로
# df.iloc[] - 행, 열의 순서(index)를 매개변수로
# df[열 이름]

#With Missing Data#
# df.isna() - 각 셀이 결측치인지 여부를 boolean으로 반환
# df.dropna() - 결측치를 포함하는 행 또는 열을 제거
# df.fillna(값) - 결측치를 특정 값 또는 방법으로 채움
```

