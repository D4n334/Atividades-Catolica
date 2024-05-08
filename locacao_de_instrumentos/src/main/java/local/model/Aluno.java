/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package local.model;
/**
 *
 * @author Daniel Alexandre
 */
public class Aluno 
{

    public Aluno(String roberto_Glaydson) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    public class Pessoa 
    {
        private String nome;
        private String email;
        private String cpf;

        public String getNome() 
        {
            return nome;
        }

        public void setNome(String nome) 
        {
            this.nome = nome;
        }

        public String getEmail() 
        {
            return email;
        }

        public void setEmail(String email) 
        {
            this.email = email;
        }

        public String getCpf() 
        {
            return cpf;
        }

        public void setCpf(String cpf) 
        {
            this.cpf = cpf;
        }

        public void imprimir()
        {
            System.out.println("Nome:"+ getNome());
            System.out.println("Email:"+ getEmail());
            System.out.println("CPF:"+ getCpf());

        }
    }
}