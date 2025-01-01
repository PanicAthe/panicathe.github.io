---
title: Spring 복습
author: PanicAthe
date: 2024-07-21 18:00:00 +0900
categories: [Study]
tags: [스프링, Spring]
toc: true
mermaid: true
math: true
last_modified_at: 2025-01-01 15:10:00 +0900

---
<style>
/* 큰제목 스타일 */
h2 {
    color: #007acc; /* 파란색 */
}
/* 소제목 스타일 */
h3 {
    color: #2EFE64;
}
/* 추가적으로 더 작은 소제목 스타일 */
h4 {
    color: #088A29; 
}
</style>

### OCP (Open-Closed Principle)
의미: 확장에는 열려(Open), 수정에는 닫혀(Closed) 있어야 한다.
핵심: 추상화(인터페이스, 추상 클래스)를 활용하여 유연한 구조를 만든다.

#### SOLID
1. **S - 단일 책임 원칙(Single Responsibility Principle)**  
   - 클래스는 하나의 책임만 가져야 한다. -> 중요한 기준은 변경. 수정할 때, 파급 효과가 적도록.

2. **O - 개방-폐쇄 원칙(Open-Closed Principle)**  
   - 소프트웨어는 확장에는 열려 있고, 수정에는 닫혀 있어야 한다. 

3. **L - 리스코프 치환 원칙(Liskov Substitution Principle)**  
   - 자식 클래스는 부모 클래스를 대체할 수 있어야 한다.

4. **I - 인터페이스 분리 원칙(Interface Segregation Principle)**  
   - 인터페이스는 특정 클라이언트에 맞게 작게 나누어야 한다.

5. **D - 의존 역전 원칙(Dependency Inversion Principle)**  
   - 고수준 모듈이 저수준 모듈에 의존해서는 안 되며, 추상화에 의존해야 한다.


### 결국은 객체 지향.
스프링은 자바 언어 기반의 프레임워크.
따라서 스프링의 목표는 좋은 객체 지향 애플리케이션을 개발하는 것.
객체 지향 프로그래밍은 컴퓨터 프로그램을 명렁어의 목록으로 보는 시각에서 벗어나 "객체"들의 모임으로 파악하고자 함.

객체 지향 프로그래밍(OOP)의 4가지 특징:
- 추상화(Abstraction) :중요한 정보만 추출하고 불필요한 세부 사항은 숨겨, 객체의 공통된 특징을 모델링.
- 캡슐화(Encapsulation) : 데이터와 메서드를 하나로 묶고, 외부에서 접근을 제한하여 객체의 내부 구현을 보호.
- 상속(Inheritance) : 기존 클래스(부모)의 특성과 동작을 새로운 클래스(자식)가 물려받아 코드 재사용성을 높임.
- 다형성(Polymorphism) : 동일한 메서드나 객체가 다양한 방식으로 동작할 수 있는 능력.

```java
public class MemberService {
    private MemberRepository memberRepository = new MemoryMemberRepository();

    //private MemberRepository memberRepository = new JdbcMemberRepository();


    // 위는 다형성의 예시로 볼 수 있음.

    // MemberService가 MemberRepository 인터페이스와 구현 클래스에 의존. 즉, 서비스가 구현 클래스를 선택해야 함.
    // OCP, SOLID 중 DIP 위반

}

// -> 어떻게 해결? 서비스가 인터페이스에만 의존하도록 appConfig 파일 따로 생성.

/**
 * 각 인터페이스들이 실행만 책임지도록.
 * 실제 동작에 필요하연 구현 객체를 생성, 생성자 통해서 주입.
 */
public class AppConfig {
    //구현 객체 설정.
    private static MemberRepository memberRepository() {
        return new MemoryMemberRepository();
    }
    //주입
    public MemberService memberService(){
        return new MemberServiceImpl(memberRepository());
    }
}

public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
}
```
다형성을 극대화하기 위해 인터페이스를 안정적으로 설계하는 것이 중요.


### Tips
- IntelliJ 설정-> Build, Execution, Deployment -> Build Tools -> Gradle 에 들어가서 `Build and run using`과 `Run tests using`을 `IntelliJ IDEA`로 바꿔주면 더 빠르다.