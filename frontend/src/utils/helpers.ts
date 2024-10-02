import { UseFormClearErrors, UseFormSetError } from "react-hook-form";
import { linksResourceFormSchema } from "./schema";
import { LinkResourceFormFields } from "./types";
import { MutableRefObject, SetStateAction } from "react";
import { landingCarouselImages } from "./constants";

export const maxWords = (value: string | undefined, max: number) => {
  if (!value) return true;
  const wordCount = value.trim().split(/\s+/).length;
  return wordCount <= max;
};

export const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  inputType: "links",
  inputValue: string,
  watchValue: { url: string; description: string }[],
  setValue: (value: any) => void,
  setInputValue: (value: string) => void,
  setError: UseFormSetError<LinkResourceFormFields>,
  clearErrors: UseFormClearErrors<LinkResourceFormFields>
) => {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault();
    const newValues = inputValue
      .split(",")
      .map((link) => link.trim())
      .filter((link) => link);

    const newLinkObjects = newValues.map((url) => ({ url }));

    const validation = linksResourceFormSchema.shape[inputType].safeParse([
      ...watchValue,
      ...newLinkObjects,
    ]);

    if (!validation.success) {
      validation.error.errors.forEach((issue) => {
        setError(inputType, { type: "manual", message: issue.message });
      });
    } else {
      clearErrors(inputType);
      setValue(validation.data);
      setInputValue("");
    }
  }
};

export const focusAndClearSearch = (
  searchInputRef: MutableRefObject<HTMLInputElement | null>,
  setSearchQuery: React.Dispatch<SetStateAction<string>>
) => {
  if (searchInputRef.current) {
    searchInputRef.current.focus();
    setSearchQuery("");
  }
};

export const addHttpPrefix = (url: string) => {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};

export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const randomCarouselSet1 = landingCarouselImages
  .sort(() => Math.random() - 0.5)
  .concat(landingCarouselImages.sort(() => Math.random() - 0.5))
  .concat(landingCarouselImages.sort(() => Math.random() - 0.5));

export const randomCarouselSet2 = landingCarouselImages
  .sort(() => Math.random() - 0.5)
  .concat(landingCarouselImages.sort(() => Math.random() - 0.5))
  .concat(landingCarouselImages.sort(() => Math.random() - 0.5))
  .sort(() => Math.random() - 0.5);

export const generateFetchCode = (
  url: string,
  method: string,
  body?: string
) => {
  const dataToReturn = {
    data: [
      {
        fileName: "DataFetching.js",
        code: `
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Utility function for caching responses
const cache = new Map();

async function fetchWithCache(url, options = {}) {
  const cacheKey = \`\${url}-\${JSON.stringify(options)}\`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const result = await response.json();
  cache.set(cacheKey, result);
  return result;
}

function DataFetchingComponent() {
  const [data, setData] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // URL and options for fetch request
  const url = '${url}';
  const options = useMemo(() => ({
    method: '${method}',
    headers: { 'Content-Type': 'application/json' },
    ${
      ["POST", "PUT", "PATCH"].includes(method) && body
        ? `body: JSON.stringify(${body}),`
        : ""
    }
  }), [method, body]);

  // Fetch data with caching and aborting
  const fetchData = useCallback(async (signal) => {
    try {
      setLoading(true);
      const result = await fetchWithCache(url, { ...options, signal });
      setData(result);
    } catch (err) {
      if (err.name !== 'AbortError') { // Ignore abort errors
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    const controller = new AbortController(); // Create an abort controller
    fetchData(controller.signal); // Pass signal to fetch

    return () => {
      controller.abort(); // Cleanup: abort fetch on unmount
    };
  }, [fetchData]);

  // Memoize rendering logic
  const renderContent = useMemo(() => {
    if (loading) return <p>Loading...</p>; // Render loading state
    if (error) return <p>Error: {error}</p>; // Render error state
    return (
      <div>
        <h1>Fetched Data</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre> {/* Render fetched data */}
      </div>
    );
  }, [loading, error, data]);

  return renderContent;
}

export default DataFetchingComponent;
    `,
      },
    ],
  };

  return dataToReturn;
};

