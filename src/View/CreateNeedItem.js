import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useState, useRef, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Formik, Form, Field } from 'formik'
import * as Yup from "yup"   //  npm i yup
import { makeStyles } from '@material-ui/core/styles';
import { withStyles, MuiThemeProvider, TextField } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { FormattedMessage } from 'react-intl'
import { contex } from '../Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createDeficitsList } from '../createSlice'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    input: {
        display: 'none',
    },
    modalPaper: {
        position: 'absolute',
        top: '40%',
        left: '35%',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
        boxShadow: '0 5px 20px 0 rgb(34 41 47 / 10%)',
        border: "none",
        borderRadius: "5px"
    },
    modalHeader: {
        backgroundColor: ' #f8f8f8',
        borderBottom: 'none',
        height: "6vh",
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        color: 'red'
    },
    modalBody: {
        padding: theme.spacing(2, 4, 3),
        padding: '0.8rem 1.4rem',
    },
    modalFooter: {
        borderTop: ' 1px solid rgba(34, 41, 47, 0.05)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '0.8rem 1.4rem',
        justifyContent: "space-around",
    },
    alert: {
        backgroundColor: 'rgba(115, 103, 240, 0.12)',
        color: '#7367f0 ',
        transition: ' opacity 0.15s linear',
        marginTop: '1rem ',
        padding: '0.71rem 1rem',
        marginBottom: '1rem',
        border: '1px solid transparent',
        borderRadius: '0.358rem',

    }


}));

const StyledTextField = withStyles({
    root: {
        "& label": {
            transformOrigin: "top right",
            right: 28,
            left: "auto"
        },
        "& legend": {
            textAlign: "right"
        }
    }
})(TextField);

const numberRegExp = /^[0-9]+$/

