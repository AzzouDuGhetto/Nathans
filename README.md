# How to edit
cd RN1-Nathans
yarn install
yarn start

# How to deploy
When you push on master Github action run expo:publish so when the app will be on store it will automatically update
You can also run netlify deploy to get an url and test on web (specify web-build)

# Rules

- [x] Login / Register / Profile Management (Profile Picture)
- [x] Native phone functionality (phone, camera, gps, ...)
- [x] Gestures (scrollView, listing, ...)
- [x] eslint-airbnb
- [x] You should have a comande lint **npm run lint** that will test the linter
- [x] Redux **or** Contexts + Hooks
- [x] Expo online access
- [x] README.md

# Bonus

- [x] Typescript
- [x] CI / CD Eslint
- [x] Expo Publish on master
- [ ] DB
- [ ] Photos QR
- [ ] Login FaceID / TouchID

# Credits

Total : 4

- 0 if one or more of the mandatory rules explain in **Project topic** is missing
- 2 if you have all mandatory rules explain in **Project topic**
- 0-2 for bonuses

# Requirement

The project will have an open subject, you can create anything you want as long as its respect these rules:
- You should have a user management system (login, register, ...), with at least a profile picture in your user info.
- You should use 1 native phone functionality (phone, camera, gps, ...)
- You should use gestures without external lib (scrollView, listing, ...)
- Your code must be either in react-native 0.61.0 at least, or with expo sdk 36
- You must use the new React (no “extends Component” (only Functional or PureComponent), “UNSAFE_componentWillMount()” ...)
- You must use the new Javascript (no “.bind(this)”, ...)
- You must use the linter eslint-airbnb
- You should have a comande lint “npm run lint” that will test the linter
- Your app must be in React-Native, use a global state management system (Redux, apollo, new Context Api + hooks…), and work on Android and IOS
- Your project must be functional
- Your project must be accessible online to us via Fabric/expo or on the store directly
- Your git repositories must have a Readme describing how to deploy and build your project
- Your code and your architecture will be reviewed
- The design and responsive capability of your app will be scored

If one of this is missing you’ll have ECHEC
