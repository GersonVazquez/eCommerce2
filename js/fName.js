function showName(){
    var user = localStorage.getItem("user");
    var name = document.getElementById("name");

    
     name.innerHTML= user;
  }

  showName();