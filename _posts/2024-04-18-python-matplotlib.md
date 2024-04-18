---
title: 04. Matplotlib
author: PanicAthe
date: 2024-04-18 17:00:00 +0900
categories: [Study]
tags: [데이터프로그래밍, Python]
toc: true
---

### Matplotlib
```python
import numpy as np
import matplotlib.pyplot as plt

%matplotlib inline

#x와 y의 리스트 크기는 동일해야 함.
x=np.array([0,1,6,8])
y=np.array([0,3,8,10])
plt.plot(x,y)
plt.show()

plt.plot(y)
plt.show()

colors = np.array(["red","black","pink","purple"])
plt.sactter(x, y, c=colors)
plt.show()

plt.bar(x, y)
plt.show()

x=np.random.normal(170, 10, 250)
plt.hist(x)
plt.show()

x = np.arange(0, 3 * np.pi, 0.3)
y_sin = np.sin(x)
y_cos = np.cos(x)
# Plot the points using matplotlib
plt.plot(x, y_sin, 'o-', color='b')
plt.plot(x, y_cos)
plt.xlabel('x axis label')
plt.ylabel('y axis label')
plt.title('Sine and Cosine')
plt.legend(['Sine', 'Cosine'])
# Set up a subplot grid that has height 2 and width 1,
# and set the first such subplot as active, and make the first plot.
plt.subplot(2, 1, 1)
plt.plot(x, y_sin, 'o-', color='b')
plt.title('Sine')
# Set the second subplot as active, and make the second plot.
plt.subplot(2, 1, 2)
plt.plot(x, y_cos)
plt.title('Cosine')
# Show the figure.
plt.suptitle("Sine and Cosine")
plt.show()


```
### Plotting images with Matplotlib
```Python
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image

path = './image.jpg'
img = Image.open(path)
img = np.asarray(img)
print(img.shape) #return (x, x, 3) 3은 컬러 채널 의미.
imgplot = plt.imshow(img)

lum_img = img[:, :, 2]   #이미지의 파란색(B) 채널만 추출
plt.imshow(lum_img)

plt.imshow(lum_img, cmap='hot') #‘hot’ 색상 맵을 적용

# Color scale reference
imgplot = plt.imshow(lum_img) 
plt.colorbar()

# Examining a specific data range
plt.hist(lum_img.ravel(), bins=range(256))
#모든 픽셀 값을 1차원 배열로 변환, 값의 분포를 0부터 255까지의 구간으로 나타냄

img.thumbnail((64, 64))  #64x64 픽셀로 축소
img_thum = plt.imshow(img)

imgplot = plt.imshow(img, interpolation="bilinear") #픽셀 간을 부드럽게
```

