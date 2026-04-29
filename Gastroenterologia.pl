:- encoding(utf8).
:- dynamic si/1.
:- dynamic no/1.

% --- BASE DE CONOCIMIENTO: ENFERMEDADES Y SÍNTOMAS ---
enfermedad(reflujo_gastroesofagico, [acidez, regurgitacion, dolor_pecho_no_cardiaco, nudo_garganta]).
enfermedad(gastritis, [dolor_epigastrico, nauseas, saciedad_temprana, ardor_estomago]).
enfermedad(sindrome_intestino_irritable, [dolor_abdominal, distension_abdominal, exceso_gases, cambios_habitos]).
enfermedad(colelitiasis, [dolor_hipocondrio_derecho, nauseas, vomito, dolor_post_grasas]).
enfermedad(gastroenteritis_infecciosa, [diarrea, vomito, dolor_abdominal, fiebre]).
enfermedad(ulcera_peptica, [dolor_epigastrico_nocturno, ardor_estomago, heces_oscuras, perdida_peso]).
enfermedad(esofagitis, [acidez, ardor_estomago, disfagia, regurgitacion]).
enfermedad(acalasia, [disfagia, regurgitacion, perdida_peso, tos_nocturna]).
enfermedad(esofago_de_barrett, [acidez, regurgitacion, disfagia, nudo_garganta]).
enfermedad(cancer_esofago, [disfagia, perdida_peso, odinofagia, tos_nocturna]).
enfermedad(gastritis_aguda, [dolor_epigastrico, nauseas, vomito, ardor_estomago]).
enfermedad(gastritis_cronica, [dolor_epigastrico, nauseas, saciedad_temprana, perdida_peso]).
enfermedad(helicobacter_pylori, [dolor_epigastrico, nauseas, ardor_estomago, heces_oscuras]).
enfermedad(gastroparesia, [saciedad_temprana, nauseas, vomito, distension_abdominal]).
enfermedad(enfermedad_crohn, [dolor_abdominal, diarrea, perdida_peso, fiebre]).
enfermedad(colitis_ulcerosa, [diarrea, sangre_en_heces, dolor_abdominal, tenesmo]).
enfermedad(colitis_microscopica, [diarrea, dolor_abdominal, urgencia_fecal, fatiga]).
enfermedad(celiaquia, [distension_abdominal, diarrea, perdida_peso, anemia]).
enfermedad(intolerancia_lactosa, [distension_abdominal, exceso_gases, diarrea, nauseas]).
enfermedad(sibo, [distension_abdominal, exceso_gases, diarrea, fatiga]).
enfermedad(diverticulitis, [dolor_hipocondrio_izquierdo, fiebre, nauseas, cambios_habitos]).
enfermedad(cancer_colon, [cambios_habitos, sangre_en_heces, perdida_peso, fatiga]).
enfermedad(hepatitis_a, [ictericia, fatiga, nauseas, fiebre]).
enfermedad(hepatitis_b, [ictericia, fatiga, nauseas, fiebre]).
enfermedad(hepatitis_c, [ictericia, fatiga, nauseas, fiebre]).
enfermedad(higado_graso, [fatiga, malestar_abdominal, perdida_peso, distension_abdominal]).
enfermedad(cirrosis_hepatica, [ictericia, ascitis, fatiga, perdida_peso]).
enfermedad(insuf_hepatica, [ictericia, hinchazon_piernas, confucion, fatiga]).
enfermedad(hepatocarcinoma, [dolor_superior_derecho, perdida_peso, ascitis, fatiga]).
enfermedad(colecistitis, [dolor_hipocondrio_derecho, fiebre, nauseas, vomito]).
enfermedad(coledocolitiasis, [ictericia, coluria, dolor_hipocondrio_derecho, fiebre]).
enfermedad(colangitis, [ictericia, fiebre, dolor_hipocondrio_derecho, prurito]).
enfermedad(pancreatitis_aguda, [dolor_epigastrico, vomito, fiebre, dolor_abdominal]).
enfermedad(pancreatitis_cronica, [dolor_abdominal, perdida_peso, esteatorrea, nauseas]).
enfermedad(insuf_pancreatica_exocrina, [esteatorrea, perdida_peso, distension_abdominal, diarrea]).
enfermedad(cancer_pancreas, [dolor_epigastrico, perdida_peso, ictericia, nauseas]).
enfermedad(hemorroides, [sangre_en_heces, prurito_anorrectal, molestia_rectal, dolor_al_defecar]).
enfermedad(fisura_anal, [dolor_al_defecar, sangre_en_heces, espasmo_anal, molestia_rectal]).
enfermedad(fistula_anorrectal, [secrecion_purulenta, dolor_anorrectal, irritacion, fiebre]).
enfermedad(incontinencia_fecal, [perdida_control, urgencia_fecal, manchas_en_ropa_interior, fatiga]).
enfermedad(prolapso_rectal, [masa_protruyente, sensacion_de_peso, sangrado, molestia_rectal]).

