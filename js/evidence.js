class Evidence {

    constructor() {
        // Získání záznamů z lokálního úložiště
        const zaznamyZeStorage = localStorage.getItem("zaznamy");
        this.zaznamy = zaznamyZeStorage ? JSON.parse(zaznamyZeStorage) : [];
        this.jmenoInput = document.getElementById("jmeno");
        this.prijmeniInput = document.getElementById("prijmeni");
        this.telefonInput = document.getElementById("telefon");
        this.vekInput = document.getElementById("vek");
        this.vlozButton = document.getElementById("vlozit");
        this.vypisUzivatele = document.getElementById("seznam-pojistencu");
        this.uspechHlaska = document.getElementById("uspech-hlaska");

        // Spuštění metody pro přidání obsluhy kliknutí na tlačítko
        this._pridej();
    }

    // Metoda pro obsluhu kliknutí na tlačítko "Přidat pojištěnce"
    _pridej() {
        this.vlozButton.onclick = (event) => {
            event.preventDefault();
            // Ošetření vstupů
            if (this.prijmeniInput.value == "" || this.jmenoInput.value == "") { 
                alert("Musíte vyplnit jméno a příjmení");
            } else if (this.telefonInput.value.length !== 9 || isNaN(this.telefonInput.value)) { 
                alert("Telefonní číslo musí obsahovat 9 číslic.");
            } else if (this.vekInput.value.length == 0) {
                alert("Musíte vyplnit věk.");
            } else if (!isNaN(this.jmenoInput.value) || !isNaN(this.prijmeniInput.value)) {
                alert("Jméno a příjmení nemohou obsahovat číslice.");
            } else {
                const zaznam = new Zaznam(this.jmenoInput.value, this.prijmeniInput.value, this.telefonInput.value, this.vekInput.value);
                this.zaznamy.push(zaznam);
                this.ulozZaznam();
                this.vypisZaznamy();
    
                // Zobrazí hlášku pod tlačítkem "Přidat pojištěnce"
                this.uspechHlaska.innerHTML = "Pojištěná osoba byla úspěšně přidána.";
                this.uspechHlaska.classList.remove("d-none");
                // Hláška po 3 sekundách zmizí
                setTimeout(() => {
                    this.uspechHlaska.classList.add("d-none");
                }, 3000);
                // Vymaže obsah formuláře po odeslání
                this.jmenoInput.value = "";
                this.prijmeniInput.value = "";
                this.telefonInput.value = "";
                this.vekInput.value = "";
            }
        };
    }

    // Vypsání seznamu záznamů do tabulky
    vypisZaznamy() {
        // Vyprázdnění obsahu tabulky
        this.vypisUzivatele.innerHTML = "";
        for (const zaznam of this.zaznamy) {
            const seznam = document.createElement("tr"); // Vytvoření řádku pro tabulku

            // Vložení dat záznamu do tabulky
            seznam.insertAdjacentHTML("beforeend", `<td class="text-stred">${zaznam.jmeno} ${zaznam.prijmeni}</td><td class="text-stred">${zaznam.vek}</td><td class="text-stred">${zaznam.telefon}</td>`);
            
            const smazBtnTd = document.createElement("td"); // Vytvoření TD pro tlačítko
            seznam.appendChild(smazBtnTd);

            const smazBtn = document.createElement("button"); // Vytvoření tlačítka pro smazání
            smazBtn.onclick = () => {
                if (confirm("Opravdu si přejete tento záznam odstranit?")) {
                    this.zaznamy = this.zaznamy.filter(z => z !== zaznam);
                    // Uložení aktualizovaného seznamu záznamů do lokálního úložiště
                    this.ulozZaznam();
                    // Zobrazení seznamu záznamů
                    this.vypisZaznamy();
                }
            }
            smazBtn.innerText = "Smazat záznam";
            smazBtn.className = "btn btn-danger";
            smazBtnTd.className = "text-stred"
            smazBtnTd.appendChild(smazBtn); // Přidání DOM tlačítka

            seznam.insertAdjacentHTML("beforeend", "</tr>"); // Uzavření řádku tabulky
            this.vypisUzivatele.appendChild(seznam);
        }
    }

    // Metoda pro uložení seznamu záznamů do lokálního úložiště
    ulozZaznam() {
        localStorage.setItem("zaznamy", JSON.stringify(this.zaznamy)); // Převedení na řetězec a uložení do úložiště
    }
}