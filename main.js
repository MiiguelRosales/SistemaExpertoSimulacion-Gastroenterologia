const screenStart = document.getElementById('screen-start');
const screenQuestion = document.getElementById('screen-question');
const screenResult = document.getElementById('screen-result');
const progressBar = document.getElementById('progress-bar');
const questionText = document.getElementById('question-text');
const diagnosisText = document.getElementById('diagnosis-text');
const diagnosisNote = document.getElementById('diagnosis-note');
const diagnosisDescription = document.getElementById('diagnosis-description');
const treatmentText = document.getElementById('treatment-text');
const symptomList = document.getElementById('symptom-list');
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
    reflujo_gastroesofagico: 'Reflujo gastroesofágico',
    gastritis: 'Gastritis',
    sindrome_intestino_irritable: 'Síndrome de intestino irritable',
    colelitiasis: 'Colelitiasis',
    gastroenteritis_infecciosa: 'Gastroenteritis infecciosa',
    ulcera_peptica: 'Úlcera péptica',
    esofagitis: 'Esofagitis',
    acalasia: 'Acalasia',
    esofago_de_barrett: 'Esofágo de Barrett',
    cancer_esofago: 'Cáncer de esófago',
    gastritis_aguda: 'Gastritis aguda',
    gastritis_cronica: 'Gastritis crónica',
    helicobacter_pylori: 'Helicobacter pylori',
    gastroparesia: 'Gastroparesia',
    enfermedad_crohn: 'Enfermedad de Crohn',
    colitis_ulcerosa: 'Colitis ulcerosa',
    colitis_microscopica: 'Colitis microscópica',
    celiaquia: 'Celiaquía',
    intolerancia_lactosa: 'Intolerancia a la lactosa',
    sibo: 'SIBO',
    diverticulitis: 'Diverticulitis',
    cancer_colon: 'Cáncer de colon',
    hepatitis_a: 'Hepatitis A',
    hepatitis_b: 'Hepatitis B',
    hepatitis_c: 'Hepatitis C',
    higado_graso: 'Hígado graso',
    cirrosis_hepatica: 'Cirrosis hepática',
    insuf_hepatica: 'Insuficiencia hepática',
    hepatocarcinoma: 'Hepatocarcinoma',
    colecistitis: 'Colecistitis',
    coledocolitiasis: 'Coledocolitiasis',
    colangitis: 'Colangitis',
    pancreatitis_aguda: 'Pancreatitis aguda',
    pancreatitis_cronica: 'Pancreatitis crónica',
    insuf_pancreatica_exocrina: 'Insuficiencia pancreática exocrina',
    cancer_pancreas: 'Cáncer de páncreas',
    hemorroides: 'Hemorroides',
    fisura_anal: 'Fisura anal',
    fistula_anorrectal: 'Fístula anorrectal',
    incontinencia_fecal: 'Incontinencia fecal',
    prolapso_rectal: 'Prolapso rectal'
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

function getSymptomLabel(symptom) {
  const question = knowledge.questions.find(q => q.symptom === symptom);
  return question?.text || symptom.replace(/_/g, ' ');
}

