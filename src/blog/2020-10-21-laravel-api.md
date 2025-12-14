---
layout: post
title:  "Working with api's"
date:   2020-10-21 19:34:49 +0000
categories: api javascript laravel
---

# API's

## Laravel / PHP

#### Register User

- Create Controller

  ```php
  
  
  ### Register COntroller
  
      public function register(StoreUserRequest $request)
      {
          $user = new User;
  
          $user->username = $request->username;
          $user->email = $request->email;
          $user->password = bcrypt($request->password);
  
          $user->save();
  
          return fractal()
          ->item($user)
          ->transformWith(new UserTransformer)
          ->toArray();
      }
  ```

  

- create route

  ```php
  Route::get('/user', function (Request $request) {
      return $request->user();
  })->middleware('auth:api');
  
  Route::post('/register', 'RegisterController@register');
  
  ```

  

- create and fill request file

  ```php
  ### User Request
  class StoreUserRequest extends FormRequest
  {
      /**
       * Determine if the user is authorized to make this request.
       *
       * @return bool
       */
      public function authorize()
      {
          return true;
      }
  
      /**
       * Get the validation rules that apply to the request.
       *
       * @return array
       */
      public function rules()
      {
          return [
              'username'=>'required|max:30',
              'email'=>'required|email|max:225|unique:users',
              'password'=>'required|min:6'
          ];
      }
  
  ```

  

- set headers for  api access `Accept` to `application/json` and `Content-type` to `application/json`

- register account in api

    ```json
    // creating user
    {
      "username": "alex",
      "email":"alex@codecourse.com",
       "password":"hellofresh"
    }
    ```
    
- pull in laravel passport and add to service providers `composer require laravel/passport`

    ```php
    # config/app.php
     /*
             * Package Service Providers...
             */
            Laravel\Passport\PassportServiceProvider::class,
    ```

- Migrate tables `php artisan migrate` and install passport routes `php artisan passport:install`

- pull in use `hasApi` into user Model

- register the routes in auth service provider

    ```
    #in boot method
    passport::routes();
    ```

#### Get authentication token

- authenticate user by generating token

  ```json
  //endpoint /oauth/token
  {
    "grant_type": "password",
    "client_id": "2", // found in oauth clients table
    "client_secret":"M4MHPaIWrCi2rUkZLch1ViaBCPRpEK8GhcFjOhM9", // found in oauth clients table
  	"username": "kofi@kofi.work",
  	"password": "hellofresh",
  	"scope":"*"
  }
  ```

- getting user details

  ```json
  // endpoin /api/user
  // get the bearer and add Authorization `bearer bearer code`
  
  {
    "id": 1,
    "username": "kofi romeo",
    "email": "kofi@kofi.work",
    "email_verified_at": null,
    "created_at": "2020-03-19 06:56:08",
    "updated_at": "2020-03-19 06:56:08"
  }
  
  ```

- Using fractal. a spatie package to present data in a better way

  1. create a `Transformers` in your `app` folder

  2.  create your file i.e `UserTransofrm.php`

     ```php
     namespace App\Transformers;
     
     use App\User; // the model you want to display
     use League\Fractal\TransformerAbstract;
     
     class UserTransformer extends TransformerAbstract
     {
         public function transform(User $user)
         {
             //return the things you want to return
             return[
                 'username'=>$user->username,
                 'avatar' =>$user->avatar(),
             ];
         }
     }
     
     ```

  3. Now displaying the info in the controller

     ```php
     public function register(StoreUserRequest $request)
         {
             $user = new User;
     
             $user->username = $request->username;
             $user->email = $request->email;
             $user->password = bcrypt($request->password);
     
             $user->save(); //creating and saving user in database
     		
         // using fractal to display information about the user
             return fractal()
             ->item($user)
             ->transformWith(new UserTransformer)// pull in transformer
             ->toArray();
         }
     ```

- Using auth api to authenticate and permission

  ```php
  Route::group(['prefix' => 'topics'], function () {
      Route::post('/', 'TopicController@store')->middleware('auth:api');
  });
  
  ```

