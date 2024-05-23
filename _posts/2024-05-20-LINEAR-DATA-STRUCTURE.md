---
title: 선형 자료구조(Linear Data Structure)
author: PanicAthe
date: 2024-05-20 18:00:00 +0900
categories: [Study]
tags: [자료구조]
toc: true
last_modified_at: 2024-05-23 18:00:00 +0900
---
### 01. 배열(Array)
- 각 데이터와 인덱스가 1:1 대응
- 데이터가 메모리 상에 연속적으로 저장
- **최대 길이를 정해서 생성**
  
```java
import java.util.List;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        // List 인터페이스 타입의 ArrayList 객체 생성
        List<String> list = new ArrayList<>();

        // 요소 추가
        list.add("Apple");
        list.add("Banana");
        list.add("Cherry");

        // 특정 위치에 요소 추가
        list.add(1, "Orange");

        // 요소 접근
        System.out.println("Element at index 1: " + list.get(1));

        // 요소 변경
        list.set(2, "Grapes");

        // 리스트 출력
        System.out.println("List: " + list);

        // 요소 제거
        list.remove(3);

        // 리스트 크기 확인
        System.out.println("Size of list: " + list.size());

        // 리스트가 비어 있는지 확인
        System.out.println("Is list empty? " + list.isEmpty());

        // 특정 요소가 포함되어 있는지 확인
        System.out.println("Contains 'Apple'? " + list.contains("Apple"));
    }
}

```

### 02. 연결 리스트(LinkedList)
- 데이터 공간을 미리 할당할 필요 없음, 리스트 길이가 가변적
- 자료의 순서는 정해져있지만 메모리상 연속성이 보장되지는 않음
- 노드(Node) 데이터 저장 단위(값과 다음 노드를 가르킬 포인터)

```java
import java.util.LinkedList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // LinkedList 생성
        LinkedList<String> linkedList = new LinkedList<>();

        // 요소 추가
        linkedList.add("Apple");
        linkedList.add("Banana");
        linkedList.add("Cherry");

        // 특정 위치에 요소 추가
        linkedList.add(1, "Orange");
        System.out.println("LinkedList after adding elements: " + linkedList);

        // 첫 번째와 마지막에 요소 추가
        linkedList.addFirst("First");
        linkedList.addLast("Last");
        System.out.println("LinkedList after addFirst and addLast: " + linkedList);

        // 요소 접근
        System.out.println("Element at index 1: " + linkedList.get(1));

        // 요소 변경
        linkedList.set(2, "Grapes");
        System.out.println("LinkedList after set: " + linkedList);

        // 첫 번째와 마지막 요소 제거
        linkedList.removeFirst();
        linkedList.removeLast();
        System.out.println("LinkedList after removeFirst and removeLast: " + linkedList);

        // 특정 위치의 요소 제거
        linkedList.remove(1);
        System.out.println("LinkedList after remove index 1: " + linkedList);

        // 특정 객체 제거
        linkedList.remove("Cherry");
        System.out.println("LinkedList after removing 'Cherry': " + linkedList);

        // 리스트 크기 확인
        System.out.println("Size of linkedList: " + linkedList.size());

        // 리스트가 비어 있는지 확인
        System.out.println("Is linkedList empty? " + linkedList.isEmpty());

        // 특정 요소가 포함되어 있는지 확인
        System.out.println("Contains 'Apple'? " + linkedList.contains("Apple"));

        // 리스트의 모든 요소 제거
        linkedList.clear();
        System.out.println("LinkedList after clear: " + linkedList);
    }
}

```

### 03. 스택(Stack)
- 후입선출(Last In First Out; LIFO)
- 데이터가 입력된 순서의 역순으로 처리되어야 할 때 사용
- Push, Pop, Peek, IsEmpty, IsFull: O(1)
- Search: O(n)

