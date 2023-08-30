# SereneProject-CentreForMindfulness

# Pettier and ESLint

run `yarn format:fix` to check or fix with Prettier

run `yarn lint:fix` to check or fix with ESLint


# Build local

eas build --platform android --local --profile preview-android
eas build --platform ios --local --profile preview-android

## Production

Build android aab: `eas build --platform android --local --profile production``


req: `brew install fastlane`
Start build and run on simulator: `npx expo run:ios`
Build IPA: `eas build --platform ios --local --profile production`

# FAQ

https://stackoverflow.com/questions/36369197/fastlane-command-not-found

https://github.com/expo/eas-cli/issues/1331#issuecomment-1235603312

```
Here's what worked for me:

Open "Keychain Access"

Find the private key called "iOS Developer"

Delete the private key

Try code signing again, it should work!
```
