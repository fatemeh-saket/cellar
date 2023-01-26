
import React, { useContext, useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { contex } from '../Layout'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom';
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
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from "material-ui-search-bar";
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';

import CreateItem from './CreateItem'

import { changeSelectedItem, handleSearchItem, changeTableInfo, handleInventryFilter } from '../createSlice'


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
  { id: 'number', numeric: false, disablePadding: true, label: 'tableRow' },
  { id: 'title', numeric: true, disablePadding: false, label: 'tableTitle' },
  { id: 'totalNumber', numeric: true, disablePadding: false, label: 'tableInventory' },
  { id: 'Price', numeric: true, disablePadding: false, label: 'priceProduction' },
  { id: 'weight', numeric: true, disablePadding: false, label: 'tableWeight' },
  { id: 'type', numeric: true, disablePadding: false, label: 'tableCellType' },
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
    // marginBottom: theme.spacing(2),
    marginBottom: '1rem',

    backgroundColor: "#283046",
  },
  lightPaper: {
    width: '100%',
    // marginBottom: theme.spacing(2),
    marginBottom: '1rem',
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
    justifyContent: "space-between",
    marginBottom: "5px"
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
    top: '20%',
    left: '35%',
    width: 400,
    backgroundColor: "#283046",
    // boxShadow: theme.shadows[5],
    boxShadow: '0 5px 20px 0 rgb(34 41 47 / 10%) !important',
    border: "none",
    borderRadius: "5px"
  },
  lightModalPaper: {
    position: 'absolute',
    top: '20%',
    left: '35%',
    width: 400,
    backgroundColor: "white",
    // boxShadow: theme.shadows[5],
    boxShadow: '0 5px 20px 0 rgb(34 41 47 / 10%) !important',
    border: "none",
    borderRadius: "5px"
  },
  lightModalHeader: {
    color: "blue",
    backgroundColor: '#cccef7',
    borderBottom: 'none',
    height: "6vh",
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px'
  },
  darkModalHeader: {
    color: "white",
    backgroundColor: '#161d31',
    borderBottom: 'none',
    height: "6vh",
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px'
  },
  darkmodalBody: {
    // padding: theme.spacing(2, 4, 3),
    paddingBottom: '2rem',
    color: "white"
  },
  lightmodalBody: {
    paddingBottom: '2rem',
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

}));
/* ************* end style  ******************/


