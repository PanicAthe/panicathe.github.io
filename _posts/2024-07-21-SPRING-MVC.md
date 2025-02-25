---
title: Spring 복습
author: PanicAthe
date: 2024-07-21 18:00:00 +0900
categories: [Study]
tags: [스프링, Spring]
toc: true
mermaid: true
math: true
last_modified_at: 2025-01-15 01:10:00 +0900

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

### 싱글톤 패턴과 스프링에서의 적용

**싱글톤(Singleton)**은 클래스의 인스턴스를 하나만 생성하여 애플리케이션 전역에서 공유하도록 하는 디자인 패턴입니다. 스프링 프레임워크는 기본적으로 싱글톤 패턴을 활용하여 빈을 관리합니다.

#### 1. 싱글톤 사용 시 주의사항

1. **Stateless(무상태성) 유지**  
   - 싱글톤 객체는 상태를 가지지 않도록 설계해야 합니다.  
   - 필드를 통해 상태를 공유하면 동시성 문제가 발생할 수 있습니다.

2. **특정 클라이언트에 의존하지 말 것**  
   - 싱글톤 객체는 다수의 클라이언트가 동시에 사용할 수 있으므로 특정 클라이언트에 의존성을 가지면 안 됩니다.

3. **클라이언트가 값을 변경할 수 있는 필드 금지**  
   - 싱글톤 빈의 필드는 불변(immutable) 상태로 유지하는 것이 좋습니다.  
   - 가변 상태가 필요할 경우, 지역 변수나 메서드 매개변수로 처리해야 합니다.

4. **읽기 전용 권장**  
   - 싱글톤 객체는 읽기 전용으로 설계하는 것이 이상적입니다.

5. **필드 대신 지역 변수 사용**  
   - 공유되지 않는 데이터를 다룰 때는 필드 대신 지역 변수, 메서드 매개변수, 또는 `ThreadLocal`을 활용하여 데이터를 분리해야 합니다.

6. **`@Configuration`의 필요성**  
   - 스프링에서 `@Configuration`이 적용된 설정 클래스는 내부적으로 CGLIB 프록시를 사용하여 빈이 싱글톤으로 유지되도록 보장합니다.  
   - `@Configuration`이 없는 경우, 매번 새로운 객체가 생성될 수 있습니다.


#### 2. 싱글톤 패턴의 한계와 스프링의 보완

1. **싱글톤 패턴의 한계**  
   - 직접 구현 시 코드가 복잡해질 수 있습니다.
   - 테스트하기 어렵고, 객체의 라이프사이클 관리가 어려울 수 있습니다.

2. **스프링의 보완**  
   - 스프링 컨테이너는 싱글톤 패턴을 손쉽게 구현할 수 있도록 지원하며, 객체 생성과 라이프사이클을 관리합니다.
   - 개발자는 객체의 생성 방식에 대해 고민하지 않아도 됩니다.


#### 정리

- 싱글톤 패턴은 객체를 효율적으로 재사용할 수 있는 중요한 설계 방식입니다.
- 스프링 컨테이너는 기본적으로 싱글톤 패턴을 활용하여 빈을 관리하며, 이를 통해 개발자는 객체의 라이프사이클을 직접 관리할 필요가 없습니다.
- 싱글톤 객체는 **무상태성**을 유지하고, **가변 상태**를 피하도록 설계해야 합니다.  
- `@Configuration`을 사용하면 스프링 컨테이너가 자동으로 싱글톤을 보장합니다.




### @ComponentScan
**`@ComponentScan`**은 스프링이 특정 패키지를 스캔하여 `@Component`가 붙은 모든 클래스를 자동으로 스프링 빈으로 등록하도록 설정하는 기능입니다.

#### 1. 주요 특징
- **자동 빈 등록**: `@Component` 어노테이션이 붙은 클래스는 자동으로 스프링 빈으로 등록됩니다.
  - 이를 포함하는 어노테이션(`@Controller`, `@Service`, `@Repository`)도 동일하게 동작합니다.
- **패키지 스캔 위치 지정**: `@ComponentScan`의 `basePackages` 속성을 사용하여 스캔할 패키지를 지정할 수 있습니다. 지정하지 않으면 기본적으로 `@ComponentScan`이 선언된 클래스의 패키지와 하위 패키지를 스캔합니다.

#### 2. 의존 관계 자동 주입
- 스프링 컨테이너는 `@Autowired` 어노테이션을 통해 의존 관계를 자동으로 주입합니다.
- 빈이 여러 개일 경우, 필드 이름이나 `@Qualifier`로 특정 빈을 선택할 수 있습니다.

---

### 의존 관계 주입 방법

스프링에서는 다양한 방식으로 의존 관계를 주입할 수 있습니다. 주입 방식은 애플리케이션의 설계 요구사항에 따라 선택됩니다.

---

