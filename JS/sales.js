const salesList = document.getElementById("sales-list");


async function saleRetrieve() {
    let response = await fetch("http://127.0.0.1:8000/api/v1/sales/npr");
    let data = await response.json();
    data.forEach(element => {
        let li = document.createElement("li");
        let span1 = document.createElement("span");
        let span2 = document.createElement("span");
        let span3 = document.createElement("span");
        let span4 = document.createElement("span");
        let span5 = document.createElement("span");
        span1.innerText = `상품 : ${element.name}`;
        span2.innerText = `수량 : ${element.count}`;
        span3.innerText = `가격 : ${element.price} won`;
        span4.innerText = `택배비 : ${element.delivery_price} won`;
        span5.innerText = `결제시각 : ${element.pay_time}`;
        li.appendChild(span1);
        li.appendChild(span2);
        li.appendChild(span3);
        li.appendChild(span4);
        li.appendChild(span5);
        salesList.appendChild(li)
    });
}

//saleRetrieve();
