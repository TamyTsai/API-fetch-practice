$(document).ready(() => {
    getVegetablePrice('香蕉');
}); //等DOM元素都載入完後 就執行ready中的函數（document也可省略不打）
// 一打開頁面就要執行，但需要等DOM元素準備好才能執行的函數，就寫在這

function getVegetablePrice(item) {
    fetch(`https://ubin.io/data/vegetables?item=${item}`) //輸入JSON資料的網址 //ES6 字串 串接 變數 //fetch會回傳一個promise物件回來（所以後面可以直接接.then .catch）
        // promise物件 後面可以接.then .catch
        // 成功fetch到資料的話 會做的事（內容 會被傳入 then中 函數的參數response 中）
        .then(response => {
            return response.json() //把抓回來的資料 解析為 json物件，讓你更方便用js存取 //.json也會回傳一個promise物件回來，所以後面還可再接 .then .catch
        })
        // 對json回傳的promise物件 接 .then ，成功的話 內容 會被傳入 then中 函數的參數data 中
        .then(data => {
            console.log(data);
            renderChart(data); //把傳過來的json內容 用 Chart.js渲染成 視覺化資料
        })
};

// 用Chart.js渲染資料 的 函數
function renderChart(data) {
    let markets = data.prices.map(price => price.market) 
    // markets為裝有每個市場名字的陣列
    // map為ES6方法，會去一一拜訪陣列中的元素，並對這些元素做某些操作，再把操作後的結果蒐集成新陣列
    // data.prices 為 取出 物件data 中 屬性prices 的 值
    // prices為一個物件陣列，陣列中有多個物件，物件有兩個屬性（market、price）
    // price => price.market 為 function (price) {return price.market} 之ES6箭頭函數簡寫
    // .market或['market']可以取出 陣列中 物件 屬性market 的 值
    let datas = data.prices.map(price => price.price)
    // datas為裝有農產品價格的陣列

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: markets, 
            //lebels 換成 變數markets（此變數裝有 由 prices物件陣列中 物件 屬性market的值 組成的 陣列）
            //lebels 是橫軸標示
            datasets: [{
                label: data.item, 
                //取得物件data屬性item屬性的值
                //此數的lebel為上方標示
                data: datas, //變數datas 裝有 由 prices物件陣列中 物件 屬性price的值 組成的 陣列
                borderWidth: 1 //柱狀圖的邊框寬度
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true //縱軸從0開始
                    }
                }]
            }
        }
    });
}
