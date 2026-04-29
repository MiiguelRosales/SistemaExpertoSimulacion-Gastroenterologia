const screenStart = document.getElementById('screen-start');
const screenQuestion = document.getElementById('screen-question');
const screenResult = document.getElementById('screen-result');
const progressBar = document.getElementById('progress-bar');
const questionText = document.getElementById('question-text');
const diagnosisText = document.getElementById('diagnosis-text');
const treatmentText = document.getElementById('treatment-text');
const doctorImage = document.getElementById('doctor-image');

let knowledge = null;
let currentQuestion = null;
let askedSymptoms = new Set();
let positiveSymptoms = new Set();
let negativeSymptoms = new Set();
let candidateDiseases = [];
let initialCandidateCount = 0;
let estimatedSteps = 5;
let thinkingThreshold = 2;
let thinkingShown = false;

async function loadKnowledge() {
  const response = await fetch('/api/knowledge');
  knowledge = await response.json();
  candidateDiseases = knowledge.diseases.slice();
  initialCandidateCount = candidateDiseases.length;
  estimatedSteps = Math.max(3, Math.min(10, Math.ceil(Math.log2(initialCandidateCount))));
}

function showScreen(screen) {
  screenStart.classList.add('hidden-screen');
  screenQuestion.classList.add('hidden-screen');
  screenResult.classList.add('hidden-screen');
  screen.classList.remove('hidden-screen');
}

function getUnaskedQuestions() {
  return knowledge.questions.filter(q => !askedSymptoms.has(q.symptom));
}

function selectNextQuestion() {
  const remaining = getUnaskedQuestions();
  if (!remaining.length) return null;

  let bestQuestion = null;
  let bestScore = -1;

  for (const question of remaining) {
    const yesCount = candidateDiseases.filter(d => d.symptoms.includes(question.symptom)).length;
    const noCount = candidateDiseases.length - yesCount;
    const score = Math.min(yesCount, noCount);

    if (score > bestScore && yesCount > 0 && noCount > 0) {
      bestScore = score;
      bestQuestion = question;
    }
  }

  return bestQuestion || remaining[0];
}

function updateQuestion() {
  if (candidateDiseases.length <= 1) {
    submitDiagnosis();
    return false;
  }

  currentQuestion = selectNextQuestion();
  if (!currentQuestion) {
    submitDiagnosis();
    return false;
  }

  questionText.textContent = currentQuestion.text;
  maybeShowThinking();
  return true;
}

function maybeShowThinking() {
  if (!thinkingShown && askedSymptoms.size >= thinkingThreshold) {
    doctorImage.src = 'pensando_doc.png';
    thinkingShown = true;
  }
}

function filterCandidates(symptom, answer) {
  if (answer) {
    return candidateDiseases.filter(d => d.symptoms.includes(symptom));
  }
  return candidateDiseases.filter(d => !d.symptoms.includes(symptom));
}

function formatDiseaseName(name) {
  const map = {
    insuf_hepatica: 'Insuficiencia hepática',
    sindrome_intestino_irritable: 'Síndrome de intestino irritable',
    ulcera_peptica: 'Úlcera péptica',
    esofago_de_barrett: 'Esofago de Barrett',
    cancer_esofago: 'Cáncer de esófago',
    cancer_colon: 'Cáncer de colon',
    cancer_pancreas: 'Cáncer de páncreas',
    higado_graso: 'Hígado graso',
    cirrosis_hepatica: 'Cirrosis hepática',
    helicobacter_pylori: 'Helicobacter pylori',
    gastritis_aguda: 'Gastritis aguda',
    gastritis_cronica: 'Gastritis crónica',
    pancreatitis_aguda: 'Pancreatitis aguda',
    pancreatitis_cronica: 'Pancreatitis crónica',
    insuf_pancreatica_exocrina: 'Insuficiencia pancreática exocrina',
    coledocolitiasis: 'Coledocolitiasis',
    colangitis: 'Colangitis',
    colitis_ulcerosa: 'Colitis ulcerosa',
    colitis_microscopica: 'Colitis microscópica',
    enfermedad_crohn: 'Enfermedad de Crohn'
  };

  if (map[name]) {
    return map[name];
  }

  return name
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function submitDiagnosis() {
  let diagnosis = 'Sin diagnóstico claro';
  let treatment = 'No se pudo determinar un diagnóstico preciso. Consulta a un especialista.';

  if (positiveSymptoms.size === 0 || candidateDiseases.length === 0) {
    treatment = 'No hay suficientes síntomas positivos para establecer un diagnóstico confiable.';
  } else {
    candidateDiseases.sort((a, b) => {
      const matchA = [...positiveSymptoms].filter(sym => a.symptoms.includes(sym)).length;
      const matchB = [...positiveSymptoms].filter(sym => b.symptoms.includes(sym)).length;
      if (matchA !== matchB) return matchB - matchA;
      return a.symptoms.length - b.symptoms.length;
    });

    const best = candidateDiseases[0];
    diagnosis = formatDiseaseName(best.disease);
    treatment = best.treatment;
    if (candidateDiseases.length > 1) {
      treatment += `\n(${candidateDiseases.length} enfermedades aún son posibles con estas respuestas)`;
    }
  }

  diagnosisText.textContent = diagnosis;
  treatmentText.textContent = treatment;
  doctorImage.src = 'eva_completada.png';
  progressBar.style.width = '100%';
  showScreen(screenResult);
}

function nextQuestion(answer) {
  const symptom = currentQuestion.symptom;
  askedSymptoms.add(symptom);
  if (answer) {
    positiveSymptoms.add(symptom);
  } else {
    negativeSymptoms.add(symptom);
  }

  candidateDiseases = filterCandidates(symptom, answer);
  if (!candidateDiseases.length) {
    candidateDiseases = knowledge.diseases.slice();
  }

  const showNext = updateQuestion();
  if (showNext) {
    const asked = askedSymptoms.size;
    const percent = Math.min(100, Math.round((asked / estimatedSteps) * 100));
    progressBar.style.width = `${percent}%`;
  }
}

function resetFlow() {
  currentQuestion = null;
  askedSymptoms.clear();
  positiveSymptoms.clear();
  negativeSymptoms.clear();
  candidateDiseases = knowledge.diseases.slice();
  initialCandidateCount = candidateDiseases.length;
  estimatedSteps = Math.max(3, Math.min(10, Math.ceil(Math.log2(initialCandidateCount))));
  thinkingThreshold = [1, 2, 3][Math.floor(Math.random() * 3)];
  thinkingShown = false;
  progressBar.style.width = '0%';
  doctorImage.src = 'doc.png';
  updateQuestion();
  showScreen(screenStart);
}

async function init() {
  await loadKnowledge();
  resetFlow();

  document.getElementById('btn-start').addEventListener('click', () => {
    showScreen(screenQuestion);
    progressBar.style.width = '3%';
  });

  document.getElementById('btn-yes').addEventListener('click', () => nextQuestion(true));
  document.getElementById('btn-no').addEventListener('click', () => nextQuestion(false));
  document.getElementById('btn-restart').addEventListener('click', resetFlow);
}

init().catch(err => {
  console.error('Error inicializando la app:', err);
});
