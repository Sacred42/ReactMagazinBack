const jwt = require('jsonwebtoken');

const getToken = (user) =>{
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email
    }, 'secret',{
        expiresIn : '30000ms'
    })
}

const isAuth = (req, res, next) =>{
const token = req.headers.authorization;
if(token){
  const onlyToken = token.slice(7, token.length);
  jwt.verify(onlyToken, 'secret' ,  (err, decode)=>{
      if(err){
        return res.status(401).send({ message: 'невалидный токен!' });
      }
      req.user = decode;
      next();
      return;
  })
 }else{
    return res.status(401).send({ message: 'требуется аунтификация!' });
 }
}

module.exports = getToken, isAuth;