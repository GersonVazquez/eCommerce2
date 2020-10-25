let arrayArticles =[];
let subtotaltotal=0;


function clacSubTotal(count,index){
    let sub=0;
    if(arrayArticles[index].currency==="USD"){
        sub = arrayArticles[index].unitCost*count*40;

    }else{
        sub = arrayArticles[index].unitCost*count;
    }
    return sub;
}

function updateAllSubTotal(){
    let subtotalArray = document.getElementsByClassName("countArticle");
    let subtotal =0;
    for(let i=0;i<subtotalArray.length;i++){
        subtotal += clacSubTotal(subtotalArray[i].value,i);
    }
    document.getElementById("subtotalText").innerHTML = "UYU " + subtotal;
    subtotaltotal=subtotal; 

    return subtotal;

}

function calcTotal(){
    let total = subtotaltotal;
    document.getElementById("totalCostText").innerHTML = "UYU " + total;
}

function addEventCount(){
    let subtotalArray = document.getElementsByClassName("countArticle");
    for(let i=0;i<subtotalArray.length;i++){
        subtotalArray[i].addEventListener("change",function(){
        document.getElementById("productSubtotal-"+i).innerHTML= arrayArticles[i].currency + " "+subtotalArray[i].value* arrayArticles[i].unitCost;
        updateAllSubTotal();
        calcTotal();
        calcShipping();
    });

    }
    

}


function showArticles(articles){
   let htmlContentToAppend ="";
    for(let i = 0; i < articles.length; i++){
       
        htmlContentToAppend += `
        <tr>
            <td><img src='`+ articles[i].src + `' width="50px"></td>
            <td>`+ articles[i].name + `</td>
            <td>`+ articles[i].currency + " " + articles[i].unitCost +`</td>
            <td><input class="form-control countArticle" style="width:60px;" type="number" id="productCount-${i}" value="`+ articles[i].count + `" min="1"></td>
            <td><span id="productSubtotal-${i}" style="font-weight:bold;">${articles[i].currency} ${articles[i].unitCost * articles[i].count}</span></td>
        </tr>
        `
              
    }
    document.getElementById("articlesWrapper").innerHTML = htmlContentToAppend;
    addEventCount();
    updateAllSubTotal();
    calcTotal();


}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
        if (resultObj.status === 'ok')
        {
            arrayArticles=resultObj.data.articles;
            showArticles(arrayArticles);
        }
    });
})



function calcShipping(){
    //Funcion que calcula y muestra los diferentes costos del envio reflejados en el total y subtotal
    let premium = document.getElementById("premium");
    let express = document.getElementById("express");
    let standard = document.getElementById("standard");
    let subtotal = updateAllSubTotal();

    let envio=0;
    let total=0;

    if(premium.checked){
        console.log(updateAllSubTotal());
        envio = (subtotal) * 0.15;
        
    } 

    if(express.checked){
        console.log(updateAllSubTotal());
        envio = (subtotal) * 0.07;
        
    }
    
    if(standard.checked){
        console.log(updateAllSubTotal());
        envio = (subtotal) * 0.05;
        
    }
     
    total = envio + updateAllSubTotal();
    document.getElementById("shippinCost").innerHTML = "UYU "+ envio;
    document.getElementById("totalCostText").innerHTML = "UYU "+ total;
}

function corroborate(){
    //Funcion que corrobora que todos los datos de la direccion esten completos uno por uno
    if(document.getElementById("shippinCost").innerHTML === ""){
        alert("Seleccione un envio");
        return false;
    } else if(document.getElementById("street").value === "" || document.getElementById("street2").value === ""){
        alert("Ingrese las calles para el envio");
        return false;
    } else if(document.getElementById("number").value === ""){
        alert("Ingrese número de puerta");
        return false;
    } else if(document.getElementById("numberApt").value === ""){
        alert("Ingrese apartamento");
        return false;
    }
}

function corroborateModal(){
    //Funcion que corrobora que todos los datos del modal esten completos uno por uno
    let master = document.getElementById("exampleCheck1").checked;
    let visa = document.getElementById("exampleCheck2").checked;

    if(document.getElementById("name").value === "" || document.getElementById("email").value === ""){
        alert("Ingrese Nombre y Email");
        return false;
    } else if(!master && !visa){
        alert("Seleccione una tarjeta");
        return false;
    } else if(document.getElementById("numTarjeta").value === "" || document.getElementById("securityNum").value === "" || document.getElementById("cardExpiration").value === ""){
        alert("Ingrese los datos correspondientes de la tarjeta");
        return false;
    }

    correctPay();
}

function correctPay(){
        let msj;
        getJSONData(CART_BUY_URL).then(result => {
            if (result.status === "ok") {
                console.log(result.data.msg);
                msj = result.data.msg
            }
            alert(msj);
        })
}