# Tana Catalog - Angular Frontend

Questa repository contiene il front-end, realizzato in angular, del sito che permetterà all'associazione Tana dei Goblin di Cagliari di gestire il loro catalogo di giochi da tavolo, con la loro posizione, descrizione e altro.

# Premessa

I seguenti comandi partono dal presupposto che abbiate già clonato questa repository con git e
abbiate installato correttamente angular con il loro tool [Angular-CLI](https://github.com/angular/angular-cli).
La versione del suddetto tool utilizzato in questo progetto è la seguente: 8.3.19
Versione di node utilizzata: 10.16.3
Sistema operativo di sviluppo: win32 x64
Versione di Angular: 8.2.14
Tutte le versioni sopra e sotto riportate possono essere verificate con `ng version`.
Sono ora riportate le versioni di alcuni package utilizzati da Angular:
| package | version |
| --- | --- |
|@angular-devkit/architect         |0.803.19|
|@angular-devkit/build-angular     |0.803.23|
|@angular-devkit/build-optimizer   |0.803.23|
|@angular-devkit/build-webpack     |0.803.23|
|@angular-devkit/core              |8.3.19|
|@angular-devkit/schematics        |8.3.19|
|@angular/cdk                      |8.2.3|
|@angular/cli                      |8.3.19|
|@angular/material                 |8.2.3|
|@ngtools/webpack                  |8.3.23|
|@schematics/angular               |8.3.19|
|@schematics/update                |0.803.19|
|rxjs                              |6.4.0|
|typescript                        |3.4.5|
|webpack                           |4.39.2|

# Installazione

Per installare i pacchetti di cui c'è bisogno utilizzare il comando `npm install` che provvederà al loro
download. In ambito di produzione si consiglia di aggiungere il flag `--production` così che npm non
scarichi i pacchetti di solo development.

# Avvio

### Server di development

Il tool [Angular-CLI](https://github.com/angular/angular-cli) ci offre la possibilità di aprire un server
interno di test, con aggiornamento in tempo reale della pagina con i cambiamenti fatti nel codice.
Per avviarlo eseguire il seguente comando
`ng serve` con il flag opzionale che aprirà alla fine della compilazione `--open`

### Compilazione finale

La compilazione finale viene eseguita col comando `ng build` che posizionerà tutto il risultato nella
sottocartella _/Dist_.