//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(res => {
    let producto = res.data;


    showProdInfo(producto);
    showRelatedProducts(producto.relatedProducts)
  })

});

function showProdInfo(producto) {
  const prodInfo = document.getElementById("prodInfo");
  let htmlToAppend = `
    
    <div class="card p-2 bd-highlight" style="width: 450px;">
    <img src="${producto.images[0]}" class="card-img-top" alt="">
    <div class="card-body">
      <h5 class="card-title">${producto.name}</h5>
      <p class="card-text">${producto.currency} ${producto.cost} </p>
      <p class="card-text">Stock: ${producto.soldCount} Unidades</p>      
      <p class="card-text">${producto.description}</p>

      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="${producto.images[1]}" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="${producto.images[2]}" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="${producto.images[3]}" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="${producto.images[4]}" class="d-block w-100" alt="...">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <p class="card-text"> Categoria: ${producto.category}</p>
    


      
    </div>
    </div>
    `;
  prodInfo.innerHTML = htmlToAppend;
}

function showRelatedProducts(array) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsList = resultObj.data;

      let htmlRelatedProducts = "";

      for (let i = 0; i < array.length; i++) {
        let comment = array[i];
        let relatedProducts = productsList[comment];

        htmlRelatedProducts += `
              <div class= "col-lg-3 col-md-4 col-6 border">
              
                  <div class= "row">
                      <img class="img-fluid p-2" src="` + relatedProducts.imgSrc + `">                                              
                  </div>                   
                  <div class= "row p-2">
                  <p>` + relatedProducts.name + `</p> 
                  <p>` + relatedProducts.description + `</p>
                  </div>
                  <div class= "row p-2">
                  <a href="#">Ver</a>
                  </div>                     
              </div>`
      }
      document.getElementById("relatedProducts").innerHTML = htmlRelatedProducts;
    }
  })
}

getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
  if (resultObj.status === "ok") {
    let comments = resultObj.data;

    let html = '';
    comments.forEach(function(comment) {
      let productScore = comments.score;
      let score = '';
      for (let i = 1; i <= productScore; i++) {
        score += '<i class="far fa-star checked"></i>';
      }

      for (let i = productScore + 1; i <= 5; i++) {
        score += '<i class="far fa-star"></i>';
      }


      html += `
      <li class="media">
        <div class="media-body">
          <label class="mt-0"><strong> ${comment.user}</strong>
            <span class="mute"> ${comment.dateTime}</span>
            <span> ${score}</span>
          </label>
          <br>
          <label class="small">${comment.description}</label>
        </div>
      </li>
      `
    });
  
    document.getElementById("infoComments").innerHTML = html;

    }
});