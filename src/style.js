import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
// *******************style****************************/
const useStyles = makeStyles((theme) => ({
    // ****main
    darkRoot: {
        display: 'flex',
        direction: "rtl",
        flexDirection: "row-reverse",
        backgroundColor:"#161d30",
        height: '100vh !important',
        overflow:"hidden !important", 
    },
    lightRoot: {
        display: 'flex',
        direction: "rtl",
        flexDirection: "row-reverse",
        backgroundColor:"#f8f8f8",
        height: '100vh !important',
        overflow:"hidden !important",
    },
    // ****header
    darkAppBar: {
        width: `calc(100% - ${drawerWidth}px - 10%) !important`,
        marginRight: `calc(${drawerWidth}px + 5%) !important`,
        marginLeft: `5% !important`,
        marginTop: "1% !important",
        borderRadius: '10px !important',
        backgroundColor: '#283046 !important',
        height:'10% !important',     
    },
    lightAppBar: {
        width: `calc(100% - ${drawerWidth}px - 10%) !important`,
        marginRight: `calc(${drawerWidth}px + 5%) !important`,
        marginLeft: `5% !important`,
        marginTop: "1% !important",
        borderRadius: '10px !important',
        color: "#191919 !important",
        height:'10% !important',
        // background: '#062d5f !important',
        // backdropFilter: 'blur(2px) important',
        // backgroundColor:"#141e61 !important",
        background: '#fff !important',
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    headerTypography: {
        width: '50%',
    },
    headerLeftSide: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '50%',
    },
    titlelanguage:{
         fontSize:'.8rem',
         paddingRight:'8px'
    },

    notificationLimitProduct:{
         height:"9vh",
         borderTop:"1px solid #7367F0", 
        //  borderBottom:"1px solid #7367F0", 
         paddingTop:".8rem"
    },
  
    notificationLimitProductHeader:{
      display:"flex",
      padding:"12px",
      justifyContent:"end"
    },
    // **** sidbar
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    lightDrawerPaper: {
        overflow:'hidden',
        width: drawerWidth,
        // background: '#062d5f !important',
        // backgroundColor:"#04293a !important",
        background: '#fff !important',
        // color: '#625f6e !important',
        color: '#000 !important',
        borderRadius: '5px !important',
        boxShadow: ' -2px 4px 10px 1px rgb(0 0 0 / 20%) !important',

    },
    darkDrawerPaper: {
        overflow:'hidden',
        width: drawerWidth,
        background: '#283046 !important',
        color: '#d0d2d6 !important',
        borderRadius: '5px !important',
        boxShadow: ' 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    },
    darkSidbarIcons: {
        color: '#d0d2d6 !important',
        minWidth: '28px !important',
        marginLeft:"2px !important",
    },
    lightSidbarIcons: {
        color: '#625f6e !important',
        minWidth: '28px !important',
        marginLeft:"2px !important",
    }, 
    sidbarListItem: {
        textAlign: "right",
    },
    sidbarLogo: {
        height: '15vh',
        textAlign: 'center',
        marginTop: '3%',
    },
    sidbarLogoImg: {
        width: '70%',
        height: ' 85%',
    },

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,

    // ****content
    darkContent: {
        flexGrow: 1,
        background: '#283046 !important ',
        // padding: theme.spacing(2),
        borderRadius: ' 10px',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: ' 8%',
        marginBottom: '0 ',
        height: '80vh ',
        boxShadow: ' 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    },
    lightContent: {
        flexGrow: 1,
        background: '#fff !important',
        // padding: theme.spacing(2),
        borderRadius: ' 10px',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: ' 8%',
        marginBottom: '0 ',
        height: '80vh ',
        boxShadow: ' 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    },


   ThemIconClick: {
        //   color: 'white',
        "&:active": {
          color: '#7367F0'
        }
      },
      selectedItem:{
        backgroundColor:"#7367f0 !important",
        boxShadow: '0 0 10px 1px rgb(115 103 240 / 70%) !important',
        borderRadius: '8px !important',
        marginRight:"10px !important",
        transition: 'transform 0.25s ease !important'
      },

     

// modal
      lightModalPaper: {
        position: 'absolute',
        top: '30%',
        left: '35%',
        width: 400,
        backgroundColor: "white",
        boxShadow: '0 5px 20px 0 rgb(34 41 47 / 10%) !important',
        border: "none  !important",
        borderRadius: "5px"
      },
      lightModalHeader: {
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
        backgroundColor: 'rgba(255, 159, 67, 0.12)',
        color: '#ff9f43 !important',
        border: 'none  !important',
        padding: '0',
        borderRadius: '0.358rem',
        marginBottom: '2rem',
        position: 'relative',
        transition: 'opacity 0.15s linear',
      },
      alertBody: {
        padding: '0.71rem 1rem',
      },
     

}));

export default useStyles
