from pathlib import Path
import json
import subprocess

from flask import Flask, jsonify, request, send_from_directory

BASE_DIR = Path(__file__).parent
PL_FILE = BASE_DIR / 'Gastroenterologia.pl'

app = Flask(__name__, static_folder='')


def run_prolog(goal: str) -> str:
    cmd = [
        'swipl',
        '-q',
        '-s',
        str(PL_FILE),
        '-g',
        goal,
        '-t',
        'halt'
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or 'Error ejecutando SWI-Prolog')
    return result.stdout.strip()


@app.route('/')
def index():
    return send_from_directory(BASE_DIR, 'index.html')


@app.route('/<path:filename>')
def public_files(filename):
    return send_from_directory(BASE_DIR, filename)


@app.route('/api/questions')
def questions():
    goal = (
        "use_module(library(http/json)), "
        "findall(json([symptom=S,text=T]), pregunta(S,T), L), "
        "json_write_dict(current_output, L), nl"
    )
    output = run_prolog(goal)
    return jsonify(json.loads(output))


@app.route('/api/knowledge')
def knowledge():
    goal = (
        "use_module(library(http/json)), "
        "findall(json([disease=D,symptoms=Symptoms,treatment=Tr]), "
        "(enfermedad(D,Symptoms), tratamiento(D,Tr)), Diseases), "
        "findall(json([symptom=S,text=T]), pregunta(S,T), Questions), "
        "json_write_dict(current_output, json([diseases=Diseases,questions=Questions])), nl"
    )
    output = run_prolog(goal)
    return jsonify(json.loads(output))


@app.route('/api/diagnose', methods=['POST'])
def diagnose():
    data = request.get_json(force=True)
    positives = data.get('positives', [])
    if not isinstance(positives, list):
        return jsonify({'error': 'El campo positives debe ser un arreglo de sintomas.'}), 400

    prolog_list = '[' + ','.join(positives) + ']'
    goal = (
        "use_module(library(http/json)), "
        f"Pos={prolog_list}, "
        "findall(json([disease=D,treatment=Tr]), "
        "(diagnostico_por_sintomas(Pos,D), tratamiento(D,Tr)), L), "
        "json_write_dict(current_output, L), nl"
    )
    output = run_prolog(goal)
    result = json.loads(output)

    if not result:
        return jsonify({
            'diagnosis': None,
            'treatment': None,
            'message': 'No se pudo determinar un diagnóstico claro. Consulta a un especialista.'
        })

    diagnosis = result[0]
    return jsonify({
        'diagnosis': diagnosis.get('disease'),
        'treatment': diagnosis.get('treatment'),
        'message': 'Diagnóstico hallado con base en síntomas seleccionados.'
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000)
