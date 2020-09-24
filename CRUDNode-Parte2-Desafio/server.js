const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const app = express();

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admirJr:adminadmin@cluster0.rwhcd.mongodb.net/Cluster0";

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('Cluster0')

    app.listen(3000, () => {
        console.log('server running on port 3000');
    });
});

app.use(bodyParser.urlencoded({ extended: true }));


app.set('View engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/', (req, res) =>{
    var cursor = db.collection('data').find();
});

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results });

    });
});

app.post('/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('salvo no banco de dados');
        res.redirect('/show');
    });
});

app.route('/edit/:id').get((req, res) => {
  var id = req.params.id;

  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
       if(err) return res.send(err)
        res.render('edit.ejs', { data: result });
  });
})


 .post((req, res) => {
     var id = req.params.id;
     var Inpname = req.body.Inpname;
     var InpFantasia = req.body.InpFantasia;
     var inpCnpj = req.body.inpCnpj;
     var InpEmail = req.body.InpEmail;
     var InpTel = req.body.InpTel;
     var InpEnd = req.body.InpEnd;
     var InpCity = req.body.InpCity;
     var InpEs = req.body.InpEs;

     db.collection('data').updateOne({_id: ObjectId(id)}, {
     $set: {
        Inpname: Inpname,
        InpFantasia: InpFantasia,
        inpCnpj: inpCnpj,
        InpEmail: InpEmail,
        InpTel: InpTel,
        InpEnd: InpEnd,
        InpCity: InpCity,
        InpEs: InpEs

     }
     
    }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/show');
        console.log('Atualizado no Banco de Dados');
    });

 })

 app.route('/delete/:id').get((req, res) => {
     var id = req.params.id;

       db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
           if(err) return res.send(500, err)
           console.log('Deletado do Banco de Dados!');
           res.redirect('/show');
       });
  });
