# Project_name

## Introduction

Welcome to react_auto! This project is designed to help you scaffold new code quickly using a custom script.

## Prerequisites

Before you begin, make sure to follow these steps:

1. Ensure that the "auto" file is located beside your project files.
2. Create a `package.json` file beside the "auto" file.
3. Add the following code to the `package.json` scripts file:

"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "init": "yarn install && ts-node init.ts",
  "create-file": "ts-node src/auto/ag.ts"
},

## Getting Started

1. Run the following command to add the initial code for HTTP requests using Axios and easy-to-use input validation:
# yarn run init
This command sets up the initial codebase.

2. To add a new page, run the following command:
# yarn run create --fn FILENAME
This command will automatically generate CRUD functionality, screen files, and types for the new page.
Make sure to replace "FILENAME"  with the actual file name. Adjust the commands according to your project structure and needs.

## Additional Information

For any issues or feature requests, please open an issue.

Contributions are welcome! Feel free to submit a pull request.