/* ******************************** main  component *******************************************/
// ** لیست همه ی محصولات و ساخت و ویرایش و نمایش محصول
export default function Inventory() {
  const classes = useStyles();
  const skinContex = useContext(contex)
  let navigate = useNavigate()
  const [maxPriceBigger, setMaxPriceBigger] = useState(true)
  const [maxAmountBigger, setMaxAmountBigger] = useState(true)

  const dispatch = useDispatch()
  const data = useSelector(state => state.items.products)
  const tableInfo = useSelector(state => state.items.tableInfo)

  const searchItem = useSelector(state => state.items.search)
  const filterData = useSelector(state => state.items.filter)

  const [rowsPerPage] = useState(5);   // **for max number of row in one page
  const [page, setPage] = useState(tableInfo[0].page);   // **for page

  const [order, setOrder] = useState('asc');         // **for order
  const [orderBy, setOrderBy] = useState('calories');   // **for order

  const [openPage, setOpenPage] = useState(false)   // **for open add or edit page
  const [isEdit, setIsEdit] = useState(false)      // **if want edit
  const [openModal, setOpenModal] = React.useState(false);    // **for modal
  const [openNotification, setOpenNotification] = useState(false);  // **for alert show

  const [searched, setSearched] = useState("");  // **for search
  const [filter, setFilter] = useState(false);  // **for filter

  let rows = []

  // **for filter
  const [state, setState] = React.useState({
    filterType: false,
    filterPrice: false,
    filterAmount: false,
  });
  const [price, setPrice] = React.useState({
    min: "",
    max: "",
  });
  const [amount, setAmount] = React.useState({
    min: "",
    max: "",
  });
  // **end filter

  useEffect(() => {
    //***************ذخیره صفحه جدول */
    setPage(tableInfo[0].page);
  }, [tableInfo[0].page])

  useEffect(() => {
    //*************** مشخص کردن سرچ و فیلتر*/
    dispatch(changeTableInfo([0, searched === "" ? false : true, (state.filterType || state.filterPrice || state.filterAmount) ? true : false, page]))
    setFilter(state.filterType || state.filterPrice || state.filterAmount)
    dispatch(handleInventryFilter([state, price, amount]))
  }, [state, searched])

  useEffect(() => {
    //***************بررسی بیشتر نبودن ماکس از مین  */
    if (price.min !== "" & Number(price.min) > Number(price.max)) {
      setMaxPriceBigger(false)
    }
    if ((price.min !== "" & Number(price.min) < Number(price.max)) || price.min === "" || price.max === "") {
      setMaxPriceBigger(true)
      dispatch(handleInventryFilter([state, { min: price.min, max: price.max }, amount]))
    }
  }, [price.max])

  useEffect(() => {
    //***************بررسی بیشتر نبودن ماکس از مین  */
    if (amount.min !== "" & Number(amount.min) > Number(amount.max)) {
      setMaxAmountBigger(false)
    }
    if ((amount.min !== "" & Number(amount.min) < Number(amount.max)) || amount.min === "" || amount.max === "") {
      setMaxAmountBigger(true)
      dispatch(handleInventryFilter([state, price, { min: amount.min, max: amount.max }]))
    }
  }, [amount.max])


  // **for filter
  const handleChange = async (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (!state.filterPrice) { setPrice({ min: "", max: "" }) }
    if (!state.filterAmount) { setAmount({ min: "", max: "" }) }
  };
  // **for change table page
  const handleChangePage = (event, value) => {
    setPage(parseInt(value));
    dispatch(changeTableInfo([0, false, false, value]))
  }
  rows = searched === "" ? (filter ? filterData : data) : (filter ? filterData : searchItem)

  /* ************* modal  ******************/
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  /* ************* end modal  ******************/

  /* *************  sucsses notic  ******************/
  const handleNoticOpen = () => {
    setOpenNotification(true);
  };
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
    // numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    // onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    // rowCount: PropTypes.number.isRequired,
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
      {!openPage && <div >
        <section className={classes.changeTableButtoms}>
          <Button variant="contained" className={skinContex.skin === "Light" ? classes.addLightButtom : classes.addDarkButtom}
            startIcon={<AddIcon />}
            onClick={() => {
              setOpenPage(true)
              setIsEdit(false)
            }}
          >
            <span style={{ marginRight: "3px" }}><FormattedMessage id="add" /></span>
          </Button>
          <Tooltip title="فیلتر" placement="bottom" >
            <IconButton color="primary" onClick={handleOpenModal}>
              < FilterListIcon />
            </IconButton>
          </Tooltip>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            style={{ direction: "rtl" }}
          >
            <div className={skinContex.skin === "Light" ? classes.lightModalPaper : classes.darkModalPaper}>
              <div className={skinContex.skin === "Light" ? classes.lightModalHeader : classes.darkModalHeader}>فیلتر :</div>
              <div className={skinContex.skin === "Light" ? classes.lightmodalBody : classes.darkmodalBody}>
                <section style={{ direction: "rtl" }} >
                  <FormControlLabel style={{ direction: "ltr" }}
                    label="کمیاب"
                    control={
                      <Switch
                        checked={state.filterType}
                        onChange={(e) => {
                          handleChange(e)
                        }}
                        name="filterType"
                        color="primary"
                      />
                    }
                  />
                  <hr />
                  <FormControlLabel style={{ direction: "ltr" }}
                    control={
                      <Switch
                        checked={state.filterPrice}
                        onChange={handleChange}
                        name="filterPrice"
                        color="primary"
                      />
                    }
                    label="قیمت"
                  />
                  <br />
                  <div style={{ marginRight: "30px" }}>
                    <label style={{ color: " #7367f0 ", padding: "5px" }}>کمترین قیمت:</label>
                    <input value={price.min}
                      disabled={state.filterPrice ? false : true}
                       type="text" className='input'
                      onChange={e => {
                        setPrice({ ...price, min: e.target.value.replace(/\D/g, '') })
                        dispatch(handleInventryFilter([state, { min: e.target.value.replace(/\D/g, ''), max: price.max }, amount]))
                      }}
                    />
                    <br />
                    <label style={{ color: " #7367f0 ", padding: "5px" }}>بیشترین قیمت:</label>
                    <input disabled={state.filterPrice ? false : true}
                      value={price.max}
                      type="text" maxLength="10" 
                      className={maxPriceBigger ? "input" : "inputError"}
                      onChange={e => {
                        setPrice({ ...price, max: e.target.value.replace(/\D/g, '') })
                      }}
                    />
                    <p style={{ display: maxPriceBigger ? "none" : "", color: "red", paddingRight: "30%", margin: "0", fontSize: "10px" }}>مقدار وارد شده کمتر از ماکسیمم مقدار است</p>
                  </div>
                  <hr />
                  <FormControlLabel style={{ direction: "ltr" }}
                    control={
                      <Switch
                        checked={state.filterAmount}
                        onChange={handleChange}
                        name="filterAmount"
                        color="primary"
                      />
                    }
                    label="تعداد"
                  />
                  <br />
                  <div style={{ marginRight: "30px" }}>
                    <label style={{ color: " #7367f0 ", padding: "5px" }}>کمترین مقدار:</label>
                    <input disabled={state.filterAmount ? false : true}
                      value={amount.min}
                      type="text" maxLength="10" className='input'
                      onChange={e => {
                        setAmount({ ...amount, min: e.target.value.replace(/\D/g, '') })
                        dispatch(handleInventryFilter([state, price, { min: e.target.value.replace(/\D/g, ''), max: amount.max }]))
                      }}
                    />
                    <br />
                    <label style={{ color: " #7367f0 ", padding: "5px" }}>بیشترین مقدار:</label>
                    <input disabled={state.filterAmount ? false : true}
                      value={amount.max}
                      type="text" maxLength="10"
                      className={maxAmountBigger ? "input" : "inputError"}                      onChange={e => {
                        setAmount({ ...amount, max: e.target.value.replace(/\D/g, '') })

                      }}
                    />
                    <p style={{ display: maxAmountBigger ? "none" : "", color: "red", paddingRight: "30%", margin: "0", fontSize: "10px" }}>مقدار وارد شده کمتر از مقدار ماکسیمم می باشد</p>

                  </div>
                </section>
              </div>
              <div className={classes.modalFooter}></div>

            </div>
          </Modal>
        </section>
        <SearchBar className={skinContex.skin === "Light" ? classes.lightSearchBar : classes.darkSearchBar}
          value={searched}
          placeholder='search'
          searchIcon={<SearchIcon style={{ color: "#7367f0" }} />}
          onChange={(searchVal) => {
            setSearched(searchVal)
            dispatch(handleSearchItem([0, searchVal]))

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
                          <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}>{row.totalNumber !== "" ? row.totalNumber : "_"}</TableCell>
                          <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}>{row.Price}</TableCell>
                          <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}>{row.weight !== "" ? row.weight : "_"}<span style={{ display: row.weight !== "" ? "inlineblock" : "none" }}>Kg</span> </TableCell>
                          <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}  ><span className={row.type !== "import" ? classes.unImportantType : classes.importantType}>{row.type === "import" ? "کمیاب" : "معمولی"}</span></TableCell>
                          <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}  >
                            {/* <DeleteIcon color='primary' onClick={() => dispatch(deleteItem(row.title))} /> */}
                            <Tooltip title="ویرایش" placement="right" >
                              <EditIcon color='primary' onClick={() => {
                                setOpenPage(true);
                                dispatch(changeSelectedItem(((page - 1) * rowsPerPage) + (index + 1)))
                                setIsEdit(true)
                              }} />
                            </Tooltip  >

                            <Tooltip title="مشاهده" placement="left" >
                              <SettingsIcon color='primary' onClick={() => {
                                navigate('show')
                                dispatch(changeSelectedItem(((page - 1) * rowsPerPage) + (index + 1)))
                              }} />
                            </Tooltip  >

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

      </div>}
      {openPage && <CreateItem show={openPage} isEdit={isEdit} handleNoticOpen={handleNoticOpen} handleOpenPage={setOpenPage} />}

      <Snackbar open={openNotification} autoHideDuration={4000} onClose={handleNoticClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} >
        <Alert onClose={handleNoticClose} severity="success">
          <AlertTitle>موفق</AlertTitle>
          عملیات با موفقیت انجام شد

        </Alert>
      </Snackbar>
    </>

  );
}

