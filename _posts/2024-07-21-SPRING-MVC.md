---
title: Spring MVC
author: PanicAthe
date: 2024-07-21 18:00:00 +0900
categories: [Study]
tags: [스프링, Spring,  MVC]
toc: true
mermaid: true
math: true
last_modified_at: 2024-07-21 20:00:00 +0900
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

### MVC
스프링 MVC는 스프링 프레임워크의 웹 모듈로, 웹 애플리케이션을 개발하기 위한 Model-View-Controller (MVC) 패턴을 지원합니다. 이 패턴을 통해 애플리케이션의 비즈니스 로직, 프레젠테이션, 데이터 액세스를 분리하여 개발할 수 있습니다.

1. **Model**: 애플리케이션의 데이터 및 비즈니스 로직을 담당합니다. 데이터베이스와의 상호작용, 비즈니스 규칙을 적용하는 로직 등을 포함합니다.
2. **View**: 사용자에게 데이터를 보여주는 역할을 합니다. HTML, JSP, Thymeleaf, FreeMarker 등의 템플릿 엔진을 사용하여 구현됩니다.
3. **Controller**: 사용자의 요청을 처리하고, 적절한 모델과 뷰를 선택하는 역할을 합니다. 주로 애너테이션 기반으로 정의되며, 사용자의 입력을 받아서 처리하고 결과를 모델에 담아 뷰로 전달합니다.

#### 1. DispatcherServlet
스프링 MVC의 핵심 프론트 컨트롤러로, 모든 HTTP 요청을 받아서 적절한 핸들러로 전달합니다. 설정 파일(web.xml)이나 애플리케이션 클래스에서 설정됩니다.

#### 2. Controller
HTTP 요청을 처리하는 클래스입니다. `@Controller`와 `@RequestMapping` 어노테이션을 사용하여 요청을 매핑합니다.

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/hello")
public class HelloController {

    @GetMapping
    @ResponseBody
    public String sayHello() {
        return "Hello, Spring MVC!";
    }
}
```

#### 3. Model
컨트롤러와 뷰 사이의 데이터를 전달하는 객체입니다. `Model`이나 `ModelAndView` 클래스를 사용하여 데이터를 전달할 수 있습니다.

```java
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/greeting")
public class GreetingController {

    @GetMapping
    public String greeting(Model model) {
        model.addAttribute("message", "Hello, Spring MVC!");
        return "greeting";
    }
}
```

#### 4. View
모델 데이터를 사용하여 사용자에게 보여질 화면을 렌더링합니다. 스프링 MVC는 다양한 뷰 기술을 지원합니다 (JSP, Thymeleaf, FreeMarker 등).

```html
<!-- greeting.html -->
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Greeting</title>
</head>
<body>
    <h1 th:text="${message}">Placeholder</h1>
</body>
</html>
```

#### 설정

스프링 부트에서는 대부분의 설정이 자동으로 처리되지만, 일반 스프링 MVC 애플리케이션에서는 설정 파일을 통해 DispatcherServlet, 뷰 리졸버(View Resolver), 리소스 핸들러(Resource Handler) 등을 설정해야 합니다.

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MySpringBootApplication {
    public static void main(String[] args) {
        SpringApplication.run(MySpringBootApplication.class, args);
    }
}
```

#### 요약

- **Model-View-Controller (MVC) 패턴**: 애플리케이션의 비즈니스 로직, 프레젠테이션, 데이터 액세스를 분리.
- **DispatcherServlet**: 모든 HTTP 요청을 받아서 적절한 핸들러로 전달.
- **Controller**: 사용자 요청을 처리하고 모델과 뷰를 선택.
- **Model**: 컨트롤러와 뷰 사이의 데이터를 전달.
- **View**: 사용자에게 데이터를 보여주는 역할.

스프링 MVC를 통해 구조적이고 유지보수하기 쉬운 웹 애플리케이션을 개발할 수 있습니다.

### HTTP 요청 매핑 (Controller)

스프링 MVC에서 컨트롤러는 클라이언트의 HTTP 요청을 처리하는 역할을 합니다. 주로 `@Controller`와 `@RestController` 어노테이션을 사용하여 컨트롤러 클래스를 정의합니다. 

#### Controller와 RestController의 차이

- **@Controller**: 주로 뷰 템플릿을 반환할 때 사용됩니다. JSP, Thymeleaf 등의 템플릿 엔진을 사용하여 HTML을 생성하는 경우에 사용합니다.
- **@RestController**: `@Controller`와 `@ResponseBody`의 조합입니다. 주로 RESTful 웹 서비스에서 JSON이나 XML 데이터를 반환할 때 사용합니다.

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class MyController {
    
    @GetMapping("/hello")
    public String hello() {
        return "hello"; // View name
    }
}

@RestController
public class MyRestController {
    
