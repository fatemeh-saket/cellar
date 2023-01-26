import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import useStyles from '../style'
import { useContext } from 'react';
import { contex } from '../Layout'
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import { FormattedMessage } from 'react-intl'
import { ReactCountryFlag } from 'react-country-flag'
import { langContext } from '../IntlProviderWrapper'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import {useSelector } from 'react-redux';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    // border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const Header = () => {
  const classes = useStyles();
  const skinContex = useContext(contex)
  const languageContex = useContext(langContext)
  const ThemeIcon = () => {
    if (!skinContex.skin || skinContex.skin === "Light") {
      return <IconButton aria-label="moon" color="primary" onClick={() => {
        window.localStorage.setItem("skin", "Dark")
        skinContex.setSkin("Dark")
      }}>
        <Brightness2OutlinedIcon
          className={classes.ThemIconClick}
        />
      </IconButton>
    }
    if (skinContex.skin === "Dark") {
      return <IconButton aria-label="sun" color="primary" onClick={() => {
        window.localStorage.setItem("skin", "Light")
        skinContex.setSkin("Light")
      }} >
        <WbSunnyOutlinedIcon
          className={classes.ThemIconClick} />
      </IconButton>
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorE2, setAnchorE2] = React.useState(null);
  const openNotic = Boolean(anchorE2);

  const handleMenuNotic = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleNoticClose = () => {
    setAnchorE2(null);
  };

  const langObj = {
    en: 'English',
    fa: 'فارسی'
  }

  const data = useSelector(state => state.items.products)
   const limitProduct=data.filter(element=>(element.totalNumber!=="" &&  element.totalNumber<=5) || (element.weight!=="" &&  element.weight<=10) )


  return (
    <AppBar position="fixed" className={skinContex.skin === "Light" ? classes.lightAppBar : classes.darkAppBar}>
      <Toolbar>
        <div className={classes.header}>
          <div className={classes.headerLeftSide}>
            <section className={classes.language}>
              <IconButton
                aria-controls="menu-appbar"
                aria-haspopup={true}
                onClick={handleMenu}
                color="inherit">
                <ReactCountryFlag
                  countryCode={languageContex.locale === "fa" ? "IR" : "US"}
                  svg
                />
                <span className={classes.titlelanguage}>{langObj[languageContex.locale]}</span>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                style={{
                  left: '-15px ',
                  top: "9% ",
                  direction: 'rtl'
                }}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {
                  handleClose();
                  languageContex.handleChange("fa")
                }}>
                  <ReactCountryFlag
                    countryCode="IR"
                    svg
                  />
                  <span className={classes.titlelanguage}><FormattedMessage id="persionLanguage" /></span>
                </MenuItem>
                <MenuItem onClick={() => {
                  handleClose();
                  languageContex.handleChange("en")
                }}>
                  <ReactCountryFlag
                    countryCode="US"
                    svg
                  />
                  <span className={classes.titlelanguage}><FormattedMessage id="EngilishLanguage" /></span>
                </MenuItem>
              </Menu>
            </section>
            <section className={classes.darkMode} >
              <ThemeIcon />
            </section>
            <section>

              <IconButton aria-label="cart"      onClick={handleMenuNotic}>
                <StyledBadge badgeContent={limitProduct.length} color="error">
                  <NotificationsNoneIcon color="primary" />
                </StyledBadge>
              </IconButton>
              <Menu
                    id="menu-appbar"
                    anchorEl={anchorE2}
                    style={{
                      left: '-230px ',
                      top: "9% ",
                      direction: 'rtl'
                    }}
                    keepMounted
                    open={limitProduct.length>0? openNotic:""}
                    onClose={handleNoticClose}
                  >

                    <div className={classes.notificationLimitProductHeader}  >
                      <div style={{width:"70%"}}>اخطار</div>
                      <div 
                      style={{ 
                         backgroundColor:"rgba(115, 103, 240, 0.12)",
                         color:' #7367f0',
                        padding: "0.2rem 0.9rem",
                        borderRadius: ' 10rem',
                        width:"25%",
                        fontSize:"12px"
                    }}
                      
                      > {limitProduct.length} جدید</div>
                    </div>
                    {limitProduct.map(element=>(
                       <section className={classes.notificationLimitProduct}>
                         <MenuItem >
                         <span>مقدار  {element.title}</span>
                         <span style={{display:element.counterUnit==="weight"?"none":"inline-block"}}>کمتر از 5 عدد میباشد</span>
                         <span style={{display:element.counterUnit==="number"?"none":"inline-block"}}>کمتر از 10 کیلو گرم می باشد</span>
                        </MenuItem>
                       </section>
                       
                    ))}
                
                  </Menu>
            </section>
          </div>
          <Typography variant="h5" noWrap style={{ marginTop: "0.5rem" }}>
            <FormattedMessage id="header-title" />
          </Typography>
        </div>
      </Toolbar>
    </AppBar>

  )
}
export default Header