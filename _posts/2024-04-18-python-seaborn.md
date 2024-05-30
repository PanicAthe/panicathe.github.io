---
title: 05. Seaborn
author: PanicAthe
date: 2024-04-18 17:00:00 +0900
categories: [Study]
tags: [Python]
toc: true
---

### Seaborn
```python
import seaborn as sns
import pandas as pd

#https://www.kaggle.com/code/gkhan496/visualizing-pok-mon-stats-with-seaborn-hw/input
df = pd.read_csv('./Pokemon.csv', index_col=0)
df.sample(6)

# barplot
plt.figure(figsize=(10,8))
sns.lmplot(x='Attack', y='Defense', data=df, hue='Type 1')
#hue는 구분자
plt.ylim(0,None)

# boxplot
plt.figure(figsize=(10, 8))
stats_df = df.drop(['Total', 'Generation','Legendary'], axis=1) # drop columns
sns.boxplot(data=stats_df)

# violin plot
sns.set_style('white')
plt.figure(figsize=(12, 8))
sns.violinplot(x='Type 1', y='Attack', data=df)

# Correlation
stats_df = df.drop(['Name', 'Type 1', 'Type 2'], axis=1)
corr = stats_df.corr()  #관련성
# heatmap
sns.heatmap(corr)

# histogram
sns.distplot(df.Attack)

# countplot
sns.countplot(x='Generation', data=df)
#sns.countplot(x='Type 1', data=df)
plt.xticks(rotation=-45) # Rotate x 눈금-labels
```

