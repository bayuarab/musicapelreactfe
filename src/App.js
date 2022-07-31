import logo from './logo.svg';
import './App.css';
import ButtonAppBar from './component/websiteAppBar';
import { AppBar, Box } from '@mui/material';
import HeaderBar from './component/websiteAppBar';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="base">
      <Box sx={{ flexGrow: 1 }}><HeaderBar/></Box>
    <div className="contentWrapper">
    <Outlet />
    </div>
    </div>
  );

  // origin
  // import logo from './logo.svg';
  // import './App.css';
  // import ButtonAppBar from './component/websiteAppBar';
  // import { AppBar, Box } from '@mui/material';
  // import HeaderBar from './component/websiteAppBar';

  // function App() {
  //   return (
  //     <div className="base">
  //       <Box sx={{ flexGrow: 1 }}><HeaderBar/></Box>
  //     </div>
  //   );
}

export default App;
