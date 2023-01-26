import React, { useContext, useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { contex } from '../Layout'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from "material-ui-search-bar";
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import ReplayIcon from '@material-ui/icons/Replay';

import { changeSelectedItem, handleSearchItem, productReject, changeTableInfo, deleteProductSell, handleIRequestFilter } from '../createSlice'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';

import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import InputIcon from "react-multi-date-picker/components/input_icon"
import transition from "react-element-popper/animations/transition"


/* *************sort  ******************/
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
/* ************* end sort  ******************/


/* ************* table tiitle  ******************/
const headCells = [
  { id: 'id', numeric: false, disablePadding: true, label: 'tableRow' },
  { id: 'title', numeric: true, disablePadding: false, label: 'tableTitle' },
  { id: 'store', numeric: true, disablePadding: false, label: 'tableStore' },
  { id: 'number', numeric: true, disablePadding: false, label: 'tableSoldAmount' },
  { id: 'totalPrice', numeric: true, disablePadding: false, label: 'tablePrice' },
  { id: 'time', numeric: true, disablePadding: false, label: 'tableRequestTime' },
  { id: 'type', numeric: true, disablePadding: false, label: 'tableCelStatuseType' },
  { id: 'edit', numeric: true, disablePadding: false, label: 'tableAction' },

];
/* ************* end table tiitle  ******************/

/* *************style  ******************/
const useStyles = makeStyles((theme) => ({

  root: {
    width: '100%',
  },
  darkPaper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: "#283046",
  },
  lightPaper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: "white",
  },

  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  darkpaggination: {
    direction: "ltr",
    padding: "10px",
    borderTop: "1px solid white !important"

  },
  lightpaggination: {
    direction: "ltr",
    padding: "10px",
    borderTop: "1px solid gray !important"

  },
  addDarkButtom: {
    backgroundColor: "#7367f0 !important",
    boxShadow: '0 0 10px 1px rgb(115 103 240 / 70%) !important',
    marginBottom: "5px",
    color: "white",
  },
  addLightButtom: {
    backgroundColor: "#7367f0 !important",
    boxShadow: '0 0 10px 1px rgb(115 103 240 / 70%) !important',
    marginBottom: "5px",
    color: "black",
  },
  darkFontColor: {
    color: "white",
  },
  lightFontColor: {
    color: "black",
  },
  changeTableButtoms: {
    display: "flex",
    justifyContent: "end",
    marginBottom: "5px"
  },
  modalPaper: {
    position: 'absolute',
    top: '40%',
    left: '35%',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    border: "1px solid #444 !important"
  },

  darkTableTitile: {
    backgroundColor: "#343d55",
    color: "white",
    paddingRight: "8px !important"
  },
  lightTableTitile: {
    backgroundColor: "#f3f2f7",
    color: "black",
    paddingRight: "8px !important"
  },
  darkSearchBar: {
    margin: "10px",
    backgroundColor: "#343d55",
    borderRadius: "5px !important"
  },
  lightSearchBar: {
    margin: "10px",
    backgroundColor: "#f3f2f7",
    borderRadius: "5px !important"
  },
  unImportantType: {
    //  backgroundColor:"rgba(115, 103, 240, 0.12)",
    //  color:' #7367f0 !important',

    marginRight: '1rem !important',
    padding: "0.2rem 0.6rem",
    borderRadius: ' 10rem',

    // backgroundColor:'rgba(40, 199, 111, 0.12)',
    // color: '#28c76f !important',


    backgroundColor: 'rgba(0, 207, 232, 0.12)',
    color: '#00cfe8 !important',

    // backgroundColor: 'rgba(234, 84, 85, 0.12)',
    // color: '#ea5455 !important',
  },
  importantType: {
    marginRight: '1rem !important',
    padding: "0.2rem 0.6rem",
    borderRadius: ' 10rem',
    backgroundColor: 'rgba(234, 84, 85, 0.12)',
    color: '#ea5455 !important',
  },
  table: {
    minWidth: 750,
    height: "50vh !important",
  },
  tablebody: {
    //  height:"200px",
    //  backgroundColor:"red"
  },
  darkModalPaper: {
    position: 'absolute',
    top: '14%',
    left: '35%',
    width: 400,
    backgroundColor: "#283046",
    // boxShadow: theme.shadows[5],
    boxShadow: '0 5px 20px 0 rgb(34 41 47 / 10%) !important',
    border: "none !important",
    borderRadius: "5px"
  },
  lightModalPaper: {
    position: 'absolute',
    top: '14%',
    left: '35%',
    width: 400,
    backgroundColor: "white",
    // boxShadow: theme.shadows[5],
    boxShadow: '0 5px 20px 0 rgb(34 41 47 / 10%) !important',
    border: "none  !important",
    borderRadius: "5px"
  },
  lightModalHeader: {
    // color: "blue",
    backgroundColor: '#cccef7',
    borderBottom: 'none  !important',
    height: "6vh",
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px'
  },
  darkModalHeader: {
    // color: "white",
    backgroundColor: '#161d31',
    borderBottom: 'none  !important',
    height: "6vh",
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px'
  },
  darkmodalBody: {
    padding: '2rem',
    color: "white"
  },
  lightmodalBody: {
    padding: '1rem',
    color: "black"

  },
  modalFooter: {
    borderTop: ' 1px solid #7367f0',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: '0.8rem 1.4rem',
    justifyContent: "space-around",
  },
  alertInfo: {
    // background: 'rgba(40, 199, 111, 0.12)' ,
    backgroundColor: 'rgba(255, 159, 67, 0.12)',
    color: '#ff9f43 !important',

    border: 'none  !important',
    padding: '0',
    // marginTop: '1rem',
    borderRadius: '0.358rem',
    marginBottom: '2rem',
    // color: '#28c76f' ,
    position: 'relative',
    transition: 'opacity 0.15s linear',

  },
  alertBody: {
    padding: '0.71rem 1rem',
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },


}));
/* ************* end style  ******************/


