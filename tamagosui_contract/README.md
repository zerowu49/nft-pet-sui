## 📝 Usage

```bash
# Build the project
sui move build

# Publish the project
sui client publish

This will output a new package ID: 0x4adc22e4d0d01e94293983aaf3255a95fd4bc5f3b98a6a3cc2f800977843c9d5

You can run front end and set the package ID as env to interact with the contract or manually interact with CLI commands as below:

# Adopt new pet
sui client call --function adopt_pet \
--module tamagosui \
--package <PACKAGE_ID> \
--args "First Pet" 0x6

This will output a new pet objectID: 0x7b67f61bc46ff03612e3abdcdb473d5a50b4583f8e2beb0bf21fb7782431a699

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

### Upgrade contract

Syntax:

```bash
sui client upgrade \
 -c <UPGRADE_CAP_ID>
```

Example:

```bash
sui client upgrade \
 --upgrade-capability 0xd95211c8420a79a992ef244d90bd3d8f5d748a5864cbde320a821f45dfcc40d8
```
