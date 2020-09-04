<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<?php
  $cats = get_the_category();
  if ( ! empty( $cats ) ) {
    foreach($cats as $cat) {
      if ($cat->name == "resource") {
        printf( '<div class="secondary-back">' );
        printf( '  <div class="container resource-header-container">' );
        printf( '    <div class="anchor-nav-row">' );
        printf( '      <a href="/resources" class="anchor-nav-link">Demos</a>' );
        printf( '      <a href="/case-studies" class="anchor-nav-link">Case Studies</a>' );
        printf( '      <a href="/articles" class="anchor-nav-link">Articles</a>' );
        printf( '    </div>' );
        printf( '  </div>' );
        printf( '</div>' );
      }
    }
  }
?>
<?php get_template_part( 'entry', ( is_front_page() || is_home() || is_front_page() && is_home() || is_archive() || is_search() ? 'summary' : 'content' ) ); ?>
</article>
