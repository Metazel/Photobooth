# 📸 Cabine Photo

Un photobooth web complet, sans installation ni serveur applicatif : quelques fichiers
statiques à héberger (GitHub Pages suffit), utilisables sur **iPhone, iPad, Android ou
PC** — il ne faut qu'un navigateur et une caméra.

Pensé pour les événements (anniversaires, mariages, fêtes) : les invités se
photographient, repartent avec une bande photo façon photomaton, imprimée sur place
ou reçue par e-mail. **Fonctionne sans réseau** une fois la page visitée.

---

## ✨ Fonctionnalités

### Prise de vue
- **Compte à rebours** réglable (3 / 5 / 10 s), affichage géant et effet flash
- **Mode Solo** (cadrage carré 1:1) ou **Mode Groupe** (cadre élargi 4:3 et compte à
  rebours allongé pour poser à plusieurs) — caméra frontale, comme un vrai photobooth
- **Bandes de 1, 3 ou 4 photos** enchaînées automatiquement
- **Cadrage fidèle** : l'aperçu montre tout le champ de la caméra et la capture prend
  exactement ce que délimite le rectangle blanc

### Filtres
Six filtres avec aperçu en temps réel : Normal, N&B, Sépia, Pop, Négatif et BD,
appliqués pixel par pixel à la capture, donc identiques sur tous les navigateurs.

### Cadres — bibliothèque filtrée par mode
Galerie de vignettes cochables, avec aperçu en direct dans le viseur. Chaque cadre se
superpose à la photo et empiète sur ses bords.

| Type | Cadres |
|---|---|
| Dessinés par code (tous modes) | Pellicule · Néon · Polaroïd · Guirlande · Confettis · Graffiti · Art déco · Cœurs |
| Dessinés par code (Solo) | Vignette · Star |
| Dessinés par code (Groupe) | Cinéma · Bandeau *(reprend l'intitulé de l'événement)* |
| Images du dépôt (`cadres/`) | déclarées dans la table `CADRES_IMG` du script |

Les cadres dessinés par code ne pèsent rien et restent nets à n'importe quelle taille
d'impression. Le bouton **＋ Ajouter un cadre personnalisé** intègre vos propres PNG à
la bibliothèque, en nombre illimité : on les nomme, ils s'affichent comme les autres et
se suppriment d'un ✕. Ils sont rattachés au mode actif et conservés en IndexedDB.

