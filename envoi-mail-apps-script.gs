/**
 * CABINE PHOTO — Service d'envoi d'e-mails (Google Apps Script)
 * ==============================================================
 * Permet à l'application photobooth d'envoyer directement les bandes
 * photo par e-mail, sans étape de sélection pour l'utilisateur.
 *
 * MISE EN PLACE (5 minutes) :
 * 1. Ouvrez https://script.google.com avec votre compte Google
 *    → « Nouveau projet » → collez ce code (remplacez le contenu).
 * 2. Cliquez « Déployer » → « Nouveau déploiement » →
 *    type « Application Web » avec :
 *      - Exécuter en tant que : Moi
 *      - Qui a accès : Tout le monde
 *    → « Déployer » (autorisez les permissions demandées).
 * 3. Copiez l'URL qui se termine par « /exec ».
 * 4. Dans photobooth (index.html), collez cette URL dans la constante
 *    MAIL_ENDPOINT en haut du <script> :
 *      const MAIL_ENDPOINT='https://script.google.com/macros/s/…/exec';
 * 5. Commitez sur GitHub : l'envoi direct est actif.
 *
 * LIMITES : ~100 e-mails/jour avec un compte Gmail personnel
 * (1 500/jour avec un compte Google Workspace).
 * Les e-mails partent depuis votre adresse Gmail.
 */

/**
 * DIAGNOSTIC : ouvrez l'URL /exec dans un navigateur.
 * - « Service Cabine Photo actif » s'affiche → déploiement OK.
 * - Ajoutez ?test=votre@adresse à l'URL → envoie un mail de test
 *   (vérifie les autorisations et la chaîne d'envoi complète).
 */
function doGet(e) {
  if (e && e.parameter && e.parameter.test) {
    try {
      MailApp.sendEmail({
        to: e.parameter.test,
        name: 'Cabine Photo',
        subject: 'Test — Cabine Photo',
        body: 'Le service d\'envoi de la cabine photo fonctionne !'
      });
      return ContentService.createTextOutput('OK : mail de test envoy\u00E9 \u00E0 ' + e.parameter.test);
    } catch (err) {
      return ContentService.createTextOutput('ERREUR : ' + err);
    }
  }
  return ContentService.createTextOutput(
    'Service Cabine Photo actif. Ajoutez ?test=votre@adresse \u00E0 l\'URL pour envoyer un mail de test.'
  );
}

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);

    // Garde-fous minimaux
    if (!d.to || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(d.to)) {
      return ContentService.createTextOutput('ERREUR : adresse invalide');
    }
    if (!d.image || d.image.indexOf('data:image/jpeg;base64,') !== 0) {
      return ContentService.createTextOutput('ERREUR : image manquante');
    }

    var base64 = d.image.split(',')[1];
    var blob = Utilities.newBlob(
      Utilities.base64Decode(base64),
      'image/jpeg',
      d.filename || 'bande-photo.jpg'
    );

    var evenement = d.event || 'Cabine photo';

    MailApp.sendEmail({
      to: d.to,
      name: 'Cabine Photo',
      subject: '\uD83D\uDCF8 Vos photos — ' + evenement,
      body: 'Bonjour !\n\n' +
            'Voici vos photos de \u00AB ' + evenement + ' \u00BB en pi\u00E8ce jointe.\n\n' +
            '\u00C0 bient\u00F4t !',
      attachments: [blob]
    });

    return ContentService.createTextOutput('OK');
  } catch (err) {
    return ContentService.createTextOutput('ERREUR : ' + err);
  }
}
