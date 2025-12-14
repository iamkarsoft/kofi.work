---
layout: post
title:  "OOP with laracast"
date:   2022-05-23 
categories: course oop
---



### Creating a class

{% include codeHeader.html %}
```php

class Person{
  
  public $name="Romain";
  public $age;
  protected $family = "Amoussou";
    
  public function fullname(){
    return  "{$this->name} {$this->family}";
    
  }
}


class Family extends Person{
  
  
  public function familia(){
    	
    
    return $this->family;
  }
  
}

// $romain = new Person;

// return $romain->fullname();

// $romain->name = "Romain";
// $romain->age = 30;

// return $romain;

$familia = new Family;

return $familia->familia();
```


<br>

### Scoping

{% include codeHeader.html %}
```php

// scope resolution

class First{
  
const EXAMPLE="hello";
  
  public static function test(){
    $testing = "Hi, how are you doing";
    return $testing;
  } 

}


class Second extends First{
  
  public static $greetings="hi there";
  
  public static function anotherTest(){
    	echo parent::EXAMPLE;
    
    	echo self::$greetings;
    
  }
}
// echo parent::Example

// echo self::$staticProperty


$test1 = First::EXAMPLE;
echo $test1;

$test2 = Second::anotherTest();

echo $test2;
```


<br>

### Static methods and properties

{% include codeHeader.html %}
```php

// Static properties and static functions

class Person{
   	
  	private $name;
  	private $lastname;
  	public static $drivingAge=21;
  	
  
  	public function __construct($name, $lastname){
      $this->name = $name;
      $this->lastname = $lastname;
    }
  
  	//creating setter
  
  	public function setName($name){
      $this->name = $name;
    }
  
  	//creating a getter 
  
  	public function getName(){
      return $this->name;
    }
  
  	// static method
  	public static function setDrivingAge($newAge){
   	 self::$drivingAge = $newAge;
  	}
}





echo Person::$drivingAge;

// using static function to set driving age

 Person::setDrivingAge(30);

echo Person::$drivingAge;
```


<br>

### Constructers and Destructers

{% include codeHeader.html %}
```php
// constructers and destructers

//1 Constructers run at the beginning

//2 Destructers run at the end 


// constructors
class Person{
  
  public $name;
  public $lastname;
  public $age
  
  public function __construct($name,$lastname,$age){
  		$this->name = $name;
    	$this->lastname = $lastname;
    	$this->age = $age;
    
}
  
  public function __destruct(){
}
  
}

// destructors
// usually used to clean up class o


class Person{
  
  public $name;
  public $lastname;
  public $age
  
 
  public function __destruct(){
 
  }
  
}

```
<br>

### Interfaces

Interfaces are like a blueprint for methods or functions must follow

{% include codeHeader.html %}
```php

// Interfaces


/*

*Interfaces are like a blueprint for methods or functions must
* must follow
*/
// create an interface
interface PaymentInterface{
  // rules for the interface
  
  //so to use this interface , the class must have a payNow method
  public function payNow();
  
}

interface LoginInterface{
  
  public function loginFirst();
}

class Paypal implements PaymentInterface, LoginInterface{
  public function loginFirst(){
    echo "login into Paypal";
  }
  public function payNow(){
    echo "paying with Paypal";
  }
  
  public function processPayment(){
    $this->loginFirst();
    $this->payNow();
  }
}

class Stripe implements PaymentInterface, LoginInterface{
  public function loginFirst(){
    echo "Login into stripe";
  }
  public function payNow(){
    	echo "paying with Stripe";
  }
  public function processPayment(){
    $this->loginFirst();
    $this->payNow();
  }
}

class Cash implements PaymentInterface{
  public function payNow(){
    echo "paying cash. because cash is king";
  }
  
  public function processPayment(){
    $this->payNow();
  }
}


class BuyProduct{
  
  public function pay(PaymentInterface $paymentType){
     $paymentType->processPayment();
  }
}

$paymentType = new Paypal();
$buyProduct = new BuyProduct();
$buyProduct->pay($paymentType);

```


<br>

### Abstract Classes

 Abstract classes have methods you will only use in classes. You won't use this classes to create object but only reference them from other classes.

{% include codeHeader.html %}
```php

// Abstract Classes

/** 
* Abstract classes have methods you will only use in classes
* You won't use this classes to create object but only reference * them from other classes 

*/


// creating an abstract class

abstract class Visa{
  
  public function payNow(){
    return "pay with visa";
  }
  
  // define required function like interface
  abstract public function pay();
}


// extending the class

class BuyProduct extends Visa{
  
  public function pay(){
  	return  $this->payNow();
  }
}

$newProduct = new BuyProduct();

 echo $newProduct->pay();



```

<br>
