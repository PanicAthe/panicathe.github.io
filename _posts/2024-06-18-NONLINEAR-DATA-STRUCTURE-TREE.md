---
title: 비선형 자료구조(NonLinear Data Structure) 01. Tree
author: PanicAthe
date: 2024-06-18 18:00:00 +0900
categories: [Study]
tags: [자료구조, 트리, DFS, BFS]
toc: true
mermaid: true
math: true
last_modified_at: 2024-06-20 18:00:00 +0900
---

### 1. 트리(Tree)

- **트리**: 노드(node)와 간선(edge)으로 이루어진 계층적 자료 구조. 루트(root)에서 시작해 자식 노드로 연결되며, 부모-자식 관계를 가짐.
- **노드**: 트리의 기본 구성 요소. 데이터와 자식 노드들에 대한 참조를 가짐.
  - **루트 노드**: 트리의 최상위 노드.
  - **리프 노드**: 자식이 없는 노드.
  - **부모 노드**: 하나 이상의 자식 노드를 가진 노드.
  - **자식 노드**: 특정 부모 노드로부터 연결된 노드들.
  - **형제 노드**: 동일한 부모를 공유하는 노드들.

- **간선**: 노드 간의 연결. 부모-자식 관계를 나타냄.
- **높이**: 트리의 루트 노드에서 리프 노드까지의 가장 긴 경로의 길이.
- **깊이**: 루트 노드로부터 특정 노드까지의 경로 길이.
- **노드의 차수(Degree of a Node)**: 특정 노드가 가진 자식 노드의 개수.
- **트리의 차수(Degree of a Tree)**: 트리에서 모든 노드의 차수 중에서 최대값.

### 2. 트리의 종류

- **이진 트리(Binary Tree)**: 각 노드가 최대 두 개의 자식을 가질 수 있는 트리.
  - **포화 이진 트리(Perfect binary tree)**: 모든 레벨에서 노드들이 꽉 채워져 있는 트리
  - **완전 이진 트리(Complete Binary Tree)**: 마지막 레벨에서는 왼쪽부터 오른쪽으로 채워져 있는 트리
  - **정 이진 트리(Full Binary Tree)**: 모든 노드가 0개 또는 2개의 자식 노드를 가짐.
  - **편향 트리(Skewed Binary Tree)**: 사향 트리, 한쪽으로 치우친 트리 (눕힌 연결 리스트)
  - **균형 이진 트리(Balanced Binary Tree)**: 좌우 서브트리 높이 차이가 1이상 차이 나지 않는 트리
  - **이진 탐색 트리(Binary Search Tree, BST)**: 왼쪽 서브트리 노드는 루트보다 작고, 오른쪽 서브트리 노드는 루트보다 큰 트리.

- **AVL 트리(AVL Tree)**: 자가 균형 이진 탐색 트리. 모든 노드의 두 자식 트리 높이 차이가 1 이하.
- **레드-블랙 트리(Red-Black Tree)**: 자가 균형 이진 탐색 트리. 각 노드가 적색 또는 흑색으로 색칠되어 특정 규칙을 따름.
- **B-트리(B-Tree)**: 데이터베이스와 파일 시스템에서 사용하는 트리. 노드가 여러 자식을 가질 수 있음.

### 3. 트리의 순회 (Traversal)

#### **DFS (Depth-First Search)**

- **전위 순회 (Pre-order Traversal)**:
  - 순서: 루트 → 좌측 자식 → 우측 자식
  - 예제:  
    ```
            1
           / \
          2   3
         / \   \
        4   5   6
    ```
    - 전위 순회 결과: `1, 2, 4, 5, 3, 6`
  - 알고리즘:
    1. 현재 노드를 방문한다.
    2. 좌측 자식을 전위 순회한다.
    3. 우측 자식을 전위 순회한다.

- **중위 순회 (In-order Traversal)**:
  - 순서: 좌측 자식 → 루트 → 우측 자식
  - 예제:  
    ```
            1
           / \
          2   3
         / \   \
        4   5   6
    ```
    - 중위 순회 결과: `4, 2, 5, 1, 3, 6`
  - 알고리즘:
    1. 좌측 자식을 중위 순회한다.
    2. 현재 노드를 방문한다.
    3. 우측 자식을 중위 순회한다.

