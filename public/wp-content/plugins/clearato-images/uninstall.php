<?php
/**
 * Uninstall script for Clearato Images
 * 
 * This file is executed when the plugin is deleted from WordPress.
 * It cleans up any data or options created by the plugin.
 * 
 * @package Clearato_Images
 */

// If uninstall not called from WordPress, then exit
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// Clean up any plugin-specific options
// Currently, this plugin doesn't create any options, but this is here for future use
// delete_option('clearato_images_settings');

// Note: We don't delete uploaded images from the Media Library
// as they may be in use by posts/pages
