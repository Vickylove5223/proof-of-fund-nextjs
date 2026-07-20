<?php

/**
 * uicore functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package uicore-theme
 */
defined('ABSPATH') || exit;

//Global Constants
define('UICORE_THEME_VERSION', '2.0.0');
define('UICORE_THEME_NAME', 'UiCore Pro');
define('UICORE_FRAMEWORK_VERSION', '6.0.0');

$uicore_includes = array(
	'/setup.php',
	'/default.php',
	'/template-tags.php',
	'/plugin-activation.php'
);

foreach ($uicore_includes as $file) {
	require_once get_template_directory() . '/inc' . $file;
}

//Required
if ( ! isset( $content_width ) ) {
	$content_width = 1000;
}
if ( is_singular() && !class_exists('\UiCore\Core')) {
	wp_enqueue_script( "comment-reply" );
}
function modify_post_title_with_date($title) {
    // Check if we're in the main query and it's a single post
    if (in_the_loop() && is_single() && 'post' === get_post_type()) {
        // Get the post date
        global $post;
        $post_date = get_the_date('F, Y', $post->ID);
        
        // Only add the date if it's not already there
        if (strpos($title, ' as at ') === false) {
            $title = $title . ' as at ' . $post_date;
        }
    }
    return $title;
}
add_filter('the_title', 'modify_post_title_with_date', 10);

//disable element pack self update
function uicore_disable_plugin_updates( $value ) {

    $pluginsToDisable = [
        'bdthemes-element-pack/bdthemes-element-pack.php',
        'metform-pro/metform-pro.php'
    ];

    if ( isset($value) && is_object($value) ) {
        foreach ($pluginsToDisable as $plugin) {
            if ( isset( $value->response[$plugin] ) ) {
                unset( $value->response[$plugin] );
            }
        }
    }
    return $value;
}
add_filter( 'site_transient_update_plugins', 'uicore_disable_plugin_updates' );

