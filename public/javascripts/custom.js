$(function () {
  $('#navigator').click(function (event) {
    var $link = $(event.target);
    if (!$link.hasClass('current')) {
      $('#navigator').find('.current').removeClass('current')
      $link.addClass('current')
    }
  })
})