/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package local.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Daniel Alexandre
 */
public class Locacao 
{
	private Aluno aluno;
	private List<Instrumentos> instrumentos;
	private Date dataLocacao;
	private Date dataRetorno;
	private Double valor;

	public Locacao()
        {
            instrumentos = new ArrayList<>();
	}
	
	public Aluno getAluno() 
        {
            return aluno;
	}
	public void setAluno(Aluno aluno) 
        {
            this.aluno = aluno;
	}
	public Date getDataLocacao() 
        {
            return dataLocacao;
	}
	public void setDataLocacao(Date dataLocacao) 
        {
            this.dataLocacao = dataLocacao;
	}
	public Date getDataRetorno() 
        {
            return dataRetorno;
	}
	public void setDataRetorno(Date dataRetorno) 
        {
            this.dataRetorno = dataRetorno;
	}
	public Double getValor() 
        {
            return valor;
	}
	public void setValor(Double valor) 
        {
            this.valor = valor;
	}
	public List<Instrumentos> getInstrumentos() 
        {
            return instrumentos;
	}
	public void addInstrumentos(Instrumentos instrumentos)
        {
            Instrumentos.add(instrumentos);
	}

    public void addInstrumento(Instrumentos instrumentos) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
