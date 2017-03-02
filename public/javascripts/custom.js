$(function () {
  // add navigator link class 'current
  (function () {
    var url = document.URL;
    url = url.slice(url.lastIndexOf('/'));
    if (url === '/signin') $('#navigator a[href="/signin"]').addClass('current');
    else if (url === '/signup') $('#navigator a[href="/signup"]').addClass('current');
    else if (url === '/') $('#navigator a[href="/"]').addClass('current');
  })()
 

  // profile-link popup menu
  +function () {
    $('.profile-drawer').hide();
    $('.profile-link').hover(function (event) {
      $('.profile-drawer').show(500)
    }, function (event) {
      $('.profile-drawer').hide(500)
    })
  }()

  // +function () {
  //   $('.profile-link').click(function (event) {
  //     event.preventDefault();
  //     $('.profile-drawer').show(500)
  //   })
  // }

  // header search bar
  // TODO 
  +function () {
    $('.search-form i.fa-search').click(function (event) {
      var searchText = $(this).next().val().trim()
      window.location.href = '/search?q=' + encodeURIComponent(searchText);
    })
  }()
})