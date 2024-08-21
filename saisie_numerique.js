// ==UserScript==
// @name         saisie_numerique
// @namespace    http://tampermonkey.net/
// @version      2024-08-09
// @description  Add a selection to fill the form faster
// @author       You
// @match        https://pimms-mediation.lebureauvirtuel.fr/workshop
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mozilla.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (document.getElementById("structure_selected").textContent.trim() == 'Narbonne - Pand@')
    {
        const demoClasses = document.querySelectorAll('.card-title');

        var divEl = demoClasses[0];
        divEl.insertAdjacentHTML('afterbegin', '<div id="div_two" style="margin-bottom: 15px" align="left"></div>');

        var divTwo = document.getElementById("div_two");
        var combobox = document.createElement("select");

        combobox.options[0] = new Option('Séance 1h30', 'Séance 1h30');
        combobox.options[1] = new Option('Pré-séance', 'Pré-séance');
        combobox.options[2] = new Option('Collectif', 'Collectif');

        Array.from(combobox.options).forEach((element) => (element.onclick = loadValues));

        function loadValues() {
            if (combobox.value.trim() == 'Séance 1h30') {
                document.querySelector("#name").value = "INDIVIDUEL";
                document.querySelector("#place").value = "NARBONNE";
                document.querySelector("#nb_duration_hour").value = 90;
                document.querySelector("#nb_mediator").value = 1;
                document.querySelector("#nb_attendee").value = 1;

                $("#operator_id").val(293);
                $("#operator_id").change();

                $("#operator_action_id").val(1393);
                $("#operator_action_id").change();
            }
            else if (combobox.value.trim() == 'Pré-séance') {
                document.querySelector("#name").value = "PRE-SEANCE";
                document.querySelector("#place").value = "NARBONNE";
                document.querySelector("#nb_duration_hour").value = 45;
                document.querySelector("#nb_mediator").value = 1;
                document.querySelector("#nb_attendee").value = 1;

                $("#operator_id").val(293);
                $("#operator_id").change();

                $("#operator_action_id").val(1451);
                $("#operator_action_id").change();
            }
            else if (combobox.value.trim() == 'Collectif') {
                document.querySelector("#name").value = "COLLECTIF";
                document.querySelector("#place").value = "NARBONNE";
                document.querySelector("#nb_duration_hour").value = 120;
                document.querySelector("#nb_mediator").value = 1;
                document.querySelector("#nb_attendee").value = 5;

                $("#operator_id").val(293);
                $("#operator_id").change();

                $("#operator_action_id").val(1451);
                $("#operator_action_id").change();
            }
        }

        divTwo.appendChild(combobox);

        document.querySelector("#name").value = "INDIVIDUEL";
        document.querySelector("#place").value = "NARBONNE";
        document.querySelector("#nb_duration_hour").value = 90;
        document.querySelector("#nb_mediator").value = 1;
        document.querySelector("#nb_attendee").value = 1;

        $("#operator_id").val(293);
        $("#operator_id").change();

        $("#operator_action_id").val(1393);
        $("#operator_action_id").change();
    }
})();