---
title: 비선형 자료구조(NonLinear Data Structure) 02. Graph
author: PanicAthe
date: 2024-06-24 18:00:00 +0900
categories: [Study]
tags: [자료구조, 그래프]
toc: true
mermaid: true
math: true
last_modified_at: 2024-06-24 18:00:00 +0900
---

### 01. 그래프

- **정점(Vertex)**: 그래프의 기본 요소로, 데이터를 저장하는 노드. 각 정점은 고유한 식별자(라벨)를 가진다.

- **간선(Edge)**: 정점들을 연결하는 선으로, 두 정점 사이의 관계를 나타냅니다. 간선은 방향성이 있는 경우도 있고 없는 경우도 있다.

- **방향 그래프(Directed Graph)** vs **무방향 그래프(Undirected Graph)**:
   - **방향 그래프**: 간선에 방향이 있는 그래프로, 한 정점에서 다른 정점으로의 방향성이 있는 간선.
   - **무방향 그래프**: 간선에 방향이 없는 그래프로, 간선이 양쪽 방향으로 연결.

- **가중치(Weight)**: 간선에 할당된 값으로, 그래프에서 경로의 비용이나 거리를 나타내는 데 사용.

- **인접 정점(Adjacent Vertices)**: 간선으로 직접 연결된 정점들을 의미. 예를 들어, 정점 A와 B가 간선으로 연결되어 있다면, A와 B는 서로 인접한 정점.

- **정점의 차수(Degree of a Vertex)**: 무방향 그래프에서는 한 정점에 연결된 간선의 수를 말하며, 방향 그래프에서는 진입 차수(In-degree)와 진출 차수(Out-degree)로 나뉨. 
   - **진입 차수(In-degree)**: 특정 정점으로 들어오는 간선의 수.
   - **진출 차수(Out-degree)**: 특정 정점에서 나가는 간선의 수.
   - 무방향 그래프에서 모든 정점 차수의 합 = 간선의 수 2배

### 02. 그래프의 종류

- **트리(Tree)**: 사이클이 없는 연결된 무방향 그래프. n개의 정점과 n-1개의 간선을 가진다. 트리는 계층적인 관계를 표현할 때 유용하게 사용.
  
- **방향 그래프(Directed Graph)**: 간선에 방향이 있는 그래프로, 각 간선에는 방향성 존재. 데이터의 흐름이나 의존 관계를 나타내는 데 유용.
  
- **가중치 그래프(Weighted Graph)**: 간선에 가중치가 있는 그래프로, 각 간선에는 추가적인 정보(가중치)가 포함. 최단 경로나 최소 비용 신장 트리 등의 문제를 해결하는 데 적용.
  
- **이분 그래프(Bipartite Graph)**: 정점들을 두 그룹으로 나누어, 같은 그룹에 속한 정점들끼리는 간선이 존재하지 않고 반대 그룹의 정점들끼리만 간선이 존재하는 그래프. 컬러링 문제나 팀 배정 문제 등에 유용하게 사용.
  
- **완전 그래프(Complete Graph)**: 모든 정점이 연결된 그래프(무방향 그래프에서 모든 가능한 간선이 존재). 정점의 개수가 n인 완전 그래프는 \\(n(n-1)/2\\)개의 간선을 가집니다. 모든 정점이 직접적으로 연결되어 있어 네트워크 최적화, 클러스터링 등의 문제에 유용하게 사용.

- **희소 그래프와 밀집 그래프**: 정점에 비해 간선이 상대적으로 적은 그래프를 희소 그래프라고 하고 간선의 수가 상대적으로 많다면 밀집 그래프.

### 03. 그래프의 구현

- **인접 행렬(Adjacency Matrix)**: 정점 간의 연결 여부를 이차원 배열로 나타내는 방식. 공간 복잡도가 O(V^2)이며, 두 정점 사이의 연결 여부나 가중치를 상수 시간\\(O(1)\\)에 확인할 수 있다. 하지만 희소 그래프(Sparse Graph)의 경우 메모리 낭비가 크므로 밀집 그래프(Dense Graph)에서 사용.
  
- **인접 리스트(Adjacency List)**: 각 정점마다 연결된 정점들을 리스트로 저장하는 방식입니다. 간선의 존재 여부를 확인하는 데 O(degree(v)) 시간이 걸린다. 희소 그래프에서는 일반적으로 인접 리스트가 효율적.

### 04. 그래프 탐색 알고리즘

- #### **너비 우선 탐색(Breadth-First Search, BFS)**
  - 한 정점으로부터 시작하여 인접한 모든 정점을 먼저 방문하는 방식으로 탐색. 최단 경로를 찾거나 상태 공간 탐색에서 사용.
  - 보통 노드에 방문했는지 여부를 체크할 배열과 큐를 활용
  - 밑의 코드는 BFS를 활용해 n개의 정점 중 r개의 원소를 사용한 순열과 조합을 생성.

