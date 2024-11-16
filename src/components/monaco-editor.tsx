"use client"
import React from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';

const JsonEditor = ({jsonSchema,boilerplate}:{
  jsonSchema:object,
  boilerplate?:object
}) => {
  const monaco = useMonaco();

  React.useEffect(() => {
    if (monaco) {
      // Example JSON schema
      

      // Registering the schema with Monaco's JSON language service
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: 'http://my-schema.json', // A unique URI for the schema
            fileMatch: ['*'], // Match any file; adjust as needed for your use case
            schema: jsonSchema,
          },
        ],
      });
    }
  }, [monaco,jsonSchema]);

  return (
    <div style={{ height: '80vh' }}>
      <Editor
        height="100%"
        defaultLanguage="json"
        defaultValue={JSON.stringify(boilerplate || {}, null, 2)}
        theme="vs-dark"
      />
    </div>
  );
};

export default JsonEditor;
