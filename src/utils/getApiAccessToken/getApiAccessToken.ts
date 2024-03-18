const getApiAccessToken = async (email: string, password: string): Promise<string | null> => {
  const identification = {
    email,
    password,
  };

  try {
    const response = await fetch("https://client.api.dev.tracktor.fr/v2/auth/credentials", {
      body: JSON.stringify(identification),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const responseData = await response.json();
    return responseData.accessToken;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

export default getApiAccessToken;
