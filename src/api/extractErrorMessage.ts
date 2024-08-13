export const extractErrorMessage = async (error: any): Promise<string> => {
    if (error.response) {
      try {
        const responseBody = await error.response.json();
        return JSON.stringify(responseBody); 
      } catch (jsonError) {
        return error.message; 
      }
    } else {
      return error.message;
    }
};