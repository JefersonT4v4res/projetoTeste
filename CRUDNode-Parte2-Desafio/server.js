const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const path = require('path');

const ObjectId = require('mongodb').ObjectID;

const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://desafio1cdm:desafio1cdm@desafio1cdm.njqir.mongodb.net/Desafio1CDM';

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('Desafio1CDM')

    app.listen(3000, () => {
        console.log('server running on port 3000');
    });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.set('View engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index-empresa.ejs');
});

app.get('/', (req, res) =>{
    let cursor = db.collection('empresa').find();
});

app.get('/show-empresa', (req, res) => {
    db.collection('empresa').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show-empresa.ejs', { empresa: results });

    });
});

app.post('/show-empresa', (req, res) => {
    db.collection('empresa').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('salvo no banco de dados');
        res.redirect('/show-empresa');
    });
});

app.route('/edit-empresa/:id').get((req, res) => {
  let id = req.params.id;

  db.collection('empresa').find(ObjectId(id)).toArray((err, result) => {
       if(err) return res.send(err)
        res.render('edit-empresa.ejs', { empresa: result });
  });
})


 .post((req, res) => {
     let id = req.params.id;
     let Inpname = req.body.Inpname;
     let InpFantasia = req.body.InpFantasia;
     let inpCnpj = req.body.inpCnpj;
     let InpEmail = req.body.InpEmail;
     let InpTel = req.body.InpTel;
     let InpEnd = req.body.InpEnd;
     let InpCity = req.body.InpCity;
     let InpEs = req.body.InpEs;

     db.collection('empresa').updateOne({_id: ObjectId(id)}, {
     $set: {
        Inpname: Inpname,
        InpFantasia: InpFantasia,
        inpCnpj: inpCnpj,
        InpEmail: InpEmail,
        InpTel: InpTel,
        InpEnd: InpEnd,
        InpCity: InpCity,
        InpEs: InpEs

     },
     
    }, 
    (err, result) => {
        if (err) return res.send(err)
        res.redirect('/show-empresa');
        console.log('Atualizado no Banco de Dados');
    });
 })

 app.route('/delete-empresa/:id').get((req, res) => {
     let id = req.params.id;

       db.collection('empresa').deleteOne({_id: ObjectId(id)}, (err, result) => {
           if(err) return res.send(500, err)
           console.log('Deletado do Banco de Dados!');
           res.redirect('/show-empresa');
       });
  });

