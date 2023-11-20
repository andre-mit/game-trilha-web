var CurrentUserData = (function() {
    var full_email = "";
  
    var getEmail = function() {
      return full_email;
    };
  
    var setEmail = function(email: string) {
        full_email = email;     
    };
  
    return {
      getEmail: getEmail,
      setEmail: setEmail
    }
  
  })();
  
  export default CurrentUserData;