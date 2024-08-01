const accessToken = localStorage.getItem("accessToken");

export const getUser = async (setUser) => {
  if (accessToken) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseData = await response.json();
    setUser(responseData);
  } else {
    setUser(null);
  }
};
