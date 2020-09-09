<?php
/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package eyelevel-wp-plugin
 */

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function video_demo_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = dirname( __FILE__ );

	$index_js = 'video-demo/index.js';
	wp_register_script(
		'video-demo-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-editor'
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'video-demo/editor.css';
	wp_register_style(
		'video-demo-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'video-demo/style.css';
	wp_register_style(
		'video-demo-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'eyelevel-wp-plugin/video-demo', array(
		'editor_script' => 'video-demo-block-editor',
		'editor_style'  => 'video-demo-block-editor',
		'style'         => 'video-demo-block',
	) );
}
add_action( 'init', 'video_demo_block_init' );
