Le site doit comprendre les éléments suivants :

## Une page "home public" :

* Un champ de recherche par nom de projet
* une liste de projets (liste de projets par défaut OU résultat de la recherche)
  * Pour chaque projet :
    * nom
    * description
    * image
    * nombre total de likes
    * VALEUR TOTALE DES CONTRIBUTIONS ACTUELLES : XX XXX €
    * bouton “Voir” : redirige vers la page du projet
* un bouton SignIn / SignUp permettant d'ouvrir la modale correspondante

## Une modale “Signin” :

* champ texte “email”
* champ text “password”
* bouton "valid"
```
En cas de succès du login, l'utilisateur est redirigé vers la home connectée
```

## Une modale “Signup” :

* champ texte “nom”
* champ texte “prénom”
* champ texte “email”
* champ texte “password”
* champ texte “confirm password”
* bouton "valid"
```
En cas de succès du login, l'utilisateur est redirigé vers la home connectée
```

## Une page “home connecté” :
* Un champ de recherche par nom de projet
* Une liste de projets (liste de projets par défaut OU résultat de la recherche)
  * Pour chaque projet :
    * nom
    * description
    * image
    * nombre total de likes
    * VALEUR TOTALE DES CONTRIBUTIONS ACTUELLES : XX XXX €
    * bouton “Voir” : redirige vers la page du projet
    * bouton "like" : ajoute un like sur le projet

## Un menu connecté (pour toutes les pages connectée) :
* Un bouton “mes projets” : => vers page “mes projets”
* Un bouton “mon compte” : => vers page “compte utilisateur”
* Un bouton “créer un projet” : => vers page “Edition / Création de projet”
* Un bouton SignOut : => deconnecte la session utilsateur et redirige vers la home public

## Un page “projet”
* nom
* description
* image
* nombre total de likes
* VALEUR TOTALE DES CONTRIBUTIONS ACTUELLES : XX XXX €
* liste des 10 meilleurs contributeurs avec pour chacun la valeur de sa contribution **[Seulement présent en mode connecté]**
* Champ Number “contribution” : valeur de la contribution €
* bouton “Contribute” OU "Edit my contribution" dans le cas où une contrib a dejà été faite par l'utilisateur : => envoie la valeur saisi dans “contribution” au server **[Seulement présent en mode connecté]**
* bouton “edit” : => la page Edition/Création de projet **[seulement présent si le projet appartient à l'utilisateur courant]**

## Une page “mes projets” :
* Liste de mes projets (ceux que 'utilisateur courant a créés)
  * Pour chaque projet :
    * nom
    * description
    * image
    * nombre total de likes
    * VALEUR TOTALE DES CONTRIBUTIONS ACTUELLES : XX XXX €
    * nombre total de likes
    * bouton “edit”

## Une page “Edition / Création de projet” :

```
NB : Quand on est en mode "création", le formulaire est vide.
```

* champ texte nom
* champ texte description
* champ texte image
* nombre total de likes
* liste des contributeurs (avec pour chacun la valeur de sa contribution)
* VALEUR TOTALE DES CONTRIBUTIONS ACTUELLES : XX XXX €
* bouton “validate” (valide la creation ou l’edition et envoie les données au server)
* bouton “delete” [seulement présent en mode édition]

```
NB : Attention : quand on supprime un projet, il faut supprimer ou desactiver les contributions  et les likes utilisateurs liés.
```

## Une page "compte utilisateur"

* Nom / Prénom
* Liste des contributions de l'utilisateur
* Liste des likes de l'utilisateur
* bouton "Modifier votre profil" : => vers la page “Edition de compte utilisateur”
* bouton “reset password” : => ouvre une modale "reset password"

## Une page “Edition de compte utilisateur” :
* champ texte “nom”
* champ texte “prénom”
* bouton “validate” (valide la modification et envoie au server)

## Une modale "reset password" :
* champ "old password"
* champ "new password"
* champ "confirm new password"
* bouton “validate” (valide la modification et envoie au server)

## API routes à mettre en place :

* User login : POST api/auth/create
* User registration : POST api/auth/login
* User update : POST api/user/:id
* Change User password : POST api/user/:pid/password
* Get all projects : GET api/projects
* Search projects by name : GET api/projects?search=xxx
* Get project by id : GET api/project/:pid
* Create project : POST api/project
* Update project : PUT api/project/:pid
* Delete project : DELETE api/project/:pid
* Get user's projects GET api/user/:uid/projects
* User like or unlike project POST api/project/:pid/like
* User contribute to project POST api/project/:pid/contribute
