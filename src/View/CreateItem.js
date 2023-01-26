import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Modal from '@material-ui/core/Modal';
import { FormattedMessage } from 'react-intl'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { changeSelectedItem, addItem, editEtem } from '../createSlice'
import { langContext } from '../IntlProviderWrapper'


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
      // boxShadow: theme.shadows[5],
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
      // padding: theme.spacing(2, 4, 3),
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
const CreateItem = (props) => {

   const [modalOpen, setModalOpen] = useState(false);
   const abData = useSelector(state => state.items.products)
   const item = useSelector(state => state.items.selectedItem)
   const dispatch = useDispatch()
   const classes = useStyles();
   const navigate = useNavigate()
   const languageContex = useContext(langContext)

   const MyInput = ({ field, form, ...props }) => {
      return <div style={{ marginTop: "10px" }} >
         <MuiThemeProvider >
   { languageContex.locale !== "en" && <StyledTextField variant="outlined"    {...field} {...props} />}        {languageContex.locale === "en" && <TextField variant="outlined"    {...field} {...props} />}
         </MuiThemeProvider>
         <div style={{ color: "red" }}>{props.errors}</div>
      </div>
   }
   const myTextEara = ({ field, form, ...props }) => {
      return <div style={{ marginTop: "10px" }} >
         <MuiThemeProvider >
            <StyledTextField variant="outlined" multiline maxRows={4}  {...field} {...props} />
         </MuiThemeProvider>
         <div style={{ color: "red" }}>{props.errors}</div>
      </div>
   }
   const MySelect = ({ field, form, ...props }) => {
      const classes = useStyles();
      return (
         <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">{<FormattedMessage id='typeProduction' />}</InputLabel>
            <Select
               labelId="demo-simple-select-outlined-label"
               id="demo-simple-select-outlined"
               name={field.name}
               value={field.value !== undefined ? field.value : ''}
               onChange={(e) => {
                  form.setFieldValue(field.name, e.target.value)
               }}
               label={<FormattedMessage id='typeProduction' />}
            >
               <MenuItem value='notImport'><FormattedMessage id='Normal' /></MenuItem>
               <MenuItem value='import'><FormattedMessage id='rare' /></MenuItem>
            </Select>
            <div style={{ color: "red" }}>{props.errors}</div>
         </FormControl>
      )
   }
   const myRadio = ({ field, form, ...props }) => {
   
      return (
         <FormControl component="fieldset" style={{ marginTop: "16px", display: props.isEdit ? "none" : "" }}>
            <FormLabel component="legend"> <FormattedMessage id='calculatProduction' />  :</FormLabel>
            <RadioGroup value={field.value} onChange={(e) => {
               form.setFieldValue(field.name, e.target.value)
            }}>
               <FormControlLabel value="number" control={<Radio />} label={<FormattedMessage id='NumberProduction' />} />
               <FormControlLabel value="weight" control={<Radio />} label={<FormattedMessage id='weightProduction' />} />
            </RadioGroup>
         </FormControl>
   
      )
   }
   const UploadImg = ({ field, form, ...props }) => {
      const fileUploader = useRef(null)
      const classes = useStyles();
      const [urlName, setUrlName] = useState("")
      return (
         <>
            <span style={{ color: "#7367f0" }}> <FormattedMessage id='uploadPictureProduction' />  : </span>
            <input
               accept="image/*"
               className={classes.input}
               id="contained-button-file"
               name={field.name}
               type="file"
               ref={fileUploader}
               onChange={(e) => {
                  form.setFieldValue(field.name, URL.createObjectURL(e.target.files[0]))
                  setUrlName(e.target.files[0].name)
               }}
   
            />
            <label htmlFor="contained-button-file">
               <Button variant="contained" color="primary" component="span"
                  startIcon={<CloudUploadIcon style={{ margin: "4px" }} />}
               >
                  Upload
               </Button>
            </label>
            <span style={{ marginRight: "10px", color: "#7367f0" }}>{urlName}</span>
         </>
      )
   }  


   const SignupSchema = Yup.object().shape({
      title: Yup.string().required("لطفا نام را وارد نمایید"),
      Price: Yup.string().matches(numberRegExp, 'لطف مقدار معتبر را وارد نمایید').required("لطفا مقدار را وارد نمایید"),
      totalNumber: Yup.string().matches(numberRegExp, 'لطف مقدار معتبر را وارد نمایید'),
      type: Yup.string().required("لطفا نوع کالا را وارد نمایید"),
      weight: Yup.string().matches(numberRegExp, 'لطف وزن معتبر را وارد نمایید'),

   })

   const handleOpenModal = () => {
      setModalOpen(true);
   };
   const handleCloseModal = () => {
      setModalOpen(false);
   };
   const dbinitialState = {
      title: abData[item - 1].title,
      Price: abData[item - 1].Price,
      totalNumber: abData[item - 1].totalNumber,
      type: abData[item - 1].type,
      weight: abData[item - 1].weight,
      image:  abData[item - 1].image
   }
   const initialValues = {
      title: "",
      Price: "",
      totalNumber: "",
      type: "",
      weight: "",
      image: "",
      counterUnit: "number",
      detail: [],
      description: ""
   }

   return (
      <div >
         <section className='Item-header' >
            <div >
               <h1>
                  {props.isEdit ? <FormattedMessage id='edit' /> : <FormattedMessage id='add' />}
               </h1>
            </div>
            <div >
               <IconButton color="primary" onClick={() => {
                  props.handleOpenPage(false)
               }}>
                  {languageContex.locale !== "en"?<ArrowBackIosIcon />:<ArrowForwardIosIcon />}
               </IconButton>
            </div>
         </section>
         <PerfectScrollbar className='scroll-area' options={{ wheelPropagation: true }} >
            <section className="shoeItem-body" >
               <Formik
                  initialValues={!props.isEdit ? initialValues : dbinitialState}
                  validateOnBlur={false}
                  validateOnChange={false}
                  validationSchema={SignupSchema}
                  onSubmit={values => {
                     // ** when change radio after fill form
                     if (values.counterUnit === "number") {
                        values.weight = ""
                     }
                     if (values.counterUnit === "weight") {
                        values.totalNumber = ""
                     }
                     // ** edit
                     if (props.isEdit) {
                        dispatch(editEtem(values))
                        props.handleOpenPage(false)
                        props.handleNoticOpen()

                     }
                     // ** new
                     if (!props.isEdit) {
                       // ** find a index of product that have a same name which enter
                        const index = abData.findIndex(element => element.title === values.title)
                        // ** when have a new name
                        if (index === -1) {
                           dispatch(addItem(values))
                           props.handleOpenPage(false)  // close page
                           props.handleNoticOpen()        // have a alarm  succsess


                        }
                        // ** when have a Duplicate name
                        if (index !== -1) {
                           dispatch(changeSelectedItem(index + 1))   //change seletitem for open that product
                           handleOpenModal() 
                        }
                     }
                  }}
               >
                  {(propss) => {
                     return (
                        <Form>
                           <Field
                              style={{ margin: "8px 0" }}
                              id='image' name='image'
                              component={UploadImg}
                           />
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
                              type='text' id='Price' name='Price'
                              label={<FormattedMessage id='priceProduction' />}
                              errors={propss.errors.Price}
                              invalid={propss.errors.Price && true}
                              component={MyInput}
                           />


                           <Field
                              style={{ margin: "8px 0" }}
                              type='text'
                              id='counterUnit'
                              name='counterUnit'
                              isEdit={props.isEdit}
                              component={myRadio}
                           />

                           <Field
                              style={{ margin: "8px 0" }}
                              type='text' id='totalNumber' name='totalNumber'
                              label={<FormattedMessage id='NumberProduction' />}
                              errors={propss.errors.totalNumber}
                              invalid={propss.errors.totalNumber && true}
                              component={MyInput}
                              disabled={propss.values.counterUnit !== "number" || props.isEdit ? true : false}
                           />
                           <Field
                              style={{ margin: "8px 0" }}
                              type='text' id='weight' name='weight'
                              label={<FormattedMessage id='weightProduction' />}
                              errors={propss.errors.weight}
                              invalid={propss.errors.weight && true}
                              component={MyInput}
                              disabled={propss.values.counterUnit !== "weight" || props.isEdit ? true : false}
                           />
                           <Field
                              style={{ margin: "8px 0" }}
                              // label={<FormattedMessage id='typeProduction'/>}
                              errors={propss.errors.type}
                              invalid={propss.errors.type && true}
                              id='type'
                              name='type'
                              component={MySelect}
                           />
                           <Field
                              style={{ margin: "8px 0" }}
                              type='text' id='description' name='description'
                              label={<FormattedMessage id='Description' />}
                              component={myTextEara}

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
      </div>
   )
}
export default CreateItem

