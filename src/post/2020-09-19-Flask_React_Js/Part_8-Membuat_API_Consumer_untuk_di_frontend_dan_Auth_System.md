---
slug: "membuat-API-consumer-untuk-di-frontend-dan-Auth-System"
date: '2020-09-19'
title: 'Flask + React JS Part 8 : API Consumer untuk di frontend dan Auth System'
category: "Flask_React"
excerpt: 'Membuat api consumer untuk mengambil data dari REST API yang sudah dibuat dan membuat AuthContext untuk suth system nya'
tumbnail: tumbnail8.png
---

### ApiConsumer

Kita akan membuat API consumer untuk API yang sudah kita buat. sekarang buat file baru di `src` bernama `ApiConsumer.js`, lalu isikan kode berikut

```jsx
const URL = {
  SIGNUP: "/api/signup",
  LOGIN: "/api/login",
  USERS: "/api/users",
  NOTES: "/api/notes",
};

const storeUserData = (id, access_token, refresh_token) => {
  localStorage.setItem("id", id);
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
};

const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");
const getUserId = () => localStorage.getItem("id");

const handleResponse = (resp) => {
  if (!resp.ok) throw resp;
  return resp.json();
};

const signup = (data) =>
  fetch(URL.SIGNUP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })className="login-wrapper"
    .then(handleResponse)
    .then((json) => {
      const { access_token, refresh_token, users } = json.data;
      storeUserData(users.id, access_token, refresh_token);
      return true;
    });

const login = (data) =>
  fetch(URL.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .then((json) => {
      const { access_token, refresh_token, users } = json.data;
      storeUserData(users.id, access_token, refresh_token);
      return true;
    });

const getUsers = () =>
  fetch(URL.USERS + `/${getUserId()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })
    .then(handleResponse)
    .then((json) => json.data.users);

const getNotes = () =>
  fetch(URL.NOTES, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })
    .then(handleResponse)
    .then((json) => json.data.notes);

const addNotes = (data) =>
  fetch(URL.NOTES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .then((json) => json.data.notes);

const getNotesById = (id) =>
  fetch(URL.NOTES + `/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })
    .then(handleResponse)
    .then((json) => json.data.notes);

const deleteNotesById = (id) =>
  fetch(URL.NOTES + `/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then((resp) => {
    if (!resp.ok) throw resp;
    if (resp.status == 204) return resp;
    return resp.json();
  });

const editNotesById = (id, data) =>
  fetch(URL.NOTES + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .then((json) => json.data.notes);

export { login };
export { signup };
export { getUsers };
export { getNotes };
export { addNotes };
export { editNotesById };
export { deleteNotesById };
export { getNotesById };
export { getAccessToken };
export { getRefreshToken };
export { getUserId };
```

Perhatikan bahwa kita akan menyimpan token yang kita dapat saat register maupun login di `localStorage`. Token yang kita simpan di `localStorage` akan kita gunakan untuk mengonsumsi API yang sudah kita buat. Disini kita menggunakna promise `fetch` dan akan kita gunakan secara `async` pada saat menggunakan API consumer ini. Kita juga melakukan error handling dengan menyeleksi response code yang diberikan, jika response `OK` maka diteruskan, jika response `400` an atau `500` maka akan kita buat menjadi sebuah error.

### Auth System

Untuk membuat auth context, kita akan menggunakan React Context atau useContext. Untuk mengetahui lebih lanjut tentang Context di React JS, anda bisa baca-baca [disini](https://reactjs.org/docs/context.html). Jadi kita akan selalu melakukan pengecekan apakah login atau tidak, kondisi login adalah ketika user masih menyimpan token di `localStorage`. Untuk me-logout, berarti tinggal menghapus localstorage nya. Buat sebuah file `AuthContext.js` di folder `src` .

```jsx
import React, { createContext, useState } from "react";
import { getAccessToken, getRefreshToken, getUserId } from "./ApiConsumer"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(
    getAccessToken() && getRefreshToken() && getUserId() ? true : false
  );

  const logout = () => {
    localStorage.clear();
    setLogin(false);
  };

  return (
    <AuthContext.Provider value={{ logout, isLogin, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
```

Lalu edit bagian `ReactDom.render()` di `index.js` menjadi seperti berikut

```jsx
ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
```