#### 1. 생성자 주입
- **특징**:
  - 의존 관계를 생성자를 통해 주입합니다.
  - 생성자가 하나뿐이라면 `@Autowired` 어노테이션 없이도 스프링이 자동으로 의존 관계를 주입합니다.
- **장점**:
  - 필수 의존성을 명확하게 표현할 수 있습니다.
  - 객체 생성 시점에 모든 의존 관계가 주입되어 불변성을 보장합니다.
- **예제**:
  ```java
  @Component
  public class OrderService {
      private final MemberRepository memberRepository;

      public OrderService(MemberRepository memberRepository) {
          this.memberRepository = memberRepository;
      }
  }
  ```

---
#### 2. 수정자 주입 (Setter 주입)

- **특징**:  
  - `@Autowired`를 메서드에 붙여 의존 관계를 주입합니다.  
  - 선택적인 의존 관계에 적합하며, 변경 가능성이 있는 의존성을 주입할 때 사용합니다.

- **`required` 속성**:  
  - `@Autowired`는 기본적으로 **필수 의존 관계**를 설정합니다. 주입 대상이 없으면 애플리케이션이 실행되지 않고 예외를 발생시킵니다.
  - 특정 의존 관계를 선택적으로 주입하고 싶다면, `@Autowired(required = false)`로 설정할 수 있습니다.
    - 이 경우, 대상 빈이 없으면 해당 의존성을 주입하지 않고 null로 남깁니다.

- **단점**:  
  - 생성자 주입에 비해 객체의 불변성이 약화될 수 있습니다.  
  - 선택적 주입을 사용할 경우, 런타임에 예상치 못한 `null` 문제가 발생할 가능성이 있으므로 주의해야 합니다.

- **예제**:

  ##### 기본 설정 (필수 주입)
  ```java
  @Component
  public class OrderService {
      private MemberRepository memberRepository;

      @Autowired
      public void setMemberRepository(MemberRepository memberRepository) {
          this.memberRepository = memberRepository;
      }
  }
  ```
  - 이 경우, 스프링 컨테이너에 `MemberRepository` 빈이 등록되어 있지 않으면 애플리케이션 실행 시점에 예외가 발생합니다.

  ##### 선택적 설정 (`required = false`)
  ```java
  @Component
  public class OrderService {
      private MemberRepository memberRepository;

      @Autowired(required = false)
      public void setMemberRepository(MemberRepository memberRepository) {
          this.memberRepository = memberRepository;
      }
  }
  ```
  - `required = false`를 설정하면 `MemberRepository` 빈이 스프링 컨테이너에 없더라도 예외가 발생하지 않으며, `memberRepository`는 `null`로 초기화됩니다.


#### 각 주입 방식 비교

| **주입 방식**       | **장점**                                         | **단점**                                | **추천 사용 시점**                     |
|--------------------|------------------------------------------------|----------------------------------------|---------------------------------------|
| 생성자 주입         | 불변성 보장, 필수 의존성 명확화                 | 의존 관계가 많을 경우 생성자 코드 복잡 | 대부분의 경우 기본 선택               |
| 수정자 주입         | 선택적 의존성 주입 가능                         | 객체의 상태 변경 가능성                | 선택적 의존 관계가 필요할 때          |
| 필드 주입           | 코드 간결                                      | 테스트 및 유지보수 어려움              | 테스트 코드 외 권장되지 않음          |
| 일반 메서드 주입     | 복잡한 의존성 설정 가능                        | 코드 가독성 저하                       | 특정 상황에서 유연한 구성 필요할 때   |

---

스프링에서는 **생성자 주입**을 가장 권장하며, 이는 불변성과 테스트 용이성을 보장하기 때문입니다. 수정자 주입과 필드 주입은 특별한 요구 사항이 있을 때만 사용하는 것이 좋습니다.
또, **생성자 주입**은 `final`키워드를 사용하여 값이 설정되지 않았다면 컴파일 오류를 일으키도록 유도할 수 있습니다.

#### Lombok 활용
Lombok을 활용하여 생성자 주입을 간소화할 수 있다. @RequiredArgsConstructor 애너테이션을 사용하면 final 필드나 @NonNull이 붙은 필드들을 대상으로 자동으로 생성자가 생성된다. 이를 통해 스프링 프레임워크에서 일반적으로 사용하는 @Autowired 애너테이션을 생성자 주입 시 명시하지 않아도 의존성 주입이 가능하다. 스프링에서는 생성자가 하나뿐인 경우 자동으로 해당 생성자를 통해 의존성을 주입하기 때문에, @RequiredArgsConstructor를 활용하면 코드의 간결성과 가독성을 높일 수 있다.

### @Autowired할 빈이 2개 이상.
@Autowired 필드 명 매칭
@Qualifier @Qualifier끼리 매칭 빈 이름 매칭
@Primary 사용


### Tips
- IntelliJ 설정-> Build, Execution, Deployment -> Build Tools -> Gradle 에 들어가서 `Build and run using`과 `Run tests using`을 `IntelliJ IDEA`로 바꿔주면 더 빠르다.