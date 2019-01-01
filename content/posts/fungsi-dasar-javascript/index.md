---
title: Memahami dasar dasar function di javascript 
category: "Javascript"
cover: dasar-js.jpg
author: Darvin Sinaga
---
### Apa itu function ?
- Function adalah subprogram yang di rancang untuk mengerjakan suatu tugas terterntu
- Sebuah fucntion dijalankan ketika function tersebut di panggil
- Sebuah nilai / values dapat di teruskan di dalam function dan di gunakan di dalamnya
- Sebuah Fungsi selalu mengembalikan nilai/value. di javascript jika kita tidak menentukan sebuah value return makan otomatis akan me-return undifined

### Mendefenisikan sebuah Function
Ada beberapa cara berbeda untuk mendefinisikan fungsi dalam JavaScript:
Deklarasi sebuah function di defenisikan dengan `function`.Untuk membuat sebuah function deklarasikan dengan `function` dan di ikuti dengan nama function yang akan kita gunakan

```javascript
function name(parameters){
  statements
}
```
Function Expressions mendefinisikan anonymous function. anonymous function adalah fungsi yang tidak memiliki nama. Ekspresi Fungsi tidak diangkat, dan karena itu tidak dapat digunakan sebelum didefinisikan. Dalam contoh di bawah ini, Kita menetapkan objek fungsi anonim sama dengan variabel.
```javascript
let name = function(parameters){
  statements
}
```
Bentuk sederhana function di atas bisa di sederhanakan dengan Arrow Function dimana syntax nya lebih pendek
```javascript
let name = (parameters) => {
  statements
}
```
### Parameters vs. Arguments.
Jika Anda baru mengenal JavaScript, Anda mungkin telah mendengar istilah parameter dan argumen yang digunakan secara bergantian. Meskipun sangat mirip, ada perbedaan penting untuk dibuat antara dua kata kunci ini.
*Parameter* digunakan ketika mendefinisikan suatu fungsi, itu adalah nama yang dibuat dalam definisi fungsi. Bahkan, selama  fungsi itu di defenisikan kita dapat mengirimkan hingga 255 parameter! Parameter dipisahkan dengan koma di ```()```. Berikut ini contoh dengan dua parameter - param1 & param2:
```javascript
const param1 = true;
const param2 = false;
function twoParams(param1, param2){
  console.log(param1, param2);
}
```
*Arguments* adalah nilai yang diterima fungsi dari setiap parameter ketika fungsi dieksekusi (dipanggil). Dalam contoh di atas, dua argumen kami ```true``` & ```false```.
## Invoking a Function
Fungsi dijalankan ketika fungsi itu dipanggil. Kita dapat memanggil fungsi dengan merujuk  ke nama fungsi, diikuti oleh tanda kurung yang terbuka dan tertutup: ```()```.
Mari kita lihat contohnya
Pertama, kami akan mendefinisikan fungsi bernama ```logName```. Fungsi ini akan mengambil satu parameter, ```name```. Ketika dijalankan, fungsi akan mencetak ```name``` itu kembali ke konsol:
```javascript
function logName(name){
  console.log(name);
}
```
untuk menjalankan funsi tersebut kita bisa memanggilnya dengan melempar satu parameter misalnya disini kita akan menjalankan funsi dengan nama `aliga`
```javascript
logName('aliga');
//aliga
```
jika funsi yang kita tulis tidak membutuhkan parameter maka kita hanya perlu mengosongkan tanda `()` di funsi kita
```javascript
function sapa(){
  console.log('Hello Aliga');
}
sapa();
// Hello Aliga
```
### Function Return.
Setiap fungsi dalam JavaScript menghasilkan undefined kecuali kita menentukan sendiri return yang spesifik.
```javascript
function test(){};
test();
// undefined
```
nice, seperti yang di harapkan function tersebut mengembalikan nilai `undifined`,
Sekarang, kita dapat menyesuaikan apa yang dikembalikan dalam fungsi kita dengan menggunakan kata kunci kembali diikuti oleh value kita. Misalnya:
```javascript
function test(){
  return true;
};
test();
// true
```
Dalam contoh ini kita  memberi tahu fungsi untuk mengembalikan `true`. Ketika kita memanggil fungsi tersebut maka akan `true`.

*Kenapa ini penting?*
Ini penting karena nilai yang dikembalikan  oleh fungsi, sebenarnya dikembalikan ke pemanggil fungsi tersebut. contoh:
```javascript
let double = function(num) {
   return num * 2;
}
```
Ini adalah ekspresi fungsi  yang akan mengembalikan dua kali nilai `num` parameter input kita. Kita kemudian dapat memanggil fungsi dan menyimpan nilai kembali ke variabel:
```javascript
let test = double(3);

```
Variabel pengembalian tidak hanya mengembalikan nilai dari suatu fungsi, tetapi juga menetapkannya untuk apapun yang set di dalam  fungsi!
Aturan penting lain dari return statement adalah bahwa fungsi akan segera menghentikan eksekusi.
contoh ini misalnya kita memiliki dua pernyataan pengembalian dalam fungsi :
```javascript
function test(){
  return true;
  return false;
};
test();
// true
```
pada code diatas , `return`  pertama akan segera menghentikan eksekusi fungsi dan menyebabkan fungsi  mengembalikan `true`. Kode pada baris tiga: `return false;` tidak pernah dieksekusi. karena funsi sudah berhenti

### Function Objects
Dalam JavaScript, apa pun yang bukan tipe primitif (``undefined``, `null`, `boolean`, `number`, atau `string`) adalah objek,Objek dalam JavaScript sangat fleksibel. Karena itu, kita bahkan dapat melewatkan fungsi sebagai parameter ke fungsi lain
Ketika suatu fungsi menerima fungsi lain sebagai parameter, atau mengembalikan fungsi, itu disebut fungsi tingkat tinggi. Anda mungkin sudah menggunakan banyak fungsi tingkat tinggi dan bahkan tidak mengetahuinya:

`Array.prototype.map` dan `Array.prototype.filter`adalah fungsi urutan yang lebih tinggi (Hanya untuk beberapa nama). Anda dapat memeriksa beberapa artikel saya sebelumnya untuk mempelajari lebih lanjut tentang objek dan fungsi urutan lebih tinggi dalam JavaScript ...

### Closing Notes
Demikianlah sedikit tulisan sederhana tentang funsi dasar javascript yang bisa saya share kepada semua pembaca, Sekaligus artikel ini adalah arikel pertama di blog saya di tahun 2019 ini, Terimakasih 
