<template>
  <div class="container">
    <div class="flex how-to">
      <nav class="md:w-3/12 bs-docs-sidebar">
        <ul class="nav nav-stacked sticky top-24">
          <li :class="{active: activeMenu === 'top'}">
            <a href="#top" @click="scrollTo">Top</a>
          </li>

          <li :class="{active: activeMenu === 'create-list'}">
            <a href="#create-list" @click="scrollTo">Create a Board</a>
            <ul class="nav">
              <li><a href="#new-list" @click="scrollTo">New Board</a></li>
              <li><a href="#name-and-description" @click="scrollTo">Name and Description</a></li>
              <li><a href="#collaborators" @click="scrollTo">Add Collaborators</a></li>
            </ul>
          </li>

          <li :class="{active: activeMenu === 'add-papers'}">
            <a href="#add-papers" @click="scrollTo">Add Papers to a Board</a>
            <ul class="nav">
              <li><a href="#search-paper" @click="scrollTo">Search</a></li>
              <li><a href="#add-doi" @click="scrollTo">DOI</a></li>
              <li><a href="#add-pubmed" @click="scrollTo">Pubmed ID</a></li>
              <li><a href="#add-url" @click="scrollTo">URL</a></li>
              <li><a href="#add-paper-info" @click="scrollTo">Additional Paper Data</a></li>
              <li><a href="#remove-paper" @click="scrollTo">Remove a Paper</a></li>
            </ul>
          </li>

          <li :class="{active: activeMenu === 'comment-vote-share'}">
            <a href="#comment-vote-share" @click="scrollTo">Comment, Vote, and Share</a>
            <ul class="nav">
              <li><a href="#comment" @click="scrollTo">Comment</a></li>
              <li><a href="#vote" @click="scrollTo">Vote</a></li>
              <li><a href="#share" @click="scrollTo">Share</a></li>
            </ul>
          </li>

          <li :class="{active: activeMenu === 'get-started'}">
            <a href="#get-started" @click="scrollTo">Get Started!</a>
          </li>
        </ul>
      </nav>

      <div ref="content" class="md:w-9/12">
        <h1 id="top" class="section">
          Project Credo How-To: Collaborative Research
        </h1>
        <p>
          Primary research is the foundation of scientific information.  Around 1.5 million research papers are written annually but finding, understanding, and sharing them remains challenging.  Project Credo's mission is to build a evidence based consensus on a wide range of topics and openly sharing it with the public.  This is a quickstart guide on how to use the site.
        </p>
        <h2 id="create-list" class="section">
          Create a Board
        </h2>
        <p>
          Project Credo lets anyone curate their own board of research, making it easy for viewers to navigate to, talk about, and understand primary research within the context of a topic or question.  By creating your own board, you can add to our repository of evidence and broaden the fields people can examine through the lens of research.
        </p>
        <p>
          Boards can be any topic that can be researched through the scientific process ranging from medicine to health, psychology, social policy, economics, computer science, and mathematics.  If there's a journal for it, it's a fit for our site.
        </p>
        <p>
          You don't need to limit yourself to questions either.  Some example non-question board names could be "Studies on Welfare in America," "Exercise and Depression, or even broader like "Papers I've published" or "Interesting papers." They're your boards. Be as flexible as you like.
        </p>
        <h3 id="new-list">
          New Board
        </h3>
        <p>
          Start a new board for any topic you don't see or you would like to curate personally.  Boards represent a collection of primary research papers by an individual or collaboratively by a group or public.  A Project Credo board is shared with everyone so viewers have a window into the best research for a topic.  Whether you are an expert or are looking for help in finding papers, a board will help you get there.
        </p>
        <img src="/images/how-to/new-list.jpg" class="img-thumbnail">
        <h3 id="name-and-description">
          Name and Description
        </h3>
        <p>
          A good name and description will give all viewers and collaborators the context for the kind of papers you want in your board.  Some attributes you want your audience to consider are geography, methodology, recency, and any sample requirements like gender or age.
        </p>
        <p>
          Tags on the board can provide a quick glance of additional keywords or attributes you're looking for.
        </p>
        <img src="/images/how-to/name-and-description.jpg" class="img-thumbnail">
        <h3 id="collaborators">
          Collaborators
        </h3>
        <p>
          A <b>public board</b> allows any member of the Project Credo community to add papers to this board.  A <b>collaborators only board</b> allows only users you've selected to add papers to your board.  You maintain ownership of your board while any added collaborators can:
        </p>
        <ul>
          <li>Add and remove papers to your <b>collaborators only board</b></li>
          <li>
            Edit board details like name, description, or tags
          </li><li>Add and remove other collaborators or remove themselves as collaborators</li>
          <li>Help moderate comments</li>
        </ul>
        <img src="/images/how-to/collaborators.jpg" class="img-thumbnail">
        <h2 id="add-papers" class="section">
          Add Papers to a Board
        </h2>
        <p>
          Our mission at Project Credo is to connect and guide people to the origins of empirical evidence, or <b>Primary Research and Sources</b>.  A good Project Credo board will primarily cite primary sources and may include secondary sources like reviews of literature, systematic reviews, and meta-analyses.  However, we avoid reporting and opinionated articles like news articles or blog entries in favor of primary sources.  This helps get people as close to original source of data as possible.
        </p>

        <p>
          Finding the best papers is the primary function of a board and we offer a few methods like searching through Crossref's library through our searchbar, adding by a DOI, by a Pubmed ID, or by URL.  Project Credo sources bibliographic data from Crossref and Pubmed and will look to meld incoming data wherever possible.
        </p>
        <h3 id="search-paper">
          Search
        </h3>
        <p>
          The easiest way to find a paper is to search by keywords, a paper's title, author name, or journal.  This searches Crossref's library of papers.
        </p>
        <img src="/images/how-to/search-paper.jpg" class="img-thumbnail">
        <p>
          Click the paper you want to add.
        </p>
        <img src="/images/how-to/click-search.jpg" class="img-thumbnail">
        <h3 id="add-doi">
          DOI
        </h3>
        <p>
          Digital object identifiers (DOIs) are a persistent identifier for electronic documents and used by many publishers to link a journal article to its location on the web.  DOIs will begin with <b>"10."</b> followed by a 4 digit identifier for the publishing body.  <b>Pro-tip:</b> you can use "https://dx.doi.org/" + DOI to find any DOI paper.
        </p>
        <p>
          Examples of DOIs include:
        </p>
        <ul>
          <li>10.1371/journal.pone.0066981</li>
          <li>10.1002/j.2326-1951.1969.tb02534.x</li>
          <li>10.1163/193724086x00217</li>
        </ul>
        <img src="/images/how-to/plos-doi.jpg" class="img-thumbnail">
        <h3 id="add-pubmed">
          Pubmed ID
        </h3>
        <p>
          Pubmed IDs or PMIDs are a simple string of numbers and ties to Pubmed's database of articles.
        </p>
        <p>
          Examples of Pubmed IDs include:
        </p>
        <ul>
          <li>27896477</li>
          <li>27977802</li>
          <li>27974576</li>
        </ul>
        <img src="/images/how-to/pubmed.jpg" class="img-thumbnail">
        <h3 id="add-url">
          URL
        </h3>
        <p>
          If you can't find a paper through search, DOI, or Pubmed ID you can add a paper by its URL and title.  This should be a last resort option as we cannot validate the bibliographic data at this point.  Project Credo will only accept a URL at a proper http or https address.
        </p>
        <img src="/images/how-to/ipcc-url.jpg" class="img-thumbnail">
        <img src="/images/how-to/ipcc-report.jpg" class="img-thumbnail">
        <h3 id="add-paper-info">
          Additional Paper Data
        </h3>
        <p>
          You can add missing details for a paper such as the abstract, links, and tags.
        </p>

        <p>
          <b>Abstract</b>
        </p>
        <img src="/images/how-to/paper-abstract.jpg" class="img-thumbnail">
        <p>
          <b>Links</b>
        </p>
        <img src="/images/how-to/paper-links.jpg" class="img-thumbnail">
        <p>
          <b>Tags</b>
        </p>
        <img src="/images/how-to/paper-tags.jpg" class="img-thumbnail">
        <h3 id="remove-paper">
          Remove a Paper
        </h3>
        <p>
          Removing a paper is as simple as clicking the "Remove from board" button.  Only owners of boards, collaborators, or the original poster of the paper can remove a paper from a board.
        </p>
        <img src="/images/how-to/paper-remove.jpg" class="img-thumbnail">

        <h2 id="comment-vote-share" class="section">
          Additional Context - Comment, Vote, and Share
        </h2>
        <p>
          Filling a board with papers is just the beginning.  On Project Credo, adding additional context is a collaborative exercise.
        </p>
        <h3 id="comment">
          Comment
        </h3>
        <p>
          Commenting on papers provides details that aren't easily discernible from the abstract.  Good paper comments should shed light on the intent of the paper and point out any interesting findings or biases in the methodology
        </p>
        <img src="/images/how-to/paper-comment.jpg" class="img-thumbnail">
        <p>
          You can also comment on a board which provides context on how papers fit in the larger conversation of the topic.  Good board comments show where papers fit within the scientific lifecycle and within the discussion.
        </p>
        <img src="/images/how-to/list-comment.jpg" class="img-thumbnail">
        <h3 id="vote">
          Vote
        </h3>
        <p>
          Voting for a paper or comment helps show viewers what's important.  Upvote the best papers within the context of a board.  Help others identify the most valuable comments.
        </p>
        <img src="/images/how-to/vote.jpg" class="img-thumbnail">
        <h3 id="share">
          Share
        </h3>
        <p>
          Sharing your board or other people's board is easy and helps Project Credo spread the message of primary research.  Share the link on Facebook, Twitter, or any other social media platform.
        </p>
        <img src="/images/how-to/share-url.jpg" class="img-thumbnail">

        <div class="get-started">
          <h2 id="get-started" class="section">
            Get Started!
          </h2>
          <p>
            Now that you know how to help build our scientific commons, let's jump into it!  Go to our <nuxt-link to="/">
              homepage
            </nuxt-link> and see what people have already created or
            <nuxt-link v-if="! user" to="/users/sign_in">
              sign-in/sign-up and
            </nuxt-link>
            <nuxt-link v-if="user" to="/lists/new">
              create your own board.
            </nuxt-link>
          </p>
          <div v-if="! user" class="row">
            <div class="col-md-2">
              <nuxt-link to="/users/sign_in" class="btn btn-default btn-lg">
                Sign-in
              </nuxt-link>
            </div>
            <div class="col-md-2">
              <nuxt-link to="/users/sign_up" class="btn bnt-primary btn-lg">
                Sign-up
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import debounce from 'lodash/debounce'

