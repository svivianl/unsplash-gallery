import axios from "axios";

const parseError = (parameters) => {
  const messages = parameters.messages;
  // error
  if (messages) {
    if (messages instanceof Array) {
      return messages;
    }
    return messages;
  }
  return parameters;
};

const getError = (error) => {
  if (error.response) {
    // Request made and server responded
    return parseError(error.response.data);
  }

  if (error.request) {
    // The request was made but no response was received
    return "Server is down. Please contact the admin.";
  }

  // Something happened in setting up the request that triggered an Error
  return error;
};

export const apiUrl = (path) => {
  return `${process.env.REACT_APP_SERVER_API}${path}`;
};

export const getPhotos = async (query, page, orientation) => {
  const path = query
    ? `/photos?page=${page}&query=${query}`
    : `/photos?page=${page}&count=10`;
  const url = orientation ? `${path}&orientation=${orientation}` : path;

  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl(url))
      .then((response) => {
        if (
          (response.status === 200 && !response) ||
          (response && response.data.total === 0)
        ) {
          return reject("No images found");
        }

        return resolve(response.data);
      })
      .catch((error) => reject(getError(error)));
  });
};

export const getPhotoDetails = async (photoId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl(`/photos/${photoId}`))
      .then((response) => {
        if (
          (response.status === 200 && !response) ||
          (response && response.data.total === 0)
        ) {
          return reject("Image detail found");
        }

        return resolve(response.data);
      })
      .catch((error) => reject(getError(error)));
  });
};
