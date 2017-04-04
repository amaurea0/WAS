# Travailler à plusieurs avec github
	
## Principes généraux
Le travail se push toujours sur une branche à part, avant de merger sur la branche dev. La mise à jour du master se fait seulement lorsque qu'une version est prête sur la branche dev.

## Création d'un repository local :

- Création d'un dossier en local 

- Initialisation de git dans ce dossier : 
	- `git init`

- Clone du repository distant (le nom du repository distant sera origin par défaut) : 
	- `git clone https://github.com/amaurea0/WAS.git`

- Si vous n'avez pas cloné un dépôt existant et voulez connecter votre dossier à votre dépôt sur un serveur distant, vous devez l'ajouter avec : 
	- `git remote add origin https://github.com/amaurea0/WAS.git`

- Affichage des remotes 
	- `git remote -v`
	
- Pour créer une branche locale qui suit une branche existante dans le dépôt distant : 
	- `git checkout -b [branche] origin/[branche]`
	- `git checkout -b dev origin/dev` : on travaille à partir de la branche dev et non du master
	
## Commencer à travailler en local

- Création d'une branche  !! Ne jamais toucher à la branche master ou la branche dev en local pour toujours partir de la même base !!
	- `git checkout -b BRANCH_NAME`

- Travailler sur cette branche, ne pas hésiter à en créer une pour chaque fonctionnalité

- Pour vérifier sur quelle branche on est : 
	- `git branch`

- Pour changer de branche : 
	- `git checkout dev`

- Pour voir le statut des fichiers du repository (suivis, commités, ignorés): 
	- `git status`

- Pour ignorer le suivi de fichiers avec git : les ajouter dans le fichiers .gitignore

## Sauvegarde de son travail en local

- Ajouter des fichier à la zone de stagging
	- `git add .` pour ajouter tout les fichiers 
	- `git add MON_FICHIER` pour ajouter un fichier en particulier

- Penser à commiter chaque fois qu'une fonctionnalité est terminée (le commit ne pas contenir, j'ai fait ceci ET cela)
	- `git commit -m "Description du commit"` 


## Mise en commun de son travail

- Avant de pusher sur le repository distant, on doit vérifier que notre branche dev est à jour (quelqu'un a peut-être mergé de nouvelles fonctionnalités pendant que l'on travaillait sur notre branche)
	- `git pull origin dev` 

Afin d'éviter les conflits si le dev à été mis à jour pendant que l'on travaillait, il faut rebaser les changement sur notre branche. En le faisant soi-même on évite de monopoliser le reste de l'équipe. On règle les conflits et on vérifie que ce que l'on voulait implémenter fonctionne toujours.

- On peut commencer par pusher la branche telle quelle histoire d'avoir tout de même une trace avant de rebaser : 
	- `git push origin BRANCH_NAME`

Cela créé la branch BRANCH_NAME dans le repository distant.

- On rebase ensuite les changement du master sur notre branche en local : 

	- `git rebase dev BRANCH_NAME`

- On règle les éventuels conflits en modifiant à la main les fichiers concernés.

- On push sur le repository distant, avec l'option -f car on vient de modifier l'historique des commits de la branche.
	- `git push -f origin BRANCH_NAME`

- Faire une pull request sur le dev depuis github

## Mise à jour du dev

- Toute l'équipe peut regarder les nouveaux commit. Si il y a des conflits on les résoud ensemble.

- Une fois que les conflits sont réglés, on merge sur le master et on supprime la branche sur github.

- Chacun met à jour son master en local avec git pull.

- Suppression de notre branche locale une fois qu'elle a été intégrée : 
	- `git branch -d BRANCH_NAME`
	

## Mise à jour du master

- Faire un merge sur le master une fois que l'on a une version stable sur la branche dev
