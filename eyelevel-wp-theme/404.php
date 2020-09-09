<?php get_header(); ?>
<div style="display: flex; align-items: center; justify-content: center; flex-flow: row wrap; width: 100%; min-height: 300px;">
  <article id="post-0" class="post not-found" style="width: calc(100% - 60px); max-width: 1000px;">
    <header class="header">
      <h1 class="entry-title"><?php esc_html_e( 'Not Found', 'eyelevel' ); ?></h1>
    </header>
    <div class="entry-content" style="margin-bottom: 1em;">
      <p><?php esc_html_e( 'Nothing found for the requested page.', 'eyelevel' ); ?></p>
    </div>
  </article>
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>
