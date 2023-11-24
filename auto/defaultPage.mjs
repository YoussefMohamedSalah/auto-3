const returnPage = fileName => {
  let formatedName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
  // create
  let page = {
    name: `${formatedName}.tsx`,
    content: `import React, { lazy, useState } from "react";
import { useGetAll${formatedName}s } from "framework/${fileName}/getAll${formatedName}s";
import { useDelete${formatedName} } from "framework/${fileName}/delete${formatedName}";
import { create${formatedName}Input, useCreate${formatedName} } from "framework/${fileName}/create${formatedName}";
import { update${formatedName}Input, useUpdate${formatedName} } from "framework/${fileName}/update${formatedName}";
import {  ${formatedName}, Selected${formatedName}, ${formatedName}NumKeys, ${formatedName}RequiredKeys, ${formatedName}StrKeys } from "types/${formatedName}";

import { ErrorType, InputsValidationType } from "types/ErrorType";
import { handleServerError, validateInputs } from "utils/inputsValidator";
import { useActionState } from "contexts/ActionStateContext";

// const example = lazy(() => import("../../components/example"));

interface Props {};

interface State {
  moduleData: ${formatedName};
  selectedModule: Selected${formatedName};
}

const INITIAlIZE_DATA: State = {
  moduleData: {} as ${formatedName},
  selectedModule: {} as Selected${formatedName}
};

const ${formatedName}s: React.FC<Props> = () => {
  const [state, setState] = useState<State>(INITIAlIZE_DATA);
  const { moduleData, selectedModule } = state;

  const { mutateAsync: create${formatedName}Mutation } = useCreate${formatedName}();
  const { mutateAsync: update${formatedName}Mutation } = useUpdate${formatedName}();
  const { mutateAsync: delete${formatedName}Mutation } = useDelete${formatedName}();
  const { showError, showSuccess } = useActionState();

  // ----*---- Fetching Data ----*----
  const {
    data,
    error,
    isLoading,
  } = useGetAll${formatedName}s();
  // ----*---- Fetching Data ----*----

  if (isLoading) return <>loading...</>;
  if (error) return null;
  let ${fileName}s: ${formatedName}[] = data?.${fileName}s?.data! || [];

  const handleModelData = (key: string, value: any) => {
    setState({
      ...state,
      moduleData: {
        ...moduleData,
        [key]: value,
      },
    });
  };

  const handleCreate = async () => {
    let numbersToValidate = ${formatedName}NumKeys;
    let stringsToValidate = ${formatedName}StrKeys;
    let requiredToValidate = ${formatedName}RequiredKeys;

    const validationData: InputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: moduleData
    };

    let errors = validateInputs(validationData)
    if (errors.length > 0) return showError(errors);

    try {
      let createInput = create${formatedName}Input(moduleData);
      await create${formatedName}Mutation(createInput);
      showSuccess();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleUpdate = async () => {
    let numbersToValidate = ${formatedName}NumKeys;
    let stringsToValidate = ${formatedName}StrKeys;
    let requiredToValidate: string[] = [];

    const validationData: InputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: selectedModule
    };

    let errors: ErrorType[] = validateInputs(validationData)
    if (errors.length > 0) return showError(errors);

    try {
      let updateInput = update${formatedName}Input(selectedModule);
      await update${formatedName}Mutation({
        id: selectedModule.id,
        data: updateInput,
      });
      showSuccess();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleDelete = async () => {
    try {
      await delete${formatedName}Mutation({ id: selectedModule.id });
      showSuccess();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };


  return (
    <div>
        ${formatedName}s
    </div>
  );
};

export default ${formatedName}s;`
  };
  return page;
};

export default returnPage;
