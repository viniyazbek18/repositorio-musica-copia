public class PlataformaMusical {
    public static void main(String[] args) {
        // Simulando um banco de dados com usuários e senhas
        String usuarioAluno = "aluno";
        String senhaAluno = "senha_aluno";

        String usuarioProfessor = "professor";
        String senhaProfessor = "senha_professor";

        // Simulando entrada do usuário (você pode usar Scanner para entrada real)
        String usuarioDigitado = "aluno"; // Substitua pelo valor digitado pelo usuário
        String senhaDigitada = "senha_aluno"; // Substitua pelo valor digitado pelo usuário

        if (usuarioDigitado.equals(usuarioAluno) && senhaDigitada.equals(senhaAluno)) {
            System.out.println("Login de aluno bem-sucedido!");
            // Lógica para redirecionar para a página do aluno
        } else if (usuarioDigitado.equals(usuarioProfessor) && senhaDigitada.equals(senhaProfessor)) {
            System.out.println("Login de professor bem-sucedido!");
            // Lógica para redirecionar para a página do professor
        } else {
            System.out.println("Usuário ou senha incorretos. Tente novamente.");
        }
    }
}
