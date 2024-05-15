from flask import Flask, render_template

app = Flask(__name__)
app.static_folder = 'static'  # Pasta onde seus arquivos CSS estão


@app.route('/')
def index():
    return render_template('pagina_principal.html')

if __name__ == '__main__':
    app.run(debug=True)
