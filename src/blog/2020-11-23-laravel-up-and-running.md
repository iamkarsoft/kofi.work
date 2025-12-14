---
title:  "laravel up and running"
layout: post
date:   2020-11-23
categories: laravel php
---

##### _updated on: 28th November 2020_


### Route Naming Conventions

   - resource.index
   - resource.create
   - resource.store
   - resource.show
   - resource.edit
   - resource.update
   - resource.destroy



### Middleware

`this->middleware('auth')` , `this->middleware('admin')`



### Eloquent



#### Path Prefix


```php

Route::prefix('dashboard')->group(function(){
	...
})

```



#### Subdomain


```php
Route::domain('api.myapp.com')->group(function(){

})
```



#### Name Prefixes



```php

Route::name('users.')->prefix('users');
```


#### Signed Routes

They are used to create unique routes for validaton purposes


```php
//normal link
URL::route('invitations',['invitation'=>12345,'answer'=>yes]);

//signed link
URL::signedRoute('invitations',['invitation'=>12345,'answer'=>yes]);

// signed link with expiration

URL::temporarySignedRoute(
	'invitations',
	now()->addHours(4),
	['invitation'=>12345,'answer'=>yes]
);
```



### Views


#### View Composers

To make all views related to `tasks` share the same variable you could use `view()->share('variableName','variableValue')`

<br>

### Controllers


##### Creating a controller


creating a controller `php artisan make:controller TaskController`


##### Creating a rousource controller


A resource controller is a controller with some method naming conventions
`php artisan make:controller MyResourceController --resource` and binding the controller to route will be `Route::resource('tasks','TaskController');`



##### APi Resouce Controllers


`php artisan make:controll MyResourceController --api` and binding `Route::apiResource('tasks','TasksController')`


##### Single action controllers

they use the `__invoke()` method for single action


```php
// App\http\Controllers\UpdateUserAvatar
public function __invoke(User $user){
	//your code
}
```

binding the route 
<br>
`Route::post('users/user/update-avatar','updateUserAvatar')`;



### Form Spoofing


```html+php

<form action="tasks/5/" method="Post">
@method('DELETE')
</form>

```


### Redirects



- `return redirect()->to('login')`
- `return redirect('loging')`
- `returen Redirect::to('login')`
- `return redirect()->route('conferences.index')`
-  `return redirect()->back()`
- `return  redirect()->home()`
- `return redirect()->refresh()`
- `return redirect()->away()`
- `return redirect()->action([Mycontroller::class],'index')`
- `return redirect()->guest()`
- `return redirect()->intended()`
- `return redirect()->with('error',true)` used to pass data along


### Aborting a request


```php
Route::post('...',function(){

	abort(403,"You can't do this");
	abort_unless($request->has('magicToken'),403);
})
```


### Custom Responses

##### Response()->make()

`response->make(Hello,World)` used to pass data



##### Response()->json() and ->jsonp()

`response->json(User::all())`



##### Response()->download(), ->streamDownload(), and ->file()


`return response()->dowload('mydriv3453453454.pdf','renamedfile.pdf')`
<br>
to display the file in the browser `response()->file('mydriv3453453454.pdf')`



### Blade Templating


##### Conditionals

- `@if(condition) @elseif(condition) @else @endif`


-  `@unless($user->hasPaid()) @endunless`


##### Loops


- `@for(condition) @endfor`

- `@foreach(condition) @endforeach`

- `@while(condition) @endwhile`

- `@forelse(condition) @empty @endforelse`


###### `$loop` within @foreach and @forelse

- `$loop->index` the 0 based index

- `$loop->iteration` the 1 based index

- `$loop->remaining` checks how many items in the loop

- `$loop->count` counts how many items in the loop

- `$loop->first`  indicates the first item

- `$loop->last` indicates the last item

- `$loop->depth`

- `$loop->parent` references the parent loop item


