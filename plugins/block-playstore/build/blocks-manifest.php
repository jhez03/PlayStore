<?php
// This file is generated. Do not modify it manually.
return array(
	'block-cta' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/block-cta',
		'version' => '0.1.0',
		'title' => 'Block Playstore Cta',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'A block for cta',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'header' => array(
				'type' => 'string',
				'default' => 'Header Title'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'description'
			),
			'backgroundUrl' => array(
				'type' => 'string'
			),
			'ctaIcon' => array(
				'type' => 'string'
			),
			'ctaImage' => array(
				'type' => 'string'
			),
			'ctaButtons' => array(
				'type' => 'array',
				'default' => array(
					
				),
				'items' => array(
					'type' => 'object',
					'properties' => array(
						'label' => array(
							'type' => 'string'
						),
						'url' => array(
							'type' => 'string'
						)
					)
				)
			)
		),
		'textdomain' => 'block-playstore',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'block-featured-games' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/block-featured-games',
		'version' => '0.1.1',
		'title' => 'Playstore Featuer Games',
		'category' => 'gamestore',
		'icon' => 'layout',
		'description' => 'A block to display featured games from the Playstore.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'innerBlocks' => true
		),
		'attributes' => array(
			'header' => array(
				'type' => 'string'
			),
			'description' => array(
				'type' => 'string'
			),
			'count' => array(
				'type' => 'number',
				'default' => 6
			)
		),
		'textdomain' => 'block-playstore',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'render' => 'file:./render.php',
		'style' => 'file:./style-index.css'
	),
	'block-games-line' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/block-games-line',
		'version' => '0.1.1',
		'title' => 'Playstore Games Line',
		'category' => 'gamestore',
		'icon' => 'layout',
		'description' => 'A block to display a line of games from the Playstore.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'innerBlocks' => true
		),
		'attribues' => array(
			'games' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'textdomain' => 'block-playstore',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'render' => 'file:./render.php',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'block-header' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/block-header',
		'version' => '0.1.1',
		'title' => 'Header',
		'category' => 'gamestore',
		'icon' => 'layout',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'innerBlocks' => true
		),
		'attributes' => array(
			'memberLink' => array(
				'type' => 'string'
			),
			'cartLink' => array(
				'type' => 'string'
			),
			'logo' => array(
				'type' => 'object'
			),
			'selectedMenu' => array(
				'type' => 'string',
				'default' => ''
			),
			'menuItems' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'textdomain' => 'block-playstore',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'render' => 'file:./render.php',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'block-hero' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/block-hero',
		'version' => '0.1.0',
		'title' => 'Playstore Hero',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Block for displaying a hero section with a Playstore link.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'backgroundType' => array(
				'type' => 'string',
				'default' => 'image'
			),
			'backgroundUrl' => array(
				'type' => 'string'
			),
			'backgroundId' => array(
				'type' => 'number'
			),
			'headline' => array(
				'type' => 'string',
				'selector' => 'h1'
			),
			'subheadline' => array(
				'type' => 'string',
				'selector' => 'p'
			),
			'buttonText' => array(
				'type' => 'string',
				'selector' => 'span'
			),
			'buttonColor' => array(
				'type' => 'string'
			),
			'partners' => array(
				'type' => 'array',
				'default' => array(
					
				),
				'items' => array(
					'type' => 'object',
					'properties' => array(
						'type' => array(
							'type' => 'string'
						),
						'value' => array(
							'type' => 'string'
						),
						'darkValue' => array(
							'type' => 'string'
						),
						'style' => array(
							'type' => 'string'
						),
						'subValue' => array(
							'type' => 'string'
						)
					)
				)
			)
		),
		'textdomain' => 'block-playstore',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'render' => 'file:./render.php',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'block-news' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/block-news',
		'version' => '0.1.1',
		'title' => 'Playstore News',
		'category' => 'gamestore',
		'icon' => 'layout',
		'description' => 'A block to display news from the Playstore.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'innerBlocks' => true
		),
		'attributes' => array(
			'newsCount' => array(
				'type' => 'number',
				'default' => 3
			),
			'header' => array(
				'type' => 'string'
			),
			'description' => array(
				'type' => 'string'
			),
			'backgroundUrl' => array(
				'type' => 'string'
			)
		),
		'textdomain' => 'block-playstore',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'render' => 'file:./render.php',
		'style' => 'file:./style-index.css'
	),
	'block-playstore' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/block-playstore',
		'version' => '0.1.0',
		'title' => 'Block Playstore',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'block-playstore',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'block-subscribe' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/block-subscribe',
		'version' => '0.1.0',
		'title' => 'Playstore Subscribe',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'A block that allows users to subscribe to a newsletter.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'backgroundUrl' => array(
				'type' => 'string'
			),
			'shortCode' => array(
				'type' => 'string'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Subscribe to our newsletter'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Get the latest updates and offers directly in your inbox.'
			),
			'headingColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'descriptionColor' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'block-playstore',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'render' => 'file:./render.php',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
