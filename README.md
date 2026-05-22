# Dashboard Sport - Projet OpenClassrooms

## Introduction

Ce projet a été développé par **Sébastien VIOLANTE** dans le cadre de la formation *Concepteur d'application React* proposée par **OpenClassrooms**.  

Il s'agit du projet n°6 de la formation, qui consiste à réaliser un **dashboard de sport** connecté à une IA afin d'obtenir des propositions d'entraînement.

---

## 1. Installation des dépendances

```bash
npm install
```
## 2. Lancement du projet

### 2.1. Lancement du backend

Se rendre dans le dossier P6JS puis

```bash
yarn dev
```
### 2.2. Lancement du front

Se rendre dans le dossier sportsee puis

```bash
npm run dev
```
## 3. Utilisation du mode mock

Le projet est conçu pour permettre de basculer du mode api au mode mock. Le passage d'un mode à l'autre se fait en cliquant sur le bouton situé au milieu du footer.  
- Api signifie que le mode actuel est api. Les données de l'utilisateur sont récupérées depuis le backend.  
- Mock signifie que le mode actuel est mock.   Les données sont récupérées depuis un json situé dans /api/mock/activities.js ou api/mock/user.js, via des services (respectivement api/fetchFromMock/fetchMockActivities.js et api/fetchFromMock/fetchMockUser.js) qui simulent un backend (envoi d'une réponse json avec un délai de latence à 500ms)

Pour utiliser un autre mock, il suffit de remplacer les données dans les dossiers précités, et de charger l'image du user correspindant dans /public et la nommant par le prénom de user