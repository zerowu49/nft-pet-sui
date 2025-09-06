## 📝 Usage

```bash
# Cek objects yang dimiliki (termasuk TreasuryCap)
sui client objects

# Adopt new pet
sui client call --function adopt_pet \
--module tamagosui \
--package <PACKAGE_ID> \
--args "First Pet" 0x6

This will output a new pet objectID: 0x16c123cfea38be571436c337b3244b8bd39dc10cc35152718e3d722a1e6baa7c

# Feed pet

sui client call --function feed_pet \
--module tamagosui \
--package <PACKAGE_ID> \
--args <PET_ID>

# Play with pet

sui client call --function play_with_pet \
--module tamagosui \
--package <PACKAGE_ID> \
--args <PET_ID>

```

## Query

PACKAGE_ID: 0xba87a80905ce7cd9518b2a353ac617059386887ac072c1194da10a18f5398da7

```bash
sui client call --function adopt_pet \
--module tamagosui \
--package 0xba87a80905ce7cd9518b2a353ac617059386887ac072c1194da10a18f5398da7 \
--args "First Pet" 0x6


sui client call --function feed_pet \
--module tamagosui \
--package 0xba87a80905ce7cd9518b2a353ac617059386887ac072c1194da10a18f5398da7 \
--args 0x16c123cfea38be571436c337b3244b8bd39dc10cc35152718e3d722a1e6baa7c
```