- **후위 순회 (Post-order Traversal)**:
  - 순서: 좌측 자식 → 우측 자식 → 루트
  - 예제:  
    ```
            1
           / \
          2   3
         / \   \
        4   5   6
    ```
    - 후위 순회 결과: `4, 5, 2, 6, 3, 1`
  - 알고리즘:
    1. 좌측 자식을 후위 순회한다.
    2. 우측 자식을 후위 순회한다.
    3. 현재 노드를 방문한다.

#### **BFS (Breadth-First Search)**

- **레벨 순회 (Level-order Traversal)**:
  - 순서: 각 레벨별로 좌측에서 우측으로 노드를 방문
  - 예제:  
    ```
            1
           / \
          2   3
         / \   \
        4   5   6
    ```
    - 레벨 순회 결과: `1, 2, 3, 4, 5, 6`
  - 알고리즘:
    1. 루트 노드에서 시작하여 같은 레벨의 노드들을 차례로 방문한다.
    2. 각 노드의 자식을 큐에 넣는다.
    3. 큐에서 노드를 꺼내어 방문하고, 자식을 다시 큐에 넣는다.


### 4. 기타

- **서브트리(Subtree)**: 트리의 일부로, 특정 노드를 루트로 하는 트리.
- **레벨(Level)**: 트리에서 같은 깊이를 가진 노드들.
- **경로(Path)**: 한 노드에서 다른 노드로 가는 노드들의 연속.
- 하나의 노드에서 다른 노드로 이동하는 경로는 유일
- 노드가 N개인 트리의 Edge의 수는 N-1개
- Acyclic(Cycle이 존재하지 않음)
- 포화 이진 트리의 높이가 h일 때, 노드의 개수는 \\( 2^{h+1} - 1 \\)개
- 포화(or 완전) 이진 트리의 노드가 N개 일 때, 높이는 \\(logN\\)
- 이진 트리의 노드가 N개 일 때, 최대 가능 높이는 N
  

### 5. 트리 예시와 해석

```
        15
       /  \
     10   20
    /  \   / \
   8   12 17 25
```

- **루트 노드**: 15
- **리프 노드**: 8, 12, 17, 25
- **부모-자식 관계**: 15 → 10, 20 / 10 → 8, 12 / 20 → 17, 25
- **높이**: 2 (루트 노드에서 리프 노드 8까지의 경로 길이)
- **깊이**: 1 (노드 10의 깊이)

### 6. 자바에서 구현
```
        1
       / \
      2   3
     / \   \
    4   5   6
```
- 배열을 활용
- 루트 노드: 배열의 인덱스 0
- 왼쪽 자식: 인덱스 i의 왼쪽 자식은 2*i + 1 
- 오른쪽 자식: 인덱스 i의 오른쪽 자식은 2*i + 2 
- 부모: 인덱스 i의 부모는 (i-1)/2 
```java
public class ArrayBinaryTree {
    private int[] tree; // 배열로 트리 저장
    private int size; // 현재 트리의 크기

    // 생성자
    public ArrayBinaryTree(int capacity) {
        tree = new int[capacity];
        size = 0;
    }

    // 노드 삽입
    public void insert(int value) {
        if (size < tree.length) {
            tree[size++] = value;
        } else {
            System.out.println("트리가 가득 찼습니다.");
        }
    }

    // 전위 순회
    public void preOrderTraversal(int index) {
        if (index >= size) {
            return;
        }

        // 현재 노드 출력
        System.out.print(tree[index] + " ");

        // 왼쪽 자식 순회: 2 * index + 1
        preOrderTraversal(2 * index + 1);

        // 오른쪽 자식 순회: 2 * index + 2
        preOrderTraversal(2 * index + 2);
    }

    public static void main(String[] args) {
        ArrayBinaryTree tree = new ArrayBinaryTree(10);

        // 노드 삽입
        tree.insert(1); // 루트
        tree.insert(2); // 루트의 왼쪽 자식
        tree.insert(3); // 루트의 오른쪽 자식
        tree.insert(4); // 2의 왼쪽 자식
        tree.insert(5); // 2의 오른쪽 자식
        tree.insert(6); // 3의 오른쪽 자식

        // 전위 순회 실행
        System.out.print("전위 순회: ");
        tree.preOrderTraversal(0); // 루트 인덱스에서 시작
        //결과 -> 전위 순회: 1 2 4 5 3 6 

    }
}
```

