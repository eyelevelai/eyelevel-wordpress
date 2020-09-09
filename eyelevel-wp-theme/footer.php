<?php
  global $post;
  if ((is_page() || is_single()) && (
    $post->post_name == 'pdf'
    || strpos($post->post_name, 'linkedin') > -1
    || strpos($post->post_name, 'showtime') > -1
  )) {
?>
  </main>
<?php
  } else {
?>
    <style>.modal { visibility: hidden; }</style>
    <div id="demoModal" class="modal">
      <div class="modal-content">
        <span id="demoModalClose" class="close-button">×</span>
        <form class="modal-form" name="contact-form" id="demoButtonForm">
          <h2 class="fold2-h2 modal-h2 txt-light">How can we help?</h2>
          <p class="submit-status-message" id="demoButtonStatus"></p>
          <p class="modal-input-container">
            <label class="modal-label" id="nameModalLabel">Name</label>
            <input type="text" class="modal-input modal-text-input" name="name" size="60" maxlength="40">
          </p>
          <p class="modal-input-container">
            <label class="modal-label" id="emailModalLabel">Email</label>
            <input type="text" class="modal-input modal-text-input" name="email" size="30" maxlength="255">
          </p>
          <p class="modal-input-container">
            <label class="modal-label" id="companyModalLabel">Company name</label>
            <input type="text" class="modal-input modal-text-input" name="company" size="30" maxlength="40">
          </p>
          <p class="modal-input-container">
            <label class="modal-label" id="interestModalLabel">What would you like to learn more about?</label>
            <textarea class="modal-input modal-text-input modal-textarea-input" name="interest" cols="40" rows="3"  maxlength="500"></textarea>
          </p>
          <p class="modal-input-container modal-submit-container" align="center">
            <button class="primary cta-button modal-submit fold1-button" id="demoButtonFormSubmit" type="submit" form="contact-form" value="Submit" name="modalSubmit">Submit</button>
          </p>
        </form>
      </div>
    </div>
  </main>

  <footer id="footer">
    <div class="container">
      <div class="footer-section">
        <ul>
          <li class="title">Social</li>
          <li><a href="https://www.facebook.com/eyelevelai/" target="_blank">Facebook</a></li>
          <li><a href="https://twitter.com/eyelevelai/" target="_blank">Twitter</a></li>
          <li><a href="https://www.linkedin.com/company/eyelevelai/" target="_blank">LinkedIn</a></li>
          <li><a href="https://www.youtube.com/channel/UCbI3UjycsxHFK-EbsY33JeA/featured" target="_blank">YouTube</a></li>
        </ul>
        <ul>
          <li class="title">Product</li>
          <li><a href="https://ssp.eyelevel.ai/auth/signup">Sign Up</a></li>
          <li><a href="https://ssp.eyelevel.ai/auth/signin">Log In</a></li>
          <li><a href="/intercom">Intercom Integration</a></li>
          <li><a href="/slack">Slack Integration</a></li>
        </ul>
        <ul>
          <li class="title">Company</li>
          <li><a href="https://publishers.eyelevel.ai/">For Developers</a></li>
          <li><a id="demoButton1" type="button" name="button">Contact Us</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-of-use">Terms of Use</a></li>
        </ul>
      </div>
    </div>
  </footer>

  <script type="text/javascript" src="/wp-content/themes/eyelevel-wp-theme/assets/js/modal.js?v=1.0"></script>
<?php
  }
?>
<?php wp_footer(); ?>
</body>
</html>
