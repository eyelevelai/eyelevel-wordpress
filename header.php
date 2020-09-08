<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <aside class="mob-menu">
    <div class="mob-inner">
      <div>
        <button class="cls-btn" type="button" name="button"> <i class="fas fa-times"></i> </button>
      </div>
<?php
global $post;
if ((is_page() || is_single()) && (
    strpos($post->post_name, 'front-page-v2-mock') > -1
  )) {
  wp_nav_menu( array( 'menu' => 'v2-menu', 'container_class' => 'main-menu-nav' ) );
  wp_nav_menu( array( 'menu' => 'v2-submenu', 'container_class' => 'main-menu-cta' ) );
} else {
  wp_nav_menu( array( 'theme_location' => 'main-menu' ) );
}
?>
    </div>
  </aside>

<?php
  if ((is_page() || is_single()) && (
    strpos($post->post_name, 'showtime') > -1
  )) {
?>
  <main>
<?php
  } else if ((is_page() || is_single()) && (
      strpos($post->post_name, 'linkedin') > -1
    )) {
?>
  <main>
    <section class="fold1 header-inverted">
      <div class="container">
        <header>
          <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="eyelevel-logo" title="<?php echo esc_html( get_bloginfo( 'name' ) ); ?>" rel="home">
            <img class="el-logo" src="<?php printf('%s' . "\n", esc_url(get_theme_file_uri( 'assets/img/logo/el-logo-bright.png'))); ?>" alt="EyeLevel.ai">
          </a>
          <nav id="menu" class="eyelevel-menu menu-inverted">
<?php
if ((is_page() || is_single()) && (
    strpos($post->post_name, 'front-page-v2-mock') > -1
  )) {
  wp_nav_menu( array( 'menu' => 'v2-menu', 'container_class' => 'main-menu-nav' ) );
  wp_nav_menu( array( 'menu' => 'v2-submenu', 'container_class' => 'main-menu-cta' ) );
} else {
  wp_nav_menu( array( 'theme_location' => 'main-menu' ) );
}
?>
          </nav>
          <button class="open-mob-menu" type="button" name="button"><i class="fas fa-bars"></i></button>
        </header>
      </div>
    </section>
<?php
  } else {
?>
  <main>
    <section class="fold1">
      <div class="container">
        <header>
          <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="eyelevel-logo" title="<?php echo esc_html( get_bloginfo( 'name' ) ); ?>" rel="home">
            <img class="el-logo" src="<?php printf('%s' . "\n", esc_url(get_theme_file_uri('assets/img/logo/el-logo-dark.png'))); ?>" alt="EyeLevel.ai">
          </a>
          <nav id="menu" class="eyelevel-menu">
<?php
if ((is_page() || is_single()) && (
    strpos($post->post_name, 'front-page-v2-mock') > -1
  )) {
  wp_nav_menu( array( 'menu' => 'v2-menu', 'container_class' => 'main-menu-nav' ) );
  wp_nav_menu( array( 'menu' => 'v2-submenu', 'container_class' => 'main-menu-cta' ) );
} else {
  wp_nav_menu( array( 'theme_location' => 'main-menu' ) );
}
?>
          </nav>
          <button class="open-mob-menu" type="button" name="button"><i class="fas fa-bars"></i></button>
        </header>
      </div>
    </section>
<?php
  }
?>
