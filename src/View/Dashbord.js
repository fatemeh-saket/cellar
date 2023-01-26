
import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useSelector } from 'react-redux';
import { contex } from '../Layout'


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  lightpaper: {
    padding: "1rem",
    textAlign: 'center',
    backgroundColor: "#f8f8f8",
  },
  darkpaper: {
    padding: "1rem",
    textAlign: 'center',
    backgroundColor: "#283050",
  }

});


function Dashbord() {
  const classes = useStyles();
  const ProductData = useSelector(state => state.items.products)
  const ProductSold = useSelector(state => state.items.productsSold)
  const skinContex = useContext(contex)

  //******************************** نمودار مفدار همه ی کالا ها با تفکیک وزن و قسمت */
  const amountOfProductByNumber = {
    labels: ProductData.filter(element => element.counterUnit === "number")
      .map(elments => elments.title),
    datasets: [{
      data: ProductData.filter(element => element.counterUnit === "number")
        .map(elments => elments.totalNumber),
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }]
  }
  const amountOfProductByWeight = {
    labels: ProductData.filter(element => element.counterUnit === "weight")
      .map(elments => elments.title),
    datasets: [{
      data: ProductData.filter(element => element.counterUnit === "weight")
        .map(elments => elments.weight),
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }]
  }
  //******************************** اتمام */


  //********************** نمودار سفارش کالا بر اساس وزن و تعداد   */
  //** تعداد */
  let SoldNumberData = []
  ProductSold.filter(element => element.counterUnit === "number")
    .map((elments) => {
      let indexData = SoldNumberData.findIndex(dd => dd.name === elments.title)
      if (indexData > -1) {
        SoldNumberData.splice(indexData, 1, { name: elments.title, number: Number(SoldNumberData[indexData].number) + Number(elments.amount) })
      }
      if (indexData === -1) {
        SoldNumberData.splice(SoldNumberData.splice.length, 0, { name: elments.title, number: elments.amount })
      }
    })

  //** وزن */
  let soldWeightData = []
  ProductSold.filter(element => element.counterUnit === "weight")
    .map((elments) => {
      let indexData = soldWeightData.findIndex(dd => dd.name === elments.title)
      if (indexData > -1) {
        soldWeightData.splice(indexData, 1, { name: elments.title, weight: Number(soldWeightData[indexData].weight) + Number(elments.amount) })
      }
      if (indexData === -1) {
        soldWeightData.splice(soldWeightData.splice.length, 0, { name: elments.title, weight: elments.amount })
      }

    })


  const amountOfSoldByNumbe = {
    labels: SoldNumberData.map(element => element.name),
    datasets: [{
      data: SoldNumberData.map(element => element.number),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }]
  }
  const amountOfSoldByWeight = {
    labels: soldWeightData.map(element => element.name),
    datasets: [{
      data: soldWeightData.map(element => element.weight),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }]
  }

  //******************************** اتمام */

  //********************************کالای درخواستی هر فروشگاه */

  let sellTimeArray = ProductSold.map(element => element.time.split("/"))
  let sellMonth = []
  let uniqSellMonth = []
  let label = []
  let datas = {
    store1: [0,0,0,0,0],
    store2: [0,0,0,0,0],
    store3: [0,0,0,0,0],
    store4: [0,0,0,0,0]
  }
  let sum = 0

  sellTimeArray.map(e => {
    sellMonth.splice(sellMonth.length, 0, e[1])
  }
  );

  sellMonth.forEach((element) => {
    if (!uniqSellMonth.includes(element)) {
      uniqSellMonth.push(element);
    }
  });

  //**** Sales months in Shamsi  */
  uniqSellMonth.map(element => {

    switch (element) {
      case "۱":
        label.push("فروردین")
        break;
      case "۲":
        label.push("اردیبهشت")
        break;
      case "۳":
        label.push("خرداد")
        break;
      case "۴":
        label.push("تیر")
        break;
      case "۵":
        label.push("مرداد")
        break;
      case "۶":
        label.push("شهریور")
        break;
      case "۷":
        label.push("مهر")
        break;
      case "۸":
        label.push("آبان")
        break;
      case "۹":
        label.push("آذر")
        break;
      case "۱۰":
        label.push("دی")
        break;
      case "۱۱":
        label.push("بهمن")
        break;
      case "۱۲":
        label.push("اسفند")
        break;
    }
  })
 
//**** data  */
  uniqSellMonth.map((element, uniqIndex) => {
    sum = 0
    console.log("fff", uniqSellMonth, sellMonth)
    sellMonth.map((e, index) => {
      if (element === e ) {
        ['فروشگاه 1','فروشگاه 2','فروشگاه 3','فروشگاه 4'].map(elements=>{
          if(ProductSold[index].store === elements){
            
            if(elements==='فروشگاه 1')
          {  sum = Number(ProductSold[index].price) + Number(datas.store1[uniqIndex])
            datas.store1.splice(uniqIndex,1,sum)}
            if(elements==='فروشگاه 2'){
              sum = Number(ProductSold[index].price) + Number(datas.store2[uniqIndex])
              datas.store2.splice(uniqIndex,1,sum)
            }
            if(elements==='فروشگاه 3'){
              sum = Number(ProductSold[index].price) + Number(datas.store3[uniqIndex])
              datas.store3.splice(uniqIndex,1,sum)
            }
            if(elements==='فروشگاه 4'){
              sum = Number(ProductSold[index].price) + Number(datas.store4[uniqIndex])
              datas.store4.splice(uniqIndex,1,sum)
            }
          }
          sum = 0
        }
        )
      }
     
    })

  })

  const dataLine = {
    labels: label,
    datasets: [{
      label: 'فروشگاه 1',
      data:datas.store1,
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: ' فروشگاه 2',
      data: datas.store2,
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
    },
    {
      label: ' فروشگاه 3',
      data: datas.store3,
      borderColor: 'rgba(255, 206, 86, 1)',
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
    },
    {
      label: ' فروشگاه 4',
      data: datas.store4,
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    }
    ]
  }

  //******************************** اتمام */

  //********************************  مجموع پرداختی هر فروشگاه ***/

  const SoldData = []
  ProductSold.filter(element => Object.keys(element.reject).length === 0)
    .map((elments) => {
      let indexData = SoldData.findIndex(dd => dd.name === elments.store)
      if (indexData > -1) {
        SoldData.splice(indexData, 1, { name: elments.store, number: SoldData[indexData].number + Number(elments.price) })
      }
      if (indexData === -1) {
        SoldData.splice(SoldData.splice.length, 0, { name: elments.store, number: Number(elments.price) })
      }
    })
  const dataBar = {
    labels: SoldData.map(element => element.name),
    datasets: [{
      data: SoldData.map(element => element.number),
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }]
  }


  //******************************** اتمام */



  return (
    <div className={classes.root}>
      <PerfectScrollbar className='scroll-area' options={{ wheelPropagation: true, suppressScrollX: true }} >
        <Grid container spacing={3}>

          <Grid item xs={6}>
            <Card className={skinContex.skin === "Light" ? classes.lightpaper : classes.darkpaper}
              style={{ width: "32vw", height: "40vh" }} >
              <section style={{ display: "flex", flexDirection: "column" }}>
                <div >
                  <Bar data={dataBar} />
                </div>
                <span style={{ color: "#7367F0" }}>  مجموع پرداختی هر فروشگاه</span>
              </section>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className={skinContex.skin === "Light" ? classes.lightpaper : classes.darkpaper} style={{ width: "32vw", height: "40vh" }} >
              <section style={{ display: "flex", flexDirection: "column" }}>

                <div style={{ width: ' 100%', height: '100%' }}>
                  <Line data={dataLine} />
                </div>
                <span style={{ color: "#7367F0" }}>جمع قیمت کالاهای درخواستی هر فروشگاه بر اساس ماه</span>
              </section>
            </Card>
          </Grid>


          <Grid item xs={6}>
            <Card className={skinContex.skin === "Light" ? classes.lightpaper : classes.darkpaper} style={{ width: "32vw", height: "60vh" }} >
              <section style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ width: "85%" }}>
                  <Doughnut data={amountOfProductByNumber} />
                </div>
                <span style={{ color: "#7367F0", marginTop: "10px" }}>موجودی انبار براساس تعداد کالا</span>
              </section>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className={skinContex.skin === "Light" ? classes.lightpaper : classes.darkpaper} style={{ width: "32vw", height: "60vh" }}>
              <section style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ width: "85%", display: "inline-block" }}>
                  <Pie data={amountOfSoldByNumbe} />
                </div>
                <span style={{ color: "#7367F0", marginTop: "10px" }}>سفارش کالا بر اساس تعداد </span>
              </section>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card className={skinContex.skin === "Light" ? classes.lightpaper : classes.darkpaper} style={{ width: "32vw", height: "60vh" }} >
              <section style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ width: "85%" }}>
                  <Doughnut data={amountOfProductByWeight} />
                </div>
                <span style={{ color: "#7367F0", marginTop: "10px" }}>موجودی انبار براساس وزن کالا </span>
              </section>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className={skinContex.skin === "Light" ? classes.lightpaper : classes.darkpaper} style={{ width: "32vw", height: "60vh" }}>
              <section style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ width: "85%", display: "inline-block" }}>
                  <Pie data={amountOfSoldByWeight} />
                </div>
                <span style={{ color: "#7367F0", marginTop: "10px" }}> سفارش کالا بر اساس وزن   </span>
              </section>
            </Card>
          </Grid>

        </Grid>
      </PerfectScrollbar>
    </div>


  )
}
export default Dashbord