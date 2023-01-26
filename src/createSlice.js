import { createSlice } from "@reduxjs/toolkit"
let soldId = 6
let rejectId = 1
export const data = createSlice({
  name: "items",
  initialState: {

    selectedItem: 1,
    // ***** دلایل برگشت کالا
    reason: [
      { value: "A1", titile: "خرابی محصول" },
      { value: "A2", titile: "ارسال اشتباه" },
      { value: "A3", titile: "عدم نیاز به محصول" }
    ],
    // *****  اطلاعات جداول شامل نوع فیلتر و سرچ و حتی صفحه جدول
    // *****   برای موجودی انبار و کالاهای درخواستی و کالای مرجوعی و کسری انبار 
    tableInfo: [
      { name: "Inventory", search: false, filter: false, page: 1 },
      { name: "Requests", search: false, filter: false, page: 1 },
      { name: "RejectList", search: false, filter: false, page: 1 },
      { name: "a4", search: false, filter: false, page: 1 },
    ],

    // ***** لیست تمام محصولات
    products: [
      {
        title: "کاغذ کاپ کیک",
        Price: "3000",
        totalNumber: "100",
        type: "notImport",
        weight: "",
        image: require("./asset/cupCake.png"),
        detail: [{ number: "20", time: "۱۴۰۱/۷/۱6" }, { number: "10", time: "۱۴۰۱/۷/۱۷" }],
        description: "gfggfgf",
        counterUnit: "number"
      },
      {
        title: "قالب کیک",
        Price: "60000",
        totalNumber: "8",
        type: "import",
        weight: "",
        image: require("./asset/ghaleb.png"),
        detail: [{ number: "2", time: "۱۴۰۱/۴/۱۱" }, { number: "10", time: "۱۴۰۱/۷/۱۷" }],
        description: "",
        counterUnit: "number"
      },
      {
        title: "ارد سفید",
        Price: "10000",
        totalNumber: "",
        type: "notImport",
        weight: "4",
        image: require("./asset/ard.png"),
        detail: [{ number: "20", time: "۱۴۰۱/۷/۱6" }, { number: "10", time: "۱۴۰۱/۷/۱۷" }],
        description: "",
        counterUnit: "weight"
      },
      {
        title: "ارد ذرت",
        Price: "12000",
        totalNumber: "",
        type: "notImport",
        weight: "20",
        image: require("./asset/podre-neshaste-zorat-ruysa.png"),
        detail: [],
        description: "درجه1",
        counterUnit: "weight"
      },

    ],
    // ***** لیست محصولات سرچ شده
    search: [],

    // ***** لیست فیلتر
    filter: [],

    // ***** لیست محصولات فروخته شده و لیست دلایل برگشت کالا 
    productsSold: [
      {
        id: 1,
        title: "کاغذ کاپ کیک",
        store: "فروشگاه 3",
        price: "60000",
        amount: "20",
        time: "۱۴۰۱/۷/۱۱",
        reject: {},
        counterUnit: "number"
      },
      {
        id: 2,
        title: "قالب کیک",
        store: "فروشگاه 4",
        price: "120000",
        amount: "2",
        time: "۱۴۰۱/۷/۱۷",
        reject: {},
        counterUnit: "number"
      },
      {
        id: 3,
        title: "کاغذ کاپ کیک",
        store: "فروشگاه 3",
        price: "60000",
        amount: "20",
        time: "۱۴۰۱/۷/۱۸",
        reject: { OutOfDate: false, id: 2, reason: "A1", time: "۱۴۰۱/۷/۱۸" },
        counterUnit: "number"
      },
      {
        id: 4,
        title: "قالب کیک",
        store: "فروشگاه 1",
        price: "300000",
        amount: "5",
        time: "۱۴۰۱/۸/۱۱",
        reject: { OutOfDate: true, id: 1, reason: "A2", time: "۱۴۰۱/۷/۲۹" },
        counterUnit: "number"
      },
      {
        id: 5,
        title: "ارد ذرت",
        store: "فروشگاه 2",
        price: "240000",
        amount: "20",
        time: "۱۴۰۱/۸/۱۹",
        reject: {},
        counterUnit: "weight"
      },
      {
        id: 6,
        title: "ارد سفید",
        store: "فروشگاه 1",
        price: "230000",
        amount: "23",
        time: "۱۴۰۱/۸/۲۲",
        reject: {},
        counterUnit: "weight"
      },
      {
        id: 7,
        title: "قالب کیک",
        store: "فروشگاه 4",
        price: "120000",
        amount: "2",
        time: "۱۴۰۱/۹/۱۷",
        reject: {},
        counterUnit: "number"
      },
      {
        id: 8,
        title: "ارد ذرت",
        store: "فروشگاه 3",
        price: "240000",
        amount: "20",
        time: "۱۴۰۱/۹/۱۹",
        reject: {},
        counterUnit: "weight"
      },

    ],
    // ***** لیست فروشگاهها
    store: [
      { name: "فروشگاه 1", time: "۱۴۰۱/۷/۱۷", concession: "golden", address: "چها راه کوثر", description: "" },
      { name: "فروشگاه 2", time: "۱۴۰۱/۷/۱۴", concession: "silver", address: "آزادی", description: "" },
      { name: "فروشگاه 3", time: "۱۴۰۱/۷/۱۱", concession: "silver", address: "امیرکبیر", description: "" },
      { name: "فروشگاه 4", time: "۱۴۰۱/۱/۱۴", concession: "golden", address: "بلوار جمهوری", description: "" }
    ],
    // ***** لیست کالاهای رزرو شده فروشگاهها به دلیل کسری انبار
    deficits: [
      {
        amount: "7", counterUnit: "weight", mainIndex: 2,
        status: "ضروری", store: "فروشگاه 1", time: "۱۴۰۱/۹/۸", title: "ارد سفید"
      },
      {
        amount: "2", counterUnit: "weight", mainIndex: 3,
        status: "غیر ضروری", store: "فروشگاه 2", time: "۱۴۰۱/۹/۹", title: "ارد ذرت"
      }
    ]
  },
  reducers: {
    //************************ add product
    addItem: (state, action) => {
      const data = { ...action.payload }
      state.products.splice(state.products.length, 0, data)
    },
    //************************ deleat product
    deleteItem: (state, action) => {

      //**change page if need when delete */
      if (state.products.length % 5 === 1) {
        if (state.products.length > 5 & state.tableInfo[0].page > state.products.length / 5)
          state.tableInfo.splice(0, 1, { name: "Inventory", search: false, filter: false, page: state.tableInfo[0].page - 1 })

      }

      //**deleate item */
      state.products = state.products.filter(element => element.title !== action.payload)

    },
    //******************** change value of product
    newValueOfItem: (state, action) => {
      const index = state.selectedItem - 1
      //** add change to detail*/
      state.products[index].detail.splice(state.products[index].detail.length, 0, { number: action.payload, time: new Date().toLocaleDateString('fa-IR') })
      //** increament amount of products*/
      if (state.products[index].counterUnit === "number") {
        state.products.splice(index, 1, { ...state.products[index], totalNumber: Number(state.products[index].totalNumber) + action.payload })
      }
      if (state.products[index].counterUnit === "weight") {
        state.products.splice(index, 1, { ...state.products[index], weight: Number(state.products[index].weight) + Number(action.payload) })
      }
    },
    //*********************** edit one product
    editEtem: (state, action) => {
      const index = state.selectedItem - 1
      //** add change to detail*/
      state.products[index].detail.splice(state.products[index].detail.length, 0,
        {
          type: action.payload.type === state.products[index].type ? "" : action.payload.type,
          time: new Date().toLocaleDateString('fa-IR'),
          title: action.payload.title === state.products[index].title ? "" : action.payload.title,
          Price: action.payload.Price === state.products[index].Price ? "" : action.payload.Price
        })
      //** change item that edit*/
      state.products.splice(index, 1,
        {
          ...state.products[index], Price: action.payload.Price,
          image: action.payload.image, title: action.payload.title, type: action.payload.type
        }
      )


    },
    //************************ search product
    handleSearchItem: (state, action) => {
      let data = []

      if (action.payload[0] === 0) {
        data = state.tableInfo[action.payload[0]].filter === false ? state.products : state.filter
      }
      if (action.payload[0] === 1) {

        data = state.tableInfo[1].filter === false ? state.productsSold : state.filter
      }
      if (action.payload[0] === 2) {

        data = state.tableInfo[2].filter === false ? state.productsSold.filter(element => Object.keys(element.reject).length !== 0) : state.filter
      }
      if (action.payload[0] === 3) {

        data = state.tableInfo[3].filter === false ? state.deficits : state.filter
      }
      state.search = data.filter(element => element.title.includes(action.payload[1]))
    },
    //************************ filter product
    handleInventryFilter: (state, action) => {
      let data = state.tableInfo[0].search === false ? state.products : state.search

      if (action.payload[0].filterType) {
        data = data.filter(element => element.type === "import")

      }
      if (action.payload[0].filterPrice) {
        if (action.payload[1].min !== "")
          data = data.filter(element => Number(element.Price) >= Number(action.payload[1].min))
        if (action.payload[1].max !== "")
          data = data.filter(element => Number(element.Price) <= Number(action.payload[1].max))
      }
      if (action.payload[0].filterAmount) {
        if (action.payload[2].min !== "") {
          data = data.filter(element => (element.counterUnit === "weight" ? Number(element.weight) : Number(element.totalNumber)) >= Number(action.payload[2].min))
        }
        if (action.payload[2].max !== "") {

          data = data.filter(element => (element.counterUnit === "weight" ? Number(element.weight) : Number(element.totalNumber)) <= Number(action.payload[2].max))
        }
      }

      state.filter = [...data]
    },
    handleIRequestFilter: (state, action) => {
      const {
        checkedA,
        checkedB,
        checkedF,
        checkedG
      } = action.payload[0]

      let data = state.tableInfo[1].search === false ? state.productsSold : state.search

      //for select sevral store
      let stores = []
      if (checkedA || checkedB || checkedF || checkedG) {
        if (checkedA)
          stores = data.filter(element => element.store.includes("فروشگاه 1"))
        if (checkedB)
          stores = stores.concat(data.filter(element => element.store.includes("فروشگاه 2")))
        if (checkedF)
          stores = stores.concat(data.filter(element => element.store.includes("فروشگاه 3")))
        if (checkedG)
          stores = stores.concat(data.filter(element => element.store.includes("فروشگاه 4")))
        data = [...stores]
      }

      if (action.payload[1].forwarding)
        data = data.filter(element => Object.keys(element.reject).length === 0)
      if (action.payload[1].return)
        data = data.filter(element => Object.keys(element.reject).length > 0)

      if (action.payload[2].start !== "")
        data = data.filter(element => element.time.localeCompare(action.payload[2].start) >= 0)
      if (action.payload[2].end)
        data = data.filter(element => element.time.localeCompare(action.payload[2].end) <= 0)

      state.filter = [...data]
    },
    //************************ buy product
    productPurchase: (state, action) => {
      const data = { ...action.payload[0], id: soldId++, reject: {} }
      const index = action.payload[1] === -1 ? state.selectedItem - 1 : action.payload[1]
      //**add to list of producr that sold */
      state.productsSold.splice(state.productsSold.length, 0, data)

      //** decreament amount of products*/
      if (state.products[index].counterUnit === "number") {
        state.products.splice(index, 1, { ...state.products[index], totalNumber: Number(state.products[index].totalNumber) - action.payload[0].amount })
      }
      if (state.products[index].counterUnit === "weight") {
        state.products.splice(index, 1, { ...state.products[index], weight: Number(state.products[index].weight) - Number(action.payload[0].amount) })
      }
    },
    //***************************** delete product that sell
    deleteProductSell: (state, action) => {

      //**change page if need when delete */
      if (state.productsSold.length % 5 === 1) {
        if (state.productsSold.length > 5 & state.tableInfo[1].page > state.productsSold.length / 5)
          state.tableInfo.splice(1, 1, { name: "Requests", search: false, filter: false, page: state.tableInfo[1].page - 1 })
      }

      //add to products
      let index = state.products.findIndex(element => element.title === state.productsSold[action.payload - 1].title)
      if (state.products[index].counterUnit === "number") {
        state.products.splice(index, 1, { ...state.products[index], totalNumber: Number(state.products[index].totalNumber) + Number(state.productsSold[action.payload - 1].amount) })
      }
      if (state.products[index].counterUnit === "weight") {
        state.products.splice(index, 1, { ...state.products[index], weight: Number(state.products[index].weight) + Number(state.productsSold[action.payload - 1].amount) })
      }

      //**deleate item */
      if (state.tableInfo[1].search) {
        let itemSearchId = state.search[Number(action.payload) - 1].id
        state.search = state.search.filter((item) => item.id !== itemSearchId)
        state.productsSold = state.productsSold.filter((item) => item.id !== itemSearchId)
      }
      if (state.tableInfo[1].filter) {
        let itemFilterId = state.filter[Number(action.payload) - 1].id
        state.filter = state.filter.filter((item) => item.id !== itemFilterId)
        state.productsSold = state.productsSold.filter((item) => item.id !== itemFilterId)
      }
      if (!state.tableInfo[1].filter & !state.tableInfo[1].search) {
        let itemId = state.productsSold[Number(action.payload) - 1].id
        state.productsSold = state.productsSold.filter((item) => item.id !== itemId)
      }

    },
    //************************** reject  a product
    productReject: (state, action) => {

      let returnProduct = false
      if (action.payload === "A3" || action.payload === "A2") {
        returnProduct = true
        // **find index of product that reject
        let index = state.products.findIndex(element => element.title === state.productsSold[state.selectedItem - 1].title)
        // ** add reject item to product list
        if (state.products[index].counterUnit === "number") {
          state.products.splice(index, 1, { ...state.products[index], totalNumber: Number(state.products[index].totalNumber) + Number(state.productsSold[state.selectedItem - 1].amount) })
        }
        if (state.products[index].counterUnit === "weight") {
          state.products.splice(index, 1, { ...state.products[index], weight: Number(state.products[index].weight) + Number(state.productsSold[state.selectedItem - 1].amount) })
        }

      }
      if (action.payload === "A1") {
        returnProduct = false
      }

      // **create list of product that reject
      const data = { id: rejectId++, reason: action.payload, time: new Date().toLocaleDateString('fa-IR'), OutOfDate: returnProduct }

      state.productsSold[state.selectedItem - 1].reject = data
    },
    //***************************** item selected
    changeSelectedItem: (state, action) => {
      state.selectedItem = action.payload
    },
    //***************************** change table info
    changeTableInfo: (state, action) => {
      state.tableInfo.splice(action.payload[0], 1, { name: state.tableInfo[action.payload[0]].name, page: action.payload[3], search: action.payload[1], filter: action.payload[2] })
    },

    //***************************** add Deficits
    createDeficitsList: (state, action) => {
      const data = { ...action.payload, time: new Date().toLocaleDateString('fa-IR') }
      state.deficits.splice(state.deficits.length, 0, data)
    },
    //***************************** delete Deficits
    deleteDeficits: (state, action) => {
      if (state.deficits.length % 5 === 1) {
        if (state.deficits.length > 5 & state.tableInfo[3].page > state.deficits.length / 5)
          state.tableInfo.splice(3, 1, { name: "Inventory", search: false, filter: false, page: state.tableInfo[3].page - 1 })
      }
      const arry1 = state.deficits.slice(action.payload, state.deficits.length);
      const arry2 = state.deficits.slice(0, action.payload - 1);
      state.deficits = arry2.concat(arry1);

    },

  }
})
export const { addItem, changeSelectedItem, newValueOfItem, editEtem, handleSearchItem,
  productPurchase, productReject, deleteItem, changeTableInfo, createDeficitsList, deleteDeficits,
  deleteProductSell, handleInventryFilter, handleIRequestFilter } = data.actions
export default data.reducer