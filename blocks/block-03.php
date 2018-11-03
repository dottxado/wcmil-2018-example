<?php
/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package wcmil-2018-example
 */

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * @see https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type/#enqueuing-block-scripts
 */
function block_03_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = dirname( __FILE__ );

	$index_js = 'block-03/index.js';
	wp_register_script(
		'block-03-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		),
		filemtime( "$dir/$index_js" ),
		false
	);

	$editor_css = 'block-03/editor.css';
	wp_register_style(
		'block-03-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'block-03/style.css';
	wp_register_style(
		'block-03-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type(
		'wcmil-2018-example/block-03',
		array(
			'editor_script' => 'block-03-block-editor',
			'editor_style'  => 'block-03-block-editor',
			'style'         => 'block-03-block',
		)
	);
}

add_action( 'init', 'block_03_block_init' );
