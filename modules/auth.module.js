const prisma = require("../helpers/database");
const validate = require("../helpers/validation");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class _auth {
   login = async (body) => {
      try {
         const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
         });

         validate(schema, body);

         // Cari user by email
         const user = await prisma.user.findFirst({
            where: {
               email: body.email,
            },
         });

         // Handle user not found
         if (!user) {
            return {
               status: false,
               code: 404,
               error: "User Not Found",
            };
         }
         
         // Compare Passsword
         if (!bcrypt.compareSync(body.password, user.password)) {
            return {
               status: false,
               code: 401,
               error: "Wrong password",
            };
         }

         // Generate token
         const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
         };

         const token = jwt.sign(payload, "secret-code-token", { expiresIn: "8h" });

         return {
            status: true,
            data: {
               token,
            },
         };
      } catch (error) {
         console.error("Login auth module Error: ", error);

         return {
            status: false,
            error,
         };
      }
   };
}

module.exports = new _auth();
