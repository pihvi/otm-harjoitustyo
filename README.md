# Feed Reader

Sovellus kurssille Ohjelmistotekniikan menetelmät.
Sovelluksen tarkoituksena on tehdä feedien (RSS/Atom) lukeminen helpoksi. 

Kielenä käytössä *JavaScript*

## Dokumentaatio

[Vaatimusmäärittely](dokumentaatio/vaatimusmaarittely.md)

[Työaikakirjanpito](dokumentaatio/tyoaika.md)

[Arkkitehtuurikuvaus](dokumentaatio/arkkitehtuuri.md)

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
