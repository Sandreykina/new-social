import { generatePath } from "react-router-dom";

const getPath = (path) => {
    const pushPath = (params = {}) => generatePath(`${path}`, params);

    return { path, pushPath };
}

export const PostsUrl = getPath('/posts/:id');