=== Clearato Images ===
Contributors: clearato
Tags: images, stock photos, automation, clearato
Requires at least: 5.0
Tested up to: 6.4
Stable tag: 1.1.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Server-side image download and upload for Clearato automation. Handles stock library images with proper WordPress integration.

== Description ==

Clearato Images is a WordPress plugin that enables server-side image downloads and uploads for Clearato automation. This plugin handles stock library images (Pixabay, Unsplash, Pexels, Freepik) by downloading them server-side, bypassing CORS and hotlinking issues.

= Features =

* REST API endpoint for automated image uploads
* Server-side image downloads (bypasses CORS/hotlinking)
* Accepts any valid HTTP/HTTPS image URL
* WordPress Media Library integration
* Support for Pixabay, Unsplash, Pexels, Freepik, and custom URLs
* AI-generated images from Gemini/OpenAI supported

= How It Works =

The plugin provides a REST API endpoint that:
1. Receives image URLs from Clearato
2. Validates URLs (blocks localhost/private IPs for security)
3. Downloads images server-side (bypassing CORS/hotlinking)
4. Uploads images to WordPress Media Library
5. Returns the WordPress media URL

== Installation ==

1. Upload the `clearato-images` folder to `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' menu in WordPress
3. The REST API endpoint will be available at `/wp-json/clearato-images/v1/download`

== Frequently Asked Questions ==

= Do I need to configure anything? =

No, the plugin works out of the box. Just activate it and Clearato will automatically use it.

= What image sources are supported? =

The plugin supports images from any valid HTTP/HTTPS URL, including:
* Pixabay
* Unsplash
* Pexels
* Freepik
* Gemini/OpenAI AI-generated images
* Custom URLs
* Supabase Storage

= How do I authenticate? =

Use WordPress Application Password with Basic Auth header:
`Authorization: Basic BASE64(username:app_password)`

== Changelog ==

= 1.1.0 =
* Removed restrictive domain whitelist for better compatibility
* Now accepts any valid HTTP/HTTPS image URL
* Added security checks for localhost/private IP blocking
* AI-generated images from Gemini/OpenAI now supported

= 1.0.0 =
* Initial release
* REST API endpoint for image downloads
* Support for major stock libraries
* Server-side download functionality

== Upgrade Notice ==

= 1.1.0 =
Important update! Fixes issues with stock images and AI-generated images not uploading. Update recommended for all users.
