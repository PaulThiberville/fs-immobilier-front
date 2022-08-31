export const customFetch = async ({ route, verb, data, token }) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  //const baseUrl = "http://localhost:5000";
  let output = { status: "", data: {} };
  try {
    const options = {
      method: verb || "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    if (token) options.headers.Authorization = "Bearer " + token;
    if (data) options.body = JSON.stringify(data);
    const response = await fetch(baseUrl + route, options);
    output = { status: response.status, data: await response.json() };

    if (output.data.error) throw new Error(output.data.error);

    return output;
  } catch (error) {
    alert("Error on custom fetch : " + (error.message || "unknown error"));
    return output;
  }
};
