---
layout: post
title:  "Create Gutenberg block with ACF"
date:   2024-01-15
categories: wordpress wp acf 
---


## Register block function in `functions.php` and call it


{% include codeHeader.html %}
```php

/** Custom Blocks */

  

if (function_exists('acf_register_block_type')){
	add_action('acf/init', 'register_acf_block_types');
}

  

function register_acf_block_types(){

	acf_register_block_type(
		array(
		'name' =>'two-columns-content',
		'title' => __('two-columns-content','bahaigh'),
		'render_template' => 'template-parts/blocks/two-columns-content.php',
		'icon' => 'marker',
		'mode'=> 'edit',
		'keywords' => array('content','two-columns', 'two columns'),
	));
}
```


## Build your view or block template

```php

<section class="w-full grid grid-cols-2 gap-4">
    <div class="">
        <?php the_field('left_column') ?>
    </div>

    <div class="">
        <?php the_field('right_column'); ?>
    </div>
</section>
```