import * as React from "react";
import { useSwitch } from "../../hooks/useSwitch";
import { IconCheck, IconX, IconAlertCircle } from "@tabler/icons";
import { Notification } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

type NotificatorProps = {
  status: "ok" | "neutral" | "error";
  message: string;
};
export const Notificator = ({ status, message }: NotificatorProps) => {
  const { Switch, Case } = useSwitch();
  if (status === "neutral") {
    showNotification({
      message: "I will close in 500ms seconds",
      autoClose: 500,
    });
  }
  return (
    <>
      <Switch handle={status}>
        <Case value={"ok"}>
          <Notification
            icon={<IconCheck size={18} />}
            color="teal"
            title="Success"
          >
            {message}
          </Notification>
        </Case>
        <Case value={"neutral"}>
          <Notification icon={<IconAlertCircle size={18} />} color="yellow">
            {message}
          </Notification>
        </Case>
        <Case value={"error"}>
          <Notification icon={<IconX size={18} />} color="red">
            {message}
          </Notification>
        </Case>
      </Switch>
    </>
  );
};
