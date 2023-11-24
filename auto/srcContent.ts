export type srcContentType = {
  name: string;
  type: string;
  subFolders?: string[];
  subFiles?: Array<{ name: string, content: string }>;
  content?: string;
}

export const srcContent: srcContentType[] = [
  { name: 'assets', type: 'folder', subFolders: ['images', 'fonts', 'styling'], subFiles: [] },
  { name: 'components', type: 'folder', subFolders: ['UI', 'Pages', 'Common', 'Data'], subFiles: [] },
  {
    name: 'types', type: 'folder', subFolders: [], subFiles: [{
      name: 'ErrorType.ts', content: `export interface InputsValidationType {
  requiredToValidate?: string[];
  numbersToValidate?: string[];
  stringsToValidate?: string[];
  inputs?: { [key: string]: number | string | undefined } | any;
}

export interface ErrorType {
  type: any;
  index: number;
  msg: string;
}`
    }]
  },
  { name: 'hooks', type: 'folder', subFolders: [], subFiles: [] },
  {
    name: 'enums', type: 'folder', subFolders: [], subFiles: [
      { name: 'endpoints.ts', content: `export enum Endpoints {}` },
      { name: 'pages.ts', content: `export enum Pages {}` },
      { name: 'enums.ts', content: `export enum enums {}` },
    ]
  },
  {
    name: 'contexts', type: 'folder', subFolders: [], subFiles: [{
      name: 'ActionStateContext.tsx', content: `import { createContext, useContext, useState } from "react";
import { ErrorType } from "types/ErrorType";

interface ActionStateContextValue {
  showError: (error: any) => void; 
  hideError: (index: number) => void;
  isShowError: boolean;
  isShowSuccess: boolean;
  errorsList: ErrorType[];
  showSuccess: () => void;
  hideSuccess: () => void;
}

export const ActionStateContext = createContext<ActionStateContextValue>({
  showError: () => {},
  hideError: () => {},
  isShowError: false,
  isShowSuccess: false,
  errorsList: [],
  showSuccess: () => {},
  hideSuccess: () => {},
});

export function useActionState() {
  return useContext(ActionStateContext);
}

interface Props {
  children: React.ReactNode;
}
export const ActionStateProvider: React.FC<Props> = ({ children }) => {
  const [errorsList, setErrorsList] = useState<ErrorType[]>([]);
  const [isShowSuccess, setIsShowSuccess] = useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);

  const showSuccess = () => {
    setIsShowSuccess(true);
    setErrorsList([]);
    setIsShowError(false);

    setTimeout(() => {
      setIsShowSuccess(false);
    }, 6300);
  };

  const hideSuccess = () => {
    setIsShowSuccess(false)
  };

  const showError = (errors: ErrorType[]) => {
    if (
      typeof errors !== "string" ||
      typeof errors !== "number" ||
      typeof errors !== "object"
    )
      if (errors && errors.length > 0) {
        setErrorsList(errors);
        setIsShowError(true);
      }
  };

  const hideError = (index: number) => {
    let newErrorsArray = errorsList?.filter(error => error.index !== index);
    setErrorsList(newErrorsArray);
    if (errorsList?.length === 0) setIsShowError(false);
  };

  return (
    <ActionStateContext.Provider value={{ errorsList, showError, hideError, isShowError, isShowSuccess, showSuccess, hideSuccess }}>
      {children}
    </ActionStateContext.Provider>
  );
};
    `
    }]
  },
  {
    name: 'utils', type: 'folder', subFolders: [], subFiles: [
      {
        name: 'http.ts', content: `import axios from "axios";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    const token: string | null = localStorage.getItem("access_token");
    if (token) {
      // @ts-expect-error
      config.headers = {
        ...config.headers,
        Authorization: 'Bearer  ' + token,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;`},
      {
        name: 'inputsValidator.ts', content: `import { ErrorType, InputsValidationType } from "types/ErrorType";

// PUBLIC
export const validateInputs = (validationData: InputsValidationType): ErrorType[] => {
  const { requiredToValidate, numbersToValidate, stringsToValidate, inputs } = validationData;
  const errorsArray: ErrorType[] = [];
  const error: ErrorType = {
    index: Math.random(),
    type: 'Missing Required Data!',
    msg: 'Kindly Add All Required Inputs with (*) flag.'
  };

  // STEP 1 - Check if inputs object is valid.
  if (!inputs || isObjEmpty(inputs)) return [error]

  // STEP 2 - Check if all required Inputs exists.
  if (requiredToValidate && requiredToValidate.length > 0) {
    if (isMissing({ requiredToValidate, inputs })) {
      return [error]
    };
  }

  // STEP 3 - Check if all Numbers Is In Numbers Format.
  if (numbersToValidate && numbersToValidate.length > 0) {
    let validationErrors = validateNumberInputs({ numbersToValidate, inputs });
    if (validationErrors && validationErrors.length > 0) errorsArray.push(...validationErrors);
  };

  // STEP 4 - Check if all Strings Is In string Format.
  if (stringsToValidate && stringsToValidate.length > 0) {
    let validationErrors = validateStringInputs({ stringsToValidate, inputs })
    if (validationErrors && validationErrors.length > 0) errorsArray.push(...validationErrors);
  };

  return errorsArray;
};

export const handleServerError = (serverError: any): ErrorType[] => {
  if (serverError && serverError.data && serverError.data.msg) {

    const error: ErrorType = {
      index: Math.random(),
      type: 'Internal Server Error!',
      msg: serverError.data?.msg!
    };

    if (serverError.status === 401) error.type = 'Invalid Inputs';
    console.log('SERVER ERROR!', serverError);
    return [error];
  } else return [];
};

// PRIVATE.
// Return True If Item Is Missing
const isMissing = (validationData: InputsValidationType): boolean => {
  const { requiredToValidate, inputs } = validationData;
  let missingInputs: string[] | undefined = [];

  missingInputs = requiredToValidate?.filter(
    (key: any) => inputs[key] === undefined || inputs[key] === ''
  );

  console.log({ missingInputs })

  return missingInputs?.length! > 0 || false;
};

const validateNumberInputs = (validationData: InputsValidationType): ErrorType[] => {
  const { numbersToValidate, inputs } = validationData;
  const errorsArray: ErrorType[] = [];
  const error: ErrorType = {
    index: Math.random(),
    type: 'Invalid Number!',
    msg: 'Check Input Types Please.'
  };

  for (const key in inputs) {
    if (numbersToValidate?.includes(key)) {
      let selectedNumber = Number(inputs[key]);
      if (isNaN(selectedNumber)) {
        const errorToReturn = { ...error };
        errorToReturn.index = Math.random();
        errorToReturn.type = 'Invalid Input Type!';
        errorToReturn.msg = key + ' Must Be A Number';
        errorsArray.push(errorToReturn);
      }
    }
  }
  return errorsArray;
};

const validateStringInputs = (validationData: InputsValidationType): ErrorType[] => {
  const { stringsToValidate, inputs } = validationData;
  const errorsArray: ErrorType[] = [];
  const error: ErrorType = {
    index: Math.random(),
    type: 'Invalid Text Type!',
    msg: 'Check Input Types Please.'
  };

  for (const key in inputs) {
    if (stringsToValidate?.includes(key)) {
      if (isNumber(inputs[key])) {
        const errorToReturn = { ...error };
        errorToReturn.index = Math.random();
        errorToReturn.type = 'Invalid Input Type!';
        errorToReturn.msg = key + ' Must Be A Text Type';
        errorsArray.push(errorToReturn);
      }
    }
  }

  return errorsArray;
};

const isObjEmpty = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length === 0;
}
const isNumber = (val: any) => {
  return !isNaN(parseFloat(val)) && !isNaN(val - 0);
};
`
      }
    ]
  },
  {
    name: 'screens', type: 'folder', subFolders: [], subFiles: [
      {
        name: 'SessionLayout.tsx', content: `import React from 'react'

const SessionLayout = () => {
  return (
    <div>
      
    </div>
  )
}

export default SessionLayout
    `}]
  },
  { name: 'framework', type: 'folder', subFolders: [], subFiles: [] },
  {
    name: 'index.tsx', type: 'file', content: `import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <Router>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </Router>
  </StrictMode>
);`},
  {
    name: 'App.tsx', type: 'file', content: `import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense, lazy } from "react";
import { ActionStateProvider } from "contexts/ActionStateContext";

const SessionLayout = lazy(() => import("./screens/SessionLayout"));
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <ActionStateProvider>
      <div>
        <Suspense fallback={null}>
          <SessionLayout />
        </Suspense>
      </div>
      </ActionStateProvider>
    </QueryClientProvider>
  );
};

export default App;`},
]