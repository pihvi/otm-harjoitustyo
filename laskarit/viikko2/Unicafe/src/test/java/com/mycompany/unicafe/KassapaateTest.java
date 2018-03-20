package com.mycompany.unicafe;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class KassapaateTest {

    Kassapaate paate;

    @Before
    public void setUp() {
        paate = new Kassapaate();
    }

    @Test
    public void luodunPaatteenRahaOnTuhatJaMyydytNolla() {
        assertEquals(1000, paate.kassassaRahaa());
        assertEquals(0, paate.edullisiaLounaitaMyyty());
        assertEquals(0, paate.maukkaitaLounaitaMyyty());
    }

    @Test
    public void riittamatonKateisMaksuPalautuuIlmanMyyntia() {
        assertEquals(100, paate.syoEdullisesti(100));
        assertEquals(300, paate.syoMaukkaasti(300));
        assertEquals(0, paate.edullisiaLounaitaMyyty());
        assertEquals(0, paate.maukkaitaLounaitaMyyty());
        assertEquals(1000, paate.kassassaRahaa());
    }

    @Test
    public void kateismaksullePalautuuVaihtorahaOikeinJaMyyntiJaKassaSaldoKasvaa() {
        assertEquals(40, paate.syoEdullisesti(300));
        assertEquals(90, paate.syoMaukkaasti(550));
        assertEquals(1, paate.edullisiaLounaitaMyyty());
        assertEquals(1, paate.maukkaitaLounaitaMyyty());
        assertEquals(1720, paate.kassassaRahaa());
    }

    @Test
    public void korttimaksuOnnistuessaanLisaaMyytyjaJaVahentaaSaldoaJaKassanSaldoPysyySamana() {
        Maksukortti kortti = new Maksukortti(1000);
        assertTrue(paate.syoEdullisesti(kortti));
        assertEquals(1, paate.edullisiaLounaitaMyyty());
        assertEquals(1000, paate.kassassaRahaa());
        assertEquals(740, kortti.saldo());
        assertTrue(paate.syoMaukkaasti(kortti));
        assertEquals(1, paate.maukkaitaLounaitaMyyty());
        assertEquals(1000, paate.kassassaRahaa());
        assertEquals(280, kortti.saldo());
    }

    @Test
    public void korttimaksuEpaonnistuessaanEiMuutaMitaanSaldojaTaiLukuja() {
        Maksukortti kortti = new Maksukortti(100);
        assertFalse(paate.syoEdullisesti(kortti));
        assertEquals(0, paate.edullisiaLounaitaMyyty());
        assertEquals(1000, paate.kassassaRahaa());
        assertEquals(100, kortti.saldo());
        assertFalse(paate.syoMaukkaasti(kortti));
        assertEquals(0, paate.maukkaitaLounaitaMyyty());
        assertEquals(1000, paate.kassassaRahaa());
        assertEquals(100, kortti.saldo());
    }

    @Test
    public void korttisaldonKasvattaminenLisaaKortinJaKassanSaldoa() {
        Maksukortti kortti = new Maksukortti(100);
        paate.lataaRahaaKortille(kortti, 500);
        assertEquals(1500, paate.kassassaRahaa());
        assertEquals(600, kortti.saldo());
    }

    @Test
    public void negatiivinenKorttisaldonLisaaminenEiLisaaMitaan() {
        Maksukortti kortti = new Maksukortti(100);
        paate.lataaRahaaKortille(kortti, -500);
        assertEquals(1000, paate.kassassaRahaa());
        assertEquals(100, kortti.saldo());
    }
}
