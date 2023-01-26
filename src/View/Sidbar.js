import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon  from '@material-ui/icons/Home'
import Assignment from '@material-ui/icons/Assignment'
import RvHookup from '@material-ui/icons/RvHookup'
import StoreIcon from '@material-ui/icons/Store';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import logo from '../asset/logo1.png'
import useStyles from '../style'
import { useContext, useState, useEffect } from 'react';
import { contex } from '../Layout'
import { useNavigate, useLocation } from 'react-router-dom';

import {FormattedMessage} from 'react-intl'

const Sidbar = () => {
  const classes = useStyles();
  const skinContex = useContext(contex)
  const[selectItem, setSelectItem]= useState(0)
  let navigation=useLocation()
  const redirect=useNavigate()
useEffect(()=>{
  //****  don't miss slider item when refresh ***/
  if(navigation.pathname==='/dashbord'){
    setSelectItem(0)
  }
  if(navigation.pathname==='/Inventory'){
    setSelectItem(1)
  }
  if(navigation.pathname==='/requests'){
    setSelectItem(2)
  }
  if(navigation.pathname==='/reject'){
    setSelectItem(3)
  }
  if(navigation.pathname==='/store'){
    setSelectItem(5)
  }
  if(navigation.pathname==='/deficits'){
    setSelectItem(4)
  }
  if(navigation.pathname==='/Inventory/show'){
    setSelectItem(1)
  }
  
})
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: skinContex.skin === "Light" ? classes.lightDrawerPaper : classes.darkDrawerPaper,
      }}
      anchor="right"
    >
      <div className={classes.sidbarLogo}>
        <img src={logo} alt="logo " className={classes.sidbarLogoImg} />
      </div>
      <Divider />
      <List>
        {['dashbord', 'Inventory', 'requests', 'reject'].map((text, index) => (
          <ListItem button key={text} 
            onClick={() => {
              setSelectItem(index)
              redirect(`/${text}`)
            }}
            className={index===selectItem?classes.selectedItem:""}
          >
            <ListItemIcon
              className={skinContex.skin === "Light" ? classes.lightSidbarIcons : classes.darkSidbarIcons}
            >
              {index % 4 === 0  && <HomeIcon /> }
              {index % 4 === 1 && <PlaylistAddCheckIcon/>}
              {index % 4 === 2 && <RvHookup />}
              {index % 4 === 3  && <ThreeSixtyIcon />}
            </ListItemIcon>
            <ListItemText className={classes.sidbarListItem} ><FormattedMessage id={text} defaultMessage="dhhhdhhdhdhdh"  /></ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['deficits','store'].map((text, index) => (
          <ListItem button key={text} 
          onClick={() => {
            setSelectItem(index+4)
            redirect(`/${text}`)
          }}
          className={index===selectItem-4?classes.selectedItem:""}
          >
            <ListItemIcon 
             className={skinContex.skin === "Light" ? classes.lightSidbarIcons : classes.darkSidbarIcons}>
              {index % 4 === 0 ? <Assignment /> : <StoreIcon />}
            </ListItemIcon>
            <ListItemText className={classes.sidbarListItem} ><FormattedMessage id={text} /></ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
export default Sidbar