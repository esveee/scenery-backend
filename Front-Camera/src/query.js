jQuery.ajax(
    {
      url: 'http://some.url.here',
      data: {json: returnValue},
      success: function(data) {
         //code to handle successful AJAX post
      },
      error(XMLHttpRequest, textStatus, errorThrown) {
         //code to handle errors
      }
   });