```java
//순열
import java.util.*;

class PermutationBFS {
    static class Node {
        List<Integer> permutation;
        boolean[] used;

        Node(List<Integer> permutation, boolean[] used) {
            this.permutation = permutation;
            this.used = used;
        }
    }

    public static void permutations(int n, int r) {
        Queue<Node> queue = new LinkedList<>();
        queue.offer(new Node(new ArrayList<>(), new boolean[n + 1]));

        while (!queue.isEmpty()) {
            Node node = queue.poll();

            if (node.permutation.size() == r) {
                System.out.println(node.permutation);
            } else {
                for (int i = 1; i <= n; i++) {
                    if (!node.used[i]) {
                        List<Integer> newPermutation = new ArrayList<>(node.permutation);
                        newPermutation.add(i);
                        boolean[] newUsed = Arrays.copyOf(node.used, node.used.length);
                        newUsed[i] = true;
                        queue.offer(new Node(newPermutation, newUsed));
                    }
                }
            }
        }
    }

    public static void main(String[] args) {
        permutations(3, 2); // 3개의 원소 중 2개를 선택하여 순열 생성
    }
}

//조합
import java.util.*;

class CombinationBFS {
    static class Node {
        List<Integer> combination;
        int start;

        Node(List<Integer> combination, int start) {
            this.combination = combination;
            this.start = start;
        }
    }

    public static void combinations(int n, int r) {
        Queue<Node> queue = new LinkedList<>();
        queue.offer(new Node(new ArrayList<>(), 1));

        while (!queue.isEmpty()) {
            Node node = queue.poll();

            if (node.combination.size() == r) {
                System.out.println(node.combination);
            } else {
                for (int i = node.start; i <= n; i++) {
                    List<Integer> newCombination = new ArrayList<>(node.combination);
                    newCombination.add(i);
                    queue.offer(new Node(newCombination, i + 1));
                }
            }
        }
    }

    public static void main(String[] args) {
        combinations(4, 2); // 4개의 원소 중 2개를 선택하여 조합 생성
    }
}

```


 
- #### **깊이 우선 탐색(Depth-First Search, DFS)**
  - 한 정점에서 시작하여 한 경로를 끝까지 탐색한 후 다른 경로를 탐색하는 방식으로 진행. 
  - 보통 각 노드에 방문했는지 여부를 체크할 배열과 스택을 활용.
  - 밑의 DFS 메서드는 현재 깊이 L, 정점의 개수 n, 선택할 정점의 수 r, 방문 체크 배열 ch를 매개변수로 받아 재귀적으로 각각 순열과 조합을 생성.
  
```java
// 순열
import java.util.*;

class Solution {
    Stack<Integer> pm = new Stack<>();

    public void DFS(int L, int n, int r, int[] ch) {
        if (L == r) {
            for (int x : pm) System.out.print(x + " ");
            System.out.println();
        } else {
            for (int i = 1; i <= n; i++) {
                if (ch[i] == 0) {
                    ch[i] = 1;
                    pm.push(i);
                    DFS(L + 1, n, r, ch);
                    ch[i] = 0;
                    pm.pop();
                }
            }
        }
    }

    public void solution(int n, int r) {
        int[] ch = new int[n + 1];
        DFS(0, n, r, ch);
    }

    public static void main(String[] args) {
        Solution T = new Solution();
        T.solution(3, 2);
    }
}

//조합
import java.util.*;

class Solution {
    Stack<Integer> combi = new Stack<>();

    public void DFS(int L, int s, int n, int r) {
        if (L == r) {
            for (int x : combi) System.out.print(x + " ");
            System.out.println();
        } else {
            for (int i = s; i <= n; i++) {
                combi.push(i);
                DFS(L + 1, i + 1, n, r);
                combi.pop();
            }
        }
    }

    public void solution(int n, int r) {
        DFS(0, 1, n, r);
    }

    public static void main(String[] args) {
        Solution T = new Solution();
        T.solution(4, 2);
    }
}


```
- **최단 경로 알고리즘**: 그래프에서 두 정점 사이의 최단 경로를 찾는 알고리즘으로, 다익스트라 알고리즘, 벨만-포드 알고리즘 등

- **최소 신장 트리(Minimum Spanning Tree, MST)**: 그래프에서 모든 정점을 포함하면서 간선의 가중치 합이 최소가 되는 트리를 찾는 알고리즘으로, 크루스칼 알고리즘, 프림 알고리즘 등