export const generateAxiosCode = (
  url: string,
  method: string,
  body?: string
) => {
  const dataToReturn = {
    data: [
      {
        fileName: "DataFetching.js",
        code: `
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';

// Utility function for caching responses
const cache = new Map();

async function fetchWithCache(url, options = {}) {
  const cacheKey = \`\${url}-\${JSON.stringify(options)}\`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  const response = await axios(url, options);
  const result = response.data;
  cache.set(cacheKey, result);
  return result;
}

function DataFetchingComponent() {
  const [data, setData] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // URL and options for fetch request
  const url = '${url}';
  const options = useMemo(() => ({
    method: '${method}',
    headers: { 'Content-Type': 'application/json' },
    ${body && ["POST", "PUT", "PATCH"].includes(method) ? `data: ${body},` : ""}
  }), [body, method]);

  // Fetch data with caching and aborting
  const fetchData = useCallback(async (source) => {
    try {
      setLoading(true);
      const result = await fetchWithCache(url, { ...options, cancelToken: source.token });
      setData(result);
    } catch (err) {
      if (!axios.isCancel(err)) { // Ignore axios cancel errors
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    const source = axios.CancelToken.source(); // Create a cancel token source
    fetchData(source); // Pass source to fetch

    return () => {
      source.cancel(); // Cleanup: cancel request on unmount
    };
  }, [fetchData]);

  // Memoize rendering logic
  const renderContent = useMemo(() => {
    if (loading) return <p>Loading...</p>; // Render loading state
    if (error) return <p>Error: {error}</p>; // Render error state
    return (
      <div>
        <h1>Fetched Data</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre> {/* Render fetched data */}
      </div>
    );
  }, [loading, error, data]);

  return renderContent;
}

export default DataFetchingComponent;
  `,
      },
    ],
  };

  return dataToReturn;
};

export const generateRtkQueryCode = (
  url: string,
  method: string,
  body?: string
) => {
  const isGetRequest = method === "GET";
  const isMutation = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
  const requestBody = body ? `body: ${body},` : "";
  const dataToReturn = {
    data: [
      {
        fileName: "apiSlice.js",
        code: `
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Adjust baseUrl as needed
  endpoints: (builder) => ({
    fetchData: ${
      isGetRequest
        ? `builder.query({
            query: () => ({
              url: '${url}',
              method: '${method}',
              headers: { 'Content-Type': 'application/json' },
            }),
          })`
        : `builder.mutation({
            query: (${isMutation && method !== "DELETE" ? body : ""}) => ({
              url: '${url}',
              method: '${method}',
              ${requestBody}
              headers: { 'Content-Type': 'application/json' },
            }),
          })`
    },
    // Define other endpoints as needed
  }),
});

// Export hooks for usage in functional components
export const { ${
          isGetRequest ? "useFetchDataQuery" : "useFetchDataMutation"
        } } = apiSlice;
        `,
      },
      {
        fileName: "store.js",
        code: `
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    // Add the API reducer to your store
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
        `,
      },
      {
        fileName: "DataFetching.jsx",
        code: `
import React from 'react';
import { ${
          isGetRequest ? "useFetchDataQuery" : "useFetchDataMutation"
        } } from './apiSlice';

interface DataFetchingProps {
  url: string;
  method: string;
  body?: any;
}

const DataFetchingComponent: React.FC<DataFetchingProps> = ({ url, method, body }) => {
  const ${
    isGetRequest
      ? "{ data, isError, isLoading }"
      : `[${method.toLowerCase()}Data, { data, isError, isLoading }]`
  } = ${isGetRequest ? `useFetchDataQuery()` : `useFetchDataMutation()`};

  ${
    isMutation
      ? `const handle${method} = async () => {
    try {
      await ${method.toLowerCase()}Data(${method !== "DELETE" ? body : ""});
    } catch (err) {
      console.error(err);
    }
  };`
      : ""
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      ${isMutation ? `<button onClick={handle${method}}>Submit</button>` : ""}
    </div>
  );
};

export default DataFetchingComponent;
        `,
      },
    ],
  };

  return dataToReturn;
};
