const prisma = require("../helpers/database");
const Joi = require("joi");
const validate = require("../helpers/validation");
const { user } = require("../helpers/database");

class _todo {
   listTodo = async (user_id) => {
      try {
         const list = await prisma.user.findUnique({
            where: {
               id: user_id,
            },
            include: {
               todo: true,
            },
         });

         return {
            status: true,
            data: list,
         };
      } catch (error) {
         console.error("listTodo todo module Error: ", error);

         return {
            status: false,
            error,
         };
      }
   };

   listlogin = async (body) => {
      try {
         const schema = Joi.object({
            user_id: Joi.number()
         });

         validate(schema, body)

         const list = await prisma.user.findMany({
            where: {
               id: body.user_id
            },
            include: {
               todo: true,
            },
         });

         return {
            status: true,
            data: list,
         };
      } catch (error) {
         console.error("listTodo todo module Error: ", error);

         return {
            status: false,
            error,
         };
      }
   };

   creatTodo = async (body) => {
      try {
         // Validation Input
         const schema = Joi.object({
            user_id: Joi.number().required(),
            description: Joi.string().required(),
         }).options({ abortEarly: false });

         const validation = schema.validate(body);

         if (validation.error) {
            const errorDetail = validation.error.details.map((detail) => detail.message);

            return {
               status: false,
               code: 422,
               error: errorDetail.join(". "),
            };
         }

         const add = await prisma.todo.create({
            data: {
               user_id: body.user_id,
               description: body.description,
               complete: 0,
            },
         });

         return {
            status: true,
            data: add,
         };
      } catch (error) {
         console.error("CreateTodo todo module Error: ", error);

         return {
            status: false,
            error,
         };
      }
   };

   updateTodo = async (body) => {
      try {
         const schema = Joi.object({
            user_id: Joi.number().required(),
            todo_id: Joi.number().required(),
            description: Joi.string(),
         });

         validate(schema, body);
         const update = await prisma.user.update({
            where: {
               id: body.user_id,
            },
            data: {
               todo: {
                  update: {
                     where: {
                        id: body.todo_id,
                     },
                     data: {
                        description: body.description,
                     },
                  },
               },
            },
         });

         const list = await prisma.user.findUnique({
            where: {
               id: body.user_id,
            },
            include: {
               todo: true,
            },
         });

         return {
            status: true,
            data: list,
         };
      } catch (error) {
         console.error("UpdateTodo todo module Error: ", error);

         return {
            status: false,
            error,
         };
      }
   };

   deleteTodo = async (body) => {
      try {
         const schema = Joi.object({
            user_id: Joi.number().required(),
            todo_id: Joi.number().required(),
         });

         validate(schema, body);

         const delet = await prisma.user.update({
            where: {
               id: body.user_id,
            },
            data: {
               todo: {
                  deleteMany: [{ id: body.todo_id }],
               },
            },
         });

         const list = await prisma.user.findUnique({
            where: {
               id: body.user_id,
            },
            include: {
               todo: true,
            },
         });

         return {
            status: true,
            data: list,
         };
      } catch (error) {
         console.error("DeleteTodo todo module Error: ", error);

         return {
            status: false,
            error,
         };
      }
   };
}

module.exports = new _todo();
