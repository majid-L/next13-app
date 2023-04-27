# Interactive front-end app with Next.js and Tailwind CSS

Welcome to this Next13 CRUD application! Let's first dive into the main features of this project.

<br></br>
<img src='./public/images/next.svg' width=300>
<br></br>
 
## Key product features

- Mobile-first design.
- Thoroughly implements responsive design principles.
- Utility-based styling with Tailwind CSS.
- Interactive UI provides the user with feedback regarding loading, confirmation and error states.
- Leverages back-end authentication and authorization features through request headers, allowing users to sign up and log in.
- Implements dynamic filtering and pagination with multiple active queries.
- Includes a calendar that highlights active dates and allows users to filter results by day/month.
- Uses extensive data fetching and customised error handling via promises.
- Uses context APIs within Next13's client components to enable access to centralised states.
- Uses several new features realeased in Next 13 such as the App router (a file-based routing system) and custom loading/404/error pages.
- Uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load a custom Google Font.
<br></br>

## Running the project in your local environment.

First, ensure that you have the latest versions of Node.js and npm (or yarn/pnpm) installed on your local machine.

1) Fork and clone the repository.
2) cd into the repository and install project dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3) Run this command to start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4) Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
5) You can edit the application by modifying any of the functional components located in ./app and the webpage auto-updates as you edit the file.

## Main libraries used for this project
Library | Purpose
--- | ---
Next | React framework
Bing Maps - React | Based on Microsoft's Bing Maps V8 Web Control
Tailwind CSS | Styling
React-Calendar | Date visualisation and filtering
Axios | API requests


## Screeenshots
The exams page contains a map which shows a live view of exams which can be filtered and paginated. Hovering over each pin on the map reveals an infobox with the name of the candidate and the exam, as well as links to the exam page and the rest of that candidate's exams.

<sub><sup>(Never mind that some of those exams are taking place right in the middle of an ocean - the longitude/latitude data was generated automatically!)

<img src='./public/images/map.png' width=500>
<br></br>

Mobile view:
<img src='./public/images/full-view.png' width=350>

