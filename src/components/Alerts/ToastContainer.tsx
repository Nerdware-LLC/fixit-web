import { ToastContainer as ReactToastifyContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Only rendered once - place it near the app root.
 *
 * Docs: https://fkhadra.github.io/react-toastify
 */
export const ToastContainer = () => (
  <ReactToastifyContainer
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
