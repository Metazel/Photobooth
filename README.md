# 📸 Cabine Photo

Un photobooth web complet, sans installation ni serveur applicatif : quelques fichiers
statiques à héberger (GitHub Pages suffit), utilisable sur **iPhone, Android, tablette
ou PC** — il ne faut qu'un navigateur et une caméra.

Pensé pour les événements (anniversaires, mariages, fêtes) : les invités se
photographient, repartent avec une bande photo façon photomaton, imprimée sur place
ou reçue par e-mail.

---

## ✨ Fonctionnalités

### Prise de vue
- **Compte à rebours** réglable (3 / 5 / 10 s), affichage géant et effet flash
- **Mode Solo** (cadrage carré 1:1) ou **Mode Groupe** (cadre élargi 4:3 et compte à
  rebours allongé pour poser à plusieurs) — caméra frontale, comme un vrai photobooth
- **Bandes de 1, 3 ou 4 photos** enchaînées automatiquement
- **Cadrage fidèle** : l'aperçu montre tout le champ de la caméra et la capture prend
  exactement ce que délimite le rectangle blanc — ce que l'on voit est ce que l'on obtient

### Filtres
Six filtres avec aperçu en temps réel : Normal, N&B, Sépia, Pop, Négatif et BD.
Ils sont appliqués pixel par pixel à la capture, donc identiques sur tous les navigateurs.

### Cadres — bibliothèque intégrée
Galerie de vignettes cochables, **filtrée automatiquement selon le mode**, avec aperçu
en direct dans le viseur. Chaque cadre se superpose à la photo et empiète sur ses bords.

| Type | Cadres |
|---|---|
| Dessinés par code (tous modes) | Pellicule · Néon · Polaroïd · Guirlande · Confettis · Graffiti · Art déco · Cœurs |
| Dessinés par code (Solo) | Vignette · Star |
| Dessinés par code (Groupe) | Cinéma · Bandeau *(reprend l'intitulé de l'événement)* |
| Images du dépôt (dossier `cadres/`) | Rap 13 · Stade OM · Vieux-Port · Marseille 13 (Solo) · Marseille 13 (Groupe) |

Les cadres dessinés par code ne pèsent rien et restent nets à n'importe quelle taille
d'impression. Les cadres images sont chargés en vignette légère, la version pleine
taille n'étant récupérée qu'à la sélection.

### Cadres personnalisés
Le bouton **＋ Ajouter un cadre personnalisé** intègre vos propres PNG à la
bibliothèque : on leur donne un nom, ils apparaissent comme les autres tuiles et se
suppriment d'un ✕. Ils sont rattachés au mode actif lors de l'ajout (Solo ou Groupe),
en nombre illimité, et conservés en IndexedDB d'une session à l'autre.

### Décors et habillage de la bande
- **Décor emoji** aux quatre coins de chaque photo : ballons 🎈, feux d'artifice 🎆,
  confettis 🎊, étoiles ✨
- **Bandeau d'image** personnalisé en tête de bande
- **Pied de bande** : intitulé de l'événement + date, ou image personnalisée
- Rendu final au format photomaton : papier blanc, marges et séparations

### Impression (imprimante A4 classique)
- **Planche tampon** : chaque bande part dans une file d'attente ; quand la feuille A4
  est pleine, la planche est archivée « prête à imprimer » et une nouvelle démarre
- **Miniatures des planches complètes** : impression et réimpression à la demande,
  suppression individuelle
- **Remplissage optimal du papier** : 3 bandes de 4 photos par feuille, davantage pour
  les formats courts — la disposition est calculée en millimètres
- **Une planche = une image = une page** : la planche est composée en une seule image
  à ~200 dpi, ce qui interdit tout débordement sur une seconde page
- Repères de découpe en pointillés, impression possible d'une planche incomplète

### Envoi par e-mail
- **Destinataires multiples** : on tape le début d'une adresse, les adresses déjà
  utilisées et les domaines courants sont proposés, un tap l'ajoute en puce, puis un
  seul envoi dessert tout le monde
- **Envoi direct sans aucune étape** : appui sur Envoyer → mail expédié avec la bande
  en pièce jointe → écran de confirmation nommant les destinataires → retour à
  l'accueil au bout de 5 s ou via le bouton
- Chaque destinataire reçoit **son propre e-mail** : personne ne voit les adresses des autres
- Pièce jointe nommée `evenement_date_heure.jpg`
- Sans service e-mail configuré, repli automatique sur la feuille de partage du système

