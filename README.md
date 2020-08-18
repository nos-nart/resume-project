---
# Summary
---

## Chuc nang

- Authenticate
- Create cv
- View cv
- ...

## Tech stack

- Express, Mongodb, Passport, JWT, EJS, Jquery, Tailwindcss

## Database


## Design

[Design reference](https://cv.viblo.asia/landing)

## Git flow

\*

## Set up

- Set up VScode

```
Install VScode extension: 'prettier' + 'eslint'
Enable format on save
```

- Clone

```
git clone https://github.com/nos-nart/project-cv.git
```

- Install

```
npm install | yarn
```

- Create .env file in root folder

```
PORT=3000
JWT_SECRET=your_jwt_secret_key
MONGO_URI=mongo_uri
```

- Run

```
npm run dev | yarn dev
```

- Summary of set up
- Configuration
- Dependencies
- Database configuration
- How to run tests
- Deployment instructions

## Roadmap

**Backend**

- [x] Init project
- [x] Config eslint + pretiter + husky
- [ ] Config logger
- [ ] API create Curriculum vitæ
- [ ] API edit Curriculum vitæ
- [ ] Screen login
- [ ] Screen home
- [ ] Screen view cv

## Project structure

    .. structure::
    .
    💾src
    |--📁config
    |   |--📑mongodb-connection.js      // database connection config
    |
    |--📁logs
    |   |--📑logs.txt
    |
    |--📁middleware
    |   |--📑logger.js                  // middleware handling logging api
    |   |--📑auth-guard.js              // middleware check authen
    |
    |--📁modules
    |   |📁users
    |   |📁cv
    |   |   |--📑cv.model.js
    |   |   |--📑cv.controller.js
    |   |   |--📑cv.route.js
    |   |   |--📑cv.rest                // File test REST api
    |--📁utils
    |   |-- ...
    |
    💾public
    |   |--📁images
    |   |--📁css
    |   |--📁js
    |      |📑ajax.js
    💾views
    |---📁partials
    |   |--📑head.ejs
    |   |--📑header.ejs
    |   |--📑footer.ejs
    |   📁pages
    |   |--📑login.ejs
    |   |--📑signup.ejs
    |   |--📑home.ejs
    |   |--📑404.ejs
    |---📑app.js
    📑.env
    📑.env.example
    📑.editorconfig
    📑.eslintrc.yml
    📑.prettierrc.yml
    📑.prettierignore
    📑package.json
    📑README.md
    📑.gitignore
    📑yarn.lock
