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