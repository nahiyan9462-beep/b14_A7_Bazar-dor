

import { authClient } from "@/lib/auth-client";
import {AlertDialog, Button} from "@heroui/react";
export function Logout() {
    const handleSignOUt=async()=>{
            await authClient.signOut();
        }
    
  const logOUt = [
    {
      actions: {
        cancel: "Stay Signed In",
        confirm: "Sign Out",
      },
      body: "You'll need to sign in again to access your account. Any unsaved changes will be lost.",
      classNames: "bg-danger text-white-soft-foreground",
      header: "Sign out of your account?",
      status: "danger",
      trigger: "Sign Out",
    },
  ] as const;
  return (
    <div className="flex flex-wrap gap-4">
      {logOUt.map(({actions, body, classNames, header, status, trigger}) => (
        <AlertDialog key={status}>
          <Button className={classNames}>{trigger}</Button>
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status={status} />
                  <AlertDialog.Heading>{header}</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>{body}</p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button slot="close" variant="tertiary">
                    {actions.cancel}
                  </Button>
                  <Button onClick={handleSignOUt} slot="close" variant={status === "danger" ? "danger" : "primary"}>
                    {actions.confirm}
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      ))}
    </div>
  );
}