% --- TRATAMIENTOS SUGERIDOS ---
tratamiento(reflujo_gastroesofagico, 'Antiacidos, omeprazol y evitar cenas abundantes antes de dormir.').
tratamiento(gastritis, 'Dieta sin irritantes (picante, cafe), dieta blanda y protectores gastricos.').
tratamiento(sindrome_intestino_irritable, 'Antiespasmodicos, dieta baja en FODMAPs y manejo del estres.').
tratamiento(colelitiasis, 'Dieta estricta sin grasas, analgesicos y valoracion para cirugia (colecistectomia).').
tratamiento(gastroenteritis_infecciosa, 'Hidratacion con suero oral, loperamida (si no hay fiebre alta) y reposo.').
tratamiento(ulcera_peptica, 'Inhibidores de bomba de protones, evitar ibuprofeno/aspirina y antibioticos si hay H. pylori.').

tratamiento(esofagitis, 'Inhibidores de bomba de protones y evitar irritantes como cafe y alcohol.').
tratamiento(acalasia, 'Evaluacion por especialista, dilatacion esofagica y control de alimentos solidos.').
tratamiento(esofago_de_barrett, 'Control de reflujo con IBP y endoscopia de seguimiento.').
tratamiento(cancer_esofago, 'Evaluacion oncológica urgente y terapia según estadio.').
tratamiento(gastritis_aguda, 'Dieta blanda, antiacidos y evitar alcohol/irritantes.').
tratamiento(gastritis_cronica, 'IBP, erradicar H. pylori si esta presente y seguimiento.').
tratamiento(helicobacter_pylori, 'Triple terapia con IBP, claritromicina y amoxicilina o metronidazol.').
tratamiento(gastroparesia, 'Pequenas comidas frecuentes, proquinéticos y control glucemico.').
tratamiento(enfermedad_crohn, 'Anti-inflamatorios, inmunomoduladores y dieta especial.').
tratamiento(colitis_ulcerosa, 'Aminosalicilatos, corticoides y vigilancia colonoscopica.').
tratamiento(colitis_microscopica, 'Aminosalicilatos y control dietetico.').
tratamiento(celiaquia, 'Dieta estricta sin gluten de por vida.').
tratamiento(intolerancia_lactosa, 'Evitar lactosa y usar enzimas lactasas si es necesario.').
tratamiento(sibo, 'Antibioticos de amplio espectro y dieta baja en FODMAPs.').
tratamiento(diverticulitis, 'Antibioticos, dieta baja en fibras durante el brote y reposo.').
tratamiento(cancer_colon, 'Evaluacion quirurgica y oncológica urgente.').
tratamiento(hepatitis_a, 'Manejo de sintomas, hidratacion y reposo.').
tratamiento(hepatitis_b, 'Manejo de sintomas y consideracion de terapia antiviral segun el caso.').
tratamiento(hepatitis_c, 'Manejo de sintomas y terapia antiviral segun indicaciones.').
tratamiento(higado_graso, 'Perdida de peso, ejercicio y control de lipidos.').
tratamiento(cirrosis_hepatica, 'Manejo de complicaciones y seguimiento hepatologico especializado.').
tratamiento(insuf_hepatica, 'Cuidados hospitalarios y tratamiento de la causa subyacente.').
tratamiento(hepatocarcinoma, 'Evaluacion oncológica y tratamiento segun estadio.').
tratamiento(colecistitis, 'Antibioticos, analgesia y valoracion para colecistectomia.').
tratamiento(coledocolitiasis, 'Desobstruccion biliar y posible extraccion de calculos.').
tratamiento(colangitis, 'Antibioticos IV y drenaje biliar urgente.').
tratamiento(pancreatitis_aguda, 'Hidratacion IV, analgesia y ayuno hasta mejorar.').
tratamiento(pancreatitis_cronica, 'Enzimas pancreaticas, analgesia y dieta baja en grasas.').
tratamiento(insuf_pancreatica_exocrina, 'Suplemento de enzimas pancreaticas y dieta adecuada.').
tratamiento(cancer_pancreas, 'Evaluacion oncológica urgente y tratamiento segun estadio.').
tratamiento(hemorroides, 'Higiene local, banos de asiento y ungüentos topicos.').
tratamiento(fisura_anal, 'Banos de asiento, pomadas, fibra y evitar esfuerzo en la evacuacion.').
tratamiento(fistula_anorrectal, 'Evaluacion quirurgica y tratamiento antibiotico si hay infeccion.').
tratamiento(incontinencia_fecal, 'Ejercicios de suelo pelvico, dieta y evaluacion medica.').
tratamiento(prolapso_rectal, 'Evaluacion quirurgica y medidas para evitar esfuerzo defecatorio.').
% --- PREGUNTAS ASOCIADAS A CADA SINTOMA ---
pregunta(acidez, 'Sientes una sensacion de ardor en el pecho que sube a la garganta').
pregunta(regurgitacion, 'Sientes que el alimento o un liquido agrio se te regresa').
pregunta(dolor_pecho_no_cardiaco, 'Tienes un dolor en el pecho que no empeora con el ejercicio').
pregunta(nudo_garganta, 'Sientes como si tuvieras un nudo atorado en la garganta').
pregunta(dolor_epigastrico, 'Te duele la "boca del estomago"').
pregunta(nauseas, 'Tienes nauseas o muchas ganas de vomitar').
pregunta(saciedad_temprana, 'Te llenas rapidisimo al empezar a comer').
pregunta(ardor_estomago, 'Sientes ardor constante dentro del estomago').
pregunta(dolor_abdominal, 'Tienes dolor o retorcijones en el abdomen').
pregunta(distension_abdominal, 'Sientes el vientre muy inflamado o hinchado').
pregunta(exceso_gases, 'Tienes exceso de gases o flatulencias').
pregunta(cambios_habitos, 'Alternas entre dias con diarrea y dias con estrenimiento').
pregunta(dolor_hipocondrio_derecho, 'Tienes un dolor fuerte debajo de las costillas del lado derecho').
pregunta(vomito, 'Has vomitado recientemente').
pregunta(dolor_post_grasas, 'El dolor empeora despues de comer alimentos grasosos o muy pesados').
pregunta(diarrea, 'Tienes heces liquidas o diarrea frecuente').
pregunta(fiebre, 'Tienes fiebre').
pregunta(dolor_epigastrico_nocturno, 'El dolor del estomago es tan fuerte que te despierta en las noches').
pregunta(heces_oscuras, 'Tus heces son de color negro o muy oscuras').
pregunta(perdida_peso, 'Has perdido peso ultimamente sin intentarlo').
pregunta(disfagia, 'Tienes dificultad para tragar solidos o liquidos').
pregunta(odinofagia, 'Te duele al tragar los alimentos').
pregunta(tos_nocturna, 'Tienes tos especialmente durante la noche').
pregunta(sangre_en_heces, 'Notas sangre en tus heces o en el inodoro').
pregunta(tenesmo, 'Sientes ganas constantes de defecar aunque no puedas hacerlo').
pregunta(urgencia_fecal, 'Tienes urgencia repentina para ir al baño y no la puedes controlar').
pregunta(anemia, 'Te sientes debil o mareado con facilidad').
pregunta(coluria, 'Tu orina es oscura como te de cola').
pregunta(prurito, 'Tienes comezon en la piel o especialmente en el area biliar').
pregunta(ascitis, 'Notas abdomen inflamado o con liquido acumulado').
pregunta(esteatorrea, 'Tus heces son grasosas, muy olorosas o flotan en el inodoro').
pregunta(prurito_anorrectal, 'Tienes comezon en el ano o alrededor del recto').
pregunta(molestia_rectal, 'Sientes molestia o ardor en la zona del recto').
pregunta(dolor_al_defecar, 'Te duele cuando haces del vientre').
pregunta(espasmo_anal, 'Sientes un espasmo o contraccion dolorosa en el ano').
pregunta(secrecion_purulenta, 'Sale liquido o pus por la zona anorrectal').
pregunta(dolor_anorrectal, 'Tienes dolor en el area alrededor del ano').
pregunta(perdida_control, 'Pierdes el control de las evacuaciones o te manchas sin querer').
pregunta(manchas_en_ropa_interior, 'Encuentras manchas fecales en tu ropa interior').
pregunta(masa_protruyente, 'Sientes una bolita o masa que sale del ano al defecar').
pregunta(sensacion_de_peso, 'Sientes peso o presion en la zona anal o rectal').

