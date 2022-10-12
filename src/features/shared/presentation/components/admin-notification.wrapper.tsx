import { Outlet } from "react-router-dom";
import Pusher from "pusher-js";
import { useEffect } from "react";

const pusher = new Pusher("8a62b17c8a9baa690edb", {
  cluster: "ap1",
});

export function AdminNotificationWrapper() {
  useEffect(() => {
    const snackshopChannel = pusher.subscribe("snackshop");

    snackshopChannel.bind("order-transaction", (data: any) => {
      // TODO: Notification for order-transaction
    });
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}