- creating topic transformers

  ```php
  // tranformers/topictransformer
  <?php
  
  namespace App\Transformers;
  
  use App\Topic;
  use League\Fractal\TransformerAbstract;
  
  class TopicTransformer extends TransformerAbstract {
  	protected $availableIncludes = ['user','posts']; // include them on call
  //    protected $availableIncludes = ['user']; // to include them autom
  	public function transform(Topic $topic) {
  		return [
  			'id' => $topic->id,
  			'title' => $topic->title,
  			'created_at' => $topic->created_at->toDateTImeString(),
  			'created_at_human' => $topic->created_at->diffForHumans(),
  		];
  	}
  
  	public function includeUser(Topic $topic) {
  		return $this->item($topic->user, new UserTransformer);
  	}
      
      //we return a collection because of the relationship between post and topic
      public function includePosts(Topic $topic){
      return $this->collection($topic->posts,new PostTransformer)
    }
}
  
  //========================================== inside the controller
  // topicController
  <?php
  
  namespace App\Http\Controllers;
  
  use App\Http\Requests\StoreTopicRequest;
  use App\Post;
  use App\Topic;
  use App\Transformers\TopicTransformer;
  
  class TopicController extends Controller {
  	public function store(StoreTopicRequest $request) {
  		$topic = new Topic;
  		$topic->title = $request->title;
  		$topic->user()->associate($request->user());
  
  		$post = new Post();
  		$post->body = $request->body;
  		$post->user()->associate($request->user());
  
  		$topic->save();
  		$topic->posts()->save($post);
  
  		return fractal()
  			->item($topic)
  			->parseIncludes(['user'])// available include from transformer
  			->transformWith(new TopicTransformer)
  			->toArray();
  	}
  }
  
  ```
  
- getting topics

  ```php
  public function index() {
  		$topics = Topic::LatestFirst()->paginate(3);
  		$topicsCollection = $topics->getCollection();
  
  		return fractal()
  			->collection($topics)
  			->parseIncludes(['user'])
  			->transformWith(new TopicTransformer)
  			->toArray();
  	}
  
  // getting with pagination collection
  use League\Fractal\Pagination\IlluminatePaginatorAdapter;
  
  class TopicController extends Controller {
  	public function index() {
  		$topics = Topic::LatestFirst()->paginate(3);
  		$topicsCollection = $topics->getCollection();
  
  		return fractal()
  			->collection($topicsCollection)
  			->parseIncludes(['user'])
  			->transformWith(new TopicTransformer)
  			->paginateWith(new IlluminatePaginatorAdapter($topics))
  			->toArray();
  	}
  ```

- Showing a topic

  ```php
  // using route model binding
  public function show(Topic $topic) {
  		return fractal()
  			->item($topic)
  			->parseIncludes(['user', 'posts', 'posts.user'])
  			->transformWith(new TopicTransformer)
  			->toArray();
  	}
  ```

- Update Topic

  ```php
  public function update(UpdateTopicRequest $request, Topic $topic) {
  		//policy
  		$topic->title = $request->get('title', $topic->title);
  		$topic->save();
  
  		return fractal()
  			->item($topic)
  			->parseIncludes(['user'])
  			->transformWith(new TopicTransformer)
  			->toArray();
  	}
  ```

- Create policy to prevent anyone from updating other peoples post

  1. create policy  `php artisan make:policy  TopicPolicy`

  2. register policy in `AuthServiceProvider.php`

     ```php
     protected $policies = [
     		// 'App\Model' => 'App\Policies\ModelPolicy',
     		'App\Topic' => 'App\Policies\TopicPolicy',
     	];
     ```

  3. use policy  in function

     ```php
     public function update(UpdateTopicRequest $request, Topic $topic) {
     		$this->authorize('update', $topic); //policy
     		$topic->title = $request->get('title', $topic->title);
     		$topic->save();
     
     		return fractal()
     			->item($topic)
     			->parseIncludes(['user'])
     			->transformWith(new TopicTransformer)
     			->toArray();
     	}
     ```

  4.  create topic authorization function in user model used in the policy i.e. `ownsTopic`

     ```php
     public function ownsTopic(Topic $topic) {
     		return $this->id === $topic->user_id;
     	}
     ```

- Deleting topic

## Node JS


