## Getting Started

Follow these steps to set up and run the To-Do List project on your local machine.

### 1. Clone the Repository

First, clone the repository from GitHub to your computer:

```sh
git clone https://github.com/Ritishkr78/ToDo.git
```

Then, navigate into the project directory:

```sh
cd ToDo
```

### 2. Install Dependencies

Install all required packages using npm:

```sh
npm install
```

### 3. Start the Development Server

Start the app locally:

```sh
npm run dev
```
or
```sh
npm start
```

The app will usually be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## Testing Guidance

1. **Add tasks** using the input and "Add" button or by pressing Enter.
2. **Mark tasks as complete/incomplete** using the checkbox.
3. **Edit tasks** using the "Edit" button and save changes.
4. **Remove tasks** using the "Remove" button.
5. **Filter tasks** (All, Active, Completed) using the dropdown.
6. **Sort tasks** A-Z or Z-A using the sort button.
7. **Refresh the page** to confirm tasks persist (localStorage).
8. **Check responsiveness** on desktop and mobile.

If all features work as expected, your To-Do List is functioning correctly!

---

## Notes

- Make sure you have [Node.js](https://nodejs.org/) and npm installed.
- If you want to build for production, run:
  ```sh
  npm run build
  ```
- For any issues, check your terminal for errors or open an issue on
