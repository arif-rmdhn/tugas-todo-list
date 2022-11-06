const prisma = require("../helpers/database");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const validate = require("../helpers/validation");

class _user {
   listUser = async () => {
      try {
         const list = await prisma.user.findMany();

         return {
            status: true,
            data: list,
         };
      } catch (error) {
         console.error("ListenUser user module Error: ", error);

         return {
            status: false,
            error,
         };
      }
   };


   createUser = async (body) => {
      try {
         // Validation Input
         const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
         });

         validate(schema, body);

         const password = bcrypt.hashSync(body.password, 10);

         // Menampilkan password
         console.log(body.password, password);

         // Name, Email, Password
         const add = await prisma.user.create({
            data: {
               name: body.name,
               email: body.email,
               password: password,
            },
         });

         return {
            status: true,
            data: add,
         };
      } catch (error) {
         console.error("CreateUser user module Error: ", error);

         return {
            status: false,
            error: error.mesaage,
         };
      }
   };

   updateUser = async (body) => {
      try {
         // Validation Input
         const schema = Joi.object({
            id: Joi.number().required(),
            name: Joi.string(),
            email: Joi.string(),
            password: Joi.string(),
         });

         validate(schema, body);

         let password;
         if (body.password) {
            password = bcrypt.hashSync(body.password, 10);
         }

         // Name, Email, Password
         const update = await prisma.user.update({
            where: {
               id: body.id,
            },
            data: {
               name: body.name,
               email: body.email,
               password: password,
            },
         });

         return {
            status: true,
            data: update,
         };
      } catch (error) {
         console.error("updateUser user module Error: ", error);

         return {
            status: false,
            error: error.mesaage,
         };
      }
   };

   deleteUser = async (id) => {
      try {
         // Validation Input
         const schema = Joi.number().required();
         const validation = schema.validate(id);

         if (validation.error) {
            const errorDetail = validation.error.detail.map((detail) => detail.mesaage);

            return {
               status: false,
               code: 420,
               error: errorDetail.join(", "),
            };
         }

         const del = await prisma.user.delete({
            where: {
               id: id,
            },
         });

         return {
            status: true,
            data: del,
         };
      } catch (error) {
         console.error("deleteUser user module Error: ", error);

         return {
            status: false,
            error: error.mesaage,
         };
      }
   };
}

module.exports = new _user();
