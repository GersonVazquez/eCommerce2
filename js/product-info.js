//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then( res =>{
        let producto = res.data;
        

        showProdInfo(producto);
    })

});

function showProdInfo(producto){
    const prodInfo = document.getElementById("prodInfo");
    let htmlToAppend = `
    <div class="card" style="width: 18rem;">
    <img src="${producto.images[0]}" class="card-img-top" alt="">
    <div class="card-body">
      <h5 class="card-title" id="prodTitle">${producto.name}</h5>
      <p class="card-text" id="prodDescription">${producto.description}</p>

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

      <a href="" class="btn btn-primary">View</a>
    </div>
    </div>
    `;
    prodInfo.innerHTML = htmlToAppend;
}