/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package local.service;
/**
 *
 * @author Daniel Alexandre */

import local.exceptions.InstrumentoSemEstoque;
import local.exceptions.LocacaoException;
import local.model.Instrumentos;
import local.model.Aluno;
import local.model.Locacao;
import local.util.DataUtils;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.fail;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.*;


//atualizar testes para trabalhar com os multiplos instrumentos
public class LocacaoServiceTest {

    private List<Instrumentos> instrumentos;
    private Aluno aluno;
    public static Double VALOR_INSTRUMENTO = 4.00;

    @BeforeEach
    public void setUp(){
        aluno = new Aluno("Roberto Glaydson");

        instrumentos = Arrays.asList(
                new Instrumentos("Ukulele", 2, VALOR_INSTRUMENTO),
                new Instrumentos("Flauta Doce", 2, VALOR_INSTRUMENTO),
                new Instrumentos("Chocalho", 3, VALOR_INSTRUMENTO),
                new Instrumentos("Violão", 4, VALOR_INSTRUMENTO),
                new Instrumentos("Escaleta", 2, VALOR_INSTRUMENTO),
                new Instrumentos("Cavaquinho", 4, VALOR_INSTRUMENTO),
                new Instrumentos("Guitarra", 5, VALOR_INSTRUMENTO),
                new Instrumentos("Cabos p10", 2, VALOR_INSTRUMENTO),
                new Instrumentos("Baixo", 5, VALOR_INSTRUMENTO),
                new Instrumentos("Bateria", 9, VALOR_INSTRUMENTO)
        );
    }


    @Test
    public void naoDeveLocarInstrumentoSemUsuario() {
        //Cenário
        Aluno alunos = null;
        LocacaoService ls = new LocacaoService();

        //Processamento e validação
        try {
            //TODO: Corrigir parâmetro para teste
            ls.alugarInstrumento(alunos, null);
            fail("Locação realizada com usuário null");
        }catch (LocacaoException | InstrumentoSemEstoque ex){
            //assertEquals("Impossível locar sem um usuário",ex.getMessage());
            assertThat(ex.getMessage(),is(equalTo("Impossível locar sem um usuário")));
        }
    }
    @Test
    public void deveValidarValorLocacao() throws InstrumentoSemEstoque, LocacaoException {
        //TODO: Reescrever teste
        //Cenário

        //Processamento

        //Validação

    }

    @Test
    public void deveRealizarLocacao(){
        //TODO: Deve realizar uma locação caso os argumentos sejam apropriados
        //Cenário

        //Processamento

        //Validação
    }

    @Test
    public void verificaDataEntrega() throws LocacaoException {
        //TODO: Deve entregar o Instrumento sempre no dia posterior a retirada
        LocacaoService ls = new LocacaoService();

        Locacao locacao = ls.alugarInstrumento(aluno,Arrays.asList(instrumentos.get(0),instrumentos.get(1)));

        Date data = locacao.getDataRetorno();

        assertTrue(DataUtils.isMesmaData(data,DataUtils.obterDataComDiferencaDias(1)));

    }

}

