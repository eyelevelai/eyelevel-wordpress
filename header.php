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
      <?php wp_nav_menu( array( 'theme_location' => 'main-menu' ) ); ?>
    </div>
  </aside>

  <main>
    <section class="fold1">
      <div class="container">
        <header>
          <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="eyelevel-logo" title="<?php echo esc_html( get_bloginfo( 'name' ) ); ?>" rel="home">
            <img class="el-logo" src="https://eyelevel.ai/assets/img/logo/el-logo-dark.png" alt="EyeLevel.ai">
          </a>
          <nav id="menu" class="eyelevel-menu">
            <?php wp_nav_menu( array( 'theme_location' => 'main-menu' ) ); ?>
          </nav>
          <button class="open-mob-menu" type="button" name="button"><i class="fas fa-bars"></i></button>
        </header>
      </div>
    </section>
