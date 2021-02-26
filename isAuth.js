const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) =>{
    const token = req.headers.authorization;
    if(token){
      console.log(req.headers);
      const onlyToken = token.slice(7, token.length);
      jwt.verify(onlyToken, 'secret' ,  (err, decode)=>{
          if(err){
            return res.status(401).send({ message: 'невалидный токен!' });
          }
          req.user = decode;
          console.log('nice');
          next();
          return;
      })
     }else{
        return res.status(401).send({ message: 'требуется аунтификация!' });
     }
}

module.exports = isAuth;