/* ******************************** main  component *******************************************/
const CreateNeedItem = (props) => {

    const skinContex = useContext(contex)
    const [modalOpen, setModalOpen] = useState(false);
    const abData = useSelector(state => state.items.products)
    const item = useSelector(state => state.items.selectedItem)
    const dispatch = useDispatch()
    const classes = useStyles();
    const navigate = useNavigate()

    const storeData = useSelector(state => state.items.store)
    const [openNotification, setOpenNotification] = useState(false);
    const [openBadRegNotification, setOpenBadRegNotification] = useState(false);
    const [openDiffTypeNotification, setOpenDiffTypeNotification] = useState(false);


    const statusList = [
        { value: "B1", title: "ضروری" },
        { value: "B2", title: "غیر ضروری" },
    ]
    const MySelect = ({ field, form, ...props }) => {
        const classes = useStyles();
        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">{<FormattedMessage id={props.label} />}</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name={field.name}
                    value={field.value !== undefined ? field.value : ''}
                    onChange={(e) => {
                        form.setFieldValue(field.name, e.target.value)
                    }}
                    label={<FormattedMessage id={props.label} />}
                >
                    {field.name === "status" &&
                        statusList.map(element => (
                            <MenuItem value={element.value}>{element.title}</MenuItem>
                        ))
                    }
                    {field.name === "store" &&
                        storeData.map(element => (
                            <MenuItem value={element.name}>{element.name}</MenuItem>
                        ))
                    }

                </Select>
                <div style={{ color: "red" }}>{props.errors}</div>
            </FormControl>
        )
    }
    const MyInput = ({ field, form, ...props }) => {
        return <div style={{ marginTop: "10px" }} >
            <MuiThemeProvider >
                <StyledTextField variant="outlined"    {...field} {...props} />
            </MuiThemeProvider>
            <div style={{ color: "red" }}>{props.errors}</div>
        </div>
    }
    /* *************  error notic  ******************/
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
    /* ************* end error notic  ******************/
    /* *************  bad reguest notic  ******************/
    const handleBadRegNoticOpen = () => {
        setOpenBadRegNotification(true);
    };
    const handleBadRegNoticClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenBadRegNotification(false);
    };
    /* ************* bad reguest notic  ******************/
    /* *************  different type notic  ******************/
    const handleDifferentTypeNoticOpen = () => {
        setOpenDiffTypeNotification(true);
    };
    const handleDifferentTypeNoticClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenDiffTypeNotification(false);
    };
    /* *************end different type notic  ******************/
    const SignupSchema = Yup.object().shape({
        title: Yup.string().required("لطفا نام کالا را وارد نمایید"),
        store: Yup.string().required("لطفا نام فروشگاه را وارد نمایید"),
        amount: Yup.string().matches(numberRegExp, 'لطف مقدار معتبر را وارد نمایید').required("لطفا مقدار را وارد نمایید"),
        status: Yup.string().required("لطفا نوع کالا را وارد نمایید"),

    })

    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const initialValues = {
        title: props.title === undefined ? "" : props.title,
        store: props.store === undefined ? "" : props.store,
        amount: "",
        status: ""
    }

    return (
        <div >
            <section className='Item-header' >
                <div >
                    <h1>
                        <FormattedMessage id='add' />
                    </h1>
                </div>
                <div >
                    <IconButton color="primary" onClick={() => {
                        props.handleOpenPage(false)
                    }}>
                        <ArrowBackIosIcon />
                    </IconButton>
                </div>
            </section>
            <PerfectScrollbar className='scroll-area' options={{ wheelPropagation: true }} >
                <section className="shoeItem-body" >
                    <Formik
                        initialValues={initialValues}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validationSchema={SignupSchema}
                        onSubmit={values => {
                            // ** find a index of product that have a same name which enter
                            const index = abData.findIndex(element => element.title == values.title)
                            // ** when dont have this product in list
                            if (index === -1) {
                                handleNoticOpen()        // have a error alarm 
                            }
                            // ** when have this product in list
                            if (index !== -1) {
                                let titleIndex = statusList.findIndex(element => element.value === values.status)
                                let storeIndex = storeData.findIndex(element => element.name === values.store)
                                // ** check reguest is true
                                if (
                                    (abData[index].counterUnit === "number" & Number(abData[index].totalNumber) < Number(values.amount))
                                    || (abData[index].counterUnit === "weight" & Number(abData[index].weight) < Number(values.amount))
                                ) {
                                    // ** check  type of store and product for reguest
                                    if ((storeData[storeIndex].concession === "golden" & abData[index].type === "import") || abData[index].type !== "import") {
                                        dispatch(createDeficitsList({
                                            ...values, status: statusList[titleIndex].title, counterUnit: abData[index].counterUnit,
                                            mainIndex: index
                                        }))
                                        props.handleOpenPage(false)
                                    }
                                    else {
                                        handleDifferentTypeNoticOpen()    // have a error alarm 
                                    }

                                }
                                else {
                                    handleBadRegNoticOpen()        // have a error alarm 
                                }
                            }
                        }}
                    >
                        {(propss) => {
                            return (
                                <Form>
                                    <Field
                                        style={{ margin: "8px 0" }}
                                        type='text' id='title' name='title'
                                        label={<FormattedMessage id='nameProduction' />}
                                        errors={propss.errors.title}
                                        invalid={propss.errors.title && true}
                                        component={MyInput}
                                    />
                                    <Field
                                        style={{ margin: "8px 0" }}
                                        type='text' id='amount' name='amount'
                                        label={<FormattedMessage id='tableInventory' />}
                                        errors={propss.errors.amount}
                                        invalid={propss.errors.amount && true}
                                        component={MyInput}
                                    />
                                    <Field
                                        style={{ margin: "8px 0" }}
                                        errors={propss.errors.store}
                                        invalid={propss.errors.store && true}
                                        id='store'
                                        name='store'
                                        label="store"
                                        component={MySelect}
                                    />
                                    <br />
                                    <Field
                                        style={{ margin: "8px 0" }}
                                        errors={propss.errors.status}
                                        invalid={propss.errors.status && true}
                                        id='status'
                                        name='status'
                                        label="tableCellType"
                                        component={MySelect}
                                    />
                                    <br />
                                    <Button style={{ margin: "8px 0" }}
                                        type="submit" variant="contained" color="primary">
                                        <FormattedMessage id='save' />
                                    </Button>
                                </Form>
                            )
                        }}

                    </Formik>

                </section>
            </PerfectScrollbar>
            <Modal
                open={modalOpen}
                // onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{ direction: "rtl" }}
            >
                <div className={classes.modalPaper}>
                    <div className={classes.modalHeader}>
                        کالای مورد نظر موجود می باشد
                    </div>
                    <div className={classes.modalBody}>
                        <p className={classes.alert}>
                            برای مشاهده ی اطلاعات کالا بر روی دکمه مشاهده کلیک فرمایید
                        </p>
                    </div>
                    <div className={classes.modalFooter} style={{}}>
                        <Button variant="contained" color="secondary" component="span"
                            onClick={handleCloseModal}
                        >
                            بستن
                        </Button>
                        <Button variant="contained" color="primary" component="span"
                            onClick={() => navigate("/Inventory/show")}
                        >
                            مشاهده
                        </Button>
                    </div>

                </div>
            </Modal>
            <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleNoticClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} >
                <Alert onClose={handleNoticClose} severity="error">

                    چنین کالایی ثبت نشده

                </Alert>
            </Snackbar>
            <Snackbar open={openBadRegNotification} autoHideDuration={6000} onClose={handleBadRegNoticClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} >
                <Alert onClose={handleBadRegNoticClose} severity="error">
                    موجودی کالا کافی میباشد برای سفارش
                </Alert>
            </Snackbar>
            <Snackbar open={openDiffTypeNotification} autoHideDuration={6000} onClose={handleDifferentTypeNoticClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} >
                <Alert onClose={handleDifferentTypeNoticClose} severity="error">
                    نوع کالا و فروشگاه همخوانی ندارند
                </Alert>
            </Snackbar>

        </div>
    )
}
export default CreateNeedItem

