---
title: Cara Mudah RESTful API di Node JS dengan MongoDB
category: "Javascript"
cover: nodejs.jpeg
author: Darvin Sinaga
---


## REST API?

 REST API adalah  suatu metode komunikasi yang menangani sisi server yang di terapkan dalam pengembangan aplikasi. Artinya bahwa backend  dapat menyediakan konten atau data untuk aplikasi frontend, seluler, atau server-side lainnya. misalnya [google calendar API](https://developers.google.com/google-apps/calendar/v3/reference/).

REST adalah singkatan dari Representational State Transfer dan merupakan cara bagaimana server web harus menanggapi permintaan. Hal ini memungkinkan tidak hanya membaca data, tetapi juga melakukan berbagai hal seperti udpate, delete, atau create data.

Disini,saya akan membangun sebuah  API yang memungkinkan untuk membuat pertanyaan , mengedit, memilih dan menghapus jawaban.


Berikut adalah gambaran dari API yang saya buat:
- dapat melihat pertanyaan yang ada dan bisa membuat pertanyaan sendiri
- read, create, edit, detele jawaban
- memilih/vote jawaban



#### Development Environment

Saya akan menggunakan tools berikut ini
- Node.js 
- Express (JS framework)
- MongoDB (Database)
- Yarn (package management)
- Visual Studio Code /editor kesayangan :p
- [Postman](https://www.getpostman.com/) (testing APIs)


#### Dependencies

 Packages  yang saya gunakan

- body-parser (sesuai namanya yaitu untuk parsing inputan)
- express 
- [nodemon](https://github.com/remy/nodemon) (untuk me-restart server ketika terjadi perubahan di code kita)
- [mongoose](http://mongoosejs.com/docs/) (object data modeling untuk mempermudah push data ke  MongoDB)
- [morgan](https://www.npmjs.com/package/morgan) (HTTP request logger )

#### Structure

Saya akan membuat structure seperti dibawah:

- Membangun Route API dengan Express
- Modeling data untuk  API
- Membangun komunikasi ke MongoDB melalui Mongoose
- Testing :v


## Membangun Route API dengan Express

#### Set up
- Install package nodemon,cukup tambahkan di package.json
- Menjalankan express (baca Doc di offical web express)
- Gunakan middleware express sefleksibel mungkin
- Tambahkan juga package body-parser untuk parsing data


#### Membuat Route Pertanyaan

- buat file router.js untuk menyimpan semua Route
- handle GET dan POST route untuk melihat dan create pertanyaan
- handle route GET untuk pertanyaan spesifik/detail
- contoh:
```javascript
router.get('/', (req, res) => {
  res.json({ response: 'request GET untuk melihat pertanyaan' });
});

router.post('/', (req, res) => {
  res.json({
    response: 'request POST untuk Membuat pertanyaan',
    body: req.body
  });
});

router.get('/:id', (req, res) => {
  res.json({
    response: `request GET untuk melihat detail pertanyaan : ${req.params.id}`
  });
});
```

#### Membuat Route Jawaban
- install morgan untuk membantu melihat request http,
- mengatur route POST untuk membuat jawaban
- mengatur route  PUT dan DELETE untuk mengedit dan menghapus jawaban
- mengatur route POST untuk membuat voting pada jawaban
- contoh:

```javascript
router.post('/:id/jawaban', (req, res) => {
  res.json({
    response: 'request POST untuk Membuat jawaban',
    question: req.params.id,
    body: req.body
  });
});

router.put('/:id/jawaban/:a_id', (req, res) => {
  res.json({
    response: 'request PUT  untuk EDITING jawaban',
    question: req.params.id,
    answer: req.params.a_id,
    body: req.body
  });
});

router.delete('/:id/jawaban/:a_id', (req, res) => {
  res.json({
    response: 'request DETELE  untuk Hapus jawaban',
    question: req.params.id,
    answer: req.params.a_id,
    body: req.body
  });
});

router.post('/:id/answers/:a_id/vote-:dec', (req, res) => {
  res.json({
    response: 'request POST untuk Membuat voting jawaban',
    question: req.params.id,
    answer: req.params.a_id,
    vote: req.params.dec,
    body: req.body
  });
});
```

#### Error Handlers

- gunakan middleware untuk reacord error secara efisien
- buat middleware validasi individual untuk error voting
- contoh:

```javascript
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});
```

## Koneksi ke mongoDB dengan mongoose

#### Modeling data 

Struktur jenis data apa yang harus disimpan dalam database dan jenis hubungan apa yang dimiliki oleh data.

Saya akan menggunakan Mongoose untuk mengatur penanganan data untuk MongoDB. Schemas dapat  mendefinisikan data dalam format JSON.
Dalam hal ini  paling baik diimplementasikan menggunakan objek pertanyaan hanya dengan properti jawaban. Namun, ingatlah, bahwa dokumen memiliki batas penyimpanan dan oleh karena itu jumlah jawaban terbatas.


#### Membuat Schema

- buat Skema yang mengikuti struktur parent-children yang di inginkan
- membangun model dengan Schema
- contoh:
```javascript
const AnswerSchema = new Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 }
});

const QuestionSchema = new Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  answers: [AnswerSchema]
});

const Question = mongoose.model('Question', QuestionSchema);
```

#### Fungsi untuk sorting dan memilih data

- jawaban harus diurutkan berdasarkan yang terbaru
- voting juga harus disimpan dalam database
- buat  mongoose prehook untuk disortir saat menyimpan
- contoh:

```javascript
const sortAnswers = (a, b) => {
  if (a.votes === b.votes) {
    return b.updatedAt - a.updatedAt;
  }
  return b.votes - a.votes;
};
QuestionSchema.pre('save', function (next) {
  this.answers.sort(sortAnswers);
  next();
});

AnswerSchema.method('update', function (updates, callback) {
  Object.assign(this, updates, { updatedAt: new Date() });
  this.parent().save(callback);
});

AnswerSchema.method('vote', function (vote, callback) {
  if (vote === 'up') {
    this.votes += 1;
  } else {
    this.votes -= 1;
  }
  this.parent().save(callback);
});
```

## Menghubungkan API ke database
___
❗ Bagi saya bagian ini adalah yang paling sulit! wkwkkw
___

#### Penanganan error handling

- gunakan metode `param` dari router untuk memicu callback pada route tertentu ( id and a_id) ([baca docs](http://expressjs.com/de/api.html#app.param))
- selalu dapat memeriksa kesalahan jika pertanyaan atau jawabannya tidak ditemukan
- contoh:
```javascript
router.param('id', (req, res, next, id) => {
  Question.findById(id, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      err = new Error('Document not found');
      err.status = 404;
      return next(err);
    }
    req.question = doc;
    return next();
  });
});

router.param('a_id', (req, res, next, id) => {
  req.answer = req.question.answers.id(id);
  if (!req.answer) {
    err = new Error('Answer not found');
    err.status = 404;
    return next(err);
  }
  return next();
});
```

#### Update Pertanyaan 

- temukan pertanyaan di database 

- contoh:
```javascript
router.get('/', (req, res, next) => {
  Question.find({}).sort({ createdAt: -1 }).exec((err, questions) => {
    if (err) return next(err);
    res.json(questions);
  });
});

router.post('/', (req, res) => {
  const question = new Question(req.body);
  question.save((err, question) => {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

router.get('/:id', (req, res) => {
  res.json(req.question);
});
```

#### Update Jawaban


- code

```javascript
router.post('/:id/answers', (req, res, next) => {
  req.question.answers.push(req.body);
  req.question.save((err, question) => {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

router.put('/:id/answers/:a_id', (req, res, next) => {
  req.answer.update(req.body, (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
});

router.delete('/:id/answers/:a_id', (req, res) => {
  req.answer.remove(err => {
    req.question.save((err, question) => {
      if (err) return next(err);
      res.json(question);
    });
  });
});

router.post(
  '/:id/answers/:a_id/vote-:dec',
  (req, res, next) => {
    if (req.params.dec.search(/^(up|down)$/) === -1) {
      const err = new Error(`Not possible to vote for hmm ${req.params.dec}!`);
      err.status = 404;
      next(err);
    } else {
      req.vote = req.params.dec;
      next();
    }
  },
  (req, res, next) => {
    req.answer.vote(req.vote, (err, question) => {
      if (err) return next(err);
      res.json(question);
    });
  }
);
```


## Testing :v

#### Testing

 Untuk menguji apakah semua route melakukan apa yang seharusnya, saya akan menggunakan ekstensi chrome[Postman](https://www.getpostman.com/). Interfacenya memungkinkan untuk menguji semua metode HTTP secara efisien.



#### CORS

Cross Origin Resource Sharing memungkinkan browser  untuk mengakses sumber daya dari domain yang berbeda. Karena risiko keamanan, ini dibatasi.

Silahkan baca [this article](https://www.html5rocks.com/en/tutorials/cors/).

ini adalah contoh midleware untuk handle CORS supaya domain bisa mengonsumsi API

```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if (req.method === 'Options') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
    return res.status(200).json({});
  }
});
```

## Kesimpulan

Seperti yang bisa kita lihat, REST API adalah alat yang hebat untuk mengatur layanan dasar microservices. Untuk benar-benar mengimplementasikan API, Anda perlu memahami sepenuhnya basis data yang Anda gunakan dan interaksinya dengan rute. Dalam hal ini hanya mongoose wkwkwk.

Terimakasih


