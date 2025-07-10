import { Routes, Route } from 'react-router-dom';
import Homepage from "./component/homepage"
import HomeUser from "./component/homeUser"
import { AuthProvider } from './component/authContext';


function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop/:id" element={<HomeUser />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
