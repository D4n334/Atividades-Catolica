/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package local.model;

/**
 *
 * @author Danielzin Gaymepray
 */
public class Instrumentos
{

    static void add(Instrumentos instrumentos) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    private String nome;
    private Integer estoque;
    private Double precoLocacao;

    public Instrumentos() 
    {
    }

    public Instrumentos(String nome, Integer estoque, Double precoLocacao) 
    {
        this.nome = nome;
        this.estoque = estoque;
        this.precoLocacao = precoLocacao;
    }

    public String getNome() 
    {
        return nome;
    }

    public void setNome(String nome) 
    {
        this.nome = nome;
    }

    public Integer getEstoque() 
    {
        return estoque;
    }

    public void setEstoque(Integer estoque) 
    {
        this.estoque = estoque;
    }

    public Double getPrecoLocacao() 
    {
        return precoLocacao;
    }

    public void setPrecoLocacao(Double precoLocacao) 
    {
        this.precoLocacao = precoLocacao;
    }
}

