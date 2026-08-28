# 📸 Cabine Photo

Un photobooth web complet, sans installation ni serveur applicatif : une seule page HTML
à héberger (GitHub Pages suffit), utilisable sur **iPhone, Android, tablette ou PC** —
il ne faut qu'un navigateur et une caméra.

Pensé pour les événements (anniversaires, mariages, fêtes) : les invités se
photographient, repartent avec une bande photo façon photomaton, imprimée sur place
ou reçue par e-mail.

---

## ✨ Fonctionnalités

### Prise de vue
- **Compte à rebours** réglable (3 / 5 / 10 s) avec affichage géant et effet flash
- **Mode Solo** (cadrage carré) ou **Mode Groupe** (cadre élargi 4:3, compte à rebours
  allongé pour prendre la pose à plusieurs) — caméra frontale, comme un vrai photobooth
- **Bandes de 1, 3 ou 4 photos** enchaînées automatiquement
- Cadre de délimitation blanc en direct pour soigner le cadrage

### Personnalisation
- **6 filtres** avec aperçu en temps réel : Normal, N&B, Sépia, Pop, Négatif, BD
  (appliqués pixel par pixel à la capture — compatibles tous navigateurs)
- **Décors** autour des photos : ballons 🎈, feux d'artifice 🎆, confettis 🎊,
  étoiles ✨ — ou votre propre **bandeau d'image** en tête de bande
- **Pied de bande** : intitulé de l'événement + date, ou image personnalisée
- Bande finale au format photomaton : marges et séparations blanches, papier blanc

### Impression (imprimante A4 classique)
- Système de **planche tampon** : chaque bande part dans une file d'attente ;
  quand la feuille A4 est pleine, la planche est archivée « prête à imprimer »
- **Remplissage optimal du papier photo** : 8 bandes de ~45 mm par feuille,
  6 tirages 10 × 7,5 cm pour les photos de groupe, calculé automatiquement
- **Miniatures des planches complètes** : impression et réimpression à la demande,
  repères de découpe en pointillés
- Impression possible d'une planche incomplète à tout moment

### Envoi par e-mail
- **Envoi direct sans aucune étape** : appui sur Envoyer → mail expédié avec la
  bande en pièce jointe → écran de confirmation → retour à l'accueil (5 s ou bouton)
- **Destinataires multiples** : saisie assistée adresse par adresse (complétion des
  domaines courants + adresses déjà utilisées), chaque destinataire reçoit son
  propre e-mail sans voir les adresses des autres
- Pièce jointe nommée `evenement_date_heure.jpg` pour un classement facile
- Sans configuration e-mail, repli automatique sur la feuille de partage du système

### Confort d'exploitation
- **Tout est mémorisé sur l'appareil** pendant l'événement : réglages, images
  chargées, texte de l'événement, planches d'impression, adresses utilisées —
  la page peut être fermée et rouverte sans rien perdre
- Ajout possible à l'écran d'accueil (iOS/Android) pour un usage plein écran

---

## 🛠️ Architecture

| Composant | Rôle |
|---|---|
| `index.html` | Toute l'application : HTML + CSS + JavaScript vanilla, zéro dépendance |
| GitHub Pages | Hébergement statique HTTPS (requis pour l'accès caméra) |
| `envoi-mail-apps-script.gs` | Micro-service d'envoi d'e-mails (Google Apps Script, gratuit) |
| IndexedDB / localStorage | Persistance locale des planches, réglages et images |

Aucune donnée ne transite par un serveur applicatif : les photos restent sur
l'appareil, sauf celles explicitement envoyées par e-mail.

---

## 🚀 Déployer votre propre instance

> Pas de démo publique : l'envoi d'e-mails s'appuie sur un compte Gmail dédié,
> qu'il serait déraisonnable d'exposer. Le déploiement prend ~10 minutes.

### 1. Le site
1. Forkez ou copiez ce dépôt (le fichier `index.html` suffit)
2. Settings → Pages → Source : *Deploy from a branch* → branche `main`, dossier `/ (root)`
3. Votre cabine est en ligne sur `https://votre-pseudo.github.io/Photobooth/`

### 2. L'envoi d'e-mails (facultatif)
1. Créez de préférence un **compte Gmail dédié** à la cabine
2. Sur [script.google.com](https://script.google.com), avec ce compte, créez un
   projet et collez le contenu de `envoi-mail-apps-script.gs`
3. Déployer → Nouveau déploiement → **Application Web** →
   *Exécuter en tant que : Moi* · *Accès : Tout le monde* → autorisez les permissions
4. Copiez l'URL se terminant par `/exec` et collez-la dans `index.html` :
   ```js
   const MAIL_ENDPOINT='https://script.google.com/macros/s/…/exec';
   ```
5. Test rapide : ouvrez `…/exec?test=votre@adresse` dans un navigateur —
   vous devez recevoir un mail « Cabine Photo »

Limite : ~100 e-mails/jour avec un compte Gmail personnel.

### 3. Le jour J
1. Ouvrez le site, chargez le bandeau et saisissez l'intitulé de l'événement —
   tout restera proposé par défaut pour toute la session
2. Posez l'appareil face aux invités (un PC portable relié à l'imprimante A4
   fait une excellente borne, F11 pour le plein écran)
3. Les invités enchaînent : photo → planche et/ou e-mail → l'app revient
   à l'accueil toute seule

---

## 🔒 Confidentialité

- Photos traitées **entièrement dans le navigateur**, jamais téléversées
- Stockage local uniquement (effaçable via les boutons Vider / 🗑️ de l'app)
- E-mails expédiés individuellement : aucun invité ne voit l'adresse des autres
- Les adresses mémorisées pour la complétion restent sur l'appareil

## 📄 Licence

Projet personnel — libre à vous de le réutiliser et de l'adapter pour vos événements.
