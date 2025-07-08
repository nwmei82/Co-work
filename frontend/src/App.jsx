import { Routes, Route } from 'react-router-dom';
import Homepage from "./component/homepage"
// import UserList from "./component/test"
import HomeUser from "./component/homeUser"


function App() {

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/shop/:id" element={<HomeUser />} />
    </Routes>
  )
}

export default App