```html+php
	<ul>
		@foreach($pages as $page)
		<li>{{$loop->iteration}} : {{$page->title}}
		@if($page->hasChildren())
		<ul>
			@foreach($page->children() as $child)
			<li>{{$loop->parent->iteration}}
				{{$loop->iteration}}
				{{$child->title}}
			</li>
			@endforeach
		</ul>
		@endif
		</li>
		@enforeach
	</ul>
```


#### Template Inheritance


###### @section/@show and @yield


###### @yield



```
<title> My Site | @yield('title', 'Home Page') </title>


<div class="container">
	@yield('content')
</div>

@section('footerScripts')
<script type="app.js"></script>
@show

```


##### Extending blade layout

```html+php
	@extends('layouts.master')

	@section('title','dashboard')

	@section('content')
	welcome

	@endsection


	@section('footerScripts')
	@parent
	<script type="dashboard.js"></script>
	@endsection


	@include('sign-up-button',['text'=>'see just how great it is'])

	<a class="button">
	{{ $text }}
	</a>
```


##### Includes



- `@includeIf('sidebars.admin',['some'=>'data'])` include if view exist

- `@includeWhen($user->isAdmin()),'sidebars.admin', ['some'=>'data'])` include if it's admin

- `@includeFirst(['customs.header','header'],['some'=>data])` include first view from array


##### @stack and @push 



define `@stack(scripts)` in master and `@push('scripts') <script src="jobs.css"></script>` to push something in child template at the bottom and `@prepend('scripts')...@endprepend` at the top of the stack



### Databases


#### Migrations

##### Creating Migrations



```bash
	
	php artisan make:migration create_users_table
	php artisan make:migration add_votes_to_users_table --table=users
	php artisan make:migration create_users_table --create=users

```

##### Migration blueprints methods




- `integer(columName)` `tinyInteger(columName)` `smallInteger(columName)` `mediumInteger(columName)`

- `string(colName, length)`

- `binary(colName)`

- `boolean(colName)`

- `char(colName, length)`

- `datetime(colName)`

- `decimal(colName)`

- `double(colName, precision, scale)` i.e `decimal('amount',5,2)`

- `enum`

- `float(colName, precision, scale)`

- `json(colName) or jsonb(colName)`

- `text(colName)` ` mediumText(colName)` `longText(colName)`

- `time(colName)`

- `timestamp(colName)`

- `uuid(colName)`

- `increments(colName)`

- `timestamps()` and `nullableTimestamps()`

- `rememberToken()`

- `softDeletes()`

- `mordphs(colName)`


##### Migration blueprints extra properties


- `nullable()`

- `default('default content')`

- `unsigned()`

- `first()` for mysql

- `after(colName)` for mysql too

- `unique()`

- `primary()`

- `index()`


#### Indexes and foreign keys



Indexes are used for performance optimization and data integrity.


```
$table->index('amount') // basic index
$table->index('amount', 'amount_index') //basic index with index name
$table->unique('email') // unique index
$table->primary('user_id')

$table->foreign('user_id')->references('id')->on('users'); // foreign Id
$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // foreign Id with constraints
```

### Seeding




- `php artisan migrate --seed` or `php artisan migrate:refresh --seed` runs migrations and seeding database after

- `php artisan db:seed` or `php artisan db:seed --class=VotesTableSeeder` runs only seeders or particular seed.




#### creating a seeder



`php artisan make:seeder ContactTableSeeder`


##### calling the seed class




```
// DtabaseSeeder
public function run(){
	$this->call(ContactTableSeeder::class);
}

// contactsTableSeeder

public function run(){
	DB::table('contacts')->insert([
		'name'=>'Lupita Smith',
		'email'=>'lupita@gmail.com',
		]);
}
```


### Model Factories




Defining a model factories with eloquent. It's good to name the factory after your eloquent class.

```
$factory->define(User::class, function(Faker\Generator $faker){
	return [
		'name'=> $faker->name,
	];

	});


	$factory->define('users',function(Faker\Generator $faker){
		return[
			'name'=>$faker->name,
		];

		});
```



#### creating a model factory



`php artisan make:factory ContactFactory`


##### defining a factory



Factory are usually used for testing and seeding.

