import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { contex } from '../Layout'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    darkMain: {
        flexGrow: 1,
        backgroundColor: "#283046",
        display: 'flex',
        height: '40vh',
    },
    lightMain: {
        flexGrow: 1,
        backgroundColor: "white",
        display: 'flex',
        height: '40vh',
    },
    tabs: {
        borderLeft: `1px solid ${theme.palette.divider}`,
    },
    header: {
        height: '20vh',
        marginTop: "10vh"
    },
    description:{
      height:"42px",
       color:"#7367f0"
    }
}));

export default function Store() {
    const classes = useStyles();
    const skinContex = useContext(contex)

    const [value, setValue] = React.useState(0);
    const storeData = useSelector(state => state.items.store)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div className={classes.header}>
                <h1>لیست فروشگاه های مورد قرار داد :</h1>
            </div>
            <hr />
            <div  className={skinContex.skin === "Light" ? classes.lightMain : classes. darkMain}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label={storeData[0].name} {...a11yProps(0)} />
                    <Tab label={storeData[1].name} {...a11yProps(1)} />
                    <Tab label={storeData[2].name} {...a11yProps(2)} />
                    <Tab label={storeData[3].name} {...a11yProps(2)} />
                </Tabs>

                {storeData.map((elemet, index) => (
                    <TabPanel value={value} index={index}>
                        <section  >
                             <div className={classes.description}><span>نام </span>:{elemet.name}</div>
                             <div className={classes.description}><span>تاریخ بستن قرارداد </span>:{elemet.time}</div>
                             <div className={classes.description}><span>ادرس </span>:{elemet.address}</div>
                             <div className={classes.description}>
                                <span style={{color:elemet.concession==="golden"?"gold":"silver"}} >امتیاز : {elemet.concession==="golden"?"طلایی":"نقره ایی"}</span>
                                </div>
                             <div className={classes.description}><span>توضیحات </span>:{elemet.description}</div>



                        </section>
                       
                    </TabPanel>

                ))}

            </div>
        </div>
    );
}
