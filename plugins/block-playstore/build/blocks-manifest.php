<?php
// This file is generated. Do not modify it manually.
return array(
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
				'source' => 'html',
				'selector' => 'h1'
			),
			'subheadline' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'p'
			),
			'buttonText' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'span'
			),
			'buttonColor' => array(
				'type' => 'string'
			)
		),
		'textdomain' => 'block-playstore',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
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
	)
);
