import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { contex } from '../Layout'
import { FormattedMessage } from 'react-intl'
import { useLocation } from 'react-router-dom';
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

import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from "material-ui-search-bar";

import CreateNeedItem from './CreateNeedItem'

import { handleSearchItem, changeTableInfo, productPurchase, deleteDeficits } from '../createSlice'


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
    { id: 'store', numeric: true, disablePadding: false, label: 'tableStore' },
    { id: 'totalnumber', numeric: true, disablePadding: false, label: 'tableSoldAmount' },
    { id: 'time', numeric: true, disablePadding: false, label: 'tableRequestTime' },
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
        marginBottom: '1rem',

        backgroundColor: "#283046",
    },
    lightPaper: {
        width: '100%',
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
        marginRight: '1rem !important',
        padding: "0.2rem 0.6rem",
        borderRadius: ' 10rem',
        backgroundColor: 'rgba(0, 207, 232, 0.12)',
        color: '#00cfe8 !important',
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
        top: '40%',
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
        top: '40%',
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
export default function Deficits() {
    const sendData = useLocation();
    const classes = useStyles();
    const skinContex = useContext(contex)
    const dispatch = useDispatch()
    const data = useSelector(state => state.items.deficits)
    const searchItem = useSelector(state => state.items.search)
    const tableInfo = useSelector(state => state.items.tableInfo)
    const storeData = useSelector(state => state.items.store)

    const products = useSelector(state => state.items.products)

    const [openPage, setOpenPage] = useState(sendData.state === null ? false : true)   // **for open add or edit page

    const [searched, setSearched] = useState("");  // **for search
    const [rowsPerPage] = useState(5);   // **for max number of row in one page
    const [page, setPage] = useState(tableInfo[3].page);   // **for page

    const [order, setOrder] = useState('asc');         // **for order
    const [orderBy, setOrderBy] = useState('calories');   // **for order

    const [openNotification, setOpenNotification] = useState(false);  // **for alert show
    const [openNotificationError, setOpenNotificationError] = useState(false);  // **for alert show


    useEffect(() => {
        setPage(tableInfo[3].page);
    }, [tableInfo[3].page])

  
    // **for change table page
    const handleChangePage = (event, value) => {
        setPage(parseInt(value));
        dispatch(changeTableInfo([3, false, false, value]))
    }

    const rows = searched === "" ? data : searchItem

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

    /* ************* end sucsses notic  ******************/
  /* *************   notification  ******************/
  const handleNoticErrorOpen = () => {
    setOpenNotificationError(true);
};
const handleNoticErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenNotificationError(false);
};
/* ************* end  notification  ******************/

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
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
            {!openPage && <div >
                <section className={classes.changeTableButtoms}>
                    <Button variant="contained" className={skinContex.skin === "Light" ? classes.addLightButtom : classes.addDarkButtom}
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setOpenPage(true)
                        }}
                    >
                        <span style={{ marginRight: "3px" }}><FormattedMessage id="add" /></span>
                    </Button>
                 
                </section>
                <SearchBar className={skinContex.skin === "Light" ? classes.lightSearchBar : classes.darkSearchBar}
                    value={searched}
                    placeholder="جستجو"
                    searchIcon={<SearchIcon style={{ color: "#7367f0" }} />}
                    onChange={(searchVal) => {
                        setSearched(searchVal)
                        dispatch(handleSearchItem([3,searchVal]))

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
                                            let totalAmount = row.counterUnit === "number" ? products[row.mainIndex].totalNumber : products[row.mainIndex].weight

                                            return (
                                                <TableRow
                                                    hover
                                                    key={row.number}
                                                    className={classes.tablebody}
                                                >
                                                    <TableCell style={{ paddingRight: "90px !important" }} component="th" scope="row" align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor} >{((page - 1) * rowsPerPage) + (index + 1)}</TableCell>
                                                    <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}>{row.title}</TableCell>
                                                    <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}>{row.store}</TableCell>
                                                    <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}>{row.amount}
                                                        <span style={{ display: row.counterUnit !== "number" ? "inlineblock" : "none" }}>Kg</span>
                                                        <span style={{ display: row.counterUnit === "number" ? "inlineblock" : "none" }}>عدد</span>
                                                    </TableCell>
                                                    <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor} >{row.time}</TableCell>
                                                    <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}  ><span className={row.status !== "ضروری" ? classes.unImportantType : classes.importantType}>{row.status}</span></TableCell>

                                                    <TableCell align="right" className={skinContex.skin === "Light" ? classes.lightFontColor : classes.darkFontColor}  >
                                                        {
                                                            totalAmount >= Number(row.amount) &&
                                                            <Button variant="outlined" color="primary"
                                                                onClick={() => {
                                                                    let StoreIndex = storeData.filter(element =>
                                                                        element.name === row.store
                                                                    )


                                                                    if ((products[row.mainIndex].type === "import" & StoreIndex[0].concession === "golden") || (products[row.mainIndex].type !== "import")) {

                                                                        dispatch(productPurchase([{
                                                                            store: row.store, amount: row.amount, title: row.title,
                                                                            price: products[row.mainIndex].Price * row.amount, time: new Date().toLocaleDateString('fa-IR'),
                                                                            counterUnit: products[row.mainIndex].counterUnit
                                                                        }, row.mainIndex]))

                                                                        dispatch(deleteDeficits(((page - 1) * rowsPerPage) + (index + 1)))
                                                                        handleNoticOpen()
                                                                    }
                                                                    if (products[row.mainIndex].type === "import" & StoreIndex[0].concession === "silver") {
                                                                        handleNoticErrorOpen()
                                                                    }
                                                                }}
                                                            >
                                                                پرداخت
                                                            </Button>
                                                        }
                                                        {
                                                            totalAmount < Number(row.amount) &&
                                                            <Button variant="outlined" >
                                                                موجودی ناکافی
                                                            </Button>
                                                        }

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
            {openPage && <CreateNeedItem show={openPage} handleOpenPage={setOpenPage} title={sendData.state?.title} store={sendData.state?.store}  />}

            <Snackbar open={openNotification} autoHideDuration={4000} onClose={handleNoticClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} >
                <Alert onClose={handleNoticClose} severity="success">
                    <AlertTitle>موفق</AlertTitle>
                    عملیات با موفقیت انجام شد

                </Alert>
            </Snackbar>
            <Snackbar open={openNotificationError} autoHideDuration={4000} onClose={handleNoticErrorClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} >
                <Alert onClose={handleNoticErrorClose} severity="error">

                    امکان ارسال این کالا به این فروشگاه نمیباشد

                </Alert>
            </Snackbar>
        </>

    );
}

