let productNameInput= document.getElementById("productNameInput");
let productPriceInput= document.getElementById("productPriceInput");
let productCategotyInput= document.getElementById("productCategotyInput");
let productDescriptionInput= document.getElementById("productDescriptionInput");
let productsContainer;
let tableBody= document.getElementById("tableBody");
let addBtn= document.getElementById("addBtn");
let updateBtn= document.getElementById("updateBtn");
let updatedIndexProduct= 0;
let alerts= document.querySelectorAll(".alert");

if(localStorage.getItem("myProducts")!= null){
    productsContainer= JSON.parse(localStorage.getItem("myProducts"));
    displayProduct(productsContainer);
    hideAlert();
}else{
    hideAlert();
    productsContainer= [];
}

function addProduct(){
    if(validateProductName()==true && checkInputValue(productPriceInput.value)==true && checkInputValue(productCategotyInput.value)==true && checkInputValue(productDescriptionInput.value)==true){
        product={
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategotyInput.value,
            description: productDescriptionInput.value,
        }
        productsContainer.push(product);
        localStorage.setItem("myProducts", JSON.stringify(productsContainer));
        clearForm();
        displayProduct(productsContainer);
        hideAlert();
    }else{
        if(checkInputValue(productNameInput.value)==false){
            showNameError("Name Is Required");
        }if(checkInputValue(productPriceInput.value)==false){
            showPriceError("Price Is Required");
        }if(checkInputValue(productCategotyInput.value)==false){
            showCatError("Category Is Required");
        }if(checkInputValue(productDescriptionInput.value)==false){
            showDiscError("Description Is Required");
        }
    }
    
}

function clearForm(){
    productNameInput.value= "";
    productPriceInput.value= "";
    productCategotyInput.value= "";
    productDescriptionInput.value= "";
}
function displayProduct(productList){
    let boxContainer=``;
    for(i=0;  i<productList.length;  i++){
        boxContainer+=`
        <tr>
            <td>${i}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].description}</td>
            <td><button onclick="setFormForUpdate(${i})" class="btn btn-sm btn-outline-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-sm btn-outline-danger">Delete</button></td>
        </tr>
        `
    }
    tableBody.innerHTML= boxContainer;
}

function searchProducts(searchTerm){
    if(searchTerm.length>1){
        let searchResult=[];
        for(let i=0;  i<productsContainer.length;  i++){
            if(productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())== true){
                searchResult.push(productsContainer[i]);
                displayProduct(searchResult);
            }
        }
    }
}

function deleteProduct(deletedIndex){
    productsContainer.splice(deletedIndex, 1);
    displayProduct(productsContainer);
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    
}

function setFormForUpdate(updatedIndex){
    productNameInput.value= productsContainer[updatedIndex].name;
    productPriceInput.value= productsContainer[updatedIndex].price;
    productCategotyInput.value= productsContainer[updatedIndex].category;
    productDescriptionInput.value= productsContainer[updatedIndex].description;
    updateBtn.classList.replace("d-none", "d-inline-block");
    addBtn.classList.add("d-none");
    updatedIndexProduct= updatedIndex;
}

function updateProduct(){
    productsContainer[updatedIndexProduct].name= productNameInput.value;
    productsContainer[updatedIndexProduct].price= productPriceInput.value;
    productsContainer[updatedIndexProduct].category= productCategotyInput.value;
    productsContainer[updatedIndexProduct].description= productDescriptionInput.value;
    displayProduct(productsContainer);
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    updateBtn.classList.replace("d-inline-block", "d-none");
    addBtn.classList.remove("d-none");
    clearForm();
}

function validateProductName(){
    let regex= /^[A-Za-z]{3,15}[0-9]?$/;
    if(regex.test(productNameInput.value)==true){
        productNameInput.classList.replace("is-invalid", "is-valid");
        return true;
    }else{
        productNameInput.classList.add("is-invalid")
        return false;
    }
}

function checkInputValue(inputValue){
    if(inputValue== null  || inputValue==""){
        return false;
    }
    if(inputValue== null || inputValue==""){
        return false;
    }
    if(inputValue== null || inputValue==""){
        return false;
    }
    return true;
}

function hideAlert(){
    for(i=0;  i<alerts.length; i++){
        alerts[i].style.display= 'none';
    }
}
function showNameError(msg) {
    for(i=0;  i<alerts.length; i++){
        if(alerts[i].getAttribute("id")=="emptyName"){
        alerts[i].innerHTML= msg;
        alerts[i].style.display = 'block';
        }
    }
}

function showPriceError(msg) {
    for(i=0;  i<alerts.length; i++){
        if(alerts[i].getAttribute("id")=="emptyPrice"){
        alerts[i].innerHTML= msg;
        alerts[i].style.display = 'block';
        }
    }
}
function showCatError(msg) {
    for(i=0;  i<alerts.length; i++){
        if(alerts[i].getAttribute("id")=="emptyCat"){
        alerts[i].innerHTML= msg;
        alerts[i].style.display = 'block';
        }
    }
}

function showDiscError(msg) {
    for(i=0;  i<alerts.length; i++){
        if(alerts[i].getAttribute("id")=="emptyDesc"){
        alerts[i].innerHTML= msg;
        alerts[i].style.display = 'block';
        }
    }
}
