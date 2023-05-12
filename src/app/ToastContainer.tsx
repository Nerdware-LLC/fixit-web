import { ToastContainer as ReactToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastContainer = () => (
  <ReactToastContainer
    limit={1} // excess msgs are queued
    position="top-center"
    autoClose={1200}
    hideProgressBar={false}
    newestOnTop={true}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss={true}
    draggable={false}
    pauseOnHover={false}
  />
);
