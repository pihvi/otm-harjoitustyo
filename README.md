# Feed Reader

Sovellus kurssille Ohjelmistotekniikan menetelmät.
Sovelluksen tarkoituksena on tehdä feedien (RSS/Atom) lukeminen helpoksi. 

Kielenä käytössä *JavaScript*

## Dokumentaatio

[Vaatimusmäärittely](dokumentaatio/vaatimusmaarittely.md)

[Työaikakirjanpito](dokumentaatio/tyoaika.md)

[Arkkitehtuurikuvaus](dokumentaatio/arkkitehtuuri.md)

[Käyttöohje](dokumentaatio/kayttoohje.md)

## Releaset

[Viikko 5](https://github.com/pihvi/otm-harjoitustyo/releases/tag/viikko5)

## Komentorivitoiminnot

### Käynnistys

Ohjelma käynnistetään komennolla

```
npm start
```

### Testaus

Testit suoritetaan komennolla

```
npm test
```

Macillä saattaa tarvita tätä ennen

```
brew reinstall watchman
```


Testikattavuusraportti luodaan komennolla

```
npm test -- --coverage
```

### Suoritettavan paketin generointi

Komento

```
npm run package
```

generoi hakemistoon release kyseiselle alustalle paketin.


Komento

```
npm run package -- --all
```

generoi kaikille alustoille paketin, mutta vaatii alustasta riippuen eri kirjastoja.
Esimerkiksi Macissä pitää olle Windowsia varten Wine asennettuna.

### JSDoc

JSDoc generoidaan komennolla

```
 npm run docs
```

Generoitua dokumentaatiota voi tarkastella avaamalla selaimella tiedosto docs/inedx.html
tai selata julkaistua dokumentaatiota: https://pihvi.github.io/otm-harjoitustyo/index.html

### Checkstyle

Käytössä on ESLint koodin tarkistukseen. Tarkistus suoritetaan komennolla

```
 npm run lint
```

Mahdolliset virheilmoitukset tulostuvat komentoriville.
