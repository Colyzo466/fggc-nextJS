"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getSocket } from "../lib/realtime";

export default function NotificationToaster() {
  useEffect(() => {
    const socket = getSocket();
    socket.on("notification", (data: { message: string; type: string }) => {
      if (data.type === "success") toast.success(data.message);
      else if (data.type === "error") toast.error(data.message);
      else toast(data.message);
    });
    return () => { socket.off("notification"); };
  }, []);
  return null;
}