    @GetMapping("/api/hello")
    public String hello() {
        return "Hello, World!"; // JSON response
    }
}
```

#### 매핑 어노테이션

- **@RequestMapping**: 모든 HTTP 메서드(GET, POST, PUT, DELETE 등)를 지원하는 일반적인 매핑 어노테이션.
- **@GetMapping**: HTTP GET 요청을 처리.
- **@PostMapping**: HTTP POST 요청을 처리.
- **@PutMapping**: HTTP PUT 요청을 처리.
- **@DeleteMapping**: HTTP DELETE 요청을 처리.
- **@PatchMapping**: HTTP PATCH 요청을 처리.

```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ApiController {
    
    @GetMapping("/users")
    public List<User> getUsers() {
        // GET /api/users
        return userService.getAllUsers();
    }
    
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        // POST /api/users
        return userService.createUser(user);
    }
    
    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        // PUT /api/users/{id}
        return userService.updateUser(id, user);
    }
    
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        // DELETE /api/users/{id}
        userService.deleteUser(id);
    }
}
```

#### 파라미터 받기

스프링 MVC는 다양한 방법으로 요청 파라미터를 받을 수 있습니다.

- **@PathVariable**: URL 경로 변수.
- **@RequestParam**: 쿼리 스트링 또는 폼 데이터의 파라미터.
- **@RequestBody**: HTTP 요청 본문을 객체로 변환.
- **@RequestHeader**: HTTP 헤더 값.
- **@CookieValue**: 쿠키 값.
- **@ModelAttribute**: 폼 데이터를 객체로 바인딩.

```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ParameterController {

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        // URL 경로 변수
        return userService.getUserById(id);
    }

    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam String name, @RequestParam int age) {
        // 쿼리 스트링 파라미터
        return userService.searchUsers(name, age);
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        // HTTP 요청 본문
        return userService.createUser(user);
    }

    @GetMapping("/headers")
    public String getHeader(@RequestHeader("User-Agent") String userAgent) {
        // HTTP 헤더
        return "User-Agent: " + userAgent;
    }

    @GetMapping("/cookies")
    public String getCookie(@CookieValue("sessionId") String sessionId) {
        // 쿠키 값
        return "Session ID: " + sessionId;
    }

    @PostMapping("/users/form")
    public User createUserFromForm(@ModelAttribute User user) {
        // 폼 데이터
        return userService.createUser(user);
    }
}
```

### 필터와 인터셉터
스프링에서 필터(Filter)와 인터셉터(Interceptor)는 요청과 응답을 처리하는 과정에서 다양한 작업을 수행할 수 있는 메커니즘을 제공합니다. 두 가지 모두 요청 처리 파이프라인에서 동작하지만, 사용 목적과 동작 방식에 차이가 있습니다.

#### 필터 (Filter)

**필터**는 서블릿 기술의 일부로, HTTP 요청과 응답을 가로채어 사전 처리(pre-processing) 및 후처리(post-processing)를 수행하는 데 사용됩니다. 필터는 스프링 MVC 뿐만 아니라 서블릿 컨테이너에서도 동작합니다.

- **요청 전 처리**: 클라이언트가 요청을 보내기 전에 필터에서 작업을 수행할 수 있습니다.
- **응답 후 처리**: 서버가 응답을 클라이언트로 보내기 전에 필터에서 작업을 수행할 수 있습니다.
- **인증 및 인가**: 요청을 인증하고 인가하는 작업.
- **로깅**: 요청과 응답에 대한 로깅.
- **데이터 압축**: 응답 데이터를 압축하는 작업.

```java
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.IOException;

public class MyFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // 초기화 코드
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        // 요청 전 처리
        System.out.println("Request received");

        // 다음 필터 또는 서블릿으로 요청 전달
        chain.doFilter(request, response);

        // 응답 후 처리
        System.out.println("Response sent");
    }

    @Override
    public void destroy() {
        // 정리 코드
    }
}
```

필터는 서블릿 컨테이너의 설정 파일(web.xml) 또는 스프링 부트에서는 `@Component` 어노테이션을 통해 등록할 수 있습니다.

```java
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<MyFilter> loggingFilter() {
        FilterRegistrationBean<MyFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new MyFilter());
        registrationBean.addUrlPatterns("/api/*"); // 필터를 적용할 URL 패턴
        return registrationBean;
    }
}
```

#### 인터셉터 (Interceptor)

**인터셉터**는 스프링 MVC에서만 사용되는 기능으로, 요청이 컨트롤러에 도달하기 전과 응답이 클라이언트로 돌아가기 전에 추가 작업을 수행할 수 있습니다. 인터셉터는 스프링의 디스패처 서블릿이 요청을 처리할 때 호출됩니다.

- **요청 전 처리**: 컨트롤러가 요청을 처리하기 전에 인터셉터에서 작업을 수행할 수 있습니다.
- **응답 후 처리**: 컨트롤러가 요청을 처리한 후 응답을 클라이언트로 보내기 전에 작업을 수행할 수 있습니다.
- **로그 기록**: 요청 및 응답에 대한 로그 기록.
- **인증 및 권한 부여**: 요청에 대한 인증 및 권한 확인.
- **모델 수정**: 컨트롤러가 반환하는 모델을 수정할 수 있습니다.

```java
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MyInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        // 요청 처리 전
        System.out.println("Request pre-handle");
        return true; // true를 반환해야 요청이 계속 진행됩니다.
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
        // 요청 처리 후, 뷰가 렌더링되기 전
        System.out.println("Request post-handle");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
                                Exception ex) throws Exception {
        // 요청 완료 후
        System.out.println("Request after completion");
    }
}
```

인터셉터는 스프링 MVC 설정에서 등록할 수 있습니다.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private MyInterceptor myInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(myInterceptor).addPathPatterns("/api/*"); // 인터셉터를 적용할 URL 패턴
    }
}
```