/* ******************************** main  component *******************************************/
export default function Requests() {

  const classes = useStyles();
  const skinContex = useContext(contex)
  const dispatch = useDispatch()

  const data = useSelector(state => state.items.productsSold)
  const searchItem = useSelector(state => state.items.search)
  const reason = useSelector(state => state.items.reason)
  const [inputValue, setInputValue] = useState("")
  const selectedItem = useSelector(state => state.items.selectedItem)
  const tableInfo = useSelector(state => state.items.tableInfo)
  const filterData = useSelector(state => state.items.filter)

  const [searched, setSearched] = useState("");
  const [filter, setFilter] = useState(false);

  const [rowsPerPage] = useState(5);
  const [page, setPage] = useState(tableInfo[1].page);

  const [order, setOrder] = useState('asc');         //for order
  const [orderBy, setOrderBy] = useState('calories');   //for order


  const [openModal, setOpenModal] = useState(false);    //for modal
  const [openFilterModal, setOpenFilterModal] = useState(false);    //for modal

  const [openNotification, setOpenNotification] = useState(false);

  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedF: false,
    checkedG: false,
  });
  const [situation, setSituation] = useState({
    forwarding: false,
    return: false
  })
  const [filterTime, setFilterTime] = useState(false)
  const [timeLimit, settimeLimit] = useState({
    start: "",
    end: ""
  })

  console.log("jj Data", data)

  const handleChangePage = (event, value) => {
    setPage(parseInt(value));
    dispatch(changeTableInfo([1, false, false, value]))
  }
  const [errorProps, setErrorProps] = useState(false)

  useEffect(() => {
    setPage(tableInfo[1].page);
  }, [tableInfo[1]])

  useEffect(() => {
    //*************** مشخص کردن فیلتر*/
    dispatch(changeTableInfo([1, searched === "" ? false : true,
      (state.checkedA || state.checkedB || state.checkedF || state.checkedG || situation.forwarding || situation.return || filterTime) ? true : false,
      page]))

    setFilter(state.checkedA || state.checkedB || state.checkedF || state.checkedG || situation.forwarding || situation.return || filterTime)

    dispatch(handleIRequestFilter([state, situation, timeLimit, filterTime]))
  }, [state, situation, searched, timeLimit, filterTime])

  console.log("jjj tableInfo", tableInfo[1])

  const rows = searched === "" ? (filter ? filterData : data) : (filter ? filterData : searchItem)


  /* ************* modal  ******************/
  // **for filter
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });

  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenFilterModal = () => {
    setOpenFilterModal(true);
  };
  const handleCloseFilterModal = () => {
    setOpenFilterModal(false);
  };

  /* ************* end modal  ******************/

  /* *************  sucsses notic  ******************/
  const handleNoticClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotification(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  /* ************* end sucsses notic  ******************/

  /* ************* table header  ******************/
  function EnhancedTableHead(props) {
    const { classes,
      order, orderBy,
      onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align='right'
              width={headCell.numeric ? '750' : '50'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              className={skinContex.skin === "Light" ? classes.lightTableTitile : classes.darkTableTitile}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                <FormattedMessage id={headCell.label} />
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  /* ************* end table header  ******************/


  const emptyRows = Math.max(rows.length, page * rowsPerPage) - rows.length;

  return (
    <>
      <div >
        <section className={classes.changeTableButtoms}>
          <Tooltip title="فیلتر" placement="bottom" >
            <IconButton color="primary" onClick={handleOpenFilterModal}>
              < FilterListIcon />
            </IconButton>
          </Tooltip>
          <Modal
            open={openFilterModal}
            onClose={handleCloseFilterModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            style={{ direction: "rtl" }}
          >
            <div className={skinContex.skin === "Light" ? classes.lightModalPaper : classes.darkModalPaper}>
              <div className={skinContex.skin === "Light" ? classes.lightModalHeader : classes.darkModalHeader}>فیلتر :</div>
              <div className={skinContex.skin === "Light" ? classes.lightmodalBody : classes.darkmodalBody}>
                <section style={{ direction: "rtl" }} >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        color="primary"
                      />
                    }
                    label="فروشگاه 1"
                  />
                  <br />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChange}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="فروشگاه 2"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedF}
                        onChange={handleChange}
                        name="checkedF"
                        color="primary"
                      />
                    }
                    label="فروشگاه 3"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedG}
                        onChange={handleChange}
                        name="checkedG"
                        color="primary"
                      />
                    }
                    label="فروشگاه 4"
                  />
                  <hr />
                  <FormControlLabel style={{ direction: "ltr" }}
                    label="مرجوعی"
                    control={
                      <Switch
                        checked={situation.return}
                        onChange={(event) => {
                          setSituation({ forwarding: false, return: event.target.checked })

                        }}
                        name="return"
                        color="primary"
                      />
                    }
                  />
                  <FormControlLabel style={{ direction: "ltr" }}
                    label="ارسال شده"
                    control={
                      <Switch
                        checked={situation.forwarding}
                        onChange={(event) => {
                          setSituation({ return: false, forwarding: event.target.checked });
                        }}
                        name="forwarding"
                        color="primary"
                      />
                    }
                  />
                  <hr />
                  <FormControlLabel style={{ direction: "ltr" }}
                    control={
                      <Switch
                        checked={filterTime}
                        onChange={e => {
                          setFilterTime(e.target.checked)
                          dispatch(changeTableInfo([1, searched === "" ? false : true,
                            (state.checkedA || state.checkedB || state.checkedF || state.checkedG || situation.forwarding || situation.return || e.target.checked) ? true : false,
                            page]))
                        }
                        }
                        name="filterTime"
                        color="primary"
                      />
                    }
                    label="تاریخ"
                  />
                  <br />
                  <div style={{ marginRight: "30px" }}>
                    <label style={{ color: " #7367f0 ", padding: "5px" }}>از :</label>
                    <DatePicker
                      animations={
                        [transition({ duration: 800, from: 35 })]
                      }
                      format="YYYY/M/D"
                      value={timeLimit.start}
                      onChange={date => {
                        settimeLimit({ ...timeLimit, start: date.format() })

                      }}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      render={<InputIcon />}
                      disabled={filterTime ? false : true}
                    />
                    <br />
                    <label style={{ color: " #7367f0 ", padding: "5px" }}>تا :</label>
                    <DatePicker
                      format="YYYY/M/D"
                      value={timeLimit.end}
                      onChange={date => {
                        settimeLimit({ ...timeLimit, end: date.format() })
                      }}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      render={<InputIcon />}
                      disabled={filterTime ? false : true}

                    />
                    {/* <p style={{ display: maxAmountBigger ? "none" : "", color: "red", paddingRight: "30%", margin: "0", fontSize: "10px" }}>مقدار وارد شده کمتر از مقدار ماکسیمم می باشد</p> */}

                  </div>
                </section>
              </div>
              <div className={classes.modalFooter}></div>

            </div>
          </Modal>
        </section>
        <SearchBar className={skinContex.skin === "Light" ? classes.lightSearchBar : classes.darkSearchBar}
          value={searched}
          placeholder="جستجو"
          searchIcon={<SearchIcon style={{ color: "#7367f0" }} />}
          onChange={(searchVal) => {
            setSearched(searchVal)
            dispatch(handleSearchItem([1, searchVal]))

          }}
        />
        <div className={classes.root}>
          <Paper className={skinContex.skin === "Light" ? classes.lightPaper : classes.darkPaper}>

            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={'small'}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          key={row.number}
                          className={classes.tablebody}
                        >
                          <TableCell style={{ paddingRight: "90px !important" }} component="th" scope="row" align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor} > {((page - 1) * rowsPerPage) + (index + 1)}</TableCell>
                          <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}>{row.title}</TableCell>
                          <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}>{row.store}</TableCell>
                          <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}>{row.amount}
                            <span style={{ display: row.counterUnit !== "number" ? "inlineblock" : "none" }}>Kg</span>
                            <span style={{ display: row.counterUnit === "number" ? "inlineblock" : "none" }}>عدد</span>
                          </TableCell>
                          <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}>{row.price}</TableCell>
                          <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor} >{row.time}</TableCell>
                          <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}  ><span className={Object.keys(row.reject).length === 0 ? classes.unImportantType : classes.importantType}>{Object.keys(row.reject).length !== 0 ? "مرجوع" : "تکمیل"}</span></TableCell>
                          <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}  >
                            <Tooltip title="بازگشت" placement="right" >
                              <ReplayIcon
                                color={Object.keys(row.reject).length === 0 ? 'primary' : "disabled"}
                                onClick={() => {
                                  if (Object.keys(row.reject).length === 0) {
                                    handleOpenModal()
                                    dispatch(changeSelectedItem(((page - 1) * rowsPerPage) + (index + 1)))
                                  }

                                }} />
                            </Tooltip>
                            <Tooltip title="حذف" placement="left" >
                              <DeleteIcon
                                color={Object.keys(row.reject).length === 0 ? 'primary' : "disabled"}
                                onClick={() => {
                                  if (Object.keys(row.reject).length === 0) {
                                    dispatch(deleteProductSell(((page - 1) * rowsPerPage) + (index + 1)))
                                  }

                                }}
                              />
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 55 * emptyRows }}>
                      <TableCell colSpan={7} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination count={Math.ceil(rows.length / rowsPerPage)}
              className={skinContex.skin === "Light" ? classes.lightpaggination : classes.darkpaggination}
              page={page}
              onChange={handleChangePage}
              color="primary" />
          </Paper>
        </div>

      </div>

      <Snackbar open={openNotification} autoHideDuration={4000} onClose={handleNoticClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} >
        <Alert onClose={handleNoticClose} severity="success">
          <AlertTitle>موفق</AlertTitle>
          عملیات با موفقیت انجام شد
        </Alert>
      </Snackbar>
      <Modal
        open={openModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ direction: "rtl" }}
      >
        <div className={skinContex.skin === "Light" ? classes.lightModalPaper : classes.darkModalPaper}>
          <div style={{ color: "red" }} className={skinContex.skin === "Light" ? classes.lightModalHeader : classes.darkModalHeader}>مرجوع کالا :</div>
          <div style={{ textAlign: "center" }} className={skinContex.skin === "Light" ? classes.lightmodalBody : classes.darkmodalBody}>
            <div className={classes.alertInfo}>
              <section className={classes.alertBody}>
                شما در حال بازگشت
                کالا {rows[selectedItem - 1] ? rows[selectedItem - 1].title : ""}
                به مقدار {rows[selectedItem - 1] ? rows[selectedItem - 1].amount : ""}   {rows[selectedItem - 1]?.counterUnit === "number" ? "عدد" : "kg"}    ارسال  شده به فروشگاه    {rows[selectedItem - 1]?.store}   در تاریخ   {rows[selectedItem - 1]?.time}   هستید
              </section>
            </div>
            <p> لطفا دلیل برگشت کالا را ذکر کنید</p>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-name-label">نام</InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                label="نام"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setErrorProps(false)
                }}
              >
                {
                  reason.map(element => (
                    <MenuItem value={element.value}>{element.titile}</MenuItem>
                  ))
                }



              </Select>
              <div style={{ color: "red", display: errorProps ? "" : "none" }}>   لطفا نام فروشگاه را انتخاب کنبد</div>
            </FormControl>
          </div>
          <div className={classes.modalFooter}  >
            <Button variant="contained" color="primary" component="span"
              onClick={() => {

                if (inputValue === "") {
                  setErrorProps(true)
                }
                dispatch(productReject(inputValue))
                // ** close and clear select
                setInputValue("")
                handleCloseModal()
              }}
            >
              <FormattedMessage id='save' />
            </Button>
            <Button variant="contained" color="secondary" component="span"
              onClick={() => {
                //close and clear select
                handleCloseModal()
                setInputValue("")
              }}
            >
              بستن
            </Button>
          </div>

        </div>
      </Modal>
    </>

  );
}

