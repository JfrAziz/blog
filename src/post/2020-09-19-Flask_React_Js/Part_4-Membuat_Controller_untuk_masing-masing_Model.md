---
slug: "membuat-controller-untuk-masing-masing-model"
date: '2020-09-15'
title: 'Flask + React JS Part 4 : Controller untuk masing-masing Model'
category: "Flask_React"
excerpt: 'Membuat controller dari Model yang sudah dibuat yaitu Users dan Notes yang berisi beberapa proses CRUD untuk masing masing Model'
tumbnail: tumbnail4.png
---

Pada part ini, kita akan membuat controller yang mengatur proses CRUD ke database, mulai dari daftar akun hingga menghapus data notes dari database. Sebelum membuat controller untuk `Users`, kita buat mekanisme hashing untuk password user terlebih dahulu. Kenapa hashing perlu? ya karena kita  harus mengamankan password agak jika hal hal yang tidak diinginkan terjadi, password tidak akan dengan mudah diketahui karena passwordnya sudah dienkripsi. Hashing adalah transformasi satu arah, jadi sulit untuk dilakukan deskripsi. Lalu bagaimana dengan pengecekan password kalo login? ya tingga di  cocokin antara hash password yang diiinput dan hash password yang didatabase. Sekarang, kita buat dulu mekanismenya. Sekarang buka Model Users di `Users.py` lalu tambahkan method berikut di dalam class `Users.`

```python
from werkzeug.security import generate_password_hash, check_password_hash
....
class Users(db.Model):
    .....
    def setPassword(self, password):
        self.password = generate_password_hash(password)

    def checkPassword(self, password):
        return check_password_hash(self.password, password)
```

Karena tidak ada perubahan dari atributnya maka tidak perlu dilakukan migration lagi. Lalu kita buat dulu controller untuk user, buat file `UsersController.py` di folder `controller`, lalu isikan kode seperti berikut.

```python
import datetime
from app.model.Users import Users
from flask import request
from app import response, db

def signup():
    try:
        name = request.json['name'].strip()
        user_name = request.json['userName'].strip()
        password = request.json['password']

        user = Users(name=name, user_name=user_name)
        user.setPassword(password)
        db.session.add(user)
        db.session.commit()
        
        return response.CREATED({
            "users" : singleTransform(user),
        }, 'Successfully Add Users')

    except Exception as e:
        return response.INTERNAL_SERVER_ERROR([], "Internal server error")

def login():
    try:
        user_name = request.json['userName'].strip()
        password = request.json['password']
        user = Users.query.filter_by(user_name=user_name).first()
        if not user:
            return response.NOT_FOUND([], 'No user found')
        if not user.checkPassword(password):
            return response.UNAUTHORIZED([], 'Your credentials is invalid') 

        return response.OK({
            "users" : singleTransform(user),
        }, "Login Succes")

    except Exception as e:
        return response.INTERNAL_SERVER_ERROR('', "Failed to login")
        

def show(id):
    try:
        user = Users.query.filter_by(id=id).first()
        if not user:
	    return response.NOT_FOUND([], 'No user found')

        data = singleTransform(user)

        return response.OK({
	    "users" : data
        }, "User data loaded")

    except Exception as e:
        return response.INTERNAL_SERVER_ERROR([], "Failed to login")

def singleTransform(User):
    return {
        'id': User.id,
        'name': User.name,
        'userName': User.user_name
    }
```

Disini kita membuat tiga function yang digunakan untuk daftar akun, login, dan melihat data dari user. Pada function `signup` kita akan melakukan proses input ke database menggunakan data request yang berasal dari body yang berberntuk json. Untuk password kita harus melakukan hashing terlebih dahulu sebelum dilakukan insert ke database, jadi kita pangging function yang sudah kita buat tadi ti `Users.py`. Lalu kita akan melakukan proses insert ke database. Untuk melakukan insert ke database kita menggunakan dua method yaitu `add` dan `commit`. Nah kalo dari dokumentasinya begini

> The add() function call then adds the object. It will issue an INSERT statement for the database but because the transaction is still not committed you won’t get an ID back immediately. If you do the commit, your user will have an ID:

Jadi pada saat `add` dipanggil, data belum di insert ke database, baru setelah dilakukan `commit` baru data di-insert ke database. Jika proses berhasil, kita kemabalikan response yang sesuai dengan yang kita buat pada tutorial kemarin. Begitu pula pada function `login` dan `show`.

Setelah membuat controller untuk user, sekarang kita buat controller untuk notes nya. Buat file `NotesController.py` di folder `controller` lalu kita buat controller seperti berikut.

```python
from flask import request
from app import response, db
from app.model.Notes import Notes

def index():
    try:
        user_id = request.args.get('user')
        notes = Notes.query.filter_by(user_id=user_id)
        if not notes:
            return response.NOT_FOUND([],"No notes found")

        data = transform(notes)

        return response.OK({
            "notes" : data
        }, "All note")

    except Exception as e:
        return response.INTERNAL_SERVER_ERROR([], "Failed to load note")

def add():
    try:
        user_id = request.args.get('user')
        title = request.json['title'].strip()
        notes = request.json['notes'].strip()

        note = Notes(user_id=user_id, title=title, notes=notes)
        db.session.add(note)
        db.session.commit()

        data = singleTransform(note)

        return response.CREATED({
            "notes" : data
        }, "success add note")

    except Exception as e:
        return response.INTERNAL_SERVER_ERROR([], "Failed to load note")

def show(id):
    try:
        note = Notes.query.filter_by(id=id).first()
        if not note:
            return response.NOT_FOUND([],"No notes found")

        data = singleTransform(note)

        return response.OK({
            "notes" : data
        }, "notes by id")

    except Exception as e:
        return response.INTERNAL_SERVER_ERROR([], "Failed to load note")

def edit(id):
    try:
        note = Notes.query.filter_by(id=id).first()
        if not note:
            return response.NOT_FOUND([],"No notes found")

        note.title = request.json['title']
        note.notes = request.json['notes']
        db.session.add(note)
        db.session.commit()

        data = singleTransform(note)

        return response.CREATED({
            "notes" : data
        }, "Success edit note")

    except Exception as e:
        return response.INTERNAL_SERVER_ERROR([], "Failed to edit note")

def delete(id):
    try:
        note = Notes.query.filter_by(id=id).first()
        if not note:
            return response.NO_CONTENT([], "No data deleted")
        
        db.session.delete(note)
        db.session.commit()

        return response.OK([], "Successfully delete data")

    except Exception as e:
        return response.INTERNAL_SERVER_ERROR([], "Failed to delete")

def transform(values):
    array = []
    for i in values:
        array.append(singleTransform(i))
    return array

def singleTransform(values):
    data = {
        'id': values.id,
        'title': values.title,
        'notes': values.notes,
        'created_at': values.created_at,
        'updated_at': values.updated_at,
        'user': {
            'user_id' : values.user.id,
            'name' : values.user.name,
            'userName': values.user.user_name
        }
    }

    return data
```

Pada function `add` saat kita menambahkan notes baru ke database, kita butuh id dari user nya. Nah disitu kita menggunakan `request.args.get('user')`, artinya id usernya akan diminta melalui method `GET` di url nya. Sekarang kita sudah membuat controller untuk notes nya yang berisi CRUD dari notes nya. Pada setiap fungction, data yang dihasilkan dari query akan di transformasi menjadi response yang sesuai yang kita buat sebelumnya. Lalu kita akan membuat endpoint untuk memanggil controller yang sudah kita buat yang akan kita bahas di materi selanjutnya