```
$factory->define(Contact::class, function(Faker\Generator $faker){
	return [
		'name'=>'Lupita Smith',
		'email'=>'lupita@gmail.com',


	];
		// or you can use faker to generate different entiries
	return [
		'name'=> $faker->name,
		'email'=>$faker->email, or //creating unique $faker->unique()->email;

		
	];
	});


	//creating one
	$contact = factory(Contact::class)->create();

	//create many
	factory(Contact::class,20)->create();
```



##### Attaching relationships with factories



```
$factory->define(Contact::class, function(Faker\Generator $faker){
	return [
		'name'=>'Lupita Smith',
		'email'=>'lupita@gmail.com',
		'company_id'=> function(){
		return factory(App\Company::class)->create()->id;
	}


	];

	});
```


### Query Builder




```
$users = DB::select(['table'=>'users','where'=>['type'=>'donor']]); //non-fluent


$users = DB::table('users')->where('type','donor')->get(); //fluent

```


### Eloquent


#### Creating an eloquent model



`php artisan make:model Contact`


`php artisan make:model Contact --migration` creates a migration along with your model


```
protected $table= 'contacts_secondary'; //customizing tablename

protected $primaryKey='contact_id'; // changing the primary key

public $incrementing = false; // turning of incrementing id;


public $timestamps = false; // turns of timestamps


protected $fillable = ['name','email']; //fields allowed in case of mass assignment

protected $guarded =['id','created_at','owner_id']; // fields disallowed in case of mass assignment


```


#### Request->only()


`Contact::create($request->only('name','email'))`; simpler way for mass assignment selecting the necessary fields.


#### Deleting with eloquent



```
$contact = Contact::find(4);
$contact->delete();

//or

$contact->destory(1);

```


#### Soft Deletes



```
use SoftDeletes;

protected $dates = ['deleted_at']; // make this column as a date

```


#### Eloquent Relationships


##### One to One


<pre>
<code>
	public function phoneNumber(){
	return $this->hasOne(PhoneNumber::class,'owner_id');
}

// accessing 
$contact = Contact::first();
$contactPhone = $contact->phoneNumber;


//getting the contact from phone number

public function contact(){
	return $this->belongsTo(Contact::class);
}

//accessing
$contact = $phoneNumber->contact;

//inserting related items

$contact = Contact::first();
$phoneNumber = new PhoneNumber;
$contact->phoneNumbers()->save($phoneNumber);
</code>
</pre>



##### One to Many

<pre>
<code>
	public function contacts(){
	return $this->hasMany(Contact::class);
}

//accessing
$user = User::first();
$usersContacts = $user->contacts;



public function user(){
	return $this->belongsTo(User::class);
}

//accessing
$userName = $contact->user->name;

</code>
</pre>


###### Attaching and detaching


```
$contact = Contact::first();
$contact->user()->associate(User::first));
$contact->save();


$contact->user()->dissociate();
$contact->save();

```


##### Relationships with query builder

`$donors = $user->contacts()->where('status','donor')->get();`



### FrontEnd Components


#### Laravel Mix

```
//webpack configuration
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports={
	entry: './src/sass/app.scss',
	module: {
		rules:[
			{
				test:/\.s[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			}
		]
	},

plugins: [
	new MiniCssExtractPlugin({
			path: path.resolve(__dirname, './dist'),
			filename: 'app.css'
		})
]

}

// larave mix configuration
let mix = require('laravel-mix');

mix.sass('resources/sass/app.scss','public/css');


```


##### Enabling source maps


```
let mix = require('laravel-mix');

mix.js('resources/js/app.js','public/js').sourceMaps();

```

##### Concatinating  files


```
let mix = require('laravel-mix');


//processing javascript

mix.js('resources/js/app.js','public/js');

//concatenating scripts
mix.scripts([
	'resources/js/normalize.js',
	'resources/js/app.js',
	],'public/js/all.js');

// concatenating styles
mix.styles([
	'resources/css/normalize.css',
	'resources/css/app.css'
	],'public/css/all.css');
```


### Frontend Presets

