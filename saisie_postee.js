// ==UserScript==
// @name         Mediation_postee
// @namespace    http://tampermonkey.net/
// @version      v1
// @description  Tool to simplify data capture on https://pimms-mediation.lebureauvirtuel.fr/posted-mediation website
// @author       Loïc Martinez
// @match        https://pimms-mediation.lebureauvirtuel.fr/posted-mediation
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    "use strict";

    function loadValues(event) {

        resetValues();

        // Stops all triggers or else it erases time slot checked
        event.stopImmediatePropagation();

        var comboboxValue = combobox.value.trim();
        var accueil_choice = document.getElementById("accueil_choice");

        var bMorning = comboboxValue == "Retraite - Demande de retraite"
        || comboboxValue == "Retraite - Demande de réversion"
        || comboboxValue == "Retraite - Demande d'ASPA"
        || comboboxValue == "MDPH - Dossier MDPH"
        || comboboxValue == "France Travail - Inscription"
        || comboboxValue == "Logement social : 1ère demande"
        || comboboxValue == "PCB (Point Conseil Budget)"
        || comboboxValue == "Appel téléphonique (matin)"
        || comboboxValue == "Espace autonomie Pand@ (matin)"
        || comboboxValue == "Prise de RDV numérique (matin)";

        if (event.target == document.getElementById("fp-default")) {
            if (bMorning) {
                checkRadioButton("DurationRadio5");
            } else {
                checkRadioButton("DurationRadio4");
            }
        } else {
            if (bMorning) {
                checkRadioButton("DurationRadio5");
                checkRadioButton("TimeSlotMorning");
            } else {
                if (!checkRadioButton("TimeSlotEvening")) { // If radio button doesn't exist like for some permanences, let's check the first instead
                    checkRadioButton("TimeSlotMorning");
                    checkRadioButton("DurationRadio5");
                } else {
                    checkRadioButton("DurationRadio4");
                }
            }

            const structure = document.getElementById("structure_selected").textContent.trim();

            if (structure == "Narbonne") {
                document.getElementById("id_zipcode").value = 11100;
            } else if (structure == "Sigean Corbières Méditerranée") {
                document.getElementById("id_zipcode").value = 11130;
            }

            let enterEvent = new KeyboardEvent("keyup", {
                key: "Enter",
                keyCode: 13,
                which: 13,
                bubbles: true
            });

            document.querySelector("input[name=zipcode]").dispatchEvent(enterEvent);

            setComboValue("contact-channel", 5);
            checkRadioButton("SexRadio1");
            checkRadioButton("LangueRadio1");
            checkRadioButton("CountryRadio1");

            setComboValue("district", 9249);

            checkRadioButton("VisiteRadio14");

            setComboValue("pimms_knowledge", 13);

            checkRadioButton("qpvRadio15");

            //--------------------------- Reception ---------------------------//
            if (comboboxValue == "Appel téléphonique (matin)") {

                checkRadioButton("DurationRadio1");
                checkRadioButton("TimeSlotMorning");
                setComboValue("contact-channel", 4);

                document.getElementById("check_france_service").checked = true;
                document.getElementById("check_france_service").click();

                setComboValue("operator_id", 10);
                setComboValue("operator_action_id", 79);

                setComboValue("accueil_choice", [1,5]);

            } else if (comboboxValue == "Appel téléphonique (après-midi)") {

                checkRadioButton("DurationRadio1");
                checkRadioButton("TimeSlotEvening");
                setComboValue("contact-channel", 4);

                document.getElementById("check_france_service").checked = true;
                document.getElementById("check_france_service").click();

                setComboValue("operator_id", 10);
                setComboValue("operator_action_id", 79);

                setComboValue("accueil_choice", [1,5]);

            } else if (comboboxValue == "Espace autonomie Pand@ (matin)") {

                checkRadioButton("TimeSlotMorning");
                setComboValue("contact-channel", 5);
                setComboValue("use_stuff", 2);
                setComboValue("accompaniment_type", 2);
                checkRadioButton("DurationAccompanimentRadio5");

                document.getElementById("check_france_service").checked = true;
                document.getElementById("check_france_service").click();

                setComboValue("operator_id", 293);
                setComboValue("operator_action_id", 976);

                setComboValue("accueil_choice", [6]);


            } else if (comboboxValue == "Espace autonomie Pand@ (après-midi)") {

                checkRadioButton("TimeSlotEvening");
                setComboValue("contact-channel", 5);
                setComboValue("use_stuff", 2);
                setComboValue("accompaniment_type", 2);
                checkRadioButton("DurationAccompanimentRadio5");

                document.getElementById("check_france_service").checked = true;
                document.getElementById("check_france_service").click();

                setComboValue("operator_id", 293);
                setComboValue("operator_action_id", 976);

                setComboValue("accueil_choice", [6]);

            } else if (comboboxValue == "Prise de RDV numérique (matin)") {

                checkRadioButton("TimeSlotMorning");
                setComboValue("contact-channel", 5);
                checkRadioButton("DurationRadio2");

                document.getElementById("check_france_service").checked = true;
                document.getElementById("check_france_service").click();

                setComboValue("operator_id", 293);
                setComboValue("operator_action_id", 983);

                setComboValue("accueil_choice", [1]);

            } else if (comboboxValue == "Prise de RDV numérique (après-midi)") {

                checkRadioButton("TimeSlotEvening");
                setComboValue("contact-channel", 5);
                checkRadioButton("DurationRadio2");

                document.getElementById("check_france_service").checked = true;
                document.getElementById("check_france_service").click();

                setComboValue("operator_id", 293);
                setComboValue("operator_action_id", 983);

                setComboValue("accueil_choice", [1]);

                //--------------------------- Morning ---------------------------//
            } else if (comboboxValue == "Retraite - Demande de retraite") {

                setComboValue("contact-channel", 2);

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner6");

                setComboValue("fs_theme_id", 74);
                setComboValue("fs_accompaniment_id", 347);
                setComboValue("operator_id", 258);
                setComboValue("operator_action_id", 852);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "Retraite - Demande de réversion") {

                setComboValue("contact-channel", 2);

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner6");

                setComboValue("fs_theme_id", 72);
                setComboValue("fs_accompaniment_id", 345);
                setComboValue("operator_id", 258);
                setComboValue("operator_action_id", 848);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "Retraite - Demande d'ASPA") {

                setComboValue("contact-channel", 2);

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner6");

                setComboValue("fs_theme_id", 74);
                setComboValue("fs_accompaniment_id", 347);
                setComboValue("operator_id", 258);
                setComboValue("operator_action_id", 851);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "MDPH - Dossier MDPH") {

                setComboValue("contact-channel", 2);

                document.getElementById("check_france_service").checked = true;
                document.getElementById("check_france_service").click();

                setComboValue("operator_id", 280);
                setComboValue("operator_action_id", 927);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "France Travail - Inscription") {

                setComboValue("contact-channel", 2);

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner9");

                setComboValue("fs_theme_id", 86);
                setComboValue("fs_accompaniment_id", 385);
                setComboValue("operator_id", 56);
                setComboValue("operator_action_id", 169);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "Logement social : 1ère demande") {

                setComboValue("contact-channel", 2);

                document.getElementById("check_france_service").checked = true;
                document.getElementById("check_france_service").click();

                setComboValue("operator_id", 205);
                setComboValue("operator_action_id", 729);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "PCB (Point Conseil Budget)") {

                setComboValue("contact-channel", 2);

                document.getElementById("check_france_service").checked = true;
                document.getElementById("check_france_service").click();

                setComboValue("select_pcb_job_actions", 5);

                setComboValue("operator_id", 98);
                setComboValue("operator_action_id", 471);

                setComboValue("accueil_choice", [1,3,4]);

                //--------------------------- Afternoon ---------------------------//
            } else if (comboboxValue == "CAF - Déclaration des ressources") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner1");

                setComboValue("fs_theme_id", 60);
                setComboValue("fs_accompaniment_id", 320);
                setComboValue("operator_id", 260);
                setComboValue("operator_action_id", 870);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "CAF - Réaliser une demande de RSA") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner1");

                setComboValue("fs_theme_id", 60);
                setComboValue("fs_accompaniment_id", 324);
                setComboValue("operator_id", 260);
                setComboValue("operator_action_id", 872);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "DGFIP - Compléter une déclaration des revenus") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner2");

                setComboValue("fs_theme_id", 80);
                setComboValue("fs_accompaniment_id", 371);
                setComboValue("operator_id", 100);
                setComboValue("operator_action_id", 488);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "MSA") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();
                setComboValue("operator_id", 283);

                checkRadioButton("Partner3");

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "Retraite - Demande du relevé de carrière") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner6");

                setComboValue("fs_theme_id", 74);
                setComboValue("fs_accompaniment_id", 348);
                setComboValue("operator_id", 258);
                setComboValue("operator_action_id", 853);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "Retraite - Demande d'attestation / Consultation des paiements") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner6");

                setComboValue("fs_theme_id", 75);
                setComboValue("fs_accompaniment_id", 351);
                setComboValue("operator_id", 258);
                setComboValue("operator_action_id", 1902);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "La Poste") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();
                setComboValue("operator_id", 127);

                checkRadioButton("Partner4");

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "CPAM : Demande de CSS") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner5");

                setComboValue("fs_theme_id", 69);
                setComboValue("fs_accompaniment_id", 336);
                setComboValue("operator_id", 241);
                setComboValue("operator_action_id", 1527);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "CPAM : Demande de carte vitale / CEAM / Attestation de droits") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner5");

                setComboValue("fs_theme_id", 70);
                setComboValue("fs_accompaniment_id", 338);
                setComboValue("operator_id", 241);
                setComboValue("operator_action_id", 806);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "Justice : Extrait de casier judiciaire") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner7");

                setComboValue("fs_theme_id", 104);
                setComboValue("fs_accompaniment_id", 430);
                setComboValue("operator_id", 5);
                setComboValue("operator_action_id", 1941);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "ANTS : Pré-demande CNI / Passeport") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner8");

                setComboValue("fs_theme_id", 90);
                setComboValue("fs_accompaniment_id", 406);
                setComboValue("operator_id", 9);
                setComboValue("operator_action_id", 1913);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "ANTS : Demande de permis de conduire") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner8");

                setComboValue("fs_theme_id", 91);
                setComboValue("fs_accompaniment_id", 401);
                setComboValue("operator_id", 9);
                setComboValue("operator_action_id", 1808);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "ANTS : Demande de RDV visite médicale de la préfecture") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner8");

                setComboValue("fs_theme_id", 91);
                setComboValue("fs_accompaniment_id", 403);
                setComboValue("operator_id", 9);
                setComboValue("operator_action_id", 73);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "ANTS : Déclarer une cession de véhicule") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner8");

                setComboValue("fs_theme_id", 92);
                setComboValue("fs_accompaniment_id", 394);
                setComboValue("operator_id", 9);
                setComboValue("operator_action_id", 52);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "ANTS : Déclarer un achat de véhicule") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner8");

                setComboValue("fs_theme_id", 92);
                setComboValue("fs_accompaniment_id", 395);
                setComboValue("operator_id", 9);
                setComboValue("operator_action_id", 54);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "ANTS : Modifier une carte grise") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner8");

                setComboValue("fs_theme_id", 93);
                setComboValue("fs_accompaniment_id", 399);
                setComboValue("operator_id", 9);
                setComboValue("operator_action_id", 61);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "ANTS : Payer ou contester une amende") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner8");

                setComboValue("fs_theme_id", 94);
                setComboValue("fs_accompaniment_id", 400);
                setComboValue("operator_id", 9);
                setComboValue("operator_action_id", 71);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "France Travail : Actualisation mensuelle") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner9");

                setComboValue("fs_theme_id", 86);
                setComboValue("fs_accompaniment_id", 384);
                setComboValue("operator_id", 56);
                setComboValue("operator_action_id", 167);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "Logement social : Renouvellement") {

                document.getElementById("check_france_service").checked = true;
                document.getElementById("check_france_service").click();

                setComboValue("operator_id", 205);
                setComboValue("operator_action_id", 735);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "Ministère de l'écologie et des territoires : Chèque énergie") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner10");

                setComboValue("fs_theme_id", 76);
                setComboValue("fs_accompaniment_id", 354);

                setComboValue("operator_id", 333);
                setComboValue("operator_action_id", 1774);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "Ministère de l'intérieur : Remboursement d'un timbre fiscal") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner8");

                setComboValue("fs_theme_id", 90);
                setComboValue("fs_accompaniment_id", 396);

                setComboValue("operator_id", 9);
                setComboValue("operator_action_id", 1405);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "Service public : Demande extrait d'acte de naissance") {

                document.getElementById("check_france_service").checked = true;
                document.getElementById("check_france_service").click();

                setComboValue("operator_id", 1);
                setComboValue("operator_action_id", 2);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "SNCF : Solidario") {

                document.getElementById("check_france_service").checked = true;
                document.getElementById("check_france_service").click();

                setComboValue("operator_id", 120);
                setComboValue("operator_action_id", 546);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "Autre") {

                document.getElementById("check_france_service").checked = true;
                document.getElementById("check_france_service").click();

                setComboValue("operator_id", 10);
                setComboValue("operator_action_id", 79);

                setComboValue("accueil_choice", [1,4,7]);

            } else if (comboboxValue == "ANAH : Agence Nationale de l'Habitat") {

                document.getElementById("check_france_service").checked = false;
                document.getElementById("check_france_service").click();

                checkRadioButton("Partner11");

                setComboValue("accueil_choice", [1,4,7]);
            }

            // For permanences who have only one time slot avalaible
            if (document.getElementById("TimeSlotEvening") == null) {
                setComboValue("contact-channel", 2);
            }
        }
    }

    $(document).ready(function () {
        setTimeout(setValues, 500);
    });

    function setValues() {

        // Don't load if none time slot avalaible
        if (document.getElementById("TimeSlotMorning") == null) {
            return;
        }

        const demoClasses = document.querySelectorAll(".bs-stepper-content");

        var divEl = demoClasses[0];
        divEl.insertAdjacentHTML("afterbegin", '<div id="div_two" style="margin-bottom: 15px"></div>');

        var divTwo = document.getElementById("div_two");
        var combobox = document.createElement("select");
        combobox.setAttribute("id", "combobox");

        var optPreaccueil = new Option("-------------- Pré-accueil --------------");
        optPreaccueil.disabled = true;

        combobox.add(optPreaccueil);

        combobox.add(new Option("Appel téléphonique (matin)", "Appel téléphonique (matin)"));
        combobox.add(new Option("Appel téléphonique (après-midi)", "Appel téléphonique (après-midi)"));
        combobox.add(new Option("Espace autonomie Pand@ (matin)", "Espace autonomie Pand@ (matin)"));
        combobox.add(new Option("Espace autonomie Pand@ (après-midi)", "Espace autonomie Pand@ (après-midi)"));
        combobox.add(new Option("Prise de RDV numérique (matin)", "Prise de RDV numérique (matin)"));
        combobox.add(new Option("Prise de RDV numérique (après-midi)", "Prise de RDV numérique (après-midi)"));

        var optOnMorningAppointment = new Option("-------------- Sur rendez-vous le matin --------------");
        optOnMorningAppointment.disabled = true;

        combobox.add(optOnMorningAppointment);

        combobox.add(new Option("France Travail - Inscription", "France Travail - Inscription"));
        combobox.add(new Option("Logement social : 1ère demande", "Logement social : 1ère demande"));
        combobox.add(new Option("MDPH - Dossier MDPH", "MDPH - Dossier MDPH"));
        combobox.add(new Option("PCB (Point Conseil Budget)", "PCB (Point Conseil Budget)"));
        combobox.add(new Option("Retraite - Demande d'ASPA", "Retraite - Demande d'ASPA"));
        combobox.add(new Option("Retraite - Demande de retraite", "Retraite - Demande de retraite"));
        combobox.add(new Option("Retraite - Demande de réversion", "Retraite - Demande de réversion"));

        var optAfternoonWithoutAppointment = new Option("-------------- Sans rendez-vous l'après-midi --------------");
        optAfternoonWithoutAppointment.disabled = true;

        combobox.add(optAfternoonWithoutAppointment);

        combobox.add(new Option("Autre", "Autre"));
        combobox.add(new Option("ANAH : Agence Nationale de l'Habitat", "ANAH : Agence Nationale de l'Habitat"));
        combobox.add(new Option("ANTS : Déclarer une cession de véhicule", "ANTS : Déclarer une cession de véhicule"));
        combobox.add(new Option("ANTS : Déclarer un achat de véhicule", "ANTS : Déclarer un achat de véhicule"));
        combobox.add(new Option("ANTS : Demande de permis de conduire", "ANTS : Demande de permis de conduire"));
        combobox.add(new Option("ANTS : Demande de RDV visite médicale de la préfecture", "ANTS : Demande de RDV visite médicale de la préfecture"));
        combobox.add(new Option("ANTS : Modifier une carte grise", "ANTS : Modifier une carte grise"));
        combobox.add(new Option("ANTS : Payer ou contester une amende", "ANTS : Payer ou contester une amende"));
        combobox.add(new Option("ANTS : Pré-demande CNI / Passeport", "ANTS : Pré-demande CNI / Passeport"));
        combobox.add(new Option("CAF - Déclaration des ressources", "CAF - Déclaration des ressources"));
        combobox.add(new Option("CAF - Réaliser une demande de RSA", "CAF - Réaliser une demande de RSA"));
        combobox.add(new Option("CPAM : Demande de CSS", "CPAM : Demande de CSS"));
        combobox.add(new Option("CPAM : Demande de carte vitale / CEAM / Attestation de droits", "CPAM : Demande de carte vitale / CEAM / Attestation de droits"));
        combobox.add(new Option("DGFIP - Compléter une déclaration des revenus", "DGFIP - Compléter une déclaration des revenus"));
        combobox.add(new Option("France Travail : Actualisation mensuelle", "France Travail : Actualisation mensuelle"));
        combobox.add(new Option("Justice : Extrait de casier judiciaire", "Justice : Extrait de casier judiciaire"));
        combobox.add(new Option("La Poste", "La Poste"));
        combobox.add(new Option("Logement social : Renouvellement", "Logement social : Renouvellement"));
        combobox.add(new Option("Ministère de l'écologie et des territoires : Chèque énergie", "Ministère de l'écologie et des territoires : Chèque énergie"));
        combobox.add(new Option("Ministère de l'intérieur : Remboursement d'un timbre fiscal", "Ministère de l'intérieur : Remboursement d'un timbre fiscal"));
        combobox.add(new Option("MSA", "MSA"));
        combobox.add(new Option("Retraite - Demande d'attestation / Consultation des paiements", "Retraite - Demande d'attestation / Consultation des paiements"));
        combobox.add(new Option("Retraite - Demande du relevé de carrière", "Retraite - Demande du relevé de carrière"));
        combobox.add(new Option("Service public : Demande extrait d'acte de naissance", "Service public : Demande extrait d'acte de naissance"));
        combobox.add(new Option("SNCF : Solidario", "SNCF : Solidario"));

        Array.from(combobox.options).forEach((element) => (element.addEventListener("click", loadValues)));

        // Injecting the selection into the HTML code
        divTwo.appendChild(combobox);

        document.getElementsByName("activity_status_id")[0].setAttribute("id", "id_activity_status");
        document.querySelector("input[name=zipcode]").setAttribute("id", "id_zipcode");

        var elementZipCode = document.getElementById("id_zipcode");
        elementZipCode.addEventListener("keyup", (event) => {setCityValue(event);event.stopImmediatePropagation();});

        var elementDp = document.querySelector(".form-control.flatpickr-basic.change_date");
        elementDp.addEventListener("change", (event) => {loadValues(event);setTime(event);});

        var alreadyCameYes = document.getElementById("VisiteRadio13");
        var alreadyCameNo = document.getElementById("VisiteRadio14");

        alreadyCameYes.addEventListener("change", (event) => {changeKnowledgeYes();});
        alreadyCameNo.addEventListener("change", (event) => {changeKnowledgeNo();});

        combobox.selectedIndex = 1;
        combobox[1].dispatchEvent(new Event("click"));
    }

    function changeKnowledgeYes() {
        setComboValue("pimms_knowledge", 5);
    }

    function changeKnowledgeNo() {
        setComboValue("pimms_knowledge", 13);
    }

    function resetValues() {

        var accueil_choice = document.getElementById("accueil_choice");

        uncheckRadioButton("DurationRadio1");
        uncheckRadioButton("DurationRadio2");
        uncheckRadioButton("DurationRadio3");
        uncheckRadioButton("DurationRadio4");
        uncheckRadioButton("DurationRadio5");
        uncheckRadioButton("DurationRadio6");
        uncheckRadioButton("DurationRadio7");
        uncheckRadioButton("TimeSlotMorning");
        uncheckRadioButton("TimeSlotEvening");
        uncheckRadioButton("SexRadio1");
        uncheckRadioButton("SexRadio2");
        uncheckRadioButton("SexRadio3");
        setComboValue("id_zipcode", "");
        setComboValue("city", "");
        uncheckRadioButton("VisiteRadio13");
        uncheckRadioButton("VisiteRadio14");
        uncheckRadioButton("qpvRadio15");
        uncheckRadioButton("qpvRadio16");
        setComboValue("use_stuff", "");
        setComboValue("accompaniment_type", "");
        uncheckRadioButton("DurationAccompanimentRadio1");
        uncheckRadioButton("DurationAccompanimentRadio2");
        uncheckRadioButton("DurationAccompanimentRadio3");
        uncheckRadioButton("DurationAccompanimentRadio4");
        uncheckRadioButton("DurationAccompanimentRadio5");
        uncheckRadioButton("DurationAccompanimentRadio6");
        setComboValue("service_posted_mediation", "");
        document.getElementById("check_france_service").checked = true;
        document.getElementById("check_france_service").click();
        uncheckRadioButton("Partner1");
        uncheckRadioButton("Partner2");
        uncheckRadioButton("Partner3");
        uncheckRadioButton("Partner4");
        uncheckRadioButton("Partner5");
        uncheckRadioButton("Partner6");
        uncheckRadioButton("Partner7");
        uncheckRadioButton("Partner8");
        uncheckRadioButton("Partner9");
        uncheckRadioButton("Partner10");
        uncheckRadioButton("Partner11");
        setComboValue("select_pcb_reception_types", "");
        setComboValue("select_pcb_job_actions", "");
        setComboValue("operator_id", 10);
        setComboValue("operator_action_id", 79);
        setComboValue("accueil_choice", []);

        setComboValue("user_age", 12);
        setComboValue("id_activity_status", 4);

        if (document.getElementById("combobox").value == "Retraite - Demande d'ASPA") {
            setComboValue("user_age", 14);
            setComboValue("id_activity_status", 5);
        } else if (document.getElementById("combobox").value == "Retraite - Demande de retraite") {
            setComboValue("user_age", 13);
        } else if (document.getElementById("combobox").value == "Retraite - Demande de réversion") {
            setComboValue("user_age", 14);
            setComboValue("id_activity_status", 5);
        } else if (document.getElementById("combobox").value == "Retraite - Demande d'attestation / Consultation des paiements") {
            setComboValue("user_age", 14);
            setComboValue("id_activity_status", 5);
        } else if (document.getElementById("combobox").value == "Retraite - Demande du relevé de carrière") {
            setComboValue("user_age", 13);
        }
        return true;
    }

    function setComboValue(name, value) {
        $("#" + name).val(value);
        $("#" + name).change();
    }

    function checkRadioButton(name) {

        if (document.getElementById(name) == null) {
            return false;
        }

        document.getElementById(name).checked = true;
        document.getElementById(name).click();

        return true;
    }

    function uncheckRadioButton(name) {

        if (document.getElementById(name) == null) {
            return false;
        }

        document.getElementById(name).checked = false;

        return true;
    }

    function setCityValue(e) {
        var t = $("#id_zipcode").val();

        if (5 === t.length) {
            $.ajax({
                url: "/towns/" + t,
                method: "GET",
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                success: function(e) {
                    if (e.length > 0) {

                        var lastValue;
                        var containsNarbonne = false;
                        var containsSigean = false;

                        $("#city").empty(), e.forEach((function(e) {
                            $("#city").append('<option value="' + e.name + '">' + e.name + "</option>");
                            lastValue = e.name;
                            if (e.name == "Narbonne") {
                                containsNarbonne = true;
                            }
                            if (e.name == "Sigean") {
                                containsSigean = true;
                            }
                        })), $("#city").closest(".error").removeClass("error"), $("#city-error").remove(), $("#count_notifs").html(e.length);

                        if (containsNarbonne) {
                            setComboValue("city", "Narbonne");
                        } else if (containsSigean) {
                            setComboValue("city", "Sigean");
                        } else {
                            setComboValue("city", lastValue);
                        }
                    } else {
                        toastr.error("Aucune ville n'est associée à ce code postal");
                    }
                }
            })
        } else {
            $("#city").empty()
        }
    }

    let radioTimeValue = null;
    let cityValue = null;

    function setTime(e) {
        if ("" !== $(".change_date").val()) {
            var t = new Date($(".change_date").val()).getDay(),
                i = $("#structure_selected").attr("data-id"),
                a = {
                    filters: [{
                        field: "day",
                        operator: "=",
                        value: t
                    }]
                };
            $.ajax({
                url: `/api/sites/${i}/hours/search`,
                method: "POST",
                data: a,
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                success: function(e, t, i) {

                    let radioTimeMorning = document.getElementById("TimeSlotMorning");
                    let radioTimeEvening = document.getElementById("TimeSlotEvening");

                    if (radioTimeMorning != null && radioTimeMorning.checked) {
                        radioTimeValue = radioTimeMorning.value;
                    } else if (radioTimeEvening != null && radioTimeEvening.checked) {
                        radioTimeValue = radioTimeEvening.value;
                    }

                    if (0 == e.data.length) $(".div_tranche_horaire").html('<span class="text-danger"><i class=\'fa-solid fa-triangle-exclamation\'></i> Aucune plage horaire configurer pour votre site</span> <br> <span class="text-primary"> <i class=\'fa-solid fa-circle-info\'></i> veuillez contacter votre responsable</span><input type="text" name="time_slot" style="visibility:hidden;height:0px">');
                    else {
                        var a = e.data[0];
                        if (null === a.start_time_morning && null === a.start_time_evening) $(".div_tranche_horaire").html('<span class="text-danger"><i class=\'fa-solid fa-triangle-exclamation\'></i> Aucune plage horaire disponible pour cette date</span><input type="text" name="time_slot" style="visibility:hidden;height:0px">');
                        else {
                            var n = new Date,
                                r = n.getHours() + "" + (n.getMinutes() < 10 ? "0" : "") + n.getMinutes();
                            if ($(".div_tranche_horaire").html('<div class="form-group"></div>'), null !== a.start_time_morning) {
                                const e = a.start_time_morning.replace(":", ""),
                                      t = a.end_time_morning.replace(":", "");
                                if (r >= e && r < t || null === a.start_time_evening) var s = "checked";
                                else s = "";
                                var o = a.start_time_morning + " - " + a.end_time_morning;
                                $(".div_tranche_horaire .form-group").append('<div class="form-check form-check-inline"> <input class="form-check-input" id="TimeSlotMorning" type="radio" name="time_slot" ' + s + ' value="' + o + '"> <label class="form-check-label" for="TimeSlotMorning">' + o + "</label> </div>")
                                if (o == radioTimeValue) {
                                    document.getElementById("TimeSlotMorning").checked = true;
                                    document.getElementById("TimeSlotMorning").click();
                                }
                            }
                            if (null !== a.start_time_evening) {
                                const e = a.start_time_evening.replace(":", ""),
                                      t = a.end_time_evening.replace(":", "");
                                if (r >= e && r < t || null === a.start_time_morning) s = "checked";
                                else s = "";
                                o = a.start_time_evening + " - " + a.end_time_evening;
                                $(".div_tranche_horaire .form-group").append('<div class="form-check form-check-inline"> <input class="form-check-input" type="radio" name="time_slot" id="TimeSlotEvening" ' + s + ' value="' + o + '"> <label class="form-check-label" for="TimeSlotEvening">' + o + "</label> </div>")
                                if (o == radioTimeValue) {
                                    document.getElementById("TimeSlotEvening").checked = true;
                                    document.getElementById("TimeSlotEvening").click();
                                }
                            }
                        }
                        var c = document.getElementsByName("time_slot_hidden")[0].value;
                        if ("" !== c)
                            for (var d = document.getElementsByName("time_slot"), l = 0; l < d.length; l++)
                                if (d[l].value === c) {
                                    d[l].checked = !0;
                                    break
                                }
                    }
                },
                error: function(e, t, i) {
                    toastr.error(e.responseJSON.message, "Erreur")
                }
            })
        }
    }
})();