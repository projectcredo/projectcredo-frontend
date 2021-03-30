<template>
  <div class="container">
    <h1 class="text-center">
      Making Research Understandable with Project Credo
    </h1>

    <div class="row">
      <img src="/images/tag.png" alt="" class="img-thumbnail thumbnail-no-border">
    </div>

    <div class="divider-small" />

    <div class="row">
      <div class="col-md-12">
        <h4 class="text-center">
          Project Credo makes it easy to curate, comment on, and share boards of research papers.
        </h4>
        <div class="col-md-8 col-md-offset-2">
          <div class="embed-responsive embed-responsive-16by9 col-md-12 text-center">
            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/MOHYj2m6WJM" frameborder="0" allowfullscreen />
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <h4 v-if="! user" class="text-center">
          <nuxt-link to="/user/sign_up">
            Sign up
          </nuxt-link> to make and share your own citations.
        </h4>
      </div>
    </div>
    <div class="divider-small" />
    <div class="row text-center">
      <div class="col-md-4 col-md-offset-1">
        <h2>Tutorial</h2>
        <p><a href="https://www.youtube.com/embed/MOHYj2m6WJM" target="_blank">Check out our tutorial</a> to see how to create and contribute to a board.</p>
      </div>

      <div class="col-md-4 col-md-offset-2">
        <h2>Sponsor Us</h2>
        <p>Join our mailing list and help us keep the lights on through our <a href="https://www.patreon.com/projectcredo" target="_blank">Patreon page</a></p>
      </div>
    </div>

    <div class="row text-center">
      <div class="col-md-4 col-md-offset-1">
        <h2>Issues</h2>
        <p>Want to file a bug report or contribute code?  Tell us on our <a href="https://github.com/projectcredo/projectcredo" target="_blank">GitHub page</a>.</p>
      </div>

      <div class="col-md-4 col-md-offset-2">
        <h2>Contact</h2>
        <p>We'd love to hear from you. Contact us at <a href="mailto:help@projectcredo.com">help@projectcredo.com</a>.</p>
      </div>
    </div>

    <div v-if="!user">
      <h2 class="text-center">
        Sign up
      </h2>
      <hr>
      <sign-up />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SignUp from '../components/auth/SignUp'

export default {
  components: { SignUp },

  computed: {
    ...mapState({
      user: s => s.auth.user,
    }),
  },
}
</script>
