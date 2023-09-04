# Social Network API

![MIT License](https://img.shields.io/badge/license-MIT%20License-green)

## Description

The objective of this project is to have a backend set up using Mongoose for a social media application. We wanted to focus this to showcasing Mongoose capabilities and as well as expand our knowledge of other technologies. We wanted to have a place where all Users feel free to share there Thoughts with the world and share Reactions with other thinkers alike. A space for lively and thought provoking conversations.

## Table of Contents

- [Social Network API](#social-network-api)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Questions](#questions)

## Installation

- Install Mongo DB and Mongoose (Visit respecitve sites)
- Install Insomnia or some other application to view the API routes
- Dowload zip from [this repo](https://github.com/19dbo91/social-network-api)
- Unzip it in a preferred location on your PC
- Run *npm install*


## Usage

- Run program with *npm start*
- Inside Insomnia, (or equivalent) create routes like in [this video](https://drive.google.com/file/d/1GlNtL3MRjv16IKvqTSCPv4HMrEhoo-4X/view?usp=sharing)
- All routes start with /api
- Splits to /users or /thoughts  
- GET and POST are root to the models
- GET/PUT/DELETE one ID are on the users/:usersId, likewise for thoughts
- Each User have can start friends list to follow their content under /api/users/:userId/friends/:friendId
- Likewise for thoughts and reactions /api/thoughts/:thoughtId/reactions

## License

[MIT License](https://choosealicense.com/licenses/mit/)

## Questions

Contact me through the links below
- Github: [19dbo91](https://github.com/19dbo91)
- Email: [bonilla.dustin+github@gmail.com](mailto:bonilla.dustin+github@gmail.com)
