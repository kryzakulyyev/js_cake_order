"use strict";

const patisserie = {
  bananaCaramel: {
    stock: 3,
    price: 9.99,
  },
  contessa: {
    stock: 5,
    price: 7.99,
  },
  concorde: {
    stock: 11,
    price: 22.99,
  },
  mouseCake: {
    stock: 8,
    price: 16.99,
  },
  confettiSuprise: {
    stock: 9,
    price: 14.99,
  },
};

const cakeType = document.getElementById('cakeSelect');
const orderAmount = document.getElementById('cakeAmount');
const orderBtn = document.getElementById('submit_btn');

//1
const checkOrder = (order) => {
  return new Promise((resolve, reject)=>{
     //setTimeout
    setTimeout(()=>{
    const itemsArr = order.items;
    let inStock = itemsArr.every(item => patisserie[item[0]].stock >= item[1]);
    if(inStock){
      let total = 0;   
      itemsArr.forEach(item => {
        total += item[1] * patisserie[item[0]].price
      });
      console.log(`All of the items are in stock. The total price of the order is ${total}.`);
      //2
      resolve([order, total]);
    } else {
      reject(`The order could not be completed because some items are sold out.`);
    } 
  }, generateRandomDelay())
});  
};


//3
const payment = (resolvedValueArray) => {
  const order = resolvedValueArray[0];
  const total = resolvedValueArray[1];
  return new Promise((resolve, reject) => {
    //setTimeout
    setTimeout(()=>{
      let cardBalance = prompt(Number("Enter card balance Pleace"))
      let hasEnoughMoney = order.cardBalance >= total;

      if(hasEnoughMoney){
        console.log(`Payment processed with card balance. Generating shipping label.`);
        resolve(order);
      }else{
        reject(`Cannot process order: card balance was insufficient.`);
      }
    }, generateRandomDelay())
  })
  
  
}

const stockControl = (resolvedValueArray) => {
  console.log(`Checking availability of ${resolvedValueArray} .`);
    return new Promise((resolve, reject) => {
       //setTimeout
        setTimeout(() => {
            if (restockSuccess()) {
                console.log(`${resolvedValueArray} is available in stock.`)
                resolve(resolvedValueArray);
            } else {
                reject(`Error: ${resolvedValueArray} is unavailable in stock at this time.`);
            }
        }, generateRandomDelay());
    });
   

  }



orderBtn.onclick = ()=>{
   let order = ['contessa', 2]; 
   checkOrder(order).then((resolvedValueArray)=>{
   return payment(resolvedValueArray)
   ;
  }).then((resolvedValueArray)=>{
    return stockControl(resolvedValueArray)
  }).then((successMessage)=>{
    console.log(successMessage);
  }).catch((err)=>{
    console.log(err)
  })  // sample order template


  //then
  //catch  

}
let generateRandomDelay=()=>Math.floor(Math.random() *3000);
