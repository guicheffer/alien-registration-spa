# alien-registration-spa
> 👽 &nbsp; Coding test in react+redux+webpack+html5+css3+js+stylus+bla+bla+bla

## Introduction
This mini-project is to shows up my knowledge with hype frameworks, libraries, React and flux data model, styles, javascript (es6), modern bundles and etc.

![](https://user-images.githubusercontent.com/5280832/35598504-f25b835c-060a-11e8-9467-270f3b549442.png)

## Preview
#### 🖥
![desktop](https://user-images.githubusercontent.com/5280832/37881666-e03a2b1a-3071-11e8-92bf-c0a7a9880021.png)


#### 💻
![tablet](https://user-images.githubusercontent.com/5280832/37881656-cb28a1fc-3071-11e8-9a59-3d0d53790638.png)

#### 📱
![mobile](https://user-images.githubusercontent.com/5280832/37881676-f48fa3ba-3071-11e8-9e66-ec6db4c16b75.png)

## Install
`make install` should install packages and dependencies

## Run
Please `make start` to have the project clean, to build and to run

**or**:
- `make build` should build the project in dev mode
- `make run` starts on _localhost_ in port `3000` 👉🏼 http://localhost:3000
- `make watch` watches for changes and compile needed code
- `make clean` clears the `app/` folder (responsible for the dist files)

## ⭐️ TL;DR
Please, access 👉🏼  http://alien-registration.herokuapp.com/

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## 👨🏻‍💻 Development process

### Technologies
Some of the technologies stack was handpicked because of preference in working with!
Check below some of the tools and tech stack with their screenshots on it too!

- I used [Atom](https://atom.io/) as the editor.
  ![inception](https://user-images.githubusercontent.com/5280832/37882146-156a6a2a-3077-11e8-86f1-4f8f058c302d.png)

	~~what an inception 👀~~

- I used a [Kanban board](https://github.com/guicheffer/alien-registration-spa/projects/1?fullscreen=true) for the project management at all, _GitHub Project Board_ was the one. You can check right here how my Kanban worked in details: https://github.com/guicheffer/alien-registration-spa/projects/1?fullscreen=true
![kanban](https://user-images.githubusercontent.com/5280832/37882165-39a1a8ea-3077-11e8-929e-5d9d334e1d56.png)
- I chose [Webpack](https://webpack.js.org/) for bundling this project assets once I had to do 3 different exercises inside only one repo (better to read and review). Actually many advantages were included on this decision!
- I chose [React](https://reactjs.org/) because I'm familiar with and its the most fast way to begin it from zero. Also used [Redux](https://redux.js.org/) for controlling global states (specially for aliens registration, our modules its where actions and dispatchers are located)

### Testing
- For the e2e, it was used [Nightwatch.js](http://nightwatchjs.org/)
- For the unit tests, it was used [Jest](https://facebook.github.io/jest/)

A few tests has been added (_I ran out of time_)

## Still TO DO
[Kanban Backlog](https://github.com/guicheffer/alien-registration-spa/projects/1#column-2363174) The `To Do` thing column you can check here:
https://github.com/guicheffer/alien-registration-spa/projects/1#column-2363174

### ⭐️ Considerations
This application should show up the possibility of working with any framework, using the concept of mediator, where you can add any event into any component anytime you want to.

There are some other considerations I listed right here:

- Yep, I'm sure you're wondering (Can an Alien be multiple species at same time?). Answer is: YES! Aliens can be multiple type of species at the same time (I don't even know if that's possible 😷)
- What about if I were a full stack developer? (specially on this code challenge). Please read the final text on this _readme_
- IMO a good code doesn't need comments spread out.


### What makes me happy on every project development (including this code challenge)
- CSS Animations;
- Order attributes in CSS alphabetically;
- Atomic commits;
- Commit on master, just like this repo... (kidding, in general...**PRs**, **please** 😜);
- Usage of [caniuse.com](caniuse.com) (I mentioned that on the smartbox interview...I really searched and still search for some attributes in CSS sometimes);
- Usage of new technologies, choice among frameworks and libraries;
	- Vue.js, React, Angular and Knockout...love 'em 🖤
- Usage of Mobile First designing and development;
- To Study in general;
- Usage of emojis ❤️ &nbsp; (I really **LOVE** this thingy);

### ⭐️ If I were a full stack developer
...I would:
- ...definitely build an API for saving and updating aliens data. this API should consist:
  - having a Node.js as the backend service
  - a Redis or even a Mongo db running as the database
  - express for our route service
- ...a AWS t2 for having our API running in prod environment
- ...be using our current React+Redux for hitting the APIs and bringing data
- ...be using axios, this should be a better idea (best ajax polyfill)
