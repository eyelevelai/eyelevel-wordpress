<?php
/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package eyelevel-wp-plugin
 */
function pricing_grid_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = dirname( __FILE__ );

	$index_js = 'pricing-grid/index.js';
	wp_register_script(
		'pricing-grid-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-editor'
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'pricing-grid/editor.css';
	wp_register_style(
		'pricing-grid-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'pricing-grid/style.css';
	wp_register_style(
		'pricing-grid-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	$block_js = 'pricing-grid/block.js';
	wp_register_script(
        'pricing-grid-block',
        plugins_url( $block_js, __FILE__ ),
        array('jquery'),
        filemtime( "$dir/$block_js" )
    );

	register_block_type( 'eyelevel-wp-plugin/pricing-grid', array(
		'editor_script' => 'pricing-grid-block-editor',
		'editor_style'  => 'pricing-grid-block-editor',
		'style'         => 'pricing-grid-block',
		'script'        => 'pricing-grid-block',
	) );
}
add_action( 'init', 'pricing_grid_block_init' );
