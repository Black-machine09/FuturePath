from . import db
from datetime import datetime

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    telefone = db.Column(db.String(20))
    cidade = db.Column(db.String(100))   
    estado = db.Column(db.String(100))   
    curriculo = db.Column(db.String(200))  

    def __repr__(self):
        return f'<Usuario {self.nome}>'


class Oportunidade(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(150), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    local = db.Column(db.String(100), nullable=False)
    link = db.Column(db.String(300))
    data_publicacao = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Oportunidade {self.titulo}>'
