jQuery.ajax(
    {
      url: 'https://polar-lowlands-91200.herokuapp.com/',
      data: {json: returnValue},
      success: function(data) {
         //code to handle successful AJAX post
      },
      error(XMLHttpRequest, textStatus, errorThrown) {
         //code to handle errors
      }
   });
