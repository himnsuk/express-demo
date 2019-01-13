
// Custom middleware

function log(req, res, next){
  console.log('loggingin');
  next();
}

module.exports = log;
