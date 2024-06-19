const userModel = require("../../model/koperasi/Nasabah");
const bcrypt = require("bcrypt");
const { requestResponse } = require("../../config");
const objectId = require("mongoose").Types.ObjectId;

exports.tambah = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        nama: data.nama,
      })
      .then((user) => {
        if (user) {
          resolve(requestResponse.gagal("Nama Nasabah telah ada"));
        } else {
          userModel
            .create(data)
            .then(() => {
              console.log(requestResponse.berhasil("Berhasil Tambah Nasabah"));
              resolve(requestResponse.berhasil("Berhasil Tambah Nasabah"));
            })
            .catch(() => {
              reject(requestResponse.kesalahan);
              console.log(requestResponse.kesalahan);
            });
        }
      });
  });

exports.login = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        username: data.username,
      })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(data.password, user.password)) {
            console.log(requestResponse.suksesLogin(user));
            resolve(requestResponse.suksesLogin(user));
          } else {
            console.log(requestResponse.gagal("Password Salah"));
            reject(requestResponse.gagal("Password Salah"));
          }
        } else {
          console.log(requestResponse.gagal("Username Tidak terdaftar"));
          reject(requestResponse.gagal("Username Tidak terdaftar"));
        }
      });
  });

exports.getAllUser = () =>
  new Promise((resolve, reject) => {
    userModel
      .find({})
      .then((user) => {
        console.log(requestResponse.berhasil("berhasil get data"));
        resolve(requestResponse.suksesWithData(user));
      })
      .catch(() => reject(requestResponse.kesalahan));
  });

exports.getStatusAktif = () =>
  new Promise((resolve, reject) => {
    userModel
      .find({
        status: "Aktif",
      })
      .then((user) => {
        console.log(requestResponse.berhasil("berhasil get status aktif"));
        resolve(requestResponse.suksesWithData(user));
      })
      .catch(() => reject(requestResponse.kesalahan));
  });

exports.getStatusTidakAktif = () =>
  new Promise((resolve, reject) => {
    userModel
      .find({
        status: "Tidak Aktif",
      })
      .then((user) => {
        console.log(
          requestResponse.berhasil("berhasil get status tidak aktif")
        );
        resolve(requestResponse.suksesWithData(user));
      })
      .catch(() => reject(requestResponse.kesalahan));
  });

exports.getStatusPinjam = () =>
  new Promise((resolve, reject) => {
    userModel
      .find({
        statusPinjam: 1,
      })
      .then((user) => {
        console.log(requestResponse.berhasil("berhasil get status pinjam"));
        resolve(requestResponse.suksesWithData(user));
      })
      .catch(() => reject(requestResponse.kesalahan));
  });

exports.getStatusTidakPinjam = () =>
  new Promise((resolve, reject) => {
    userModel
      .find({
        statusPinjam: 0,
      })
      .then((user) => {
        console.log(
          requestResponse.berhasil("berhasil get status tidak pinjam")
        );
        resolve(requestResponse.suksesWithData(user));
      })
      .catch(() => reject(requestResponse.kesalahan));
  });
exports.delete = (id) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        _id: objectId(id),
      })
      .then((data) => {
        userModel
          .deleteOne({
            _id: objectId(id),
          })
          .then(() => {
            console.log(requestResponse.berhasil("berhasil delete data"));
            resolve(requestResponse.berhasil("Berhasil Delete Data"));
          })
          .catch(() => reject(requestResponse.serverError));
      });
  });

exports.edit = (data, id) =>
  new Promise(async (resolve, reject) => {
    console.log(data);
    userModel
      .updateOne(
        {
          _id: objectId(id),
        },
        data
      )
      .then(() => {
        console.log(requestResponse.berhasil("Berhasil Edit Data"));
        resolve(requestResponse.berhasil("Berhasil Edit Data"));
      })
      .catch(() => reject(requestResponse.serverError));
  });
