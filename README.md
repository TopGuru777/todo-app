# To-Do App

A simple to-do application built with React and Redux, featuring task management and drag-and-drop functionality.

## Features

- Add new tasks with a title, description, and due date.
- Edit and delete tasks.
- Filter tasks by status.
- Search tasks by title.
- Drag-and-drop to reorder tasks.

## Setup Instructions

### Prerequisites

- Node.js (version 14 or above)
- npm or Yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/topguru777/todo-app.git
   cd todo-app
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

### Running the App

1. **Start the development server:**

   Using npm:

   ```bash
   npm run dev
   ```

   Or using Yarn:

   ```bash
   yarn dev
   ```

2. **Open the app in your browser:**

   Navigate to `http://localhost:5173` in your web browser.

### Running Tests

To run the tests, use the following command:

Using npm:

```bash
npm test
```

Or using Yarn:

```bash
yarn test
```

### Building for Production

To create a production build, run:

Using npm:

```bash
npm run build
```

Or using Yarn:

```bash
yarn build
```

The optimized build will be in the `build` folder.

## Technologies Used

- **React**: For building the user interface in a component-based structure.
- **Redux**: To manage the global state of tasks across the application.
- **React Beautiful DnD**: (or @hello-pangea/dnd) for implementing drag-and-drop functionality.
- **React Testing Library**: For testing components to ensure they render and behave correctly.
- **Jest**: Used alongside React Testing Library for running tests and snapshot testing.

## Key Architectural Decisions

- **Component-Based Architecture**: Utilized React components to create reusable UI elements.
- **State Management with Redux**: Chose Redux for its ability to manage complex state across the app, making it easier to handle task actions like add, edit, and delete.
- **Drag-and-Drop**: Implemented using React Beautiful DnD for intuitive task reordering.
- **Testing**: Employed React Testing Library and Jest to ensure UI consistency and functionality with automated tests.

## Notes

- Ensure you have the necessary Node.js version installed.
- Update snapshots in tests by running `npm test -- -u` if the UI changes intentionally.
- Mock store is used for testing purposes, adjust the Redux middleware setup as needed for additional features.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.