% =========================================================
% MOTOR DE INFERENCIA: MODO AUTOMÁTICO (Tu función original)
% =========================================================

% Consulta directa: diagnostico_por_sintomas([acidez, regurgitacion], Enfermedad).
diagnostico_por_sintomas(Sintomas, Enfermedad) :-
    enfermedad(Enfermedad, SintomasNecesarios),
    contiene_todos(SintomasNecesarios, Sintomas).

contiene_todos([], _).
contiene_todos([H|T], Lista) :-
    member(H, Lista),
    contiene_todos(T, Lista).

% =========================================================
% MOTOR DE INFERENCIA: MODO INTERACTIVO (Tipo Consultorio)
% =========================================================

% Escribe "iniciar." en la consola para empezar la consulta medica.
iniciar :-
    write('--------------------------------------------------'), nl,
    write('   CONSULTORIO VIRTUAL DE GASTROENTEROLOGIA       '), nl,
    write('--------------------------------------------------'), nl,
    write('Responde con "s." para si, o "n." para no.'), nl, nl,
    realizar_diagnostico(Enfermedad),
    write('\n=================================================='), nl,
    write('>> DIAGNOSTICO SUGERIDO: '), write(Enfermedad), nl,
    tratamiento(Enfermedad, Tratamiento),
    write('>> RECETA / TRATAMIENTO: '), write(Tratamiento), nl,
    write('==================================================\n'), nl,
    limpiar_memoria.

