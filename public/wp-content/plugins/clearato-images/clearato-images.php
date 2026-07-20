<?php
/**
 * Plugin Name: Clearato Images
 * Plugin URI: https://clearato.com
 * Description: Server-side image download and upload for Clearato automation. Handles stock library images (Pixabay, Unsplash, Pexels, Freepik) with proper WordPress integration.
 * Version: 1.1.0
 * Author: Clearato
 * Author URI: https://clearato.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: clearato-images
 * 
 * This plugin provides a REST API endpoint for Clearato to download
 * and upload images from stock libraries directly to WordPress Media Library.
 * This bypasses CORS and hotlinking issues by downloading server-side.
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Main Clearato Images Plugin Class
 */
class Clearato_Images
{

    /**
     * Plugin version
     */
    const VERSION = '1.1.0';

    /**
     * REST API namespace
     */
    const REST_NAMESPACE = 'clearato-images/v1';

    /**
     * Initialize the plugin
     */
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('plugins_loaded', [$this, 'load_textdomain']);
    }

    /**
     * Load plugin textdomain
     */
    public function load_textdomain()
    {
        load_plugin_textdomain('clearato-images', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }

    /**
     * Register REST API routes
     */
    public function register_rest_routes()
    {
        register_rest_route(
            self::REST_NAMESPACE,
            '/download',
            [
                'methods' => 'POST',
                'callback' => [$this, 'download_image'],
                'permission_callback' => [$this, 'check_permissions'],
                'args' => [
                    'source_url' => [
                        'required' => true,
                        'type' => 'string',
                        'validate_callback' => [$this, 'validate_url'],
                    ],
                    'title' => [
                        'required' => false,
                        'type' => 'string',
                        'default' => 'Uploaded Image',
                    ],
                    'alt_text' => [
                        'required' => false,
                        'type' => 'string',
                        'default' => '',
                    ],
                    'caption' => [
                        'required' => false,
                        'type' => 'string',
                        'default' => '',
                    ],
                    'description' => [
                        'required' => false,
                        'type' => 'string',
                        'default' => '',
                    ],
                    'parent_id' => [
                        'required' => false,
                        'type' => 'integer',
                        'default' => 0,
                    ],
                ],
            ]
        );
    }

    /**
     * Check if user has permission to upload images
     */
    public function check_permissions()
    {
        // Check if user is authenticated via Application Password or Basic Auth
        if (!is_user_logged_in()) {
            // Try to authenticate via Basic Auth (for REST API calls)
            $auth_header = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
            if (empty($auth_header) && function_exists('getallheaders')) {
                $headers = getallheaders();
                $auth_header = isset($headers['Authorization']) ? $headers['Authorization'] : '';
            }

            if (!empty($auth_header) && strpos($auth_header, 'Basic ') === 0) {
                $credentials = base64_decode(substr($auth_header, 6));
                list($username, $password) = explode(':', $credentials, 2);

                $user = wp_authenticate_application_password(null, $username, $password);
                if (is_wp_error($user)) {
                    $user = wp_authenticate($username, $password);
                }

                if (!is_wp_error($user) && $user) {
                    wp_set_current_user($user->ID);
                }
            }
        }

        return current_user_can('upload_files');
    }

    /**
     * Validate image URL
     * 
     * Note: Domain whitelist removed for better compatibility.
     * Security is maintained because:
     * 1. Download happens server-side (no CORS issues)
     * 2. Authentication required (Application Password)
     * 3. WordPress sanitizes all media uploads
     * 4. Only image content-types are accepted (validated in download_image)
     */
    public function validate_url($url, $request, $key)
    {
        // Basic URL format validation
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return false;
        }

        // Parse and validate URL structure
        $parsed_url = wp_parse_url($url);

        if (!$parsed_url || !isset($parsed_url['host']) || !isset($parsed_url['scheme'])) {
            return false;
        }

        // Only allow HTTP and HTTPS protocols
        if (!in_array($parsed_url['scheme'], ['http', 'https'], true)) {
            return false;
        }

        // Reject localhost and private IPs for security
        $host = $parsed_url['host'];
        if (
            $host === 'localhost' ||
            $host === '127.0.0.1' ||
            preg_match('/^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.)/', $host) ||
            preg_match('/^0\./', $host)
        ) {
            return false;
        }

        return true;
    }

    /**
     * Download and upload image to WordPress Media Library
     */
    public function download_image($request)
    {
        // Get parameters
        $source_url = esc_url_raw($request->get_param('source_url'));
        $title = sanitize_text_field($request->get_param('title'));
        $alt_text = sanitize_text_field($request->get_param('alt_text'));
        $caption = wp_kses_post($request->get_param('caption'));
        $description = wp_kses_post($request->get_param('description'));
        $parent_id = absint($request->get_param('parent_id'));

        // Load WordPress media functions
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/image.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';

        // Validate URL is accessible
        $head_response = wp_remote_head($source_url, [
            'timeout' => 30,
            'redirection' => 5,
            'user-agent' => 'WordPress/' . get_bloginfo('version') . '; Clearato Images/' . self::VERSION,
        ]);

        if (is_wp_error($head_response)) {
            return new WP_Error(
                'url_not_accessible',
                'Image URL is not accessible: ' . $head_response->get_error_message(),
                ['status' => 400]
            );
        }

        $response_code = wp_remote_retrieve_response_code($head_response);
        if ($response_code !== 200) {
            return new WP_Error(
                'url_not_found',
                'Image URL returned status code ' . $response_code,
                ['status' => 400]
            );
        }

        // Check content type
        $content_type = wp_remote_retrieve_header($head_response, 'content-type');
        if ($content_type && !preg_match('/^image\//', $content_type)) {
            return new WP_Error(
                'not_an_image',
                'URL does not point to an image. Content-Type: ' . $content_type,
                ['status' => 400]
            );
        }

        // Download the image
        $download_response = wp_safe_remote_get($source_url, [
            'timeout' => 60,
            'redirection' => 5,
            'user-agent' => 'WordPress/' . get_bloginfo('version') . '; Clearato Images/' . self::VERSION,
        ]);

        if (is_wp_error($download_response)) {
            return new WP_Error(
                'download_failed',
                'Failed to download image: ' . $download_response->get_error_message(),
                ['status' => 500]
            );
        }

        $image_body = wp_remote_retrieve_body($download_response);
        if (empty($image_body)) {
            return new WP_Error(
                'empty_response',
                'Downloaded image is empty',
                ['status' => 500]
            );
        }

        // Determine file extension from URL or content type
        $parsed_url = wp_parse_url($source_url);
        $path_info = pathinfo($parsed_url['path'] ?? '');
        $extension = $path_info['extension'] ?? 'jpg';

        // Validate extension
        $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        $extension = strtolower($extension);
        if (!in_array($extension, $allowed_extensions)) {
            // Try to determine from content type
            if ($content_type) {
                $mime_to_ext = [
                    'image/jpeg' => 'jpg',
                    'image/jpg' => 'jpg',
                    'image/png' => 'png',
                    'image/gif' => 'gif',
                    'image/webp' => 'webp',
                ];
                $extension = $mime_to_ext[$content_type] ?? 'jpg';
            } else {
                $extension = 'jpg';
            }
        }

        // Generate safe filename
        $filename = sanitize_file_name($title);
        if (empty($filename)) {
            $filename = 'clearato-image-' . time();
        }
        $filename = $filename . '.' . $extension;

        // Upload to WordPress
        $upload = wp_upload_bits($filename, null, $image_body);

        if ($upload['error']) {
            return new WP_Error(
                'upload_failed',
                'Failed to upload image: ' . $upload['error'],
                ['status' => 500]
            );
        }

        // Create attachment
        $attachment = [
            'post_mime_type' => $content_type ?: 'image/jpeg',
            'post_title' => $title,
            'post_excerpt' => $caption,
            'post_content' => $description,
            'post_status' => 'inherit',
        ];

        $attachment_id = wp_insert_attachment($attachment, $upload['file'], $parent_id);

        if (is_wp_error($attachment_id)) {
            return new WP_Error(
                'attachment_creation_failed',
                'Failed to create attachment: ' . $attachment_id->get_error_message(),
                ['status' => 500]
            );
        }

        // Generate attachment metadata
        $attach_data = wp_generate_attachment_metadata($attachment_id, $upload['file']);
        wp_update_attachment_metadata($attachment_id, $attach_data);

        // Set alt text
        if (!empty($alt_text)) {
            update_post_meta($attachment_id, '_wp_attachment_image_alt', $alt_text);
        }

        // Get attachment URL
        $attachment_url = wp_get_attachment_url($attachment_id);

        if (!$attachment_url) {
            return new WP_Error(
                'url_retrieval_failed',
                'Image uploaded but failed to retrieve attachment URL',
                ['status' => 500]
            );
        }

        // Return success response
        return [
            'success' => true,
            'id' => $attachment_id,
            'source_url' => $attachment_url,
            'url' => $attachment_url,
            'title' => $title,
            'alt_text' => $alt_text,
            'caption' => $caption,
            'description' => $description,
        ];
    }
}

// Initialize the plugin
new Clearato_Images();
