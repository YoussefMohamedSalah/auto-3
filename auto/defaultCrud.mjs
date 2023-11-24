const returnCruds = (fileName) => {
    let formatedName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    // create 
    let cruds = [{
        name: `create${formatedName}.ts`,
        content: `import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { ${formatedName} } from "types/${formatedName}";
import http from "utils/http";

export const useCreate${formatedName} = () => {
    return useMutation<any, Error, any>(async createInput => {
    const { data } = await http.post(Endpoints.${fileName.toUpperCase()}, createInput);
    return { ${fileName}: { data: data as any } };
    });
};

export const create${formatedName}Input = (data: ${formatedName}): any => {
    return {
    }
};`
    },
    {
        name: `update${formatedName}.ts`,
        content: `import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { ${formatedName} } from "types/${formatedName}";
import http from "utils/http";

export const useUpdate${formatedName} = () => {
    return useMutation<any, Error, any>(async createInput => {
    const { data } = await http.put(Endpoints.${fileName.toUpperCase()}, createInput);
    return { ${fileName}: { data: data as any } };
    });
};

export const update${formatedName}Input = (data: ${formatedName}): any => {
    return {
    }
};`
    },
    {
        name: `delete${formatedName}.ts`,
        content: `import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import http from "utils/http";

export const useDelete${formatedName} = () => {
    return useMutation<any, Error, {id:string}>(async createInput => {
    const { id } = createInput;
    const { data } = await http.delete(Endpoints.${fileName.toUpperCase()} + '/' + id);
    return { ${fileName}: { data: data as any } };
    });
};

export const delete${formatedName}Input = (data: {id:string}): any => {
    return {
        id: data.id
    }
};`
    },
    {
        name: `getSingle${formatedName}.ts`,
        content: `import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import http from "utils/http";

export const useGetSingle${formatedName} = () => {
    return useMutation<any, Error, {id:string}>(async createInput => {
    const { id } = createInput;
    const { data } = await http.get(Endpoints.${fileName.toUpperCase()} + '/' + id);
    return { ${fileName}: { data: data as any } };
    });
};

export const getSingle${formatedName}Input = (data: {id:string}): any => {
    return {
        id: data.id
    }
};`
    },
    {
        name: `getAll${formatedName}s.ts`,
        content: `import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import http from "utils/http";

export const useGetAll${formatedName}s = () => {
    return useMutation<any, Error, {}>(async createInput => {
    const { data } = await http.get(Endpoints.${fileName.toUpperCase()});
    return { ${fileName}s: { data: data as any } };
    });
};`
    }];
    return cruds;
}

export default returnCruds;