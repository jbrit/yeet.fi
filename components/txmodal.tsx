import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const TX_HASH_CLICKED = "TX_HASH_CLICKED";
export const TxModal = ({
  isConfirmDialogOpen,
  setIsConfirmDialogOpen,
}: {
  isConfirmDialogOpen: boolean;
  setIsConfirmDialogOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
      <DialogContent className="sm:max-w-md bg-black">
        <DialogHeader>
          <DialogTitle>Confirm Transaction</DialogTitle>
          <DialogDescription>
            Enter Near Trransaction hash here
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="tx_hash" className="sr-only">
              tx hash:
            </Label>
            <Input
              id="tx_hash"
              placeholder="TxHash"
              onChange={(e) => {
                localStorage.setItem("txHash", e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            onClick={() => {
              localStorage.setItem(TX_HASH_CLICKED, "true");
            }}
            type="button"
            variant="secondary"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
