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
        span1.innerText = `product name : ${element.name}`;
        span2.innerText = `product count : ${element.count}`;
        span3.innerText = `product price : ${element.price}`;
        span4.innerText = `product deliv price : ${element.deliv_price}`;
        li.appendChild(span1);
        li.appendChild(span2);
        li.appendChild(span3);
        li.appendChild(span4);
        salesList.appendChild(li);
    });
}

saleRetrieve();
