## 📝 Usage

```bash
# Build the project
sui move build

# Publish the project
sui client publish

This will output a new package ID: 0x9a6abb23e602a8e74e7fd0ead4d0f4c9dd8e6be63049cd2a4e1dce21cf1d66dd

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
