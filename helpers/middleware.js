const prisma = require("../helpers/database");
const jwt = require("jsonwebtoken");

const userSession = async (req, res, next) => {
   let token;

   // Verifikasi kalau ada token jwt di header client
   // jwt token
   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
         console.log(req.headers.authorization);
         token = req.headers.authorization.split(" ")[1];

         const decode = jwt.verify(token, "secret-code-token");
        //  console.log(decode)

         const user = await prisma.user.findUnique({
            where: {
                id: decode.id
            }
         })

         if(user){
            // Sebagai acuan data buat diambil di backend
            req.user = {
                id: user.id,
                email: user.email
            }
         } else{
            res.status(403).send({
                status: false,
                error: 'Not Authenticate'
            })
         }

         next();
      } catch (error) {
         console.error("UserSession middleware Error : ", error);

         res.status(401).send({
            status: false,
            error: "Not Authorize",
         });
      }
   }

   if (!token) {
      res.status(401).send({
         status: false,
         error: "Not authorize, no token",
      });
   }
};

module.exports = userSession;
