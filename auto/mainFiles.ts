export const mainFiles: any[] = [
  {
    name: ".env.example",
    content:
      `REACT_APP_API_BASE_URL=http://localhost:8080/api/
REACT_APP_API_WS_BASE_URL=ws://localhost:8080/`
  },
  {
    name: ".env",
    content:
      `REACT_APP_API_BASE_URL=http://localhost:8080/api/
REACT_APP_API_WS_BASE_URL=ws://localhost:8080/`
  },
  {
    name: ".gitIgnore",
    content:
      `# dependencies
/node_modules

# production
/build

# dotenv environment variables file
.env
yarn-debug.log*
yarn-error.log*`
  },
  {
    name: "tsconfig.json",
    content:
      `{
  "compilerOptions": {
  "downlevelIteration": true,
  "target": "es5",
  "lib": [
  "dom",
  "dom.iterable",
  "esnext"
  ],
  "allowJs": true,
  "skipLibCheck": true,
  "esModuleInterop": true,
  "allowSyntheticDefaultImports": true,
  "strict": true,
  "forceConsistentCasingInFileNames": true,
  "noFallthroughCasesInSwitch": true,
  "module": "esnext",
  "moduleResolution": "node",
  "resolveJsonModule": true,
  "isolatedModules": true,
  "noEmit": true,
  "jsx": "react-jsx",
  "baseUrl": "src"
  },
  "include": [
  "src"
  ]
  }`
  },
];
