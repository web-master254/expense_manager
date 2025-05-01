
function handleAuth(req,res,next){
    if(req.headers.Authentication  || req.headers.authentication){
        next()
    }else{
        res.status(401).send('Failed coz access was denied')
    }
}