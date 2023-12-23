export const loggingPlugin = {
  requestDidStart(requestContext) {
    if (requestContext.request.operationName === 'IntrospectionQuery') {
      return;
    }

    const { query, variables } = requestContext.request;
    // Log the query and variables.
    console.log('GraphQL Query:', query);
    console.log('GraphQL Variables:', variables);

    return {
      willSendResponse({ response }) {
        console.log('GraphQL request completed with response:', response);
      },

      didEncounterErrors(errors) {
        console.error('GraphQL request encountered errors:', errors.errors);
      },
    };
  },
};