```java

import java.util.Stack;

public class Main {

    public static void main(String[] args) {
        // 스택 생성
        Stack<Integer> stack = new Stack<>();
        
        // push: 스택에 원소 추가
        stack.push(10);
        stack.push(20);
        stack.push(30);
        
        // 현재 스택 상태 출력
        System.out.println("스택: " + stack);  // 출력: 스택: [10, 20, 30]
        
        // peek: 스택의 가장 위의 원소 확인 (제거하지 않음)
        System.out.println("peek: " + stack.peek());  // 출력: peek: 30
        
        // pop: 스택의 가장 위의 원소 제거 및 반환
        System.out.println("pop: " + stack.pop());    // 출력: pop: 30
        
        // 현재 스택 상태 출력
        System.out.println("스택: " + stack);  // 출력: 스택: [10, 20]
        
        // isEmpty: 스택이 비어있는지 확인
        System.out.println("isEmpty: " + stack.isEmpty());  // 출력: isEmpty: false
        
        // search: 스택에서 특정 원소의 위치를 검색 (1부터 시작, 없으면 -1 반환)
        System.out.println("search 20: " + stack.search(20));  // 출력: search 20: 1
    }
}
```

- 스택 직접 구현

```java
public class CustomStack {
    private int maxSize;
    private int[] stackArray;
    private int top;

    // 생성자
    public CustomStack(int size) {
        this.maxSize = size;
        this.stackArray = new int[size];
        this.top = -1; // 초기에는 스택이 비어있음
    }

    // push: 스택에 원소 추가
    public void push(int value) {
        if (isFull()) {
            System.out.println("스택이 가득 찼습니다.");
        } else {
            stackArray[++top] = value;
            System.out.println("push: " + value);
        }
    }

    // pop: 스택의 가장 위의 원소 제거 및 반환
    public int pop() {
        if (isEmpty()) {
            System.out.println("스택이 비어 있습니다.");
            return -1;
        } else {
            return stackArray[top--];
        }
    }

    // peek: 스택의 가장 위의 원소 확인 (제거하지 않음)
    public int peek() {
        if (isEmpty()) {
            System.out.println("스택이 비어 있습니다.");
            return -1;
        } else {
            return stackArray[top];
        }
    }

    // isEmpty: 스택이 비어있는지 확인
    public boolean isEmpty() {
        return (top == -1);
    }

    // isFull: 스택이 가득 찼는지 확인
    public boolean isFull() {
        return (top == maxSize - 1);
    }

    // size: 스택의 현재 크기 반환
    public int size() {
        return top + 1;
    }

    // 출력: 스택의 모든 원소 출력
    public void printStack() {
        if (isEmpty()) {
            System.out.println("스택이 비어 있습니다.");
        } else {
            System.out.print("스택: ");
            for (int i = 0; i <= top; i++) {
                System.out.print(stackArray[i] + " ");
            }
            System.out.println();
        }
    }
}
```
- [연습문제 : 25556번 포스택](http://boj.kr/4615e81e5f324c0daeffcfd196091604)
    스택에 수(x)를 넣을 때마다 x보다 작은 수가 있거나 비어있는지 확인해가면서 push하는 방식으로 해결.


### 04. 큐(Queue)
- 선입선출(First In First Out; FIFO)
- 입력 순서대로 데이터 처리가 필요할 때 사용
- Enqueue, Dequeue, Peek, IsEmpty, IsFull: O(1)
- Search: O(n)

```java
import java.util.LinkedList;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        // Queue 생성
        Queue<Integer> queue = new LinkedList<>();

        // add(E e): 큐의 머리에 요소 추가
        queue.add(10);
        queue.add(20);
        queue.add(30);
        System.out.println("Queue after add: " + queue);

        // offer(E e): 큐의 꼬리에 요소 추가
        queue.offer(40);
        queue.offer(50);
        System.out.println("Queue after offer: " + queue);

        // 큐 출력
        System.out.println("Queue: " + queue);

        // 요소 제거 (dequeue)
        int removedElement = queue.remove();
        System.out.println("Removed Element: " + removedElement);

        // 큐의 첫 번째 요소 확인 (peek)
        int head = queue.peek();
        System.out.println("Head of Queue: " + head);

        // 큐가 비어있는지 확인
        boolean isEmpty = queue.isEmpty();
        System.out.println("Is Queue Empty?: " + isEmpty);

        // 큐의 크기 확인
        int size = queue.size();
        System.out.println("Size of Queue: " + size);
    }
}

```


- 구현해서 사용
  
```java
class CustomQueue {
    private int maxSize;
    private int[] queueArray;
    private int front;
    private int rear;
    private int nItems;

    // 생성자
    public CustomQueue(int size) {
        this.maxSize = size;
        this.queueArray = new int[size];
        this.front = 0; //머리쪽
        this.rear = -1; //꼬리쪽
        this.nItems = 0;
    }

    // 큐가 비어있는지 확인
    public boolean isEmpty() {
        return (nItems == 0);
    }

    // 큐가 가득 찼는지 확인
    public boolean isFull() {
        return (nItems == maxSize);
    }

    // 요소 추가 (enqueue)
    public void enqueue(int value) {
        if (isFull()) {
            System.out.println("큐가 가득 찼습니다.");
        } else {
            if (rear == maxSize - 1) { //원형 큐
                rear = -1;
            }
            queueArray[++rear] = value;
            nItems++;
        }
    }

    // 요소 제거 (dequeue)
    public int dequeue() {
        if (isEmpty()) {
            System.out.println("큐가 비어 있습니다.");
            return -1;
        } else {
            int temp = queueArray[front++]; //요소 제거 front++
            if (front == maxSize) { //원형 큐
                front = 0;
            }
            nItems--;
            return temp;
        }
    }

    // 큐의 첫 번째 요소 확인 (peek)
    public int peek() {
        if (isEmpty()) {
            System.out.println("큐가 비어 있습니다.");
            return -1;
        } else {
            return queueArray[front];
        }
    }

    // 큐의 크기 확인
    public int size() {
        return nItems;
    }

    // 큐 출력
    public void printQueue() {
        System.out.print("Queue: ");
        for (int i = 0; i < nItems; i++) {
            int index = (front + i) % maxSize;
            System.out.print(queueArray[index] + " ");
        }
        System.out.println();
    }
}
```

### 05. 덱(Deque)

- 양방향에서 삽입, 삭제가 가능한 구조
- 한 쪽 입력을 제한하면 Scroll
- 한 쪽 출력을 제한하면 Shelf

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static void main(String[] args) {
        // Deque 생성
        Deque<Integer> deque = new ArrayDeque<>();

        // addFirst(E e)와 addLast(E e) 사용
        deque.addFirst(10);
        deque.addLast(20);
        deque.addFirst(5);
        System.out.println("Deque after addFirst and addLast: " + deque);

        // removeFirst()와 removeLast() 사용
        int first = deque.removeFirst();
        int last = deque.removeLast();
        System.out.println("Removed first: " + first);
        System.out.println("Removed last: " + last);
        System.out.println("Deque after removeFirst and removeLast: " + deque);

        // offerFirst(E e)와 offerLast(E e) 사용
        deque.offerFirst(15);
        deque.offerLast(25);
        System.out.println("Deque after offerFirst and offerLast: " + deque);

        // pollFirst()와 pollLast() 사용
        first = deque.pollFirst();
        last = deque.pollLast();
        System.out.println("Polled first: " + first);
        System.out.println("Polled last: " + last);
        System.out.println("Deque after pollFirst and pollLast: " + deque);

        // getFirst()와 getLast() 사용
        deque.addFirst(30);
        deque.addLast(40);
        int firstElement = deque.getFirst();
        int lastElement = deque.getLast();
        System.out.println("First element: " + firstElement);
        System.out.println("Last element: " + lastElement);
        System.out.println("Deque after getFirst and getLast: " + deque);

        // peekFirst()와 peekLast() 사용
        int peekFirst = deque.peekFirst();
        int peekLast = deque.peekLast();
        System.out.println("Peek first: " + peekFirst);
        System.out.println("Peek last: " + peekLast);
        System.out.println("Deque after peekFirst and peekLast: " + deque);

        // 2의 현재 위치를 찾기 위해 Iterator 사용
        int pos = 0;
        for (int val : deque) {
            if (val == 2) {
                break;
            }
            pos++;
        }
    }
}
```
- [연습문제 : 1021번 - 회전하는 큐](http://boj.kr/cfec250567ce4c029b52818ecdd8be59)


### 06. 해시 테이블
- 키, 값을 대응시켜 저장
- 해싱: 키를 특정 계산식에 넣어 나온 결과를 사용하여 값에 접근하는 과정
- 키: 해시 테이블 접근을 위한 입력 값
- 해시 함수: 키를 해시 값으로 매핑하는 연산
- 해시 값: 해시 테이블의 인덱스
- 해시 테이블: 키-값을 연관시켜 저장하는 데이터 구조
  
  키 --(해시 함수)--> 해시 값 -> 해시 테이블