- php artisan preset react
- php artisan preset bootstrap
- php artisan preset none



#### Installing a preset

`composer require laravel-frontend-presets/tailwindcss` then `php artisan preset tailwindcss`


#### Pagination

`{{ $posts->links() }}`



### Collection and Handling User Data

- `$request->all()`

- `$request->except()` and `$request->only()` i.e `$request->except('_token');`

-  `$request->has()` i.e `$request->has('utm')`;

-  `$request->input('name')`

- `$request->isMethod('patch')`

- `$request->json()`



#### validating file upload

```
if($request->hasFile('profile_picture') && $request->file('profile_picture')->isValid())
```


### Artisan and Thinker


#### Creating Commands


```
// creating commands

#bash
php artisan make:command ResetUser --command=reset:userreset



#arguments and options

protected $signature = 'password:reset {userId} {--sendEmail}';


# arguments and options with descriptions

protected $signature = 'password:reset {userId} {--sendEmail}';

protected $signature = 'password:reset {userId=1} {--sendEmail}';


# requires value
protected $signature = 'password:reset {userId} {--password=}';


# defining description text

protected $signature = 'password:reset 
						{userId: the Id of the user
						 --sendEmail: wheter to send user an email
						}';

# getting input from user on artisan command

public function handle(){
	// all arguments
	$arguments= $this->arguments();

	//getting specific argument

	$userid = $this->argument('userId');


	// getting all options
	$options = $this->options();

	//getting specific options
	$sendEmail = $this->option('sendEmail');

#prompting user for input
 //ask()

 $email =  $this->ask('What is your email address?');

 //secrets like password

 $password = $this->secret('what is the db password');

 // confirmation yes/no
 if($this->confirm('do you want to delete this user?')){
 	// all answers except Y will be treated as no
 }

 //choice
 $winner = $this->choice('who is the best at singing',['ed sheeran','the weekend'],0)
 $winner = $this->choice('who is the best at singing',['ed'=>ed sheeran','weekend'=>'the weekend'],'ed');

# output

$this->info('Your command has run successfully.')

}

```


#### writing a closure based command


```
// routes/console.php

Artisan::command(
	'password:reset {userId} {--sendEmail}',
	function($userId, $sendEmail){
		$userId = $this->argument('userId');
	}
	)

```

#### calling artisan command with normal code

```
Route::get('test-artisan', function(){
	$exitCode = Artisan::call('password:reset',[
	'userId'=>15,
	'--sendEmail'=>true,
	])
})

```


### Authentication and Authorization


#### Creating auth files


`php artisan make:auth`


- *Authentication* means verify the identity of someone


- *Authorization* means verify if the authenticated user is allowed to perform some act.



##### Authorization


- `can()`


##### Authentication


- `auth()->check()` checks if the user is authenticated or not

- `auth()->id()`

- `auth()->guest()`

- `auth()->user()->id()`

- `auth()->guest()`


##### making user verify their email `Auth::routes(['verify'=>true]);`

##### turning off registration route `Auth::routes(['register'=>false]);`

##### turning off account reset `Auth::routes(['reset'=>false]);`



#### Attemping user authentication


```

// attempting login
if(auth()->attempt([
		'email'=>$request->input('email');
		'password'=>$request->input('password')

	])){
		// handle the successful login 

	}

// attempting login with remmber me token
if(auth()->attempt([
		'email'=>$request->input('email');
		'password'=>$request->input('password');

	]),request()->filled('remember')){
		// handle the successful login 

	}
```


### Policies


#### Making a policy

`php artisan make:policy ContactPolicy`



### Request & Response Object

- `all()` returns all user inputed data

- `input(fieldname)` 

- `only(fiieldName or ['field names'])`

-  `except(fieldName | ['fieldnames']`

-  `exists(fieldname)` or `has(fieldname)`

-  `filled(fieldname)` checks if field exists and is not empty

- `json()` returns json

- `json(keyname)` returns given key in json 


#### Request state methods

- `method(Get,post,patch, etc.)`

- `path()` returns the path