### Habillage de la bande — choix exclusif
Une galerie propose, au choix :
- le **texte saisi** (intitulé de l'événement + date) imprimé en pied de bande ;
- ou un **bandeau image**, positionnable **en haut** ou **en pied**.

Les bandeaux du dépôt vivent dans `bandeaux/` et sont déclarés dans
`bandeaux/index.json`. Le bouton **＋ Ajouter un bandeau** permet d'en charger d'autres
à chaud, conservés eux aussi d'une session à l'autre.

### Décor
Emoji aux quatre coins de chaque photo : ballons 🎈, feux d'artifice 🎆,
confettis 🎊, étoiles ✨.

### Impression (imprimante A4 classique)
- **Planche tampon** : chaque bande part dans une file d'attente ; quand la feuille A4
  est pleine, la planche est archivée « prête à imprimer » et une nouvelle démarre
- **Miniatures des planches complètes** : impression, réimpression, envoi ou suppression
- **Remplissage optimal du papier** : 3 bandes de 4 photos par feuille, davantage pour
  les formats courts — la disposition est calculée en millimètres
- **Une planche = une image = une page** : la planche est composée en une seule image
  à ~200 dpi, ce qui interdit tout débordement sur une seconde page
- Repères de découpe en pointillés, impression possible d'une planche incomplète

### Envoi par e-mail
- **Choix de ce qui part** : la bande qui vient d'être prise, ou n'importe quelle
  planche déjà en mémoire, sélectionnée depuis sa vignette (bouton ✉️)
- **Destinataires multiples** : on tape le début d'une adresse, les adresses déjà
  utilisées et les domaines courants sont proposés, un tap l'ajoute en puce
- **Envoi direct sans aucune étape** → écran de confirmation → retour à l'accueil au
  bout de 5 s ou via le bouton
- Chaque destinataire reçoit **son propre e-mail** : personne ne voit les autres adresses
- **File d'attente hors ligne** : sans réseau, les envois sont conservés et partent
  automatiquement à la reconnexion ; un bandeau d'accueil indique le nombre en attente
- Pièce jointe nommée `evenement_date_heure.jpg`

### Fonctionnement hors ligne
Un service worker met en cache l'application, les cadres, les bandeaux et les polices.
Après **une seule visite avec du réseau**, tout fonctionne sans connexion, y compris
après fermeture et réouverture. Le manifeste en fait une application installable en
plein écran depuis l'écran d'accueil.

### Confort d'exploitation
Réglages, cadre, bandeau, intitulé, planches et adresses sont mémorisés sur l'appareil :
la page peut être fermée et rouverte sans rien perdre.

---

## 📁 Arborescence du dépôt

```
index.html                 l'application (HTML + CSS + JS, sans dépendance)
sw.js                      service worker (disponibilité hors ligne)
manifest.webmanifest       application installable
icon-192.png / icon-512.png
cadres/                    cadres images + thumbs/
bandeaux/                  bandeaux images + thumbs/ + index.json
envoi-mail-apps-script.gs  micro-service d'envoi d'e-mails (à déployer chez Google)
README.md
```

Noms de fichiers et casse doivent être respectés : GitHub Pages est sensible à la casse.

**Ajouter un bandeau au dépôt** : déposez l'image dans `bandeaux/`, sa vignette
facultative dans `bandeaux/thumbs/` sous le même nom, puis déclarez-la dans
`bandeaux/index.json` :

```json
[
  {"f":"mon-bandeau.jpg", "label":"Nom affiché"}
]
```

**Ajouter un cadre au dépôt** : même principe dans `cadres/`, avec une entrée dans la
table `CADRES_IMG` en tête du script.

Après toute modification des fichiers, incrémentez `CACHE` dans `sw.js`
(`cabine-photo-v1` → `v2`) pour que les appareils récupèrent la nouvelle version.

---

## 🖼️ Formats des images

| Élément | Rendu | Image à fournir | Format |
|---|---|---|---|
| Bandeau (haut ou pied) | 560 px de large | **1120 px de large** | JPG ou PNG |
| Cadre Solo | 560 × 560 px | **1120 × 1120 px** | **PNG à centre transparent** |
| Cadre Groupe | 560 × 420 px | **1120 × 840 px** | **PNG à centre transparent** |

La hauteur des bandeaux est libre : elle suit le ratio de l'image, qui s'affiche en
entier sans recadrage. Les cadres, eux, sont étirés exactement aux bords de la photo —
respectez le ratio, et prévoyez une bordure d'environ 12 % de la largeur pour ne pas
couvrir les visages. Un JPEG ne convient pas comme cadre, faute de transparence.
Au-delà de 1400 px de large, l'application redimensionne automatiquement.

---

## 🛠️ Architecture

| Composant | Rôle |
|---|---|
| `index.html` | Toute l'application, JavaScript vanilla, zéro dépendance |
| `sw.js` + manifeste | Cache hors ligne et installation en plein écran |
| GitHub Pages | Hébergement statique HTTPS (requis pour la caméra et le service worker) |
| `envoi-mail-apps-script.gs` | Micro-service d'envoi d'e-mails (Google Apps Script, gratuit) |
| IndexedDB | Planches, cadres et bandeaux personnalisés, file d'attente d'e-mails |
| localStorage | Réglages de session et adresses utilisées |

Aucune donnée ne transite par un serveur applicatif : les photos restent sur
l'appareil, sauf celles explicitement envoyées par e-mail.

---

## 🚀 Déployer votre propre instance

> Pas de démo publique : l'envoi d'e-mails s'appuie sur un compte Gmail dédié,
> qu'il serait déraisonnable d'exposer. Le déploiement prend une dizaine de minutes.

### 1. Le site
1. Copiez **tout le contenu de l'archive** à la racine du dépôt — `index.html` seul ne
   suffit pas, les dossiers `cadres/` et `bandeaux/` et le fichier `sw.js` sont requis
2. Settings → Pages → Source : *Deploy from a branch* → branche `main`, dossier `/ (root)`
3. Votre cabine est en ligne sur `https://votre-pseudo.github.io/Photobooth/`

### 2. L'envoi d'e-mails (facultatif)
1. Créez de préférence un **compte Gmail dédié** à la cabine
2. Sur [script.google.com](https://script.google.com), avec ce compte, créez un projet
   et collez le contenu de `envoi-mail-apps-script.gs`
3. Déployer → Nouveau déploiement → **Application Web** →
   *Exécuter en tant que : Moi* · *Accès : Tout le monde* → autorisez les permissions
   (l'écran « Google n'a pas validé cette application » est normal pour un script
   personnel : Paramètres avancés → Accéder au projet)
4. Copiez l'URL se terminant par `/exec` et collez-la dans `index.html` :
   ```js
   const MAIL_ENDPOINT='https://script.google.com/macros/s/…/exec';
   ```
5. Test : ouvrez `…/exec?test=votre@adresse` — vous devez recevoir un mail « Cabine Photo »

Limite : ~100 e-mails/jour avec un compte Gmail personnel. Après toute modification du
script, redéployez en **Nouvelle version**, sinon l'ancienne reste servie.

### 3. Préparation de la borne (à faire chez soi, avec du réseau)
1. Ouvrez le site sur l'appareil-borne, autorisez la caméra, **rechargez une fois**
   pour activer le cache hors ligne, puis ajoutez la page à l'écran d'accueil
2. Réglez mode, cadre, bandeau et intitulé : tout reste mémorisé pour l'événement
3. Faites une bande test → **+ Planche** → **Imprimer** : le dialogue doit annoncer
   **1 page**, avec l'échelle sur « 100 % » plutôt que « Ajuster à la page »
4. Faites un envoi test vers votre propre adresse (vérifiez le dossier spam)
5. **Vérifiez le mode avion** : coupez le réseau et relancez l'application — elle doit
   se lancer et imprimer normalement

### 4. Salle sans réseau
- **Imprimante en Wi-Fi Direct** : activez le mode sur l'imprimante, puis rejoignez son
  réseau depuis l'appareil (Réglages → Wi-Fi). AirPrint la détecte ensuite normalement.
  Faites ce couplage avant le jour J, il reste mémorisé.
- **Sur un appareil cellulaire**, iOS route en général le trafic Internet par la 4G tout
  en gardant le Wi-Fi pour l'impression locale : l'envoi d'e-mails peut donc continuer
  de fonctionner. Sinon, aucune perte : les envois sont mis en file et partent à la
  reconnexion.
- Prévoyez l'alimentation secteur : la caméra vide une batterie très vite.

---

## 🔒 Confidentialité

- Photos traitées **entièrement dans le navigateur**, jamais téléversées
- Stockage local uniquement (effaçable via les boutons Vider / ✕ de l'application)
- E-mails expédiés individuellement : aucun invité ne voit l'adresse des autres
- Les adresses mémorisées pour la complétion restent sur l'appareil

## 📄 Licence

Projet personnel — libre à vous de le réutiliser et de l'adapter pour vos événements.
