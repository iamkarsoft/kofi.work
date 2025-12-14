---
layout: post
title:  "Learning Tailwind"
date:   2019-09-19 23:48:49 +0000
categories: css laravel course tailwind
---

<h3>Getting started</h3>

```
# npm
npm init -y

# installing tailwind
npm install tailwindcss postcss-cli autoprefixer
```

<h3>Instantiating tailwind  </h3>

```
npx tailwind init
```

### Customizing tailwind with postcss

create file `postcss.config.js`

```
# tells postcss what plugins to use
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}

```

### adding tailwind base styles to your css

create file `css/tailwind.css`


### adding build command

```
# package.json
"scripts": {
    "build": "postcss css/tailwind.css -o public/build/tailwind.css"
  },
```

### first styling with tailwind

```
<h1 class="text-4xl font-bold text-center text-blue-500">Hello world</h1>
```
### using tailwind utility classes

```
<body class="bg-gray-100">
  <div class="px-8 py-12 max-w-md  ">
  <img class="h-20" src="https://res.cloudinary.com/karsoft92/image/upload/v1548888233/logo_transparent.png" alt="">
  <img class="mt-6 rouded-lg shadow-xl" src="https://images.unsplash.com/photo-1556911073-52527ac43761" alt="" width="100%" height="100%">
  <h1 class="mt-6 text-2xl font-bold text-gray-800 leading-tight "><span class="text-indigo-500">You can work from anywhere. Take advantage of it</span></h1>
  <p class="mt-2 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur itaque, mollitia excepturi, autem dolor porro maiores numquam tempora sit, qui similique laborum vitae necessitatibus quidem sint aliquam nostrum dignissimos iste id placeat illo. Pariatur molestias, expedita voluptate aliquid earum ea!</p>
  <div class="mt-2">
    <a href="#" class="inline-block bg-indigo-500 text-white px-5 py-3 shadow-lg uppercase tracking-wider font-semibold text-sm hover:bg-indigo-400 rounded-lg">Book your escape</a>
  </div>
  </div>
</body>
```

### Making the previous design responsive


```
<body class="bg-gray-100">
  <div class="px-8 py-12 max-w-md mx-auto sm:max-w-xl ">
  <img class="h-20" src="https://res.cloudinary.com/karsoft92/image/upload/v1548888233/logo_transparent.png" alt="">
  <img class="mt-6 sm:mt-8 sm:h-64 sm:w-full sm:object-cover sm:object-center rounded-lg shadow-xl" src="https://images.unsplash.com/photo-1556911073-52527ac43761" alt="" >
  <h1 class="mt-6 text-2xl font-bold text-gray-800 leading-tight sm:text-4xl  ">You can work from anywhere. <span class="text-indigo-500">Take advantage of it</span></h1>
  <p class="mt-2 text-gray-600 sm:text-xl sm:mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur itaque, mollitia excepturi, autem dolor porro maiores numquam tempora sit, qui similique laborum vitae necessitatibus quidem sint aliquam nostrum dignissimos iste id placeat illo. Pariatur molestias, expedita voluptate aliquid earum ea!</p>
  <div class="mt-4 sm:mt-6">
    <a href="#" class="inline-block bg-indigo-500 text-white px-5 py-3 shadow-lg uppercase tracking-wider font-semibold text-sm hover:bg-indigo-400 rounded-lg sm:text-base">Book your escape</a>
  </div>
  </div>

</body>
```


### Making it further responsive

```
<body class="bg-gray-300">
  <div class="flex bg-gray-100">
  <div class="px-8 lg:w-1/2 py-12  lg:max-w-full max-w-md mx-auto sm:max-w-xl lg:px-24 lg:px-12 ">
    <div class="xl:max-w-lg xl:ml-auto">
  <img class="h-20" src="https://res.cloudinary.com/karsoft92/image/upload/v1548888233/logo_transparent.png" alt="">
  <img class="mt-6 lg:hidden lg:text-3xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover sm:object-center rounded-lg shadow-xl" src="https://images.unsplash.com/photo-1556911073-52527ac43761" alt="" >
  <h1 class="mt-6 text-2xl font-bold text-gray-800 leading-tight sm:text-4xl  xl:text-4xl">You can work from anywhere. <span class="text-indigo-500"><br class="hidden lg:inline">Take advantage of it</span></h1>
  <p class="mt-2 text-gray-600 sm:text-xl sm:mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur itaque, mollitia excepturi, autem dolor porro maiores numquam tempora sit, qui similique laborum vitae necessitatibus quidem sint aliquam nostrum dignissimos iste id placeat illo. Pariatur molestias, expedita voluptate aliquid earum ea!</p>
  <div class="mt-4 sm:mt-6">
    <a href="#" class="inline-block bg-indigo-500 text-white px-5 py-3 shadow-lg uppercase tracking-wider font-semibold text-sm hover:bg-indigo-400 rounded-lg sm:text-base">Book your escape</a>
  </div>
    </div>
  </div>
<div class="hidden lg:block lg:w-1/2 lg:relative">
  <img class="mt-6 sm:mt-8 sm:h-64 sm:w-full absolute inset-0 h-full w-full  object-cover object-center sm:object-cover sm:object-center rounded-lg shadow-xl" src="https://images.unsplash.com/photo-1556911073-52527ac43761" alt="" >
</div>
  </div>
</body>
```

