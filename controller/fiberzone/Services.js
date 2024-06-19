const userModel = require("../../model/fiberzone/Services");
const bcrypt = require("bcrypt");
const { requestResponse } = require("../../config");
const objectId = require("mongoose").Types.ObjectId;

exports.tambah = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        services: data.services,
      })
      .then((user) => {
        if (user) {
          resolve(requestResponse.gagal("services telah ada"));
        } else {
          userModel
            .create(data)
            .then(() => {
              console.log(requestResponse.berhasil("Berhasil Input services"));
              resolve(requestResponse.berhasil("Berhasil Input services"));
            })
            .catch(() => {
              reject(requestResponse.kesalahan);
              console.log(requestResponse.kesalahan);
            });
        }
      });
  });

exports.getAllUser = () =>
  new Promise((resolve, reject) => {
    userModel
      .find({})
      .then((user) => {
        console.log(requestResponse.berhasil("berhasil get services"));
        resolve(requestResponse.suksesWithData(user));
      })
      .catch(() => reject(requestResponse.kesalahan));
  });

exports.getById = (id) =>
  new Promise((resolve, reject) => {
    userModel
      .find({
        _id: objectId(id),
      })
      .then((user) => {
        console.log(requestResponse.berhasil("berhasil get services"));
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
            console.log(requestResponse.berhasil("berhasil delete services"));
            resolve(requestResponse.berhasil("Berhasil Delete services"));
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
        console.log(requestResponse.berhasil("Berhasil Edit services"));
        resolve(requestResponse.berhasil("Berhasil Edit services"));
      })
      .catch(() => reject(requestResponse.serverError));
  });