export default {
  data: () => ({
    activeMenu: 'top',
  }),

  computed: {
    ...mapState({
      user: s => s.auth.user,
    }),
  },

  // mounted () {
  // setTimeout(() => {
  //   $('[data-spy="affix"]').affix()
  //   $(this.$refs.affix).affix('checkPosition')
  // }, 300)
  // },

  mounted () {
    window.addEventListener('scroll', this.checkScroll, { passive: true })
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.checkScroll)
  },

  methods: {
    checkScroll: debounce(function () {
      const els = this.$refs.content.querySelectorAll('.section')
      for (const el of els) {
        if (this.isElementInViewPort(el)) {
          this.activeMenu = el.getAttribute('id')
          break
        }
      }
    }, 10),

    isElementInViewPort (el) {
      const rect = el.getBoundingClientRect()
      const elementTop = rect.top
      const elementBottom = rect.bottom
      const scrollPosition = el?.scrollTop || document.body.scrollTop
      return (
        elementBottom >= 0 &&
        elementTop <= document.documentElement.clientHeight &&
        elementTop + rect.height > elementTop &&
        elementTop <= elementBottom &&
        elementTop >= scrollPosition
      )
    },

    scrollTo (e) {
      e.preventDefault()
      this.$scrollTo(e.target.getAttribute('href'), 1000, { offset: -100 })
    },
  },

  head () {
    const title = `${this.$config.name} | How To`
    return {
      title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: title },
      ],
    }
  },
}
</script>
