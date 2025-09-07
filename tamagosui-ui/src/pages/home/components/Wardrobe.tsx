import {
  GlassesIcon,
  HatGlassesIcon,
  Loader2Icon,
  WarehouseIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

import { UseMutateEquipAccessory } from "@/hooks/useMutateEquipAccessory";
import { useMutateMintAccessory } from "@/hooks/useMutateMintAccessory";
import { UseMutateUnequipAccessory } from "@/hooks/useMutateUnequipAccessory";
import { useQueryEquippedAccessory } from "@/hooks/useQueryEquippedAccessory";
import { useQueryOwnedAccessories } from "@/hooks/useQueryOwnedAccessories";

import type { PetAccessoryStruct, PetStruct } from "@/types/Pet";
import { useMutateMintHat } from "@/hooks/useMutateMintHat";
import { UseMutateEquipHat } from "@/hooks/useMutateEquipHat";
import { useQueryEquippedHat } from "@/hooks/useQueryEquippedHat";
import { UseMutateUnequipHat } from "@/hooks/useMutateUnequipHat";

type WardrobeManagerProps = {
  pet: PetStruct;
  isAnyActionPending: boolean;
};

export function WardrobeManager({
  pet,
  isAnyActionPending,
}: WardrobeManagerProps) {
  // --- Hooks for Actions ---
  const { mutate: mutateMint, isPending: isMinting } = useMutateMintAccessory();
  const { mutate: mutateMintHat, isPending: isMintingHat } = useMutateMintHat();

  const { mutate: mutateEquip, isPending: isEquipping } =
    UseMutateEquipAccessory();
  const { mutate: mutateUnequip, isPending: isUnequipping } =
    UseMutateUnequipAccessory();

  const { mutate: mutateEquipHat, isPending: isEquippingHat } =
    UseMutateEquipHat();
  const { mutate: mutateUnequipHat, isPending: isUnequippingHat } =
    UseMutateUnequipHat();

  // --- Wardrobe Data Fetching Hooks ---
  const { data: ownedAccessories, isLoading: isLoadingAccessories } =
    useQueryOwnedAccessories();
  const { data: equippedAccessory, isLoading: isLoadingEquipped } =
    useQueryEquippedAccessory({ petId: pet.id });
  const { data: equippedHat, isLoading: isLoadingEquippedHat } =
    useQueryEquippedHat({ petId: pet.id });

  // A specific loading state for wardrobe actions to disable buttons.
  const isProcessingWardrobe =
    isMinting || isEquipping || isUnequipping || isMintingHat || isEquippingHat;
  const isLoading =
    isLoadingAccessories || isLoadingEquipped || isLoadingEquippedHat;

  const renderEquipButton = (accessory: PetAccessoryStruct) => {
    if (accessory.name.includes("hat")) {
      return (
        <Button
          className="cursor-pointer"
          onClick={() =>
            mutateEquipHat({
              petId: pet.id,
              accessoryId: accessory.id.id,
            })
          }
          disabled={isAnyActionPending || isProcessingWardrobe}
          size="sm"
        >
          {isEquippingHat && (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          )}{" "}
          Equip
        </Button>
      );
    }

    return (
      <Button
        className="cursor-pointer"
        onClick={() =>
          mutateEquip({
            petId: pet.id,
            accessoryId: accessory.id.id,
          })
        }
        disabled={isAnyActionPending || isProcessingWardrobe}
        size="sm"
      >
        {isEquipping && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}{" "}
        Equip
      </Button>
    );
  };

  const renderOwnedAccessories = (accessory: PetAccessoryStruct) => {
    if (
      accessory.name !== equippedAccessory?.name &&
      accessory.name !== equippedHat?.name
    ) {
      return (
        <div className="flex items-center gap-3">
          <img
            src={accessory.image_url}
            alt={accessory.name}
            className="w-12 h-12 rounded-md border p-1 bg-white"
          />
          <p className="text-sm font-semibold">{accessory.name}</p>
          {renderEquipButton(accessory)}
        </div>
      );
    }
    if (accessory.name === equippedHat?.name) {
      return (
        <div className="flex items-center gap-3">
          <img
            src={equippedHat?.image_url}
            alt={equippedHat?.name}
            className="w-12 h-12 rounded-md border p-1 bg-white"
          />
          <p className="text-sm font-semibold">
            Equipped: <strong>{equippedHat?.name}</strong>
          </p>
          <Button
            className="cursor-pointer"
            onClick={() => mutateUnequipHat({ petId: pet.id })}
            disabled={isAnyActionPending || isProcessingWardrobe}
            variant="destructive"
            size="sm"
          >
            {isUnequippingHat && (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            )}{" "}
            Unequip
          </Button>
        </div>
      );
    }

    if (accessory.name === equippedAccessory?.name) {
      return (
        <div className="flex items-center gap-3">
          <img
            src={equippedAccessory?.image_url}
            alt={equippedAccessory?.name}
            className="w-12 h-12 rounded-md border p-1 bg-white"
          />
          <p className="text-sm font-semibold">
            Equipped: <strong>{equippedAccessory?.name}</strong>
          </p>
          <Button
            className="cursor-pointer"
            onClick={() => mutateUnequip({ petId: pet.id })}
            disabled={isAnyActionPending || isProcessingWardrobe}
            variant="destructive"
            size="sm"
          >
            {isUnequipping && (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            )}{" "}
            Unequip
          </Button>
        </div>
      );
    }
    return null;
  };

  const renderContent = () => {
    // Priority 1: Handle the loading state first to prevent UI flicker.
    if (isLoading) {
      return (
        <p className="text-sm text-muted-foreground">Loading wardrobe...</p>
      );
    }

    const ownedHat = ownedAccessories?.find((accessory) => {
      return accessory.name.includes("hat");
    });
    const ownedGlasses = ownedAccessories?.find((accessory) => {
      return accessory.name.includes("glasses");
    });

    // Check if the pet is equipped with the accesory or render mint button
    return (
      <div className="flex flex-col space-y-2 items-center w-full">
        {ownedGlasses ? (
          renderOwnedAccessories(ownedGlasses)
        ) : (
          <Button
            onClick={() => mutateMint()}
            disabled={isAnyActionPending || isProcessingWardrobe}
            className="w-full cursor-pointer bg-amber-600"
          >
            {isMinting ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GlassesIcon className="mr-2 h-4 w-4" />
            )}{" "}
            Mint Cool Glasses
          </Button>
        )}
        {ownedHat ? (
          renderOwnedAccessories(ownedHat)
        ) : (
          <Button
            onClick={() => mutateMintHat()}
            disabled={isAnyActionPending || isProcessingWardrobe}
            className="w-full cursor-pointer bg-green-400"
          >
            {isMintingHat ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <HatGlassesIcon className="mr-2 h-4 w-4" />
            )}{" "}
            Mint Hat
          </Button>
        )}
      </div>
    );
  };

  return (
    <CardFooter className="flex-col items-start gap-4 border-t pt-4">
      <h3 className="font-bold text-muted-foreground flex items-center gap-2 mx-auto">
        <WarehouseIcon size={16} /> WARDROBE
      </h3>
      <div className="w-full text-center p-2 rounded-lg min-h-[72px] flex items-center justify-center">
        {renderContent()}
      </div>
    </CardFooter>
  );
}
