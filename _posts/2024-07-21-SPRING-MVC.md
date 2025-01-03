---
title: Spring 복습
author: PanicAthe
date: 2024-07-21 18:00:00 +0900
categories: [Study]
tags: [스프링, Spring]
toc: true
mermaid: true
math: true
last_modified_at: 2025-01-03 01:10:00 +0900

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


### 의존 관계와 관련 개념 정리
의존 관계는 소프트웨어 구성 요소 간의 관계를 나타내며, 이를 분석하고 관리하는 것은 효과적인 설계와 유지보수에 필수적입니다. 의존 관계는 다음과 같은 두 가지 주요 관점에서 분석할 수 있습니다.

#### 정적인 클래스 의존 관계
- **정의**: 소스 코드 상에서 클래스 간의 의존성을 분석하는 것으로, `import` 구문을 통해 쉽게 파악할 수 있습니다.
- **특징**: 애플리케이션 실행 여부와 상관없이 분석 가능하며, 설계 단계에서 구조적인 의존성을 이해하는 데 도움을 줍니다.
- **예시**: `MemberServiceImpl` 클래스가 `MemberRepository` 인터페이스를 참조하고 있다면, 이는 정적인 의존 관계로 표현됩니다.

#### 동적인 객체 인스턴스 의존 관계
- **정의**: 애플리케이션 실행 시점에 생성된 실제 객체 인스턴스 간의 참조 관계를 말합니다.
- **특징**: 실행 시점에 어떤 구현체가 주입되었는지 확인 가능하며, 런타임 의존성을 분석하는 데 활용됩니다.
- **예시**: `AppConfig` 클래스에서 `MemberServiceImpl` 객체가 생성될 때, `MemberRepository`의 구현체가 주입됩니다. 이 동적 관계는 애플리케이션 실행 중에 설정됩니다.


#### 의존 관계 주입 (Dependency Injection, DI)
- **정의**: 애플리케이션 실행 시점에 외부에서 실제 구현 객체를 생성하고, 이를 클라이언트에 주입하여 의존 관계를 설정하는 방식입니다.
- **장점**: 
  - 객체 간의 의존 관계를 명확히 분리하고 관리할 수 있습니다.
  - 클라이언트 코드의 정적인 클래스 의존 관계를 수정하지 않고 클라이언트가 호출하는 대상의 타입 인스턴스를 변경할 수 있다.


#### IoC 컨테이너와 DI 컨테이너
- **IoC 컨테이너**: 객체의 생성과 생명 주기를 관리하며, 객체 간의 의존 관계를 제어하는 역할을 합니다.
- **DI 컨테이너**: IoC 컨테이너의 기능 중 의존 관계 주입에 특화된 부분을 지칭하며, 런타임 시 의존 관계를 설정합니다.
- **예시**: Spring Framework의 `ApplicationContext`는 대표적인 DI 컨테이너로, 객체 생성, 초기화, 소멸 과정을 관리하며 의존성을 주입합니다. 이전 코드에서 `AppConfig` 클래스도 이에 해당한다.


### 스프링 컨테이너
- `ApplicationContext`를 스프링 컨테이너라고 한다.
- 스프링 컨테이너는 `@Configuration`을 붙인 `AppConfig`를 설정 정보로 사용한다. 여기서 `@Bean`를 적은 모든 메서드를 모두 호출하여 반환된 객체를 스프링 컨테이너에 등록한다. 이렇게 스프링 컨테이너에 등록된 객체를 스프링 빈이라 한다.
```java
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);
        MemberService memberService = applicationContext.getBean("memberService", MemberService.class);
```

### Tips
- IntelliJ 설정-> Build, Execution, Deployment -> Build Tools -> Gradle 에 들어가서 `Build and run using`과 `Run tests using`을 `IntelliJ IDEA`로 바꿔주면 더 빠르다.