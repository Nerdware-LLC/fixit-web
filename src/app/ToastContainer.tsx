import { ToastContainer as ReactToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastContainer = () => (
  <ReactToastContainer
    limit={2} // excess msgs are queued
    position={"top-center"}
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={true}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss={true}
    draggable={false}
    pauseOnHover={true}
  />
);
