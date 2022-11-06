const validate = (schema, data) => {
   const validation = schema.validate(data);

   if (validation.error) {
      const errorDetail = validation.error.detail.map((detail) => detail.message);

      return {
         status: false,
         code: 420,
         error: errorDetail.join(", "),
      };
   }
   
};

module.exports = validate;
