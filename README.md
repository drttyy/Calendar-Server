# Project Name

<br>

## Description

This application is for people/companies to organize their schedules and schedule meetings or services, thus having a personal and professional agenda in the same application.

## User Stories

- **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
- **Signup:** As an anonymous user I can sign up on the platform so that I can start managing my agenda, scheduling meetings or services that I want use to be able to organized to myself.
- **Login:** As a user I can login to the platform so that I can start managing my agenda, scheduling meetings or services that I want use to be able to organized to myself.
- **Logout:** As a logged in user I can logout from the platform so no one else can use it and acess my agenda .
- **Profile Page**: As a logged in user I can visit my profile page so that I can access my agenda and see what I have schedule for that week or month
- **Create:** As a logged in user I can create some appointments or meetings.
- **Edit :** As a logged in user I can edit the appointments that I have scheduled
- **Cancel :** As a logged in user I can cancel the mettings that I have scheduled.
- **Create a company :** As a user, I can create my own company or professional calendar so that my clients can schedule a time to have my service.
- **Create a appointment :** As a user, I can create my appointments on my agenda to be able to organize myself during the day/week/month
- **See the available times:** As a user I want to see the available time the person/company has to schedule a time with her
- **Search results:** As a user I can search for a specific type of service I wanna use.

<!-- ## Backlog

- Add weather widget
- lottie interactions
- users can bet
- add geolocation to events when creating
 -->
<br>

# Client / Frontend

## React Router Routes (React App)

| Path                  | Component             | Permissions                | Behavior                                                              |
| --------------------- | --------------------- | -------------------------- | --------------------------------------------------------------------- |
| `/login`              | LoginPage             | anon only `<AnonRoute>`    | Login form, navigates to home page after login.                       |
| `/signup`             | SignupPage            | anon only `<AnonRoute>`    | Signup form, navigates to home page after signup.                     |
| `/`                   | HomePage              | public `<Route>`           | Home page.                                                            |
| `/user-profile`       | ProfilePage           | user only `<PrivateRoute>` | User profile for the current user.                                    |
| `/user-profile/edit`  | EditProfilePage       | user only `<PrivateRoute>` | Edit user profile form.                                               |
| `/agenda/add`         | CreateAppointmentPage | user only `<PrivateRoute>` | Create new appointment                                                |
| `/agenda/edit`        | EditAppointmentPage   | user only `<PrivateRoute>` | Edit an appointment                                                   |
| `/company/create`     | CreateCompanyPage     | user only `<PrivateRoute>` | Create you own Company/Service                                        |
| `/company/edit`       | EditCompanyPage       | user only `<PrivateRoute>` | Edit the details of your own Company/Service                          |
| `/company`            | CompanyListPage       | user only `<PrivateRoute>` | Companies/Services list.                                              |
| `/company/:companyId` | CompanyDetailPage     | user only `<PrivateRoute>` | Companies / Services details. Shows the establishment available times |

## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage

- CreateAppointmentPage

- CreateCompanyPage

- EditCompanyPage

- CompanyListPage

- CompanyDetailsPage

Components:

- ProfileCard
- CompanyCard
- Navbar

## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :

    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

  - `companyService` :
    - `.updateCurrentCompany(id, companyData)`
    - `.getCompany()`

- **Appointment Service**

  - `AppointmentService` :
    - `.addAppointment(serviceData)`
    - `.getAppointment()`
    - `.getOneAppointment(id)`
    - `.deleteAppointment(id)`

<br>

# Server / Backend

## Models

**User model**

```javascript
{
  name: {type : String, required: true}
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phonenumber: {type: Number},
  createdCompany: [ { type: Schema.Types.ObjectId, ref:'Company' } ],
  createdAppointment: [ { type: Schema.Types.ObjectId, ref:'Appointment' } ],
}
```

**Appointment model**

```javascript
 {
   title: { type: String, required: true },
   description: {type : String},
   date : { type : Date},
 }
```

**Company model**

```javascript
 {
   name: { type: String, required: true },
   img: { type: String } ,
   user: [ { type: Schema.Types.ObjectId, ref:'User' } ],
   createdAppointment: [ { type: Schema.Types.ObjectId, ref:'Appointment' } ],
   date: { type: Date},
 }
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                     | Request Body                                                                         | Success status | Error Status | Description                                                                                                                     |
| ----------- | ----------------------- | ------------------------------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/profile `        | Saved session                                                                        | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`          | {name, email, password,phonenumber}                                                  | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`           | {email, password}                                                                    | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`          |                                                                                      | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `api/company`           |                                                                                      |                | 400          | Show all companies/services                                                                                                     |
| GET         | `api/company/:id`       |                                                                                      |                |              | Show specific company                                                                                                           |
| POST        | `api/company/create`    | { name, img, user, appointment, openingDate, closingDate, openingHour, closingHour } | 201            | 400          | Create and save a new company                                                                                                   |
| PUT         | `api/company/:id`       | {name, img, user, appointment, openingDate, closingDate, openingHour, closingHour }  | 200            | 400          | edit company                                                                                                                    |
| DELETE      | `api/company/:id`       |                                                                                      | 201            | 400          | delete company                                                                                                                  |
| GET         | `/api/appointment/:id`  |                                                                                      |                |              | show specific appointment                                                                                                       |
| POST        | `/api/appointments`     | { name, description, date}                                                           | 200            | 404          | add appointment                                                                                                                 |
| PUT         | `/api/appointments/:id` | { name, description, date }                                                          | 201            | 400          | edit appointment                                                                                                                |
| DELETE      | `/api/appointments/:id` |                                                                                      | 200            | 400          | delete appointment                                                                                                              |

<br>

## API's

<br>

## Packages

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or a picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your _public_ presentation slides

### Contributors

Duarte Alves - drttyy - https://www.linkedin.com/in/duartelmfalves/
