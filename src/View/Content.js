
import useStyles from '../style'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react';
import { contex } from '../Layout'
import { langContext } from '../IntlProviderWrapper'

const Content = () => {
  const classes = useStyles();
  const skinContex = useContext(contex)
  const languageContex = useContext(langContext)
  return (
    <main
      style={{ direction: languageContex.locale === "en" ? "ltr" : "rtl" }}
      className={skinContex.skin === "Light" ? classes.lightContent : classes.darkContent}>
      <Outlet />
    </main>
  )
}
export default Content