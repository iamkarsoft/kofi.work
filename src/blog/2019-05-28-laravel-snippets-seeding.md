---
layout: post
title:  "Laravel Snippets: Seeding"
date:   2019-05-28 
categories: php laravel snippets
---

### Tip 1. Use updateOrCreate() to avoid double-seeding 

Imagine this seeder code, and imagine if for some reason this seeder would be launched more than once:

{% include codeHeader.html %}
```
public function run()
{
    $items = [            
        ['id' => 1, 'title' => 'Administrator'],
        ['id' => 2, 'title' => 'Simple user'],
    ];

    foreach ($items as $item) {
       Role::updateOrCreate(['id' => $item['id']], $item);
    }
}
```

### Running a seeder by class

`php artisan db:seed --class=UsersTableSeeder`

###  Run Seeder Class From Migration

{% include codeHeader.html %}
```
public function up()
{
    Schema::create('themes', function (Blueprint $table) {
        $table->increments('id');
        $table->text('name');
    });

    Artisan::call('db:seed', [
        '--class' => ThemesTableSeeder::class
    ]);
}
```

### Seeder Factory with Relationship: Use Parent’s Factory
If you use Factories for your seeds, how do you set up relationships between two models? For example, you need to seed 10 companies and 10 contacts within those companies? `database/factories/CompanyFactory.php `

{% include codeHeader.html %}
```
$factory->define(App\Contact::class, function (Faker\Generator $faker) {
    return [
        'company_id' => factory('App\Company')->create()->id,
        'first_name' => $faker->firstName(),
        'last_name' => $faker->lastName,
        'phone1' => $faker->phoneNumber,
        'phone2' => $faker->phoneNumber,
        'email' => $faker->email,
        'skype' => $faker->word,
        'address' => $faker->address,
    ];
});
```

### DatabaseSeeder for Local and Production

{% include codeHeader.html %}
```
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        if (app()->environment() == 'production') {
            $this->call(ThemesTableSeeder::class);
            $this->call(LanguagesTableSeeder::class);
        } else {
            $this->call(UsersTableSeeder::class);
            $this->call(ModulesTableSeeder::class);
            $this->call(ThemesTableSeeder::class);
            $this->call(LanguagesTableSeeder::class);
        }
    }
}
```

<h5>source: <a href="https://laraveldaily.com/10-tips-about-data-seeding-in-laravel/">Laraveldaily.com</a></h5>