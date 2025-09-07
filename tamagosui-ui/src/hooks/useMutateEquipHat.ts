import {
  useCurrentAccount,
  useSuiClient,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeyOwnedPet } from "./useQueryOwnedPet";
import { MODULE_NAME, PACKAGE_ID } from "@/constants/contract";
import { queryKeyOwnedAccessories } from "./useQueryOwnedAccessories";
import { queryKeyEquippedAccessory } from "./useQueryEquippedAccessory";

const mutateKeyEquipAccessory = ["mutate", "equip-accessory"];

type UseMutateEquipHat = {
  petId: string;
  accessoryId: string;
};

export function UseMutateEquipHat() {
  const currentAccount = useCurrentAccount();
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
  const suiClient = useSuiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutateKeyEquipAccessory,
    mutationFn: async ({ petId, accessoryId }: UseMutateEquipHat) => {
      if (!currentAccount) throw new Error("No connected account");

      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::equip_hat`,
        arguments: [tx.object(petId), tx.object(accessoryId)],
      });

      const { digest } = await signAndExecute({ transaction: tx });
      const response = await suiClient.waitForTransaction({
        digest,
        options: { showEffects: true, showEvents: true },
      });
      if (response?.effects?.status.status === "failure")
        throw new Error(response.effects.status.error);

      return response;
    },
    onSuccess: (response) => {
      toast.success(`Hat equipped successfully! Tx: ${response.digest}`);
      queryClient.invalidateQueries({ queryKey: queryKeyOwnedPet() });
      queryClient.invalidateQueries({ queryKey: queryKeyOwnedAccessories });
      queryClient.invalidateQueries({ queryKey: queryKeyEquippedAccessory });
    },
    onError: (error) => {
      console.error("Error equipping hat:", error);
      toast.error(`Error equipping hat: ${error.message}`);
    },
  });
}
