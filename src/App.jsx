import Navbar from "./common/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <div
        style={{
          width: "100%",
          marginTop: "4rem",
          paddingTop: "1rem",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default App;