- `url()` returns the url with full domain name

- `is('*b*')` fuzzy matches any character

- `ip()` returns user ip

- `header()` returns an array of the headers


### Redirecting


- `redirect('account/payment')`

- `redirect()->to('account/payment')`

- `redirect()->route('account.payment')`

- `redirect()->action('AccountController@showPayment')`

- `redirect()->away('https://tighten.co');` redirecting to an external domain

- `return back()->withInput('name');`

- `return redirect('dashboard')->with('message','contact created');` and to get message `echo session('message')` in the function






### Middleware


#### Creating a middleware

`php artisan make:middleware BanDeleteMethod`



### Testing




#### Testing Terms



- `Unit Tests` target small, relatively isolated units. class or methods

- `feature tests` tests the way individual unites work together and pass messages

- `application tests` test usually http calls and behavior of the application

- `regression test` usually to test what the user should be able to do



#### Creating test




- `php artisan make:test FailingTest` for creating feature test

- `php artisan make:test SubscriptionTest --unit` for creating unit test


####  Naming tests




Test that will run and the ones that doesn't

```
public function test_it_names_things_well(){
	// runs
}


public function testTtNamesThingsWell(){
	//runs
}

/** @test */

public function it_names_things_well(){
	//runs
}

public function it_names_things_well(){
	// doesn't run
}
```


laravel automatically set your environment to testing when it runs test; it also uses phpunit.xml for it's environment variables or you can make a copy of `.env.example` and rename it to `.env.testing` for phpunit to use that file as the environment variables files.


####  The Testing Traits


- `RefreshDatabase` with `Illuminate\Foundation\Testing\RefreshDatabase` runs migration in your test database at the beginning and wraps each test method with transactions

- `WithoutMiddleware` with `Illuminate\Foundation\Testing\WithouthMiddleware` disable all middleware when running test

- `DatabaseMigrations` with `Illuminate\Foundation\Testing\DatabaseMigrations` runs `php artisan migrate:fresh` before every test runs

- `DatabaseTransactions` with `Illuminate\Foundation\Testing\DatabaseTransactions` wraps every test in database transaction, so it returns them back to exact state after the test ends




### Writing APIs

<br>



#### Making Apic Controllers

`php artisan make:controller Api\DogsController --api`




#### Routing for api



```
Route::namespace('Api')->group(function(){
	Route::apiResource('dogs','DogsController');
	})
```


#### Sending Response Headers in laravel

<pre><code>
	Route::get('dogs',function(){
	return response(Dog::all())->header('x-Greatness-Index',12);
})
</code></pre>


<h4 class="text-2xl mt-4">Reading Request Headers in laravel</h4>

<pre><code>
	Route::get('dogs',function(Request $request){
	var_dump($request->header('Accept'));
})
</code></pre>



<h4 class="text-2xl mt-4">Eloquent Pagination for API</h4>

<pre>
	<code>
		Route::get('dogs',function(){
		retun Dog::paginate(20);
	})

	//  so pagination in api will be
	GET /dogs
	GET /dogs?page=1
	GET /dogs?page=2


	</code>
</pre>


<h4 class="text-2xl mt-4">Api Resources</h4>


<h5 class="text-xl mt-4">Creating APi Resources</h5>

`php artisan make:resource Dog`



### Mail and Notifications

- `php artisan make:mail AssignmentCreated`



#### Mail Markdown components


- button

- panel

- table


#### Queueing Mails

<pre>
	<code>
		Mail::queue(new AssignmentCreate($trainer, $trainee))

		//later()
		$when = now()->addMinutes(30);
		Mail::later($when, new AssignmentCreated($trainer, $trainee));
	</code>
</pre>



#### Notifications

`php artisan make:notification WorkoutAvailable`


##### Sending Notifications

`Notification::send($users, new WorkoutAvailable($workout));`


##### Queueing notificatons

<pre>
	<code>
		$delayUntil = now()->addMinutes(15);
		$user->notify((new WorkoutAvailable($workout))->delay($delayUntil));
	</code>
</pre>