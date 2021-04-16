if (process.client) {
  require('@fancyapps/fancybox')
  require('@fancyapps/fancybox/dist/jquery.fancybox.css')

  /*
   * Lightbox
   */
  jQuery(function ($) {
    $('.fancy-box').fancybox()
  })

  /*
   * Tooltips
   */
  jQuery(function ($) {
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="popover"]').popover()
  })

  /*
   * Image preview on profile edit page
   */
  jQuery(function ($) {
    $('.form-image-group input').change(function () {
      if (! this.files || ! this.files[0]) { return }
      const $group = $(this).closest('.form-image-group')
      const $image = $group.find('.form-image-preview')
      const $link = $image.parent('a')

      const reader = new FileReader()
      reader.onload = (e) => {
        $image.attr('src', e.target.result).show()
        if ($link.length) { $link.attr('href', e.target.result) }
      }
      reader.readAsDataURL(this.files[0])
    })
  })

  /*
   * References
   */
  jQuery(function ($) {
    $('a.delete-reference').on('click', function (e) {
      e.preventDefault()
      $(e.target)
        .siblings('form')
        .submit()
    })

    $(document).on('click', 'a.edit-abstract', function (e) {
      e.preventDefault()
      const abstractDiv = $(e.target).closest('div.edit-abstract')
      const abstractForm = abstractDiv.next('div.abstract-form')
      const cancelLink = abstractForm.find('a.cancel-abstract-form')
      abstractForm.toggleClass('hidden', false)
      cancelLink.toggleClass('hidden', false)
      abstractDiv.toggleClass('hidden', true)
    })

    $(document).on('click', 'a.cancel-abstract-form', function (e) {
      e.preventDefault()
      const abstractForm = $(e.target).closest('div.abstract-form')
      const abstractDiv = abstractForm.prev('div.edit-abstract')
      abstractForm.toggleClass('hidden', true)
      abstractDiv.toggleClass('hidden', false)
    })

    $('a.add-tag').on('click', function (e) {
      e.preventDefault()

      const tagsList = $(e.target).closest('.tags-list')
      const tagsForm = tagsList.next('.tags-form')

      tagsList.toggleClass('hidden', true)
      tagsForm.toggleClass('hidden', false)
    })

    $('a.cancel-add-tag').on('click', function (e) {
      e.preventDefault()

      const tagsForm = $(e.target).closest('.tags-form')
      const tagsList = tagsForm.prev('.tags-list')

      tagsList.toggleClass('hidden', false)
      tagsForm.toggleClass('hidden', true)
    })
  })

  /*
   * Papers
   */
  jQuery(function ($) {
    $('.paper-detail-tab').on('click', function (e) {
      e.preventDefault()

      const detailId = $(e.target).data('detail-id')

      const paperDetail = $('#' + detailId)

      paperDetail.siblings('.paper-detail').each(function (i, sibling) {
        $(sibling).collapse('hide')
      })

      paperDetail.collapse('toggle')
    })
  })
}
