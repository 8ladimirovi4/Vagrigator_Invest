# Vagrigator

Introducing Vagrigator – Your Universal Investment Dashboard

Vagrigator is an all-in-one investment application designed to consolidate and manage your entire asset portfolio in one place. Whether it’s stock market assets, real estate, luxury vehicles, or other high-value investments – Vagrigator keeps everything organized and accessible.

Seamlessly integrated with T-Bank's brokerage platform, Vagrigator provides real-time updates on your investment portfolio, offering clear insights into your financial standing.

Planned integrations include major real estate platforms for buying, selling, and renting both residential and commercial properties, further expanding Vagrigator’s capabilities as the ultimate tool for modern investors.


## 🔧 Tech Stack

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-000000?style=for-the-badge&logo=netlify&logoColor=00C7B7)

## Key Features

- 🔐 **Authentication** — User registration and login with secure authentication (PostgreSQL).
- 📊 **Dashboard Overview** — real-time visualization of the user's asset statistics.
- ➕ **Asset Management** — ability to add and edit investment assets, including real estate, vehicles, and market instruments.
- 📰 **News Feed** — built-in page with up-to-date news from the world of finance and investments.
- 👤 **User Accounts** — user registration and authentication with personalized dashboard access.
- 🔄 **Real-time Portfolio Sync** — integration with T-Bank broker to display the current state of the investment portfolio.


🔧 Technical Stack

React 18+

Javascript

Node.js

PostgraSQL

Webpack

Deployed via Netlify

1. Clone the repo

```sh
  git clone https://github.com/8ladimirovi4/Vagrigator_Invest.git
```

2. Go to backend directory from the root

```sh
  cd backend
```

3. Create .env file and fill jwt token. (You can look at .env.example file in the root directory)

4. Create jwt tocken T-Bank (https://www.tbank.ru/invest/settings/api/)

5. Install packages

```sh
  npm install
```

6. Install PostgreSQL version 14 or higher and create database and user.   
Set user_name and password to .env file (You can look at .env.example file in the root directory)  
Create new DB

```sh
  npm run dbr
```

7. Run server

```sh
  npm start
```

8. Go to frontend directory from the root

```sh
  cd frontend
```

9. Install packages

```sh
  npm install
```

10. Run server

```sh
  npm start
```

## Provided scripts

```sh
npm run build
```

Build project in production mode for further deployment

```sh
npm run test
```
Run tests

## 🔐 Test Login Credentials

You can use the following credentials to log in:

**Email:** `treider@snp.com`  
**Password:** `123456789`

or register a new user

## 🎓 Educational Purpose

This project was developed as part of an educational program.  
You can view the original repository with all contributors' commits here:  
[https://github.com/SAMorozov22/Vagrigator](https://github.com/SAMorozov22/Vagrigator)

### Happy coding!
