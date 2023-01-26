
import { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { contex } from '../Layout'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import defaultImage from '../asset/images.jfif'

import { langContext } from '../IntlProviderWrapper'


import { newValueOfItem, productPurchase } from '../createSlice'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({

    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    reguestContent: {
        flexGrow: 1,

    },
    Darkpaper: {
        padding: theme.spacing(2),
        width: '100%',
        backgroundColor: "inherit",
        color: "white"
    },
    Lightpaper: {
        padding: theme.spacing(2),
        width: '100%',
        backgroundColor: "inherit",
        color: "black"
    },
    image: {
        width: 128,
        height: 128,
        border: "1px solid #7367f0",
        borderRadius: "5px",
    },
    img: {
        margin: '0',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    accordion: {
        backgroundColor: "inherit"
    },
    darkButtom: {
        backgroundColor: "#7367f0 !important",
        boxShadow: '0 0 10px 1px rgb(115 103 240 / 70%) !important',
        marginBottom: "5px",

    },
    lightButtom: {
        backgroundColor: "#7367f0 !important",
        boxShadow: '0 0 10px 1px rgb(115 103 240 / 70%) !important',
        marginBottom: "5px",
    },
    darkModalPaper: {
        position: 'absolute',
        top: '40%',
        left: '35%',
        width: 400,
        backgroundColor: "#283046",
        boxShadow: '0 5px 20px 0 rgb(34 41 47 / 10%) !important',
        border: "none",
        borderRadius: "5px"
    },
    lightModalPaper: {
        position: 'absolute',
        top: '30%',
        left: '35%',
        width: 400,
        backgroundColor: "white",
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
    alert: {
        background: 'rgba(40, 199, 111, 0.12) !important',
        color: ' #28c76f !important',
        transition: ' opacity 0.15s linear',
        marginTop: '1rem !important',
        padding: '0.71rem 1rem',
        marginBottom: '1rem',
        border: '1px solid transparent',
        borderRadius: '0.358rem',

    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
    },

}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const ShowItem = (props) => {
    const languageContex = useContext(langContext)
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(false);  // **for modal
    const [newValue, setNewValue] = useState(0)     // **for new amount of product
    const [requestValue, setRequestValue] = useState(0)  // **for increament/decreament, amount of reguest
    const [inputValue, setInputValue] = useState("")     // **select for store name
    const [inputNotific, setInputNotific] = useState(false) // **alarm for fill select store
    const [addErrorNotific, setAddErrorNotific] = useState(false)  // **alarm for error
    const [addSucessNotific, setAddSucessNotific] = useState(false) // **alarm for success
    const [errorProps, setErrorProps] = useState(false) //** fill store select */
    const data = useSelector(state => state.items.products)
    const selectedItem = useSelector(state => state.items.selectedItem)
    const storeData = useSelector(state => state.items.store)
    let navigate = useNavigate()
    const skinContex = useContext(contex)
    const dispatch = useDispatch()
    const [deficitsPage, setDeficitsPage] = useState(false)
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleClickInput = () => {
        setInputNotific(true);
    };

    const handleErrorInputClose = () => {
        setInputNotific(false);
    };

    const handleClickErrorAdd = () => {
        setAddErrorNotific(true);
    };

    const handleErrorAddClose = () => {
        setAddErrorNotific(false);
    };

    const handleClickSuccesAdd = () => {
        setAddSucessNotific(true);
    };
    const handleSuccesAddClose = () => {
        setAddSucessNotific(false);
    };


    return (
        <div>
            <section className='Item-header' >
                <div >
                    <h1>
                        <FormattedMessage id='show' />
                    </h1>
                </div>
                <div>
                    <IconButton color="primary" onClick={() => {
                        navigate("/Inventory")
                    }}>
                        {languageContex.locale !== "en" ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                </div>
            </section>
            {deficitsPage && <Navigate to='/deficits' state={{ title: data[selectedItem - 1].title, store: inputValue }} />}
            <PerfectScrollbar className='scroll-area' options={{ wheelPropagation: true }} >
                <div className={classes.reguestContent}>
                    <Paper
                        className={skinContex.skin === "Light" ? classes.Lightpaper : classes.Darkpaper}
                    >
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" accept=".jpg,.jpeg,.jfif,.png"
                                        src={data[selectedItem - 1].image ? data[selectedItem - 1].image : defaultImage}
                                    />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={7} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            <span>  <FormattedMessage id='nameProduction' /> : </span>
                                            <span>{data[selectedItem - 1].title}</span>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom
                                            style={{ display: data[selectedItem - 1].counterUnit === "weight" ? "none" : "" }}
                                        >
                                            <span><FormattedMessage id='NumberProduction' />:</span>
                                            <span>{data[selectedItem - 1].totalNumber}</span>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom
                                            style={{ display: data[selectedItem - 1].counterUnit === "number" ? "none" : "" }}>
                                            <span>  <FormattedMessage id='weightProduction' /> : </span>
                                            <span>{data[selectedItem - 1].weight}</span>
                                        </Typography>
                                        <Typography variant="body2" gutterBottom

                                        >
                                            <span>  <FormattedMessage id='priceProduction' /> : </span>
                                            <span>{data[selectedItem - 1].Price}</span>
                                        </Typography>
                                        <Typography variant="body2">
                                            <span> <FormattedMessage id='typeProduction' /> : </span>
                                            <span>{data[selectedItem - 1].type === "notImport" ? "معمولی" : "کمیاب"}</span>
                                        </Typography>

                                        <Typography variant="body2" gutterBottom>
                                            <span>  <FormattedMessage id='Description' /> : </span>
                                            <span>{data[selectedItem - 1].description}</span>
                                        </Typography>

                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="primary"
                                            style={{ padding: " 10px 100px " }}
                                            startIcon={<AddShoppingCartIcon />}
                                            className={skinContex.skin === "Light" ? classes.lightButtom : classes.darkButtom}
                                            onClick={handleOpenModal}
                                        >
                                            <span style={{ margin: "3px" }}><FormattedMessage id='Order' /></span>
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={5} style={{
                                    borderRight: languageContex.locale !== "en" ? "1px solid #7367f0" : "",
                                    borderLeft: languageContex.locale !== "en" ? "" : "1px solid #7367f0", padding: "10px", textAlign: 'center'
                                }}>
                                    <Typography variant="subtitle1"> <FormattedMessage id="addNewValueProduct" />:</Typography>

                                    <section className='numerik' style={{ marginTop: " 14px" }}>
                                        <button className='btn-numerik right'
                                            onClick={() => { if (newValue > 0) setNewValue(newValue - 1) }}
                                            disabled={data[selectedItem - 1].counterUnit !== "number" ? true : false}>-</button>
                                        <input readOnly value={data[selectedItem - 1].counterUnit !== "weight" ? newValue : ""}
                                            disabled={data[selectedItem - 1].counterUnit !== "number" ? true : false} className='input-numerik' type="text" maxLength="2" size="1" />
                                        <button className='btn-numerik left'
                                            onClick={() => setNewValue(newValue + 1)}
                                            disabled={data[selectedItem - 1].counterUnit !== "number" ? true : false} >+</button>
                                    </section>
                                    <br />
                                    <input value={data[selectedItem - 1].counterUnit === "weight" ? newValue : ""}
                                        onChange={(e) => setNewValue(e.target.value)}
                                        disabled={data[selectedItem - 1].counterUnit !== "weight" ? true : false}
                                        type="text" className='input-weight' size="10" placeholder='وزن' />
                                    <br />
                                    <Button variant="contained" color="primary"
                                        startIcon={<AddIcon />}
                                        className={skinContex.skin === "Light" ? classes.lightButtom : classes.darkButtom}
                                        onClick={() => {
                                            if (newValue > 0) {
                                                dispatch(newValueOfItem(newValue))
                                                setNewValue(0)
                                                handleClickSuccesAdd()
                                            }

                                        }}
                                    >
                                        <span style={{ margin: "3px" }}
                                        ><FormattedMessage id='save' /></span>
                                    </Button>
                                </Grid>


                            </Grid>
                        </Grid>
                    </Paper>
                </div>
                <Accordion    defaultExpanded  className={classes.accordion} style={{ color: skinContex.skin === "Light" ? "black" : "white" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon color="primary" />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}><FormattedMessage id='detail' /></Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        <Grid item xs={12} sm container>

                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <ul>
                                        {data[selectedItem - 1].detail.length >= 0 ? data[selectedItem - 1].detail.map((element, index) =>
                                            <Typography variant="body2" gutterBottom>
                                                <li key={index}
                                                    style={{
                                                        display: element["number"] !== undefined || element["Price"] !== "" ||
                                                            element["title"] !== "" || element["type"] !== ""
                                                            ? "" : "none"
                                                    }}
                                                >
                                                    <span > در تاریخ {element.time}</span>
                                                    <span style={{ display: element["number"] !== undefined ? "" : "none" }}>
                                                        مقدار {element.number} {data[selectedItem - 1].counterUnit !== "weight" ? "عدد" : "کیلوگرم"}  به محصول اضافه شد.
                                                    </span>
                                                    <span style={{ display: element["Price"] !== "" && element["Price"] !== undefined ? "" : "none" }}>
                                                        مبلغ کالا به {element.Price} تغییر پیدا کرد.
                                                    </span>
                                                    <span style={{ display: element["title"] !== "" && element["title"] !== undefined ? "" : "none" }}>
                                                        نام کالا به {element.title} تغییر پیدا کرد.
                                                    </span>
                                                    <span style={{ display: element["type"] !== "" && element["type"] !== undefined ? "" : "none" }}>
                                                        نوع کالا به {element.type === "import" ? "کمیاب" : "معمولی"} تغییر پیدا کرد.
                                                    </span>
                                                </li>
                                            </Typography>

                                        ) : ""}
                                    </ul>

                                </Grid>
                            </Grid>

                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </PerfectScrollbar>

            <Modal
                open={modalOpen}
                style={{ direction: "rtl" }} >
                <div className={skinContex.skin === "Light" ? classes.lightModalPaper : classes.darkModalPaper}>
                    <div className={skinContex.skin === "Light" ? classes.lightModalHeader : classes.darkModalHeader}><FormattedMessage id='Order' /></div>
                    <div className={skinContex.skin === "Light" ? classes.lightmodalBody : classes.darkmodalBody} style={{ textAlign: 'center' }}>
                        <div style={{ margin: "15px" }}>
                            <span style={{ display: "block", marginBottom: "7px" }}><FormattedMessage id='tablePrice' /> : </span>
                            <section style={{ color: "#7367f0" }}>{requestValue * data[selectedItem - 1].Price} تومان</section>
                        </div>
                        <div style={{ display: data[selectedItem - 1].counterUnit !== "number" ? "none" : "" }}>
                            <span style={{ display: "block", marginBottom: "7px" }}><FormattedMessage id='orderMumber' /> </span>
                            <section className='numerik' >
                                <button className='btn-numerik right'
                                    onClick={() => { if (requestValue > 0) setRequestValue(requestValue - 1) }}
                                >-</button>
                                <input readOnly className='input-numerik' type="text" maxLength="2" size="1"
                                    value={data[selectedItem - 1].counterUnit !== "weight" ? requestValue : ""}
                                />
                                <button className='btn-numerik left'
                                    onClick={() => { if (requestValue < data[selectedItem - 1].totalNumber) setRequestValue(requestValue + 1) }}
                                >+</button>
                            </section>
                        </div>
                        <div style={{ display: data[selectedItem - 1].counterUnit === "number" ? "none" : "" }}>
                            <span style={{ display: "block", marginBottom: "7px" }}>وزن سفارش (حداکثر وزن {data[selectedItem - 1].weight}kg ) </span>
                            <span style={{ display: "block", marginBottom: "4px" }}> </span>
                            <section className='numerik' >
                                <input className='input-numerik' type="text"
                                    value={data[selectedItem - 1].counterUnit === "weight" ? requestValue : ""}
                                    onChange={e => {
                                        if (Number(e.target.value) <= Number(data[selectedItem - 1].weight)) setRequestValue(e.target.value)
                                        else {
                                            handleClickInput()
                                        }
                                    }
                                    }
                                />
                            </section>
                        </div>
                        <div>
                            <span style={{ display: "block" }}>  <FormattedMessage id='storeSend' /> </span>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-mutiple-name-label"><FormattedMessage id='store' /></InputLabel>
                                <Select
                                    labelId="demo-mutiple-name-label"
                                    id="demo-mutiple-name"
                                    label={<FormattedMessage id='store' />}
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(e.target.value)
                                        setErrorProps(false)
                                    }}
                                >
                                    {
                                        storeData.map((element) => (
                                            <MenuItem value={element.name}>{element.name}</MenuItem>
                                        ))
                                    }

                                </Select>
                                <div style={{ color: "red", display: errorProps ? "" : "none" }}>   لطفا نام فروشگاه را انتخاب کنبد</div>
                            </FormControl>
                        </div>

                    </div>
                    <div className={classes.modalFooter}  >

                        <Button variant="contained" color="primary" component="span"
                            onClick={() => {
                                if (inputValue === "") {
                                    setErrorProps(true)
                                }
                                let StoreIndex = storeData.filter(element =>
                                    element.name === inputValue
                                )
                                if ((data[selectedItem - 1].type === "import" & StoreIndex[0].concession === "golden" & !errorProps) || (data[selectedItem - 1].type !== "import" & !errorProps)) {
                                    dispatch(productPurchase([{
                                        store: inputValue, amount: requestValue, title: data[selectedItem - 1].title,
                                        price: data[selectedItem - 1].Price * requestValue, time: new Date().toLocaleDateString('fa-IR'),
                                        counterUnit: data[selectedItem - 1].counterUnit
                                    }, -1]))
                                    handleClickSuccesAdd()
                                    handleCloseModal()
                                    setRequestValue(0)
                                }
                                if (data[selectedItem - 1].type === "import" & StoreIndex[0].concession === "silver" & !errorProps) {
                                    handleClickErrorAdd()
                                }
                            }
                            }
                        >
                            <FormattedMessage id='save' />
                        </Button>
                        <Tooltip title="درخواست شارژ در صورت کافی نبودن موجودی" placement="botton" >

                        <Button variant="contained" color="primary" component="span"
                            onClick={() => {

                                setDeficitsPage(true)
                                handleCloseModal()

                            }}
                        >

                                <FormattedMessage id='orderMore' />
                        </Button>
                        </Tooltip>

                        <Button variant="contained" color="secondary" component="span"
                            onClick={handleCloseModal}
                        >
                            <FormattedMessage id='close' />
                        </Button>

                    </div>

                </div>
            </Modal>
            <Snackbar open={inputNotific} autoHideDuration={2000} onClose={handleErrorInputClose}>
                <Alert onClose={handleErrorInputClose} severity="error">
                    به علت بالاتر بودن مقدار از وزن کلی  ثبت این مقدار امکان پذیر نمیباشد
                </Alert>
            </Snackbar>
            <Snackbar open={addErrorNotific} autoHideDuration={4000} onClose={handleErrorAddClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}   >
                <Alert onClose={handleErrorAddClose} severity="error">
                    ارسال این کالا به فروشگاه انتخابی امکان پذیر نمیباشد
                </Alert>
            </Snackbar>
            <Snackbar open={addSucessNotific} autoHideDuration={4000} onClose={handleSuccesAddClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}   >
                <Alert onClose={handleSuccesAddClose} severity="success">
                    عملیات با موفقیت انجام شد
                </Alert>
            </Snackbar>
        </div>
    )
}
export default ShowItem