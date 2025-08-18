export const setLocalService = (access_token, refresh_token) => {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
};

export const getLocalService = () => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    return {
        access_token,
        refresh_token,
    };
};

export const removeLocalService = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return true;
};