### Confort d'exploitation
- **Tout est mémorisé sur l'appareil** pendant l'événement : réglages, cadre, images
  chargées, intitulé, planches d'impression, adresses utilisées — la page peut être
  fermée et rouverte sans rien perdre
- Ajout possible à l'écran d'accueil (iOS/Android) pour un usage plein écran

---

## 📁 Arborescence du dépôt

```
index.html                          l'application (HTML + CSS + JS, sans dépendance)
cadres/
  solo-rap-street-art.png           cadres images pleine taille
  solo-stade-om.png
  solo-vieux-port.png
  solo-marseille-13.png
  groupe-marseille-13.png
  thumbs/                           mêmes fichiers en vignettes légères
    …
envoi-mail-apps-script.gs           micro-service d'envoi d'e-mails (à déployer chez Google)
```

Les noms de fichiers et leur casse doivent être respectés à la lettre : GitHub Pages
est sensible à la casse. Pour ajouter un cadre image au dépôt, déposez le PNG dans
`cadres/` et sa vignette dans `cadres/thumbs/`, puis déclarez-le dans la table
`CADRES_IMG` en tête du script. Pour un usage ponctuel, préférez l'ajout de cadre
personnalisé directement depuis l'application.

---

## 🖼️ Formats des images à charger

| Élément | Rendu | Image à fournir | Format |
|---|---|---|---|
| Bandeau de tête | 560 × 150 px | **1120 × 300 px** | JPG ou PNG |
| Pied de bande | 560 × 132 px | **1120 × 264 px** | JPG ou PNG |
| Cadre Solo | 560 × 560 px | **1120 × 1120 px** | **PNG à centre transparent** |
| Cadre Groupe | 560 × 420 px | **1120 × 840 px** | **PNG à centre transparent** |

Les cadres sont étirés exactement aux bords de la photo : respectez le ratio, sinon
l'image sera déformée. Un JPEG ne convient pas pour un cadre, faute de transparence.
Bandeau et pied sont recadrés en « cover » (rognage centré). Au-delà de 1400 px de
large, l'application redimensionne automatiquement.

---

## 🛠️ Architecture

| Composant | Rôle |
|---|---|
| `index.html` | Toute l'application : HTML + CSS + JavaScript vanilla, zéro dépendance |
| `cadres/` | Cadres images de la bibliothèque et leurs vignettes |
| GitHub Pages | Hébergement statique HTTPS (requis pour l'accès caméra) |
| `envoi-mail-apps-script.gs` | Micro-service d'envoi d'e-mails (Google Apps Script, gratuit) |
| IndexedDB | Planches d'impression et cadres personnalisés |
| localStorage | Réglages de session, images d'habillage, adresses utilisées |

Aucune donnée ne transite par un serveur applicatif : les photos restent sur
l'appareil, sauf celles explicitement envoyées par e-mail.

---

## 🚀 Déployer votre propre instance

> Pas de démo publique : l'envoi d'e-mails s'appuie sur un compte Gmail dédié,
> qu'il serait déraisonnable d'exposer. Le déploiement prend une dizaine de minutes.

### 1. Le site
1. Forkez ou copiez ce dépôt — **il faut `index.html` *et* le dossier `cadres/`**,
   sinon les cadres images apparaîtront vides
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
5. Test : ouvrez `…/exec?test=votre@adresse` dans un navigateur — vous devez recevoir
   un mail « Cabine Photo »

Limite : ~100 e-mails/jour avec un compte Gmail personnel.
Après toute modification du script, redéployez en **Nouvelle version**, sinon l'ancienne
reste servie sur la même URL.

### 3. Le jour J
1. Ouvrez le site, chargez le bandeau, choisissez le cadre et saisissez l'intitulé de
   l'événement — tout restera proposé par défaut pour toute la session
2. Posez l'appareil face aux invités (un PC portable relié à l'imprimante A4 fait une
   excellente borne, F11 pour le plein écran)
3. Les invités enchaînent : photo → planche et/ou e-mail → l'app revient à l'accueil
   toute seule
4. Dans le dialogue d'impression, gardez l'échelle sur « 100 % » plutôt que
   « Ajuster à la page »

---

## 🔒 Confidentialité

- Photos traitées **entièrement dans le navigateur**, jamais téléversées
- Stockage local uniquement (effaçable via les boutons Vider / ✕ de l'application)
- E-mails expédiés individuellement : aucun invité ne voit l'adresse des autres
- Les adresses mémorisées pour la complétion restent sur l'appareil

## 📄 Licence

Projet personnel — libre à vous de le réutiliser et de l'adapter pour vos événements.
