/**
 * **WorkOrdersPage**
 * - `Outlet` of `HomePagesLayout`
 * - Rendered in `AppRouter` via `MemoryRouter` when path is "/home/workorders"
 */
export const WorkOrdersPage = () => {
  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        placeContent: "center",
        placeItems: "center",
        backgroundColor: "red"
      }}
    >
      <h1>Work Orders Page</h1>
    </div>
  );
};
