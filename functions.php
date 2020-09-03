<?php
add_action( 'after_setup_theme', 'eyelevel_setup' );
function eyelevel_setup() {
load_theme_textdomain( 'eyelevel', get_template_directory() . '/languages' );
add_theme_support( 'title-tag' );
add_theme_support('post-thumbnails', array(
  'post'
));
function wpb_autolink_featured_images( $html, $post_id, $post_image_id ) {
  $html = '<a class="img-link" href="' . get_permalink( $post_id ) . '" title="' . esc_attr( get_the_title( $post_id ) ) . '">' . $html . '</a>';
  return $html;
}
add_filter( 'post_thumbnail_html', 'wpb_autolink_featured_images', 10, 3 );
global $content_width;
if ( ! isset( $content_width ) ) { $content_width = 1920; }
register_nav_menus( array( 'main-menu' => esc_html__( 'Main Menu', 'eyelevel' ) ) );
}
add_action( 'wp_enqueue_scripts', 'eyelevel_load_scripts' );
function eyelevel_load_scripts() {
wp_enqueue_style( 'eyelevel-style', get_stylesheet_uri() );
wp_enqueue_script( 'jquery' );
}
add_action( 'wp_footer', 'eyelevel_footer' );
function eyelevel_footer() {
?>
  <script>
    jQuery(document).ready(function ($) {
      var deviceAgent = navigator.userAgent.toLowerCase();
      if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
        $("html").addClass("ios");
        $("html").addClass("mobile");
      }
      if (navigator.userAgent.search("MSIE") >= 0) {
        $("html").addClass("ie");
      } else if (navigator.userAgent.search("Chrome") >= 0) {
        $("html").addClass("chrome");
      } else if (navigator.userAgent.search("Firefox") >= 0) {
        $("html").addClass("firefox");
      } else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        $("html").addClass("safari");
      } else if (navigator.userAgent.search("Opera") >= 0) {
        $("html").addClass("opera");
      }
    });
</script>
<?php
  printf( '<script type="text/javascript" src="%s" />' . "\n", esc_url( get_theme_file_uri( 'assets/js/main.js?v=4.3' ) ) );
}
add_filter( 'document_title_separator', 'eyelevel_document_title_separator' );
function eyelevel_document_title_separator( $sep ) {
$sep = '|';
return $sep;
}
add_filter( 'the_content_more_link', 'eyelevel_read_more_link' );
function eyelevel_read_more_link() {
if ( ! is_admin() ) {
return ' <a href="' . esc_url( get_permalink() ) . '" class="more-link">...</a>';
}
}
add_filter( 'excerpt_more', 'eyelevel_excerpt_read_more_link' );
function eyelevel_excerpt_read_more_link( $more ) {
if ( ! is_admin() ) {
global $post;
return ' <a href="' . esc_url( get_permalink( $post->ID ) ) . '" class="more-link">...</a>';
}
}
add_filter( 'intermediate_image_sizes_advanced', 'eyelevel_image_insert_override' );
function eyelevel_image_insert_override( $sizes ) {
unset( $sizes['medium_large'] );
return $sizes;
}
add_action( 'widgets_init', 'eyelevel_widgets_init' );
function eyelevel_widgets_init() {
register_sidebar( array(
'name' => esc_html__( 'Sidebar Widget Area', 'eyelevel' ),
'id' => 'primary-widget-area',
'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
'after_widget' => '</li>',
'before_title' => '<h3 class="widget-title">',
'after_title' => '</h3>',
) );
}

add_action( 'wp_head', 'eyelevel_header' );
function eyelevel_header() {
  global $post;

  if ( is_singular() && pings_open() ) {
    printf( '<link rel="pingback" href="%s" />' . "\n", esc_url( get_bloginfo( 'pingback_url' ) ) );
  }

  printf( '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500,600,700&display=swap" />' . "\n" );
  printf( '<link rel="stylesheet" href="%s" />' . "\n", esc_url( get_theme_file_uri( 'assets/css/style.css?v=2.7' ) ) );
  printf( '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />' . "\n" );

  if (is_page() || is_single()) {
    if (
      strpos($post->post_name, 'resources') > -1
      || strpos($post->post_name, 'demo') > -1
      || strpos($post->post_name, 'case-studies') > -1
      || strpos($post->post_name, 'article') > -1
      || strpos($post->post_name, 'privacy-policy') > -1
      || strpos($post->post_name, 'terms-of-use') > -1
    ) {
      printf( '<link rel="stylesheet" href="%s" />' . "\n", esc_url( get_theme_file_uri( 'assets/css/resources.css?v=1.0' ) ) );
    }
    if (
      strpos($post->post_name, 'demo') > -1
      || strpos($post->post_name, 'privacy-policy') > -1
      || strpos($post->post_name, 'terms-of-use') > -1
      || (strpos($post->post_name, 'case-studies') > -1 && $post->post_name != 'case-studies')
      || (strpos($post->post_name, 'article') > -1 && $post->post_name != 'articles')
    ) {
      printf( '<link rel="stylesheet" href="%s" />' . "\n", esc_url( get_theme_file_uri( 'assets/css/article.css?v=1.0' ) ) );
    }
    if (
      strpos($post->post_name, 'intercom') > -1
      || strpos($post->post_name, 'slack') > -1
    ) {
      printf( '<link rel="stylesheet" href="%s" />' . "\n", esc_url( get_theme_file_uri( 'assets/css/integration.css?v=1.0' ) ) );
    }
    if (
      strpos($post->post_name, 'tour') > -1
      || strpos($post->post_name, 'pdf') > -1
      || strpos($post->post_name, 'linkedin') > -1
    ) {
      printf( '<link rel="stylesheet" href="%s" />' . "\n", esc_url( get_theme_file_uri( 'assets/css/iframe.css?v=1.0' ) ) );
    }
  }
}
