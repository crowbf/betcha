document.addEventListener("DOMContentLoaded",async() =>{
    fetch('/users').then((data)=>{
    return data.json()
    }).then((users)=>{
        for(const user of users)
        {
            console.log("Nom:" + user.nom);
            console.log("Mot de passe:" + user.mdp);
        }
    })
})

document.addEventListener("DOMContentLoaded",async() =>{
    fetch('/newpartie').then((data)=>{
    return data.json()
    }).then((parties)=>{
        for(const partie of parties)
        {
            console.log("Idcreateur:" + partie.idcreateur);
            console.log("Nom:" + partie.nom);
            console.log("Adversaire:" + partie.adversaire);
            console.log("Etat:" + partie.etat);
            console.log("Lien" + partie.lien);
        }
    })
})


document.addEventListener("DOMContentLoaded",async() =>{
    fetch('/jeton').then((data)=>{
    return data.json()
    }).then((jetons)=>{
        for(const jeton of jetons)
        {
            console.log("Jeton reste:" + jeton.nbrester);
            console.log("jeton à jouer:" + jeton.nbjouer);
        }
    })

})

	

