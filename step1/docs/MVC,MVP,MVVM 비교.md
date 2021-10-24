## 목적

객체의 역할과 책임을 분리하자  
MVC 패턴에서 MVP,MVVM 패턴이 파생되어짐

## MVC

### 1) MVC 패턴 구조

MVC 패턴은 Model + View + Controller를 합친 용어

Model : 어플리케이션에서 사용되는 데이터를 주입 및 데이터를 처리하는 역할.  
View : 사용자에서 보여지는 UI 부분 처리 역할.  
Controller : 사용자의 입력(Action)을 받고 처리하는 역할.

---

### 2) 동작과정

1. 사용자의 Action들은 Controller에 들어오게 됩니다.
2. Controller는 사용자의 Action를 확인하고, Model을 업데이트합니다.
3. Controller는 Model을 나타내줄 View를 선택합니다.
4. View는 Model을 이용하여 화면을 나타냅니다.

- 참고 - MVC에서 View가 업데이트 되는 방법
  1 View가 Model을 이용하여 직접 업데이트 하는 방법  
  2 Model에서 View에게 Notify 하여 업데이트 하는 방법  
  3 View가 Polling으로 주기적으로 Model의 변경을 감지하여 업데이트 하는 방법.

### 3) 장단점

장점 : 단순, 보편적인 디자인 패턴  
단점 : View,Model 사이의 의존성이 높다.

## MVP

### 1) MVP 패턴 구조

MVP 패턴은 Model + View + Presenter를 합친 용어  
Model과 View는 MVC 패턴과 동일하고, Controller 대신 Presenter가 존재

- Model : 어플리케이션에서 사용되는 데이터와 그 데이터를 처리하는 부분입니다.
- View : 사용자에서 보여지는 UI 부분입니다.
- Presenter : View에서 요청한 정보로 Model을 가공하여 View에 전달해 주는 부분입니다.

### 2) 동작과정

1. 사용자의 Action들은 View를 통해 들어오게 됩니다.
2. View는 데이터를 Presenter에 요청합니다.
3. Presenter는 Model에게 데이터를 요청합니다.
4. Model은 Presenter에서 요청받은 데이터를 응답합니다.
5. Presenter는 View에게 데이터를 응답합니다.
6. View는 Presenter가 응답한 데이터를 이용하여 화면을 나타냅니다.

### 3) 장단점

장점 : MVC패턴의 문제점인, Model과 View의 의존성을 해결
단점 : View 과 Presenter 사이 의존성이 강해지는 단점

## MVVM

### 1) MVVM 패턴 구조

MVVM 패턴은 Model + View + View Model를 합친 용어  
Model과 View은 다른 패턴과 동일합니다

- Model : 어플리케이션에서 사용되는 데이터와 그 데이터를 처리하는 부분입니다.
- View : 사용자에서 보여지는 UI 부분입니다.
- View Model : View를 표현하기 위해 만든 View를 위한 Model입니다. View를 나타내 주기 위한 Model이자 View를 나타내기 위한 데이터 처리를 하는 부분입니다.

### 2) 동작과정

1. 사용자의 Action들은 View를 통해 들어오게 됩니다.
2. View에 Action이 들어오면, Command 패턴으로 View Model에 Action을 전달합니다.
3. View Model은 Model에게 데이터를 요청합니다.
4. Model은 View Model에게 요청받은 데이터를 응답합니다.
5. View Model은 응답 받은 데이터를 가공하여 저장합니다.
6. View는 View Model과 Data Binding하여 화면을 나타냅니다.

### 3) 장단점

장점 :
MVVM 패턴은 Command 패턴과 Data Binding 두 가지 패턴을 사용하여 구현  
Command 패턴과 Data Binding을 이용하여 View와 View Model 사이의 의존성을 제거
View와 Model 사이의 의존성이 없음

단점 :
MVVM 패턴의 단점은 View Model의 설계가 쉽지 않다
