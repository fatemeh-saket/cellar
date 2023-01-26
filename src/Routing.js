import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Dashbord from './View/Dashbord'
import Inventory from './View/Inventory'
import ShowItem from './View/ShowItem'
import Requests from './View/Requests'
import Store from './View/Store'
import RejectList from './View/RejectList'
import Deficits from './View/Deficits'
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='dashbord' element={<Dashbord />} />
          <Route path="Inventory" element={<Inventory />}>
            {/* <Route path='show' element={<ShowItem />}/> */}
          </Route>
          <Route path='Inventory/show' element={<ShowItem />} />
          <Route path='requests' element={<Requests />} />
          <Route path='reject' element={<RejectList />} />

          <Route path='deficits' element={<Deficits />} />
          <Route path='store' element={<Store />} />
          <Route path="/" element={<Navigate to="dashbord" />} />
          <Route path='*' element={<div>not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default Routing