function getDiseaseDescription(disease) {
  const descriptions = {
    reflujo_gastroesofagico: 'Enfermedad en la que el contenido del estómago regresa al esófago, causando acidez, regurgitación y malestar torácico.',
    gastritis: 'Inflamación del revestimiento del estómago que provoca dolor epigástrico, náuseas y ardor.',
    sindrome_intestino_irritable: 'Trastorno funcional del intestino que causa dolor abdominal, hinchazón y cambios en el hábito intestinal.',
    colelitiasis: 'Presencia de cálculos en la vesícula biliar que puede generar dolor en el lado derecho del abdomen y náuseas.',
    gastroenteritis_infecciosa: 'Inflamación del estómago y los intestinos causada por infección, con diarrea, vómito y fiebre.',
    ulcera_peptica: 'Lesión en el estómago o duodeno causada por ácido o infección, que genera dolor y ardor digestivo.',
    esofagitis: 'Inflamación del esófago generalmente por ácido estomacal que causa ardor y dificultad para tragar.',
    acalasia: 'Problema motriz del esófago que dificulta el paso de alimentos hacia el estómago, provocando disfagia y regurgitación.',
    esofago_de_barrett: 'Cambio en el revestimiento del esófago debido al reflujo crónico, que puede aumentar el riesgo de cáncer.',
    cancer_esofago: 'Tumor maligno en el esófago que causa dificultad al tragar, dolor torácico y pérdida de peso.',
    gastritis_aguda: 'Inflamación súbita del estómago con dolor intenso, náuseas y posible vómito.',
    gastritis_cronica: 'Inflamación prolongada del estómago que puede provocar malestar repetido, pérdida de apetito y fatiga.',
    helicobacter_pylori: 'Infección bacteriana del estómago asociada con gastritis y úlceras.',
    gastroparesia: 'Retraso en el vaciado del estómago que produce saciedad temprana, náuseas y vómitos.',
    enfermedad_crohn: 'Enfermedad inflamatoria intestinal que puede afectar cualquier tramo del tubo digestivo con dolor, diarrea y pérdida de peso.',
    colitis_ulcerosa: 'Enfermedad inflamatoria del colon que produce diarrea, sangre en heces y dolor abdominal.',
    colitis_microscopica: 'Inflamación del colon visible solo al microscopio, con diarrea crónica y molestias abdominales.',
    celiaquia: 'Trastorno autoinmune en el que el gluten daña el intestino delgado, dando malabsorción y síntomas digestivos.',
    intolerancia_lactosa: 'Incapacidad para digerir lactosa, que provoca hinchazón, gases y diarrea al consumir productos lácteos.',
    sibo: 'Sobrecrecimiento bacteriano en el intestino delgado que causa distensión, diarrea y malabsorción.',
    diverticulitis: 'Inflamación o infección de los divertículos del colon, con dolor en el lado izquierdo y fiebre.',
    cancer_colon: 'Tumor maligno en el colon o recto asociado a sangre en heces, cambios en el hábito intestinal y fatiga.',
    hepatitis_a: 'Inflamación viral del hígado que causa ictericia, fatiga y náuseas.',
    hepatitis_b: 'Inflamación viral del hígado que puede ser aguda o crónica y provocar ictericia, fatiga y dolor abdominal.',
    hepatitis_c: 'Inflamación viral del hígado que puede volverse crónica y causar daño hepático progresivo.',
    higado_graso: 'Acumulación de grasa en el hígado que puede causar inflamación y malestar abdominal.',
    cirrosis_hepatica: 'Cicatrización del hígado por daño crónico que reduce su función y produce ascitis e ictericia.',
    insuf_hepatica: 'Falla hepática en la que el hígado no puede realizar sus funciones normales, provocando fatiga y desequilibrios.',
    hepatocarcinoma: 'Cáncer primario del hígado que puede causar dolor, pérdida de peso y molestias abdominales.',
    colecistitis: 'Inflamación de la vesícula biliar, generalmente por cálculos, que genera dolor en el hipocondrio derecho.',
    coledocolitiasis: 'Piedras en los conductos biliares que pueden causar dolor intenso, ictericia y fiebre.',
    colangitis: 'Infección o inflamación de los conductos biliares que provoca fiebre, ictericia y dolor.',
    pancreatitis_aguda: 'Inflamación súbita del páncreas con dolor abdominal intenso y náuseas.',
    pancreatitis_cronica: 'Inflamación prolongada del páncreas que causa dolor persistente y problemas digestivos.',
    insuf_pancreatica_exocrina: 'Falta de enzimas pancreáticas para digerir alimentos, ocasionando diarrea y pérdida de peso.',
    cancer_pancreas: 'Tumor maligno del páncreas que suele provocar dolor abdominal y pérdida de peso.',
    hemorroides: 'Venas inflamadas en el recto o ano que causan sangrado, picor y dolor al defecar.',
    fisura_anal: 'Pequeña ruptura en el ano que produce dolor intenso y sangrado durante la evacuación.',
    fistula_anorrectal: 'Conducto anormal entre el recto y la piel cercana que puede supurar y doler.',
    incontinencia_fecal: 'Pérdida de control de las evacuaciones, con escapes involuntarios de heces.',
    prolapso_rectal: 'Salida parcial del recto hacia el exterior durante la evacuación, causando molestia y sangrado.'
  };

  return descriptions[disease] || 'Explicación breve no disponible. Este resultado se basa en los síntomas reportados.';
}

async function submitDiagnosis() {
  let diagnosis = 'Sin diagnóstico claro';
  let treatment = 'No se pudo determinar un diagnóstico preciso. Consulta a un especialista.';
  let description = 'No se puede mostrar una definición porque no hay un diagnóstico claro. Por favor responde algunos síntomas nuevamente.';

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
    description = getDiseaseDescription(best.disease);
    if (candidateDiseases.length > 1) {
      treatment += `\n(${candidateDiseases.length} enfermedades aún son posibles con estas respuestas)`;
      diagnosisNote.textContent = `Atención: todavía hay ${candidateDiseases.length} enfermedades posibles. Los resultados son orientativos.`;
    } else {
      diagnosisNote.textContent = '';
    }
  }

  diagnosisText.textContent = diagnosis;
  diagnosisDescription.textContent = description;
  if (positiveSymptoms.size === 0 || candidateDiseases.length === 0) {
    diagnosisNote.textContent = '';
  }
  treatmentText.textContent = treatment;

  const positiveLabels = [...positiveSymptoms].map(getSymptomLabel);
  if (positiveLabels.length === 0) {
    symptomList.innerHTML = '<li class="px-4 py-3 bg-medical-50 rounded-2xl text-sm text-slate-600">No se detectaron síntomas positivos.</li>';
  } else {
    symptomList.innerHTML = positiveLabels
      .map(label => `<li class="px-4 py-3 bg-medical-50 rounded-2xl text-sm text-slate-700">${label}</li>`)
      .join('');
  }

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
