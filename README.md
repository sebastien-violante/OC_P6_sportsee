# 👟 SPORTSEE

![Page de dashbord de l'application Sportsee](https://raw.githubusercontent.com/sebastien-violante/OC_P6_sportsee/main/public/pictures/screens/screen-github-1.png)

# Projet n°6 de la formation Concepteur d'application React
## Développer un dashboard de sport avec React et React Router

Dans ce projet, il s'agit de développer une nouvelle version d'un site de coaching de course à pieds, à partir de maquettes, le tout en **React**.

Le back est fourni et c'est avec **Postman** qu'il faut faire ses premières armes pour le requêter, avant de mettre en place **des mocks** et un système permettant de basculer en live du mode api au mode mock. Pour les graphiques, c'est **recharts** qui rentre en jeu.

Le plus ? Dans ce projet, j'implémente l'**API Mistral** pour créer un **plan d'entrainement** à partir des statistiques des sessions de course à pieds déjà réalisées et de desiderats de l'utilisateur. Et ça fonctionne très bien !

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![REST API](https://img.shields.io/badge/REST-API-25A162)
![Mistral AI](https://img.shields.io/badge/Mistral_AI-FF7000?logo=mistralai&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-8884D8?logo=chartdotjs&logoColor=white)

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