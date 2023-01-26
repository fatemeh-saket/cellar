import Content from './View/Content'
import Header from './View/Header'
import Sidbar from './View/Sidbar'
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './style'
import { useState, createContext, useEffect } from 'react';
import './index.css'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

export const contex=createContext()

const Layout = () => {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => {
        setModalOpen(true);
     };
     const handleCloseModal = () => {
        setModalOpen(false);
     };
    if(!window.localStorage.getItem("skin")){
        window.localStorage.setItem("skin","Light")
    }
    const [skin,setSkin]= useState(window.localStorage.getItem("skin"))
    
    useEffect(()=>{
        console.log("{fjujfsdgbds")
        handleOpenModal() 
    },[])
    return (
        <contex.Provider value={{skin,setSkin}}>
        <div className={skin==="Light"?classes.lightRoot:classes.darkRoot}>
            <CssBaseline />
            <Header />
            <Content />
            <Sidbar />
        </div>
        <Modal
        open={modalOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ direction: "rtl" }}
      >
        <div className={ classes.lightModalPaper }>
          <div style={{ color: "red" }} className={classes.lightModalHeader }> تذکر :</div>
          <div style={{ textAlign: "center" }} className={ classes.lightmodalBody }>
            <div className={classes.alertInfo}>
              <section className={classes.alertBody}>
               لطفا قبل از بررسی پروژه برای درک بهتر کارکرد آن، فایل راهنما را مطالعه نمایید.
              </section>
            </div>
          
          </div>
          <div className={classes.modalFooter}  >
   
            <Button variant="contained" color="secondary" component="span"
              onClick={() => {
                handleCloseModal()
              }}
            >
              بستن
            </Button>
          </div>

        </div>
      </Modal>
        </contex.Provider>




    )
    
}
export default Layout