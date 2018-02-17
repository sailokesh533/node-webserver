const express =  require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 5040;




hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine',hbs);



app.use((req,res,next)=>{
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.info',log,(err)=>{
  if(err){
    console.log('Unable to append file');
  }
});
  next();
})

// app.use((req,res,next)=>{
//   res.render('maintenence.hbs');
//   next();
// });
app.use(express.static(__dirname+'/public'));
app.get('/bad',(request,response)=>{
  response.send({
    errorMessage:'Unable to process request'
  });
});

hbs.registerHelper('getFullYear', ()=>{
  return new Date().getFullYear();
});
app.get('/home',(request,response)=>{
  response.render('home.hbs',{
    pageTitle:'Home page',
    welcomeMessage:'Welcome to home page'

  })
})


app.get('/about', (request,response)=>{
  response.render('about.hbs',{
    pageTitle:'About Page',
    aboutParagraph:'About paragraph'
  })
});

app.listen(port,()=>{
  console.log(`Server is running up on port number ${port}`);
});
