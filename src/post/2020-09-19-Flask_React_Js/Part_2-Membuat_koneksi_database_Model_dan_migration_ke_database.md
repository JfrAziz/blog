---
slug: "membuat-koneksi-database-model-dan-migration-ke-database"
date: '2020-09-13'
title: 'Flask + React JS Part 2 : Koneksi database, Model dan, migration'
category: "Flask_React"
excerpt: 'Membuat koneksi ke database menggunakan SQLAlchemy, membuat model sesuai dengan desain database yang dibuat, dan membuat migration ke database'
tumbnail: tumbnail.png
---

### Membuat Model

Sebelum kita membuat Model dan migrationnya, kita tambah dulu konfigurasi untuk database nya. Buka `__init__.py`  di folder `ap` lalu edit file tersebut seperti berikut.

```python
from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)

migrate = Migrate(app, db)

@app.route('/')
def hello():
   return "Hello World"
```

Setelah itu, buat file `Users.py` , `Notes.py`, dan `__init__.py` di folder `app/model`. Untuk file `__init__.py` kosongkan saja, file itu hanya sebagai penanda bahwa di folder itu ada package python yang kita buat. Berdasarkan desain database yang kita sudah buat pada part 0, maka kita buat model untuk `Users.py` nya sebagai berikut.

```python
from app import db
from datetime import datetime

class Users(db.Model):
    id = db.Column(db.BigInteger, primary_key = True, autoincrement = True)
    user_name = db.Column(db.String(16),  unique=True, nullable=False)
    name = db.Column(db.String(230), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
```

Dan untuk `Notes.py` isikan 

```python
from app import db
from app.model.Users import Users
from datetime import datetime

class Notes(db.Model):
    id = db.Column(db.BigInteger, primary_key = True, autoincrement = True)
    title = db.Column(db.String(100), nullable=False)
    notes = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.BigInteger, db.ForeignKey(Users.id))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("Users")
```

Karena pada desain yang telah kita buat, terdapat relationship antara tabel `notes` dan `users` yaitu many to one dari `notes` ke `users`, maka kita tambahkan relationship di class nya. Disini saya hanya menambahkannya di class `Notes` nya saja. Jika anda mau menambahkan yang berbeda anda bisa baca-baca mengenai relationship di flask [disini](https://docs.sqlalchemy.org/en/13/orm/basic_relationships.html).

### Membuat Migration

Migration ini kita buat untuk mengatur perubahan pada struktur database yang kita buat. Sebelumnya pastikan anda sudah menghidupkan MySQL dan telah membuat Database yang sesuai dengan konfigurasi yang telah kita buat di awal. Lalu kita bisa menjalankan inisialisasi migrationnya dengan menggunkan perintah

```bash
flask db init
```

Perintah tersebut akan meng-generate folder bernama `migration` di root project kita. Sebelum kita melakukan migration, kita edit dulu file `__init__.py` di folder `app` dan import dua Model yang telah kita buat dipaling bawah file.

```python
...
from app.model import Notes, Users
```

Lalu kita jalankan perintah berikut

```bash
flask db migrate
```

Jalankan perintah ini setiap anda melakukan perubahan atau penambahan tabel di database. Jika kita buka folder `migrations/versions` kita mendapatkan file hasil generate dari migrationnya. Lalu untuk menambahkan ke database kita, kita tinggal menjalankan perintah

```python
flask db upgrade
```

Anda bisa membaca flask migartion lebih lengkap [disini](https://flask-migrate.readthedocs.io/en/latest/). Setelah itu, jika kita mengecek di database yang kita buat, maka akan ada 3 database yang terbuat yaitu `alembic_version`, `notes`, dan `users`. Table `alembic_version` digunakan oleh flask-migration untuk mengatur versi dari migration yang kita buat. Sekarang kita sudah selesai membuat model dan migration nya. Anda bisa melakukan hal yang sama apabila ingin merubah schema yang telah dibuat.
