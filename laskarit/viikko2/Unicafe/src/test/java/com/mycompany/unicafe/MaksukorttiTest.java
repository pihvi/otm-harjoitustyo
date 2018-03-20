package com.mycompany.unicafe;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class MaksukorttiTest {

    Maksukortti kortti;

    @Before
    public void setUp() {
        kortti = new Maksukortti(10);
    }

    @Test
    public void luotuKorttiOlemassa() {
        assertTrue(kortti != null);
    }

    @Test
    public void saldoOikeinAluksi() {
        assertEquals(10, kortti.saldo());
    }

    @Test
    public void rahanLisaaminenKasvattaaSaldoa() {
        kortti.lataaRahaa(10);
        assertEquals(20, kortti.saldo());
    }

    @Test
    public void rahaaVaheneeOnnistuneestiKunSaldoaRiittaa() {
        assertTrue(kortti.otaRahaa(2));
        assertEquals(8, kortti.saldo());
    }

    @Test
    public void rahanOttoEpaonnistuuEikaSaldoMuutuKunRahaEiRiita() {
        assertFalse(kortti.otaRahaa(11));
        assertEquals(10, kortti.saldo());
    }

    @Test
    public void toStringKuvausOnJarkeva() {
        assertEquals("saldo: 0.10", kortti.toString());
    }
}
