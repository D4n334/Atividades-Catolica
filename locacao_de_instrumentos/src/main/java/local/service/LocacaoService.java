/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package local.service;
import static local.util.DataUtils.adicionarDias;
import local.model.Instrumentos;
import local.model.Aluno;
import java.util.Date;
import java.util.List;
import local.exceptions.InstrumentoSemEstoque;
import local.exceptions.LocacaoException;
import local.model.Locacao;

/**
 *
 * @author Daniel Alexandre
 */
public class LocacaoService 
{
//atualizar Instrumentos
    public Locacao alugarInstrumento(Aluno aluno, List<Instrumentos> instrumentos) throws InstrumentoSemEstoque, LocacaoException 
    {
        if (aluno == null) 
        {
            throw new LocacaoException("Impossivel locar sem um usuário");
        }
        if (instrumentos == null || instrumentos.isEmpty()) 
        {
            throw new LocacaoException("Nenhum Instrumento foi selecionado");
        }

        Locacao locacao = new Locacao();
        locacao.setAluno(aluno);

        for(Instrumentos instrumento: instrumentos) {
            if (instrumento.getEstoque() == 0) {
                throw new InstrumentoSemEstoque("Instrumento sem estoque");
            }

            locacao.addInstrumento(instrumento);
            locacao.setDataLocacao(new Date());
            locacao.setValor(instrumento.getPrecoLocacao());

            //Entrega no dia seguinte
            Date dataEntrega = new Date();
            dataEntrega = adicionarDias(dataEntrega, 1);
            locacao.setDataRetorno(dataEntrega);
        }
        //Salvando a locacao...	
        //TODO adicionar método para salvar
        return locacao;   
    }
}
