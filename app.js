const fs = require('fs');
const path = require('path');
const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));

app.use("/", express.static("./node_modules/static/"))

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
  res.render("tela_inicio")
});

app.get("/aula", function (req, res) {
  res.render("aula");
});

app.get("/pagina_principal", function (req, res) {
  res.render("pagina_principal");
});

app.get("/aula1", function (req, res) {
  res.render("aula1");
});

app.get("/pagina_principal_professor", function (req, res) {
  res.render("pagina_principal_professor");
});

app.get("/aula_professor", function (req, res) {
  res.render("aula_professor");
});

app.get("/aula1_professor", function (req, res) {
  res.render("aula1_professor");
});

app.use("/", express.static("./views"))
let fileNumber = 2;

app.post('/criar_arquivo', (req, res) => {
  let fileName = `./views/aula${fileNumber}.ejs`;

  // Verifica se o arquivo já existe
  while (fs.existsSync(fileName)) {
    console.log(`Arquivo ${fileName} já existe.`);
    fileNumber++;
    fileName = `./views/aula${fileNumber}.ejs`;
  }

  let newAulaBlock = `
  <div class="aulas">
  <div class="container">

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
    <div class="col">
      <div class="card">    
        <div class="card-body">
          <img src="imagens/1694.jpg" alt="Descrição da Imagem" width="100" height="100">
          <p class="card-text">Aula ${fileNumber}</p>
        </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <a href="/aula${fileNumber}">
                <button type="button" class="botao-entrar">Entrar</button>
              </a>
            </div>
        </div>
      </div>
    </div>
  `;

  // Lê o conteúdo atual do arquivo aula.ejs
  fs.readFile('./views/aula.ejs', 'utf8', function(err, data) {
    if (err) throw err;

    // Adiciona o novo bloco de aula ao conteúdo
    let updatedContent = data.replace('</body>', newAulaBlock + '</body>');

    // Reescreve o arquivo aula.ejs com o novo conteúdo
    fs.writeFile('./views/aula.ejs', updatedContent, 'utf8', function(err) {
      if (err) throw err;
      console.log('Arquivo aula.ejs atualizado com sucesso!');
    });
  });


  let htmlContent = `

  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Minha Plataforma Musical</title>
      <link rel="stylesheet" type="text/css" href="CSS/aula1.css">
  </head>
  <body>
      <nav>
          <h1>Bem-vindo à Minha Plataforma Musical</h1>
          <ul>
              <li><a href="/pagina_principal">Início</a></li>
              <li><a href="/aula">Aulas</a></li>
              <li><a href="#">Comunidade</a></li>
          </ul>
      </nav>
  
      <section>
          <div class="video">
              <h2>Assista a uma aula de violão</h2>
              <iframe width="560" height="315" src="" frameborder="0" allowfullscreen></iframe>
              <div>
                  <a href="/aula">
                      <button class="botao-voltar">Voltar</button>
                  </a>
              <div>
                <label for="novoLink">Novo link do YouTube:</label>
                <input type="text" id="novoLink" placeholder="Cole o novo link aqui">
                <button onclick="trocarLink()">Trocar</button>
              </div>              
              </div>
          </div>
      </section>
  
      <script>
        // Carrega o link do vídeo salvo no localStorage
        function carregarLinkSalvo() {
            const linkSalvo = localStorage.getItem('videoLink');
            if (linkSalvo) {
                const iframe = document.querySelector('.video iframe');
                iframe.src = linkSalvo;
            }
        }
    
        // Chama a função ao carregar a página
        window.addEventListener('load', carregarLinkSalvo);
        
        function trocarLink() {
            const novoLink = document.getElementById('novoLink').value;
            const iframe = document.querySelector('.video iframe');
            iframe.src = novoLink;
    
            // Salva o novo link no localStorage
            localStorage.setItem('videoLink', novoLink);
        }
    </script>
    
      
      <main>
          <section>
              <h2>Conheça nossos cursos</h2>
              <p>Explore nossas aulas de canto, teoria musical e muito mais.</p>
          </section>
  
          <section>
              <h2>Compartilhe suas composições</h2>
              <p>Publique suas partituras e receba feedback da comunidade.</p>
          </section>
      </main>
  
      <footer>
          <p>© 2024 Minha Plataforma Musical</p>
      </footer>
  </body>
  </html>  
  `;

  fs.writeFile(fileName, htmlContent, err => {
    if (err) throw err;
    console.log(`Arquivo ${fileName} criado com sucesso!`);
    fileNumber++;
  });
});

// Rota dinâmica para as aulas
app.get('/aula/:id', (req, res) => {
  let aulaId = req.params.id;
  res.sendFile(__dirname + `/views/aula${aulaId}.ejs`);
});


for (let i = 2; i <= 12; i++) {
  app.get("/aula" + i, function (req, res) {
    res.render("aula" + i);
  });
}


app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
