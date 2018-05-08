# Arkkitehtuurikuvaus

## Sovelluslogiikka

Sovelluksen korkean tason logiikka löytyy domain/FeedReaderistä.

Sovellus tallentaa pysyvän tiedon sovelluksen käyttäjäkohtaiseen hakemistoon käytetyn käyttöjärjestelmän mukaisesti.

Tietokantana on käytössä NeDB. Tietokannan abstraktiona on domain/datastore.

### Kuvaus komponenteista

![sovelluslogiikka](arkkitehtuuri.png)

Kuvan selite:
Testaus tapahtuu FeedReaderin kautta. FeedReader riippuu datastoresta, mikä käyttää NeDB:tä pellin alla.
Toinen riippuvuus FeedReaderillä on käyttämäänsä lodash kirjastoon.

UI logiikka on riippuvainen FeedReaderistä domain logiikan osalta. Lisäksi se käyttää rss-parseria kirjastona.
Electron käyttöliittymä rakennetaan index.html:n kautta, mistä on riippuvuus UI logiikkaan.

### Feedin lisäys sekvenssikaaviona

![lisäys](add-feed-sequence.png)
