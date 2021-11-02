//import express from "express";
const express = require("express");
// require("bcryptjs");
const path = require("path");
const bcrypt = require("bcrypt");
const session =require("express-session")


const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//session stockage
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

//mongoose
const mongoose = require("mongoose");
const { create } = require("domain");
const { get } = require("http");

mongoose
  .connect("mongodb://localhost:27017/projet", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo…"))
  .catch((error) => console.log(error.message));

//base de donnee user
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    unique: true,
  },
  mdp: {
    type: String,
  },
});


 
//base de donnee user
const partieSchema = new mongoose.Schema({
  idcreateur:{
    type: mongoose.Types.ObjectId,
  },
  nom: {
    type: String,
  },
  adversaire: {
    type: String,
  },
  etat: {
    type: String,
  },
  lien: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
const Partie = mongoose.model("Partie", partieSchema);
//adresse cree
app.listen(3000, () => {
  console.log("server start on port...");
});

//ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//direction index
app.get("/", (req, res) => {
  res.redirect("/index");
});

//direction inscription
app.get("/inscription", (req, res) => {
  res.render("inscription");
});

//direction jouer
app.get("/jouer", async(req, res) => {
  res.render("jouer");
});

//direction creepartie
app.get("/creepartie", (req, res) => {
  res.render("creepartie");
});

//direction partie
app.get("/partie", async(req, res) => {
  const partietotal = await  getPartie()
  res.render("partie",{partietotal,user:req.session.user});
});

//direction login
app.get("/login", (req, res) => {
  res.render("login", { showErreur: false, title: "termine" });
});

//direction delete
app.get("/delete",(req,res)=>{
  res.render("partie")
})

//direction partie par id
app.get("/jouer/:id", async (req, res) => {
  let partie = await getPartieone(req.params._id);
  console.log('user id=', req.params._id)
  res.render("jouer",{partie});
});

//direction index
app.get("/index", (req, res) => {
  res.render("index");
});


// affiche le donnee
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/newpartie", (req, res) => {
  res.json(parties);
});

app.get("/jeton", async (req, res) => {
  res.json(jetons)
  
});



//parametre delete
app.post("/delete/:id",async(req,res) => {
  const supprim = await supprimerpartie(req.params.id);
  res.redirect("/partie")
})

//parametre jeton
app.post("/jeton",async(req,res)=>{
  
  let a = getFirstNumber(req.body)
  let b = getTwiceNumber(req.body)
  calculcule(a,b)
  res.render("/jouer")
})

//parametre inscription
app.post("/users",async(req,res)=>{
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(req.body.mdp,10)
  req.body.mdp = hashedPassword;
  createUser(req.body)
  res.redirect("/login");
})

//login parametre
app.post("/login", async (req, res) => {
  const user = await getUser(req.body);
  console.log(user);
  if (user != null) {
    req.session.user=user;
    res.redirect("/partie");
  } else {
    res.render("login", { showErreur: true, title: "erreur" });
  }
});

//parametre de partie
app.post("/partie",async (req,res)=>{
  res.redirect("/partie")
})

//parametre de jouer
app.post("/newpartie", async (req, res) => {
  console.log(req.body);
  req.body.etat = "en cours";
  req.body.idcreateur = req.session.user._id;
  createPartie(req.body);
  res.redirect("/partie");
});

//fonction cree user
async function createUser(user) {
  const users = new User(user);
  try {
    console.log("user", user);
    const result = await users.save();
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

//fonction cherche user
async function getUser(user) {
  const monuser = await User.findOne({ nom: user.nom });
  let match = await bcrypt.compare(user.mdp, monuser.mdp);
  if (match) {
    return monuser;
  }
  return null;
}

//founction cree un partie
async function createPartie(partie) {
  const parties = new Partie(partie);
  if (partie.nom != partie.adversaire) {
    try {
      console.log("partie", partie);
      const result = await parties.save();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
  return parties
}
//cherche tous les parties
async function getPartie()
{
  const PartieTotal = await Partie.find()
  return PartieTotal
}

//cherche un partie
async function getPartieone(partie) {
  const mapartie = await Partie.findOne({ _id: partie });
  return mapartie;
}

//supprimer un partie
async function supprimerpartie(id)
{
  const deletepartie = await Partie.deleteOne({_id:id})
  return deletepartie
}

async function getFirstNumber() {
  const firstNumber = document.getElementById("nbrester").value;
  return firstNumber;
}

async function getTwiceNumber() {
  const twiceNumber = document.getElementById("nbjouer").value;
  return twiceNumber;
}

async function calculcule(number1,number2){
  let total=100;
  for(let i =0 ; i< total; i++)
  {
    console.log("saisir votre jetons:");
    number1 = total - number2
    total = number1
  }
}