iniciar :-
    write('\n>> No se pudo determinar un diagnostico claro con esos sintomas.'), nl,
    write('>> Te sugiero acudir a una clinica para estudios mas profundos.'), nl,
    limpiar_memoria.

realizar_diagnostico(Enfermedad) :-
    enfermedad(Enfermedad, SintomasNecesarios),
    verificar_sintomas(SintomasNecesarios).

verificar_sintomas([]).
verificar_sintomas([Sintoma | Resto]) :-
    preguntar_sintoma(Sintoma),
    verificar_sintomas(Resto).

preguntar_sintoma(Sintoma) :-
    si(Sintoma), !.
preguntar_sintoma(Sintoma) :-
    no(Sintoma), !, fail.
preguntar_sintoma(Sintoma) :-
    pregunta(Sintoma, TextoPregunta),
    write(TextoPregunta), write('? (s/n): '),
    read(Respuesta),
    procesar_respuesta(Respuesta, Sintoma).

procesar_respuesta(s, Sintoma) :- asserta(si(Sintoma)).
procesar_respuesta(n, Sintoma) :- asserta(no(Sintoma)), fail.

% Borra las respuestas guardadas para poder hacer otra consulta limpia.
limpiar_memoria :-
    retractall(si(_)),
    retractall(no(_)).