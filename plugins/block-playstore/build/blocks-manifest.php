<?php
// This file is generated. Do not modify it manually.
return array(
	'block-games-line' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/block-games-line',
		'version' => '0.1.0',
		'title' => 'Games Line',
		'category' => 'playstore',
		'icon' => 'smiley',
		'description' => 'Dynamic animated line with games',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
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
			'html' => false
		),
		'attributes' => array(
			'memberLink' => array(
				'type' => 'string'
			),
			'cartLink' => array(
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
