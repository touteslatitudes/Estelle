document.addEventListener("DOMContentLoaded", function (event) {
  
  // ================================================== Gestion du panneau principal

  let openedA = false; // etat du bloc A (fermé par défaut)
  let titreA = "MANIFESTE"; // rubrique du bloc A
  let titreB = "PRODUCTIONS"; // rubrique du bloc B
  let titreC = "RECHERCHES"; // rubrique du bloc C

  const heightBClosed = 300; // hauteur du bloc B et C fermés

  const displayBlocA = (e, selectedBloc) => {
    // le bloc A a 2 états ouvert ou fermé
    // lorsqu'on clique sur le titre du bloc si le bloc est fermé :
    // on ferme les blocs B et C en réduisant la taille du div
    // on charge le texte du bloc selectionné par le lien cliqué

    // si le bloc A est ouvert, on ferme le bloc :
    // on vide le contenu du bloc A et on reduit la taille du div A
    // on ouvre les blocs B et C en restaurant la taille des blocs

    // si le bloc selectionné (manifeste/productions/recherches) est différent du Bloc A courant
    // alors il faut ouvrir le bloc A et modifier son contenu.
    // Le titre du bloc remplacé doit prendre la place du nouveau bloc.

    if (selectedBloc !== "A") {
      // on vient de selectionner B ou C
      openedA = false; // pour imposer l'ouverture du bloc A
    }

    if (openedA) {
      // Bloc A ouvert - fermeture du bloc A
      let heightA = document.getElementById("top-panel").clientHeight;
      let heightAClosed = heightA - heightBClosed;
      document.getElementById("top-panel").style.height = heightAClosed + "px";
      // effacement du contenu
      document.getElementById("content-A").innerHTML = "";
      // ouverture des blocs B et C
      let heightB = document.getElementById("bottom-panel").clientHeight;
      let heightBOpened = heightB + heightBClosed;
      document.getElementById("bottom-panel").style.height =
        heightBOpened + "px";
      // enregistrement de l'état
      openedA = false;
    } else {
      // Bloc A fermé - Ouverture du bloc A
      var content = "";

      // quels titres pour les blocs ?
      if (selectedBloc === "B") {
        // on a designé le bloc B
        if (titreA === "RECHERCHES") {
          // affichage de PRODUCTIONS
          titreA = "PRODUCTIONS";
          titreB = "MANIFESTE";
          titreC = "RECHERCHES";
        } else {
          // permutation des titres entre PRODUCTIONS et MANIFESTE
          tmp = titreA;
          titreA = titreB;
          titreB = tmp;
        }
      } else if (selectedBloc === "C") {
        // on a designé le bloc C
        if (titreA === "PRODUCTIONS") {
          // affichage de RECHERCHES
          titreA = "RECHERCHES";
          titreB = "PRODUCTIONS";
          titreC = "MANIFESTE";
        } else {
          // permutation des titres entre RECHERCHES et MANIFESTE
          tmp = titreA;
          titreA = titreC;
          titreC = tmp;
        }
      }

      // lecture du contenu du bloc A
      const id = titreA.toLowerCase() + "-content";
      content = document.getElementById(id).innerHTML;

      // modification du titre du bloc A
      document.getElementById("titre-A").innerHTML = titreA;
      // ouverture du bloc A
      const heightA = document.getElementById("top-panel").clientHeight;
      const heightAOpened = heightA + heightBClosed;
      // modification du titre des bloc B et C
      document.getElementById("titre-B").innerHTML = titreB;
      document.getElementById("titre-C").innerHTML = titreC;
      // fermeture des blocs B et C
      document.getElementById("bottom-panel").style.height =
        heightBClosed + "px";
      // ouverture du bloc A
      document.getElementById("top-panel").style.height = heightAOpened + "px";
      // chargement du contenu selectionne dans le bloc A
      document.getElementById("content-A").innerHTML = content;
      // enregistrement de l'état
      openedA = true;
    }
  };


  // gestion des clicks sur les titres du panneau principal

  // ouverture ou  fermeture du bloc A
  var labelA = document.getElementById("titre-A");
  labelA.addEventListener("click", (event) => {
    displayBlocA(event, "A");
  });

  // chargement du bloc A avec le contenu productions
  var labelB = document.getElementById("titre-B");
  labelB.addEventListener("click", (event) => {
    displayBlocA(event, "B");
  });

  // chargement du bloc A avec le contenu recherches
  var labelC = document.getElementById("titre-C");
  labelC.addEventListener("click", (event) => {
    displayBlocA(event, "C");
  });

  // ================================================== Gestion du sidebar

  let openedBlock = ""; // nom du bloc ouvert

  const heightSidebar = document.getElementById("sidebar").clientHeight;

  const heighEInit = document.getElementById("bloc-E").clientHeight + 4; // PROJET
  const heighFInit = document.getElementById("bloc-F").clientHeight + 4; // ENTREVUES
  const heighGInit = document.getElementById("bloc-G").clientHeight + 4; // INITIATIVES
  const heighHInit = document.getElementById("bloc-H").clientHeight + 4; // CONTACTS

  const heightEClosed = heighEInit;
  const heightFClosed = document.getElementById("titre-F").clientHeight;
  const heightGClosed = document.getElementById("titre-G").clientHeight;

  const heightHClosed = heighHInit;

  const heightEOpened =
    heightSidebar - heightFClosed - heightGClosed - heightHClosed;
  const heightFOpened =
    heightSidebar - heightEClosed - heightGClosed - heightHClosed;
  const heightGOpened =
    heightSidebar - heightEClosed - heightFClosed - heightHClosed;
  const heightHOpened =
    heightSidebar - heightEClosed - heightFClosed - heightGClosed;

  const fontSizeTitle = window.getComputedStyle(
    document.getElementById("titre-E")
  ).fontSize; // PROJET, ENTREVUES ou INITIATIVES
  const fontSizeHTitle = window.getComputedStyle(
    document.getElementById("titre-H")
  ).fontSize; // CONTACTS

  const displaySidebar = (e, selectedBloc) => {
    // les blocs E (PROJET), F (ENTREVUES), G (INITIATIVES) et H (CONTACTS)
    // ont une taille à l'initialisation et lorsqu'ils sont ouverts ou fermés
    //
    // lorsqu'on clique sur le titre d'un bloc il faut :
    // ouvrir le bloc et charger son contenu
    // fermer les autres blocs.

    // fermeture du bloc précedement ouvert
    if (openedBlock) {
      switch (openedBlock) {
        case "E":
          break;
        case "F":
          // ENTREVUES
          document.getElementById("content-F").innerHTML = "";
          break;
        case "G":
          // INITIATIVES
          document.getElementById("content-G").innerHTML = "";
          break;
        case "H":
          // CONTACTS
          // raz du contenu
          document.getElementById("content-H").innerHTML = "";
          // changement de taille de police
          document.getElementById("titre-H").style.fontSize = fontSizeHTitle;
          // suppression du scrollbar
          document.getElementById("bloc-H").classList.remove("hscroll");
          break;
        default:
          break;
      }

      document.getElementById("bloc-H").style.height = heightHClosed + "px";
      document.getElementById("bloc-G").style.height = heighGInit + "px";
      document.getElementById("bloc-F").style.height = heighFInit + "px";
      document.getElementById("bloc-E").style.height = heightEClosed + "px";
    }

    var content = "";

    // ouverture du nouveau bloc selectionné
    if (selectedBloc !== openedBlock) {
      switch (selectedBloc) {
        case "E":
          // PROJET
          document.getElementById("bloc-G").style.height = heightGClosed + "px";
          document.getElementById("bloc-F").style.height = heightFClosed + "px";
          document.getElementById("bloc-E").style.height = heightEOpened + "px";
          break;
        case "F":
          // ENTREVUES
          document.getElementById("bloc-G").style.height = heightGClosed + "px";
          document.getElementById("bloc-F").style.height = heightFOpened + "px";
          // chargement du contenu
          content = document.getElementById("entrevues-content").innerHTML;
          document.getElementById("content-F").innerHTML = content;
          break;
        case "G":
          // INITIATIVES
          document.getElementById("bloc-F").style.height = heightFClosed + "px";
          document.getElementById("bloc-G").style.height = heightGOpened + "px";
          // chargement du contenu
          content = document.getElementById("initiatives-content").innerHTML;
          document.getElementById("content-G").innerHTML = content;
          break;
        case "H":
          // CONTACTS
          document.getElementById("bloc-F").style.height = heightFClosed + "px";
          document.getElementById("bloc-G").style.height = heightGClosed + "px";
          document.getElementById("bloc-H").style.height = heightHOpened + "px";
          // changement de la taille de police du titre
          document.getElementById("titre-H").style.fontSize = fontSizeTitle;
          // ajout du scrollbar
          document.getElementById("bloc-H").classList.add("hscroll");
          // chargement du contenu
          content = document.getElementById("contacts-content").innerHTML;
          document.getElementById("content-H").innerHTML = content;
          break;

        default:
          break;
      }
      openedBlock = selectedBloc;
    } else {
      openedBlock = "";
    }
  };

  
  // gestion des clicks sur les titres du sidebar

  // ouverture ou  fermeture du bloc E (PROJET)
  var labelE = document.getElementById("titre-E");
  labelE.addEventListener("click", (event) => {
    displaySidebar(event, "E");
  });

  // ouverture ou  fermeture du bloc F (Entrevues)
  var labelF = document.getElementById("titre-F");
  labelF.addEventListener("click", (event) => {
    displaySidebar(event, "F");
  });

  // ouverture ou  fermeture du bloc G (Initiatives)
  var labelG = document.getElementById("titre-G");
  labelG.addEventListener("click", (event) => {
    displaySidebar(event, "G");
  });

  // ouverture ou  fermeture du bloc H (Contacts)
  var labelH = document.getElementById("titre-H");
  labelH.addEventListener("click", (event) => {
    displaySidebar(event, "H");
  });

});
