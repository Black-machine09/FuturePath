from flask import Blueprint, request, jsonify, send_from_directory, current_app
from werkzeug.utils import secure_filename
from app.models import db, Usuario, Oportunidade  
import os

main = Blueprint('main', __name__)

@main.route('/cadastrar_usuario', methods=['POST'])
def cadastrar_usuario():
    nome = request.form.get('nome')
    email = request.form.get('email')
    telefone = request.form.get('telefone')
    cidade = request.form.get('cidade')
    estado = request.form.get('estado')
    curriculo = request.files.get('arquivo')

    if not nome or not email:
        return jsonify({'erro': 'Nome e e-mail são obrigatórios'}), 400

    nome_arquivo = None
    if curriculo:
        nome_arquivo = secure_filename(curriculo.filename)
        caminho = os.path.join(current_app.config['UPLOAD_FOLDER'], nome_arquivo)
        curriculo.save(caminho)

    novo_usuario = Usuario(
        nome=nome,
        email=email,
        telefone=telefone,
        cidade=cidade,
        estado=estado,
        curriculo=nome_arquivo
    )
    db.session.add(novo_usuario)
    db.session.commit()

    return jsonify({'mensagem': 'Usuário cadastrado com sucesso'}), 201

@main.route('/usuarios', methods=['GET'])
def listar_usuarios():
    usuarios = Usuario.query.all()
    resultado = []
    for u in usuarios:
        resultado.append({
            'id': u.id,
            'nome': u.nome,
            'email': u.email,
            'telefone': u.telefone,
            'cidade': u.cidade,
            'estado': u.estado,
            'curriculo': u.curriculo
        })
    return jsonify(resultado)

@main.route('/cadastrar_oportunidade', methods=['POST'])
def cadastrar_oportunidade():
    dados = request.json
    nova = Oportunidade(
        titulo=dados.get('titulo'),
        descricao=dados.get('descricao'),
        local=dados.get('local')
    )
    db.session.add(nova)
    db.session.commit()
    return jsonify({'mensagem': 'Oportunidade criada com sucesso'}), 201

@main.route('/oportunidades', methods=['GET'])
def listar_oportunidades():
    oportunidades = Oportunidade.query.all()

    if not oportunidades:
        return jsonify([
            {
                'titulo': 'Estágio em TI',
                'descricao': 'Suporte técnico e manutenção de sistemas.',
                'local': 'Luanda'
            },
            {
                'titulo': 'Assistente Administrativo',
                'descricao': 'Apoio nas rotinas administrativas da empresa.',
                'local': 'Luanda'
            },
            {
                'titulo': 'Desenvolvedor Júnior',
                'descricao': 'Desenvolvimento de aplicações web em Python.',
                'local': 'Luanda'
            }
        ]), 200

    lista = [{
        'titulo': op.titulo,
        'descricao': op.descricao,
        'local': op.local
    } for op in oportunidades]

    return jsonify(lista), 200

@main.route('/curriculos/<nome_arquivo>', methods=['GET'])
def baixar_curriculo(nome_arquivo):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], nome_arquivo)