#### 요약

- **필터**는 서블릿 기술의 일부로, 요청과 응답을 가로채어 사전 처리 및 후처리를 수행하며, 인증, 로깅, 데이터 압축 등의 작업을 수행할 수 있습니다.
- **인터셉터**는 스프링 MVC에서 사용되며, 요청이 컨트롤러에 도달하기 전과 응답이 클라이언트로 돌아가기 전의 추가 작업을 수행할 수 있습니다. 주로 요청 및 응답 로깅, 인증 및 권한 확인 등에 사용됩니다.


### 예외 처리

#### 1. 기본 예외 처리

스프링 MVC에서는 기본적으로 컨트롤러 메서드에서 예외를 처리할 수 있습니다. 하지만 이를 더 깔끔하게 처리하고 일관된 방식으로 오류를 관리하기 위해, 스프링에서는 다양한 예외 처리 메커니즘을 제공합니다.

##### 1.1. `@ExceptionHandler`

컨트롤러 클래스에 `@ExceptionHandler` 어노테이션을 사용하여 특정 예외를 처리할 수 있습니다. 이 방법은 특정 컨트롤러 내에서 발생한 예외만을 처리합니다.

```java
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class MyController {

    @GetMapping("/test")
    public String test() {
        throw new RuntimeException("Something went wrong");
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return new ResponseEntity<>("Error: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

##### 1.2. `@ControllerAdvice`

`@ControllerAdvice`를 사용하면 모든 컨트롤러에서 발생하는 예외를 공통적으로 처리할 수 있습니다. 글로벌 예외 처리 클래스를 정의하여, 여러 컨트롤러에서 발생하는 예외를 일관된 방식으로 처리할 수 있습니다.

```java
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return new ResponseEntity<>("Global error: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

#### 2. 스프링 부트의 기본 예외 처리

스프링 부트는 기본적으로 다양한 예외를 처리하는 기능을 내장하고 있습니다. `BasicErrorController`를 통해 자동으로 오류 페이지를 처리할 수 있으며, 기본적으로 `application.properties` 또는 `application.yml` 파일에서 설정을 통해 커스터마이즈할 수 있습니다.

##### 2.1. 커스터마이징된 오류 페이지

스프링 부트에서는 기본적으로 제공하는 오류 페이지를 커스터마이즈할 수 있습니다. `src/main/resources/templates/error` 디렉토리에 `404.html`, `500.html` 등의 파일을 추가하여 사용자 정의 오류 페이지를 제공할 수 있습니다.

##### 2.2. `ErrorAttributes` 인터페이스 구현

스프링 부트에서 제공하는 기본 오류 처리 로직을 변경하거나 추가적인 정보를 포함시키기 위해 `ErrorAttributes` 인터페이스를 구현할 수 있습니다.

```java
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Component
public class CustomErrorAttributes implements ErrorAttributes {

    @Override
    public Map<String, Object> getErrorAttributes(HttpServletRequest request, boolean includeStackTrace) {
        // Custom error attributes
    }

    @Override
    public Throwable getError(HttpServletRequest request) {
        // Retrieve the actual exception
    }
}
```

#### 3. ResponseStatusException

스프링 5.0 이상에서는 `ResponseStatusException`을 사용하여 예외를 처리할 수 있습니다. 이 예외는 HTTP 상태 코드와 오류 메시지를 직접 설정할 수 있는 방법을 제공합니다.

```java
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class MyService {

    public void myMethod() {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid request");
    }
}
```

#### 4. 사용자 정의 예외

##### 4.1. 사용자 정의 예외 클래스

```java
public class CustomNotFoundException extends RuntimeException {
    public CustomNotFoundException(String message) {
        super(message);
    }
}
```

##### 4.2. 사용자 정의 예외 처리

```java
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(CustomNotFoundException.class)
    public ResponseEntity<String> handleCustomNotFoundException(CustomNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
```

#### 요약

- **기본 예외 처리**: `@ExceptionHandler`와 `@ControllerAdvice`를 사용하여 예외를 처리.
- **스프링 부트의 기본 예외 처리**: 자동으로 제공되는 기본 오류 페이지를 사용하거나 커스터마이즈.
- **ResponseStatusException**: HTTP 상태 코드와 오류 메시지를 직접 설정할 수 있는 예외.
- **사용자 정의 예외**: 애플리케이션의 요구에 맞는 사용자 정의 예외를 만들어 보다 구체적인 예외 처리를 구현.


###