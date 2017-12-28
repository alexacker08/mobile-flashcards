This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## App Overview
Hey there! Seeing that you're now here, I thought I'd take a bit of your time to explain what the App is that you've stumbled up and how it can be useful to you. The underlying functionality of this App is to help users study for anything really that would require basic flashcards. Please note that the current quizzes are based on a simple "Correct" or "Incorrect" basis. More advanced updates to come out in future releases. The initial App also comes with "code" themed study cards as a starter however these can be erased and or added upon with ease.

## Getting started

Firstly git clone the project into a local build and folder into the main app file

```
git clone https://github.com/alexnitro/mobile-flashcards.git

cd mobile-flashcards

```

Next, be sure to install all basic dependencies utilzing YARN instead of NPM. If you don't have yarn at this time, be sure to download it first before proceecding. See step 1 for details

```
1. npm i -g yarn (Skip if yarn is already available)

2. yarn

```

At this point, you should have everything installed and can now start up the Simulators

```
1. npm run start - For both iOS and Android

2. npm run ios - iOS only

3. npm run android - Android only (Have simulator already open)
```

If you're using a MAC and a recent OS, the iOS simulator should boot up automatically as it is natively installed on your computer. The bootup will also install the Expo app which hosts the apps UI. The Android simulator requires a bit more work several packages to download. I recommend GenyMotion which has a "Trial/personal" product that can be used to view the application. Also recommend installing 'android-platform-tools', which is a requirement, via a homebrew install as it does a lot of quick work for you.

```
brew cask install android-platform-tools

adb devices
```


## Basic Functionality

### Opening Home

When you reach the home screen, some initial study decks will be provided to you. On the bottom NAV you'll have the option to head over to a "New Deck" screen where you can create a new set of decks which will be hosted on the original Home screen.

### Individual CARDS

By clicking on an individual deck within the home screen, you'll be taken to the individual decks respective home where you can decide to add some more flashcards, start a quiz, or delete the deck in its entirety. Please be careful on that delete button as once it's gone, it's gone for good.

### Adding a new flashcard to a deck

To add a new question card, click "Add Card" which will take you to a simple fill in screen where you can input you question and answer if this statement is correct or not correct. After filling this out, you'll be taken back to the previous screen.

### The Quiz
When you start the quiz, you'll be shown statements and you must answer if they are correct or not. Once the quiz is complete, you'll be able to review your score where at that time. In the scoring screen, you'll also be given the option to retake the quiz or go back to the cards homepage.


That's it. If you have any specific questions regarding the react setup of the project, I recommend you check out the create-react-native-app README documentation found in the link [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).
