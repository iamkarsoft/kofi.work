---
layout: post
title:  "Creating and sending mails in laravel"
date:   2019-05-22 23:48:49 +0000
categories: php laravel 
---

### Creating emails in php 

first of all we create a mailable with php artisan and generating a markdown email templates that can be found in `resources > views > emails > application > applied.blade.php`
<br>
` php artisan make:mail Job/CandidateApplied --markdown=emails.application.applied`

### calling the mail class to send the mail 

<br>

#### calling it with extra arguments

<br>
{% include codeHeader.html %}
```
use Mail;
use App\Mail\Job\InviteCandidate; #  custom mailable class location
    public function mail(User $user, $id){
        $user = User::find($id);
        $message= $request->input('message');
    Mail::to($user)->send(new InviteCandidate($user, $message));
    }
```

<h4>Calling it</h4>

<br>

the mailable class `App > Mail > Job >InviteCandidate.php`

<br>

{% include codeHeader.html %}
```
<?php

namespace App\Mail\Job;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InviteCandidate extends Mailable
{
    use Queueable, SerializesModels;
    public $user;
    public $message;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, $message)
    {
        $this->user = $user;
        $this->message = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Job Interview From App')->markdown('emails.application.invite');
    }
}

```