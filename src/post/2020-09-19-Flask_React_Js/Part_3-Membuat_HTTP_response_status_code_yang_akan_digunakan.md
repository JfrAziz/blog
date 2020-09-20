---
slug: "membuat-HTTP-response-status-code-yang-akan-digunakan"
date: '2020-09-14'
title: 'Flask + React JS Part 3 : HTTP response status code'
category: "Flask_React"
excerpt: 'Menyiapkan standar HTTP response code yang akan digunakan oleh controller sebagai response dari rest api'
tumbnail: tumbnail3.png
---

Dalam membuat REST API, HTTP response status code sangat diperlukan, agar API client dapat mudah mengetahui response yang diberikan dari servernya. HTTP response status code yang standard ada banyak, lengkapnya anda bisa baca [disini](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). Secara singkatnya seperti ini, 

- Informastional Responses (`100` - `199`)
- Successful Responses (`200` - `299`)
- Redirects (`300`- `399`)
- Client errors (`400`–`499`)
- Server errors (`500`–`599`)

Karena ada banyak, maka kita akan mengambil beberapa yaitu

|Name                 |Status Code|Keterangan                                                                |
|---------------------|-----------|--------------------------------------------------------------------------|
|OK                   |200        |Ketika response berhasil diterima                                         |
|CREATED              |201        |Ketika data berhasil ditambahkan ke database                              |
|NO CONTENT           |204        |Ketika menghapus namun data yang sudah dihapus tidak ada                  |
|BAD REQUEST          |400        |Ketika data yang dikirimkan salah atau tidak sesuai                       |
|UNAUTHORIZED         |401        |Ketika user tidak bisa di autentikasi dan tidak memiliki hak akses ke data|
|NOT FOUND            |404        |Ketika data yang diminta tidak ada                                        |
|METHO NOT ALLOWED    |405        |Ketika API Client salah menggunakan method untuk mengakses API            |
|INTERNAL SERVER ERROR|500        |Ketika ada error yang terjadi di server                                   |


Lalu kita buat sebuah file `response.py` di folder `app` dan isikan kode berikut.

```python
from flask import jsonify, make_response

def res(data, message, responseCode):
    resource =  {
        'msg': message,
        'data': data
    }

    return make_response(jsonify(resource)), responseCode

# Successful responses
def OK(data, message):
    return res(data,message,200)

def CREATED(data, message):
    return res(data,message,201)

def NO_CONTENT(data, message):
    return res(data,message,204)

# Client error responses
def BAD_REQUEST(data, message):
    return res(data,message,400)

def UNAUTHORIZED(data, message):
    return res(data,message,401)

def NOT_FOUND(data, message):
    return res(data,message,404)

def METHOD_NOT_ALLOWED(data, message):
    return res(data,message,405)

# Server error responses
def INTERNAL_SERVER_ERROR(data, message):
    return res(data,message,500)
```

Disini kita sekaligus membuat standar response yang akan dikirim, yaitu berbentuk JSON dan semua data akan ditampilkan di atribut `data` dan `msg` untuk membuat pesan/catatatan dari response yang dihasilkan. Semua fungsi disitu akan kita gunakan di controller, sehingga response yang diberikan akan seragam. Jadi pada tutorial kali ini, kita tidak menggunakannya dulu. 

Setelah membuat `response.py` kita import di file `__init__.py` di folder `app`

```python
...
from app import response
from app.model import Notes, Users
```

Tutorial akan dilanjutkan di part selanjutnya yaitu membuat endpoint dan controllernya dan mengaplikasikan HTTP response code yang kita buat tadi. Sekian!