// language-tutor client. Zero dependencies. All lesson phrases below are verbatim
// text from the FSI Spanish Basic Course (US-government public domain), fetched from
// fsi-language-courses.org. Units 1, 2, and 3 are playable; the rest of the 55-unit
// roadmap is shown locked with its real titles/topics and no invented FSI text.
// Original FSI tape recordings for Units 1, 2, and 3 are streamed (not bundled) from
// Live Lingua's free public-domain archive on the lesson study screens. The tapes
// are whole-unit recordings, not per-phrase clips, so per-line and listening
// drills still use the device's Spanish text-to-speech voice.
"use strict";

/* ---------------- Curriculum: verbatim FSI pairs ---------------- */
/* A card is { sp (speaker, or null), es, en }. Pairs for drills derive from cards. */
const UNITS = [
  {
    n: 1,
    title: "Useful Phrases & Pronunciation I",
    grammar: "Vowel contrasts, stress system, intonation",
    lessons: [
      {
        id: "u1-l1", title: "Greetings", sub: "Buenos días, buenas tardes, buenas noches",
        cards: [
          { sp: null, es: "Buenos días.", en: "Good morning." },
          { sp: null, es: "Buenos días, señor.", en: "Good morning, sir." },
          { sp: null, es: "Buenas tardes, señora.", en: "Good afternoon, ma'am." },
          { sp: null, es: "Buenas noches, señorita.", en: "Good evening, miss." },
        ],
        notes: [],
      },
      {
        id: "u1-l2", title: "How Are You?", sub: "¿Cómo está usted?",
        cards: [
          { sp: null, es: "¿Cómo está usted?", en: "How are you?" },
          { sp: null, es: "Estoy bien, gracias. ¿Y usted?", en: "I'm fine, thanks. How are you?" },
          { sp: null, es: "Muy bien, gracias.", en: "Very well, thanks." },
          { sp: null, es: "¡Hola! ¿Qué tal?", en: "Hi! How goes it?" },
          { sp: null, es: "¿Cómo le va?", en: "How are you getting along?" },
          { sp: null, es: "Bien, gracias.", en: "Fine, thanks." },
        ],
        notes: [
          "<b>FSI note:</b> <i>¡Hola! ¿Qué tal?</i> is a greeting generally used with a person whom you already know more than casually, and who occupies a status approximately equivalent to yours.",
        ],
      },
      {
        id: "u1-l3", title: "Polite Expressions", sub: "Con permiso, dispénseme, de nada",
        cards: [
          { sp: null, es: "Con permiso.", en: "Excuse me. (to pass by)" },
          { sp: null, es: "Cómo no.", en: "Certainly. / Of course." },
          { sp: null, es: "Dispénseme.", en: "Excuse me. (apology)" },
          { sp: null, es: "Lo siento mucho.", en: "I'm very sorry." },
          { sp: null, es: "Está bien.", en: "That's okay." },
          { sp: null, es: "Muchas gracias.", en: "Thanks a lot." },
          { sp: null, es: "De nada.", en: "You're welcome." },
          { sp: null, es: "No hay de qué.", en: "Don't mention it." },
        ],
        notes: [
          "<b>FSI note:</b> <i>Con permiso</i> is used to excuse yourself when, for example, you are on an elevator and need to squeeze between other people to get out, or when you want to excuse yourself from a group you are talking with. It is not ordinarily interchangeable with <i>dispénseme</i>.",
          "<b>FSI note:</b> <i>Dispénseme</i> is used as an apology for a minor breach of etiquette, or to interrupt a conversation to ask about something.",
          "<b>FSI note:</b> <i>No hay de qué</i> is used when someone thanks you for a small favor; it is about the same as <i>De nada</i>.",
        ],
      },
      {
        id: "u1-l4", title: "Introductions", sub: "Quiero presentarle al señor Molina",
        cards: [
          { sp: null, es: "Quiero presentarle al señor Molina.", en: "I'd like to introduce you to Mr. Molina." },
          { sp: null, es: "Quiero presentarle a la señora de Molina.", en: "I'd like to introduce you to Mrs. Molina." },
          { sp: null, es: "Mucho gusto.", en: "Glad to meet you." },
          { sp: null, es: "Igualmente, gracias.", en: "Same here, thanks." },
          { sp: null, es: "Encantado de conocerla.", en: "Delighted to meet you. (to a woman)" },
          { sp: null, es: "Mucho gusto de conocerlo.", en: "Glad to meet you. (to a man)" },
        ],
        notes: [
          "<b>FSI note:</b> Note that <i>muchas</i> (“many”) is simply the feminine plural of <i>mucho</i> (“much”), the same word that appears in <i>mucho gusto</i>. The <i>-s</i> is the plural marker, while the <i>-a</i> before it is the feminine marker.",
          "<b>FSI note:</b> <i>Encantado de conocerla</i> is regularly used only when you (a man) are introduced to a woman. If you are introduced to another man, say <i>Mucho gusto de conocerlo</i>, or simply <i>Mucho gusto</i>. In Spain, <i>-le</i> is used instead of <i>-lo</i>.",
        ],
      },
      {
        id: "u1-l5", title: "Farewells", sub: "Adiós, hasta mañana, hasta luego",
        cards: [
          { sp: null, es: "Adiós.", en: "Goodbye." },
          { sp: null, es: "Hasta mañana.", en: "See you tomorrow." },
          { sp: null, es: "Hasta luego.", en: "So long. / See you later." },
        ],
        notes: [],
      },
    ],
  },
  {
    n: 2,
    title: "Useful Phrases & Pronunciation II",
    grammar: "Voiced stops, vibrants /r/ /rr/, voiceless stops, nasals",
    lessons: [
      {
        id: "u2-l1", title: "Classroom Commands", sub: "¡Adelante! Siéntese. Repita.",
        cards: [
          { sp: null, es: "¡Adelante!", en: "Come on in." },
          { sp: null, es: "Siéntese.", en: "Sit down." },
          { sp: null, es: "¿Tiene un lápiz?", en: "Do you have a pencil?" },
          { sp: null, es: "No, no tengo.", en: "No, I don't." },
          { sp: null, es: "Sí, sí tengo.", en: "Yes, I do." },
          { sp: null, es: "Repita.", en: "Say it again. / Repeat." },
          { sp: null, es: "Traduzca.", en: "Translate." },
          { sp: null, es: "Otra vez, por favor.", en: "Again, please." },
          { sp: null, es: "Perdón. ¿Cómo dice usted?", en: "Excuse me, what did you say?" },
        ],
        notes: [
          "<b>FSI note:</b> Instead of the entire phrase <i>¿Cómo dice usted?</i> (“What did you say?”), Spanish speakers frequently use only the first word — <i>¿Cómo?</i> — just as English speakers may say only “What?”",
        ],
      },
      {
        id: "u2-l2", title: "Requesting & Identifying Objects", sub: "Déme la pluma. ¿Qué es eso?",
        cards: [
          { sp: null, es: "Déme la pluma.", en: "Give me the pen." },
          { sp: null, es: "Páseme el libro.", en: "Pass me the book." },
          { sp: null, es: "¿Qué es eso?", en: "What's that?" },
          { sp: null, es: "¿Qué es esto?", en: "What's this?" },
          { sp: null, es: "Esto es un cenicero.", en: "This is an ashtray." },
          { sp: null, es: "¿Qué quiere decir cenicero?", en: "What does cenicero mean?" },
          { sp: null, es: "Quiere decir ashtray.", en: "It means ashtray." },
          { sp: null, es: "¿Cómo se dice table en español?", en: "How do you say table in Spanish?" },
          { sp: null, es: "Se dice mesa.", en: "You say mesa." },
          { sp: null, es: "¿Cómo se dice silla en inglés?", en: "How do you say silla in English?" },
          { sp: null, es: "Se dice chair.", en: "You say chair." },
        ],
        notes: [
          "<b>FSI note:</b> In <i>se dice</i>, the idea of “someone” actually saying the word is not given. Rather, “the word says itself,” making this an impersonal construction translated as “is said” or “you say.”",
        ],
      },
      {
        id: "u2-l3", title: "Directions", sub: "¿Dónde está el baño? Ahí, a la izquierda.",
        cards: [
          { sp: null, es: "¿Dónde está la Embajada Americana?", en: "Where's the American Embassy?" },
          { sp: null, es: "¿Dónde está el baño?", en: "Where's the bathroom?" },
          { sp: null, es: "Ahí, a la izquierda.", en: "There, to the left." },
          { sp: null, es: "Ahí, a la derecha.", en: "There, to the right." },
          { sp: null, es: "Ahí, adelante.", en: "There, straight ahead." },
          { sp: null, es: "Llévenos al centro.", en: "Take us downtown." },
          { sp: null, es: "¿Dónde están los libros?", en: "Where are the books?" },
          { sp: null, es: "Lléveme al hotel.", en: "Take me to the hotel." },
          { sp: null, es: "¿Sube o baja?", en: "Going up or down?" },
          { sp: null, es: "¿Cuánto es?", en: "How much is it?" },
        ],
        notes: [
          "<b>FSI note:</b> <i>¿Sube o baja?</i> — More literally, “Does it (the elevator) go up or does it go down?”",
        ],
      },
      {
        id: "u2-l4", title: "Numbers 1–21", sub: "uno, dos, tres… veintiuno",
        cards: [
          { sp: null, es: "uno", en: "1" },
          { sp: null, es: "dos", en: "2" },
          { sp: null, es: "tres", en: "3" },
          { sp: null, es: "cuatro", en: "4" },
          { sp: null, es: "cinco", en: "5" },
          { sp: null, es: "seis", en: "6" },
          { sp: null, es: "siete", en: "7" },
          { sp: null, es: "ocho", en: "8" },
          { sp: null, es: "nueve", en: "9" },
          { sp: null, es: "diez", en: "10" },
          { sp: null, es: "once", en: "11" },
          { sp: null, es: "doce", en: "12" },
          { sp: null, es: "trece", en: "13" },
          { sp: null, es: "catorce", en: "14" },
          { sp: null, es: "quince", en: "15" },
          { sp: null, es: "dieciséis", en: "16" },
          { sp: null, es: "diecisiete", en: "17" },
          { sp: null, es: "dieciocho", en: "18" },
          { sp: null, es: "diecinueve", en: "19" },
          { sp: null, es: "veinte", en: "20" },
          { sp: null, es: "veintiuno", en: "21" },
        ],
        notes: [],
      },
      {
        id: "u2-l5", title: "esto & eso", sub: "This and that — the first pattern drill",
        cards: [
          { sp: null, es: "¿Qué es eso?", en: "What's that?" },
          { sp: null, es: "Esto es un cenicero.", en: "This is an ashtray." },
          { sp: null, es: "¿Qué es esto?", en: "What's this?" },
          { sp: null, es: "Eso es una silla.", en: "That's a chair." },
          { sp: null, es: "Eso es bueno.", en: "That's good." },
          { sp: null, es: "Traduzca esto.", en: "Translate this." },
          { sp: null, es: "Repita eso.", en: "Repeat that." },
          { sp: null, es: "Esto no es español.", en: "This isn't Spanish." },
          { sp: null, es: "¿Qué tal va eso?", en: "How's that going?" },
          { sp: null, es: "Eso es mucho.", en: "That's too much." },
          { sp: null, es: "No quiero eso hasta mañana.", en: "I don't want that until tomorrow." },
          { sp: null, es: "Quiero eso luego.", en: "I want that later." },
          { sp: null, es: "Siento mucho esto.", en: "I regret this very much." },
          { sp: null, es: "Esto va muy bien.", en: "This is going very well." },
          { sp: null, es: "La señorita quiere esto.", en: "The young lady wants this." },
        ],
        notes: [
          "<b>FSI note:</b> <i>Eso</i> refers to an object nearer to the person being addressed; <i>esto</i> refers to an object nearer to the speaker. The <i>-o</i> ending indicates that the speaker either doesn't know the Spanish word for the object, is answering a question that used <i>esto/eso</i>, or is referring to a situation rather than a specific object (as in <i>Eso es bueno</i>).",
        ],
      },
      {
        id: "u2-l6", title: "Hear the Difference: r vs rr", sub: "pero/perro, caro/carro — tap vs trill",
        cards: [
          { sp: null, es: "pero", en: "but" },
          { sp: null, es: "perro", en: "dog" },
          { sp: null, es: "caro", en: "expensive" },
          { sp: null, es: "carro", en: "cart" },
          { sp: null, es: "para", en: "for" },
          { sp: null, es: "parra", en: "grapevine" },
          { sp: null, es: "coro", en: "chorus" },
          { sp: null, es: "corro", en: "I run" },
          { sp: null, es: "foro", en: "forum" },
          { sp: null, es: "forro", en: "lining" },
        ],
        notes: [
          "<b>FSI note:</b> Spanish /r/ sounds do not resemble English “r” in any way. The single /r/ between vowels is a quick tap of the tongue tip — very similar to the English “tt” or “dd” in words like <i>Betty</i>, <i>butter</i>, <i>ladder</i>. The double /rr/ is a rapid trill of the tongue tip, learned best by careful imitation.",
        ],
      },
    ],
  },
  {
    n: 3,
    title: "White's Arrival in Surlandia",
    grammar: "Demonstratives",
    lessons: [
      {
        id: "u3-l1", title: "At the Hotel Room", sub: "¿Le gusta el cuarto?",
        cards: [
          { sp: "Mozo", es: "¿Le gusta el cuarto?", en: "Do you like the room?" },
          { sp: "White", es: "Sí, me gusta.", en: "Yes, I do." },
          { sp: "Mozo", es: "¿Quiere usted agua mineral?", en: "Do you want soda water?" },
          { sp: "White", es: "Sí. Súbamela después.", en: "Yes. Bring it up to me later." },
          { sp: "Mozo", es: "¿Necesita algo más?", en: "Do you need anything else?" },
          { sp: "White", es: "Sí. ¿Está la Embajada Americana cerca de aquí?", en: "Yes. Is the American Embassy near here?" },
          { sp: "Mozo", es: "No. Está lejos. En la avenida de Colón.", en: "No. It's quite a distance. On Columbus Avenue." },
          { sp: "Mozo", es: "Hay que tomar un taxi.", en: "It's necessary to take a taxi." },
          { sp: "White", es: "Gracias. Aquí tiene.", en: "Thanks. Here you are." },
          { sp: "Mozo", es: "Muchas gracias, señor.", en: "Thank you very much, sir." },
        ],
        notes: [
          "<b>FSI note:</b> There is no direct way to equate the English idea of “liking” something with a word in Spanish. Rather, one has to say that the object is “pleasing” to him. Thus “I like it” becomes <i>me gusta</i> — literally “it is pleasing to me.”",
          "<b>FSI note:</b> <i>Agua mineral</i>, which literally means “mineral water,” may be carbonated soda water or simply purified drinking water.",
          "<b>FSI note:</b> The forms <i>me</i> and <i>la</i> in the utterance <i>súbamela</i> are called clitic pronouns (or just clitics).",
          "<b>FSI note:</b> The word <i>cerca</i> (“near”) modifies a verb but does not function as a phrase relator. The Spanish equivalent is <i>cerca</i> in the first example, but <i>cerca de</i> (“near of, near to”) in the second.",
        ],
      },
      {
        id: "u3-l2", title: "Going Down & the Cashier's Desk", sub: "¿Dónde está la caja?",
        cards: [
          { sp: "Mozo", es: "¿Baja en el ascensor?", en: "Are you going down in the elevator?" },
          { sp: "White", es: "Sí, ahora mismo.", en: "Yes. Right now." },
          { sp: "White", es: "¿Dónde está la caja?", en: "Where's the cashier's desk?" },
          { sp: "Mozo", es: "En el primer piso, a la derecha de la entrada.", en: "On the first floor, to the right of the entrance." },
          { sp: "White", es: "¿Puede cambiarme unos dólares?", en: "Can you change a few dollars for me?" },
          { sp: "Cajero", es: "Sí. ¿Cuántos?", en: "Yes. How many?" },
          { sp: "White", es: "Diez. ¿A cómo está el cambio?", en: "Ten. What's the rate of exchange?" },
          { sp: "Cajero", es: "¿En billetes o en cheque?", en: "In bills or in a check?" },
          { sp: "White", es: "Este cheque viajero.", en: "This traveler's check." },
          { sp: "Cajero", es: "A cinco por uno, entonces.", en: "Five to one, then." },
          { sp: "Cajero", es: "¿Cómo lo quiere?", en: "How do you want it?" },
          { sp: "White", es: "Ocho en billetes y dos en moneda.", en: "Eight in bills and two in change." },
          { sp: "White", es: "¿Cuánto cuesta un taxi a la Embajada Americana?", en: "How much does a taxi to the American Embassy cost?" },
          { sp: "Cajero", es: "Dos pesos, más o menos.", en: "Two pesos, more or less." },
          { sp: "White", es: "Gracias por la información.", en: "Thanks for the information." },
        ],
        notes: [],
      },
      {
        id: "u3-l3", title: "Gender & Translation Drill", sub: "el / la, un / una",
        cards: [
          { sp: null, es: "Eso es una pluma.", en: "That's a pen." },
          { sp: null, es: "Eso es un hotel.", en: "That's a hotel." },
          { sp: null, es: "¿Dónde está el señor?", en: "Where is the gentleman?" },
          { sp: null, es: "¿Dónde está la señorita?", en: "Where is the young lady?" },
          { sp: null, es: "Ahí está la misma silla.", en: "There's the same chair." },
          { sp: null, es: "Ahí está el mismo cenicero.", en: "There's the same ashtray." },
          { sp: null, es: "Ahí está el otro cheque.", en: "There's the other check." },
          { sp: null, es: "Ahí está la otra entrada.", en: "There's the other entrance." },
          { sp: null, es: "¿Dónde está la señora americana?", en: "Where is the American lady?" },
          { sp: null, es: "¿Dónde está el hotel americano?", en: "Where is the American hotel?" },
          { sp: null, es: "Tiene una pluma buena.", en: "She has a good pen." },
          { sp: null, es: "Tiene un lápiz bueno.", en: "She has a good pencil." },
          { sp: null, es: "Eso es una moneda.", en: "That's a coin." },
          { sp: null, es: "No, esto no es un billete.", en: "No, this is not a bill." },
          { sp: null, es: "La señorita está en la embajada.", en: "The young lady is at the Embassy." },
          { sp: null, es: "¿Quiere una silla?", en: "Do you want a chair?" },
          { sp: null, es: "¿Tiene el cheque o no?", en: "Do you have the check or not?" },
          { sp: null, es: "La caja está a la izquierda.", en: "The teller's window is to the left." },
          { sp: null, es: "La embajada no está lejos de aquí.", en: "The Embassy is not far from here." },
          { sp: null, es: "Quiero presentarle a una señorita.", en: "I want you to meet a young lady." },
          { sp: null, es: "¿Le gusta la Avenida Colón?", en: "Do you like Columbus Avenue?" },
          { sp: null, es: "El baño está a la derecha.", en: "The bathroom is to the right." },
          { sp: null, es: "Tengo un cuarto en el hotel.", en: "I have a room in the hotel." },
          { sp: null, es: "¿Quiere un lápiz?", en: "Do you want a pencil?" },
          { sp: null, es: "¿Necesita una pluma?", en: "Do you need a pen?" },
          { sp: null, es: "¿Dónde hay una silla?", en: "Where's there a chair?" },
          { sp: null, es: "¿Está el hotel en el centro?", en: "Is the hotel downtown?" },
        ],
        notes: [
          "<b>FSI note:</b> All Spanish nouns belong to one of two grammatical subclasses: masculine or feminine. The definite articles <i>el</i> (masculine) and <i>la</i> (feminine) correspond to English “the.” The indefinite articles <i>un</i> (masculine) and <i>una</i> (feminine) correspond to English “a” or “an.” When memorizing each noun, it is best to memorize the article along with it to learn its gender. (Note: <i>el agua</i> is an exception — it is actually feminine.)",
          "<b>FSI note:</b> Spanish adjectives must agree in gender with the noun they modify. Many adjectives show a gender change with endings <i>-o</i> (masculine) and <i>-a</i> (feminine): <i>mucho / mucha</i>, <i>americano / americana</i>. Others — primarily those ending in <i>-e</i> or a consonant (<i>mineral</i>, <i>excelente</i>) — do not change form for gender. Adjectives in Spanish usually follow the noun: <i>Embajada Americana</i>, <i>cheque viajero</i>.",
        ],
      },
      {
        id: "u3-l4", title: "¿Le gusta…? & Location", sub: "Do you like…? / It's near, to the right…",
        cards: [
          { sp: null, es: "¿Le gusta el libro?", en: "Do you like the book?" },
          { sp: null, es: "¿Le gusta el hotel?", en: "Do you like the hotel?" },
          { sp: null, es: "¿Le gusta la embajada?", en: "Do you like the Embassy?" },
          { sp: null, es: "¿Le gusta la avenida?", en: "Do you like the avenue?" },
          { sp: null, es: "¿Le gusta el español?", en: "Do you like Spanish?" },
          { sp: null, es: "¿Le gusta el inglés?", en: "Do you like English?" },
          { sp: null, es: "¿Le gusta la señorita Molina?", en: "Do you like Miss Molina?" },
          { sp: null, es: "No, está cerca.", en: "No, it's near." },
          { sp: null, es: "No, está a la derecha.", en: "No, it's to the right." },
          { sp: null, es: "No, está a la izquierda.", en: "No, it's to the left." },
          { sp: null, es: "No, está adelante.", en: "No, it's up ahead." },
          { sp: null, es: "Sí, está a la entrada.", en: "Yes, it's at the entrance." },
          { sp: null, es: "Sí, está aquí.", en: "Yes, it's here." },
          { sp: null, es: "Sí, está ahí.", en: "Yes, it's there." },
        ],
        notes: [
          "<b>FSI note:</b> “I like it” becomes <i>me gusta</i> — literally “it is pleasing to me.” Spanish says the object pleases you, rather than you liking the object.",
        ],
      },
      {
        id: "u3-l5", title: "Hay que, ¿Puede…? & ¿Cuánto cuesta…?", sub: "Necessity, requests, prices",
        cards: [
          { sp: null, es: "¿Hay que tomar un cuarto?", en: "Is it necessary to take a room?" },
          { sp: null, es: "¿Hay que tomar el ascensor?", en: "Is it necessary to take the elevator?" },
          { sp: null, es: "¿Hay que tomar algo más?", en: "Is it necessary to take anything else?" },
          { sp: null, es: "¿Hay que decir eso?", en: "Is it necessary to say that?" },
          { sp: null, es: "¿Hay que traducir eso?", en: "Is it necessary to translate that?" },
          { sp: null, es: "¿Hay que cambiar un cheque?", en: "Is it necessary to cash a check?" },
          { sp: null, es: "¿Hay que tener cheques viajeros?", en: "Is it necessary to have traveler's checks?" },
          { sp: null, es: "¿Puede cambiarme este billete?", en: "Can you break this bill for me?" },
          { sp: null, es: "¿Puede cambiarme un dólar?", en: "Can you change one dollar for me?" },
          { sp: null, es: "¿Puede cambiarme la pluma?", en: "Can you change the pen for me?" },
          { sp: null, es: "¿Puede llevarme al hotel?", en: "Can you take me to the hotel?" },
          { sp: null, es: "¿Puede presentarme al señor Molina?", en: "Can you introduce Mr. Molina to me?" },
          { sp: null, es: "¿Puede decirme eso?", en: "Can you tell me that?" },
          { sp: null, es: "¿Puede repetirme eso?", en: "Can you repeat that for me?" },
          { sp: null, es: "¿Cuánto cuesta un taxi a la Embajada?", en: "How much does a taxi to the Embassy cost?" },
          { sp: null, es: "¿Cuánto cuesta un taxi al hotel?", en: "How much does a taxi to the hotel cost?" },
          { sp: null, es: "¿Cuánto cuesta un taxi a la Avenida Colón?", en: "How much does a taxi to Columbus Avenue cost?" },
          { sp: null, es: "¿Cuánto cuesta un taxi al centro?", en: "How much does a taxi downtown cost?" },
          { sp: null, es: "¿Cuánto cuesta el libro?", en: "How much does the book cost?" },
          { sp: null, es: "¿Cuánto cuesta el cuarto?", en: "How much does the room cost?" },
          { sp: null, es: "¿Cuánto cuesta?", en: "How much does it cost?" },
        ],
        notes: [
          "<b>FSI note:</b> The idiom <i>hay que</i> is especially useful. It is the equivalent of several English expressions: “It is necessary to…”, “You've got to…”, “You have to…” — in all of which the “you” does not refer to you personally, but really means something like “One should…” or “One ought to…”",
        ],
      },
    ],
  },
];

/* ---------------- Original FSI tapes (streamed, not bundled) ---------------- */
/* Whole-unit tapes from Live Lingua's free public-domain FSI archive, verified
   on the course page (FSI Spanish Basic Course - Volume 1). Keys are unit numbers. */
const UNIT_AUDIO = {
  1: [
    { label: "Tape A", src: "https://www.livelingua.com/fsi/Spanish/Basic/Volume 1/FSI - Spanish Basic Course - Volume 1 - Unit 01A.mp3" },
    { label: "Tape B", src: "https://www.livelingua.com/fsi/Spanish/Basic/Volume 1/FSI - Spanish Basic Course - Volume 1 - Unit 01B.mp3" },
  ],
  2: [
    { label: "Tape A", src: "https://www.livelingua.com/fsi/Spanish/Basic/Volume 1/FSI - Spanish Basic Course - Volume 1 - Unit 02A.mp3" },
    { label: "Tape B", src: "https://www.livelingua.com/fsi/Spanish/Basic/Volume 1/FSI - Spanish Basic Course - Volume 1 - Unit 02B.mp3" },
  ],
  3: [
    { label: "Tape A", src: "https://www.livelingua.com/fsi/Spanish/Basic/Volume 1/FSI - Spanish Basic Course - Volume 1 - Unit 03A.mp3" },
    { label: "Tape B", src: "https://www.livelingua.com/fsi/Spanish/Basic/Volume 1/FSI - Spanish Basic Course - Volume 1 - Unit 03B.mp3" },
  ],
};

/* ---------------- Roadmap: real FSI unit titles/topics ---------------- */
const ROADMAP = [
  [1, "Useful Phrases & Pronunciation I", "Vowel contrasts, stress system, intonation"],
  [2, "Useful Phrases & Pronunciation II", "Voiced stops, vibrants /r/ /rr/, voiceless stops, nasals"],
  [3, "White's Arrival in Surlandia", "Demonstratives"],
  [4, "White Meets Molina at the Embassy", "Gender of nouns & adjectives, irregular verb estar"],
  [5, "White's First Day at Work", "Number in nouns & adjectives, irregular verb ser"],
  [6, "White & Molina Have Lunch", "Present tense regular -ar verbs, articles with titles"],
  [7, "Looking for an Apartment", "Present tense regular -er verbs, ser vs. estar"],
  [8, "Neighbors' Apartment", "Present tense regular -ir verbs, contractions"],
  [9, "White Goes to Molina's", "Haber & present perfect, full-form possessives"],
  [10, "Sending Laundry", "Personal a, direct clitic pronouns"],
  [11, "Interviewing a Maid", "Shortened possessives, negative particle"],
  [12, "No Water in the Apartment", "Subject pronouns, statement intonation"],
  [13, "Going to a Party", "Present progressive (-ndo), possessives with de"],
  [14, "Harris Family's Arrival", "Irregular verbs ir, dar, ver, periphrastic future"],
  [15, "Mrs. Harris at Customs", "Indirect clitic pronouns, question intonation"],
  [16, "Sightseeing", "Indirect clitic pronouns, question patterns"],
  [17, "Social Life in Surlandia", "Past I (preterite) of regular verbs"],
  [18, "Discussing Carmen's Work", "Past II (imperfect) of regular & irregular verbs"],
  [19, "Visit to Air Mission", "Past I & Past II in the same construction"],
  [20, "Visit to Air Mission (cont.)", "Direct & indirect clitics together, exclamatory qué"],
  [21, "The Weather", "Irregular Past I forms (extended, modified, suppleted stems)"],
  [22, "Going to the Market", "Present tense stem-vowel changing verbs"],
  [23, "Shopping at the Market", "Velar stem extensions, irregular verbs (caer, oír, saber…)"],
  [24, "Shopping in the Stores", "Reflexive clitic pronouns, time of day"],
  [25, "A Visa Interview", "Reflexive & indirect clitics together"],
  [26, "A Visa Interview (cont.)", "Command forms of regular verbs"],
  [27, "At the Doctor's", "Command forms of irregular verbs"],
  [28, "Discussing a Party", "Comparatives, superlatives, diminutives"],
  [29, "Getting a Haircut", "Relative clauses, present subjunctive intro"],
  [30, "Renting a Car", "Subjunctive in adverbial & adjective clauses"],
  [31, "Dinner at Mrs. Molina's", "Past progressive, nominalized verb forms"],
  [32, "Conversation After Dinner", "Numbers, days, months; saber vs. conocer"],
  [33, "Saying Goodbye to Mrs. Molina", "Ordinal numbers, articles with days & time"],
  [34, "Economist from Point IV", "Por vs. para, colors"],
  [35, "Barbecue on Columbus Day", "Nominalization of articles, clitics in commands"],
  [36, "Carmen Phones the Harrises", "Subjunctive after ojalá, infinitive for -ing"],
  [37, "Cocktail Party at the Harrises'", "Subjunctive in noun clauses (object of verb)"],
  [38, "Giving Up Smoking to Buy a Car", "Subjunctive in noun clauses (subject of verb)"],
  [39, "Looking for a New House", "Subjunctive in adjective clauses"],
  [40, "Moving to a New House", "Subjunctive in adverbial clauses, conditionals"],
  [41, "Talking About the Elections", "Subjunctive with emotions & impersonal expressions"],
  [42, "At the Barber Shop", "Past subjunctive, sequence of tenses"],
  [43, "A Diplomatic Reception", "Conditional tense & conditional perfect"],
  [44, "Planning a Trip to the Interior", "Conditional sentences with subjunctive"],
  [45, "The Trip Home", "Future tense & future perfect"],
  [46, "Jose Gets Sick", "Comparisons of identity & similarity, word order"],
  [47, "Juan & Jose Discuss Language", "Past subjunctive, perfect subjunctives"],
  [48, "The Binational Centers", "Conditional perfect, neuter article lo"],
  [49, "Carmen's Cousin Runs for Congress", "Future perfect, conditional sentences"],
  [50, "Adaptation of Americans", "Past subjunctive after ojalá/aunque/como si"],
  [51, "An Accident", "Future/conditional of probability, passive voice"],
  [52, "Jose Sets the Date", "Pero vs. sino, desde/hace constructions"],
  [53, "A Dinner at the Whites'", "Subjunctive in time, purpose & concessive clauses"],
  [54, "The Wedding", "Subjunctive in conditional clauses, full review"],
  [55, "Farewell Parties", "Comprehensive review of tenses & moods"],
];
const PLAY_ORDER = [];
for (const u of UNITS) for (const l of u.lessons) PLAY_ORDER.push(l.id);
function lessonById(id) {
  for (const u of UNITS) for (const l of u.lessons) if (l.id === id) return { unit: u, lesson: l };
  return null;
}

/* ---------------- Helpers ---------------- */
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function shuffle(a) {
  const x = a.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = x[i]; x[i] = x[j]; x[j] = t;
  }
  return x;
}
function norm(s) {
  return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[¿?¡!.,;:"]/g, "").replace(/\s+/g, " ").trim();
}
/* Server-side speech (cloud TTS, then local Piper) for lines with no
   tape segment. The server endpoint /api/speak returns audio; when
   it fails (no engine configured, cloud down, Piper missing) the
   browser falls back to its device voice, so speech never breaks. */
let ttsAudio = null;
function stopTtsAudio() {
  if (ttsAudio) {
    try { ttsAudio.pause(); } catch (e) { /* noop */ }
    ttsAudio = null;
  }
}
function speakDevice(text) {
  if (!("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const es = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("es"));
    const pref = es.find((v) => /es[-_](mx|us)/i.test(v.lang)) || es[0];
    if (pref) u.voice = pref;
    u.lang = (pref && pref.lang) || "es";
    window.speechSynthesis.speak(u);
  } catch (e) { /* speech unavailable: drills still work */ }
}
async function speak(text) {
  stopAudio();
  try {
    const res = await fetch("/api/speak?text=" + encodeURIComponent(text));
    if (!res.ok) throw new Error("server speech unavailable");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    stopTtsAudio();
    ttsAudio = new Audio(url);
    ttsAudio.onended = () => {
      URL.revokeObjectURL(url);
      if (ttsAudio && ttsAudio.src === url) ttsAudio = null;
    };
    await ttsAudio.play();
  } catch (e) {
    speakDevice(text);
  }
}

/* ---------------- Tape segments (from audio-segments.json) ---------------- */
/* SEGMENTS maps a normalized phrase to {es, tape, start, end} offsets into
   the original FSI tape for its unit (see tools/build-audio-db.py). The
   shared segAudio element plays just that clip from the streamed tape;
   phrases with no segment fall back to TTS. */
const TAPE_URLS = {
  "01A": UNIT_AUDIO[1][0].src,
  "01B": UNIT_AUDIO[1][1].src,
  "02A": UNIT_AUDIO[2][0].src,
  "02B": UNIT_AUDIO[2][1].src,
  "03A": UNIT_AUDIO[3][0].src,
  "03B": UNIT_AUDIO[3][1].src,
};
let SEGMENTS = {};
let segAudio = null;
let segTape = null;
let segEnd = 0;
let segWatch = null;
function stopSegment() {
  if (segWatch) { clearInterval(segWatch); segWatch = null; }
  if (segAudio) { try { segAudio.pause(); } catch (e) { /* noop */ } }
}
function loadSegments() {
  fetch("/audio-segments.json").then((r) => r.json()).then((j) => { SEGMENTS = j || {}; }).catch(() => { SEGMENTS = {}; });
}
function playPhrase(text) {
  const seg = SEGMENTS[norm(text)];
  if (!seg || !TAPE_URLS[seg.tape]) { speak(text); return; }
  stopAudio();
  if (!segAudio) segAudio = new Audio();
  segEnd = seg.end;
  if (segTape !== seg.tape) {
    segTape = seg.tape;
    segAudio.src = TAPE_URLS[seg.tape];
  }
  const go = () => {
    try { segAudio.currentTime = seg.start; } catch (e) { /* seek unavailable */ }
    const p = segAudio.play();
    if (p && p.catch) p.catch(() => { /* autoplay blocked: user can retry */ });
  };
  if (segAudio.readyState >= 1) go();
  else segAudio.onloadedmetadata = go;
  if (segWatch) clearInterval(segWatch);
  segWatch = setInterval(() => {
    if (segAudio && segAudio.currentTime >= segEnd) stopSegment();
  }, 100);
}
async function api(path, method, body) {
  const res = await fetch(path, {
    method: method || "GET",
    headers: { "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

/* ---------------- Progress state ---------------- */
let progress = { totalXp: 0, streak: 0, lastStudyDate: null, hearts: 5, completedLessonIds: [] };
function renderHeader() {
  document.getElementById("stat-streak").textContent = progress.streak;
  document.getElementById("stat-xp").textContent = progress.totalXp;
  document.getElementById("stat-hearts").textContent = progress.hearts;
}
async function refreshProgress() {
  try { progress = await api("/api/progress"); } catch (e) { /* offline: keep defaults */ }
  renderHeader();
}

/* ---------------- Views ---------------- */
function showView(name) {
  for (const v of ["learn", "roadmap", "profile", "lesson"]) {
    document.getElementById("view-" + v).classList.toggle("hidden", v !== name);
  }
  for (const t of document.querySelectorAll(".tab")) {
    t.classList.toggle("active", t.dataset.view === name);
  }
  if (name === "profile") renderProfile();
  if (name === "learn") renderPath();
}
document.querySelectorAll(".tab").forEach((t) => {
  t.addEventListener("click", () => showView(t.dataset.view));
});

/* ---------------- Path ---------------- */
function isUnlocked(id) {
  const i = PLAY_ORDER.indexOf(id);
  if (i <= 0) return true;
  return progress.completedLessonIds.includes(PLAY_ORDER[i - 1]);
}
function renderPath() {
  const path = document.getElementById("path");
  let html = "";
  const blocks = [
    { unit: UNITS[0], locked: false },
    { unit: UNITS[1], locked: false },
    { unit: UNITS[2], locked: false },
    { unit: { n: "4–55", title: "Units 4–55 — the rest of the course", grammar: "See the Course map for all titles and topics", lessons: [] }, locked: true },
  ];
  for (const b of blocks) {
    const u = b.unit;
    html += `<div class="unit-head${b.locked ? " locked" : ""}"><h2>Unit ${u.n}: ${esc(u.title)}</h2><p>${esc(u.grammar)}</p></div>`;
    if (b.locked) {
      html += `<div class="path-nodes"><div class="node-row"><button class="node locked" disabled>🔒</button><div class="node-label">Locked<small>Coming in a later unit drop</small></div></div></div>`;
      continue;
    }
    html += `<div class="path-nodes">`;
    for (const l of u.lessons) {
      const done = progress.completedLessonIds.includes(l.id);
      const unlocked = isUnlocked(l.id);
      const cls = done ? "node done" : unlocked ? "node" : "node locked";
      const icon = done ? "★" : unlocked ? "▶" : "🔒";
      html += `<div class="node-row"><button class="${cls}" data-lesson="${l.id}" ${unlocked ? "" : "disabled"}>${icon}</button><div class="node-label">${esc(l.title)}<small>${esc(l.sub)}</small></div></div>`;
    }
    html += `</div>`;
  }
  path.innerHTML = html;
  path.querySelectorAll("[data-lesson]").forEach((btn) => {
    btn.addEventListener("click", () => startLesson(btn.dataset.lesson));
  });
}

/* ---------------- Roadmap ---------------- */
function renderRoadmap() {
  const el = document.getElementById("roadmap");
  const vols = [[1, 15, "Volume 1 — Units 1–15"], [16, 30, "Volume 2 — Units 16–30"], [31, 45, "Volume 3 — Units 31–45"], [46, 55, "Volume 4 — Units 46–55"]];
  let html = "";
  for (const [lo, hi, name] of vols) {
    html += `<div class="volume"><h3>${name}</h3>`;
    for (const [n, topic, grammar] of ROADMAP.filter((r) => r[0] >= lo && r[0] <= hi)) {
      const playable = n === 1 || n === 2 || n === 3;
      html += `<div class="road-unit${playable ? " playable" : ""}"><span class="num">Unit ${n}</span><span><span class="topic">${esc(topic)}</span><br><span class="grammar">${esc(grammar)}${playable ? " · ▶ playable" : " · locked"}</span></span></div>`;
    }
    html += `</div>`;
  }
  el.innerHTML = html;
}

/* ---------------- Profile ---------------- */
async function renderProfile() {
  document.getElementById("prof-xp").textContent = progress.totalXp;
  document.getElementById("prof-streak").textContent = progress.streak;
  document.getElementById("prof-lessons").textContent = progress.completedLessonIds.length;
  let hist = [];
  try { hist = await api("/api/history"); } catch (e) { hist = []; }
  const max = Math.max(1, ...hist.map((d) => d.xp));
  document.getElementById("history").innerHTML = hist.map((d) => {
    const h = d.xp > 0 ? Math.max(6, Math.round((d.xp / max) * 70)) : 2;
    return `<div class="hist-day"><div class="hist-bar" style="height:${h}px"></div><span>${d.xp}</span><span>${d.date.slice(5)}</span></div>`;
  }).join("");
}
document.getElementById("reset-btn").addEventListener("click", async () => {
  if (!window.confirm("Reset all progress? XP, streak, completed lessons, and daily history will be cleared.")) return;
  progress = await api("/api/reset-progress", "POST", {});
  renderHeader();
  renderPath();
  renderProfile();
});

/* ---------------- Lesson engine ---------------- */
const TYPES = ["choice-es", "choice-en", "translate", "listen", "fillblank"];
let L = null;

function stripWord(tok) {
  return tok.replace(/^[¿¡]+/, "").replace(/[?!. ,;]+$/, "");
}
function blankable(es) {
  const toks = es.split(/\s+/);
  if (toks.length < 2) return [];
  return toks.map((t, i) => ({ tok: t, word: stripWord(t), i }))
    .filter((w) => w.word.length >= 3);
}
function distractors(lesson, card, field, n) {
  const out = [];
  const seen = new Set([norm(card[field])]);
  const pools = [lesson.cards];
  for (const u of UNITS) for (const l of u.lessons) if (l !== lesson) pools.push(l.cards);
  for (const pool of pools) {
    for (const c of shuffle(pool)) {
      const v = c[field];
      if (!seen.has(norm(v))) { seen.add(norm(v)); out.push(v); if (out.length >= n) return out; }
    }
  }
  return out;
}
function buildSteps(lesson) {
  let pool = shuffle(lesson.cards);
  if (pool.length > 12) pool = pool.slice(0, 12);
  if (pool.length < 6) pool = pool.concat(pool);
  const steps = pool.map((card, i) => {
    let type = TYPES[i % TYPES.length];
    if (type === "fillblank" && blankable(card.es).length === 0) type = "choice-es";
    return { type, card };
  });
  if (lesson.cards.length >= 4) {
    steps.splice(Math.floor(steps.length / 2), 0, { type: "match", cards: shuffle(lesson.cards).slice(0, 4) });
  }
  return steps;
}
function bindSpeak(root) {
  root.querySelectorAll("[data-speak]").forEach((b) => {
    b.addEventListener("click", (e) => { e.stopPropagation(); playPhrase(b.dataset.speak); });
  });
}
function stopAudio() {
  document.querySelectorAll("#lesson-body audio").forEach((a) => { try { a.pause(); } catch (e) { /* noop */ } });
  stopSegment();
  stopTtsAudio();
  try { window.speechSynthesis.cancel(); } catch (e) { /* noop */ }
}
function startLesson(id) {
  const found = lessonById(id);
  if (!found) return;
  L = {
    unit: found.unit, lesson: found.lesson, steps: buildSteps(found.lesson),
    stepIdx: 0, hearts: 5, correct: 0, answered: 0, xp: 0,
    phase: "study", posted: false, matchWrong: false, evaluate: null,
  };
  showView("lesson");
  api("/api/sync-hearts", "POST", { hearts: 5 });
  renderStep();
}
function setProgressBar() {
  const total = L.steps.length + 1;
  document.getElementById("lesson-progress").style.width = Math.round((L.stepIdx / total) * 100) + "%";
}
function renderStep() {
  stopSegment();
  const body = document.getElementById("lesson-body");
  const fb = document.getElementById("feedback");
  fb.className = "feedback hidden";
  fb.innerHTML = "";
  const action = document.getElementById("lesson-action");
  document.getElementById("lesson-hearts").textContent = L.hearts;
  setProgressBar();
  if (L.stepIdx === 0) {
    L.phase = "study";
    action.textContent = "Start drills";
    action.disabled = false;
    let html = `<div class="prompt">Study the dialogue — tap 🔊 to hear each line.</div>`;
    const tapes = UNIT_AUDIO[L.unit.n] || [];
    if (tapes.length) {
      html += `<div class="fsi-audio"><div class="fsi-audio-head">🎧 Original FSI recording</div><p>Full-unit tapes from the original course, streamed from Live Lingua (public domain). These are whole tapes, not per-phrase clips — follow along with the dialogue below.</p>` +
        tapes.map((t) => `<div class="tape"><span>${esc(t.label)}</span><audio controls preload="none" src="${esc(t.src)}"></audio></div>`).join("") + `</div>`;
    }
    for (const c of L.lesson.cards) {
      html += `<div class="study-card"><button class="speak" data-speak="${esc(c.es)}">🔊</button>${c.sp ? `<div class="speaker">${esc(c.sp)}</div>` : ""}<div class="es">${esc(c.es)}</div><div class="en">${esc(c.en)}</div></div>`;
    }
    for (const n of L.lesson.notes) html += `<div class="note">${n}</div>`;
    body.innerHTML = html;
    bindSpeak(body);
    return;
  }
  const step = L.steps[L.stepIdx - 1];
  L.phase = "answer";
  action.textContent = "Check";
  action.disabled = true;
  if (step.type === "choice-es" || step.type === "choice-en") renderChoice(step);
  else if (step.type === "translate") renderTranslate(step);
  else if (step.type === "listen") renderListen(step);
  else if (step.type === "fillblank") renderFillblank(step);
  else if (step.type === "match") renderMatch(step);
}
function renderChoice(step) {
  const body = document.getElementById("lesson-body");
  const esFirst = step.type === "choice-es";
  const prompt = esFirst ? step.card.es : step.card.en;
  const answer = esFirst ? step.card.en : step.card.es;
  const opts = shuffle([answer, ...distractors(L.lesson, step.card, esFirst ? "en" : "es", 3)]);
  body.innerHTML = `<div class="prompt">${esc(prompt)}${esFirst ? `<button class="speak" data-speak="${esc(step.card.es)}">🔊</button>` : ""}</div><div class="options">${opts.map((o) => `<button class="opt">${esc(o)}</button>`).join("")}</div>`;
  bindSpeak(body);
  let selected = null;
  body.querySelectorAll(".opt").forEach((b) => {
    b.addEventListener("click", () => {
      body.querySelectorAll(".opt").forEach((x) => x.classList.remove("selected"));
      b.classList.add("selected");
      selected = b.textContent;
      document.getElementById("lesson-action").disabled = false;
    });
  });
  L.evaluate = () => ({ correct: selected === answer, correctDisplay: answer });
}
function renderTranslate(step) {
  const body = document.getElementById("lesson-body");
  body.innerHTML = `<div class="prompt">Translate to Spanish: ${esc(step.card.en)}</div><input id="tr-input" class="answer-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type in Spanish…"><div class="accent-row">${["á", "é", "í", "ó", "ú", "ñ", "¡", "¿"].map((ch) => `<button type="button" data-ch="${ch}">${ch}</button>`).join("")}</div>`;
  const input = document.getElementById("tr-input");
  input.addEventListener("input", () => {
    document.getElementById("lesson-action").disabled = input.value.trim() === "";
  });
  body.querySelectorAll("[data-ch]").forEach((b) => {
    b.addEventListener("click", () => {
      const ch = b.dataset.ch;
      const s = input.selectionStart !== null ? input.selectionStart : input.value.length;
      const e = input.selectionEnd !== null ? input.selectionEnd : input.value.length;
      input.setRangeText(ch, s, e, "end");
      input.focus();
      document.getElementById("lesson-action").disabled = input.value.trim() === "";
    });
  });
  input.focus();
  L.evaluate = () => ({ correct: norm(input.value) === norm(step.card.es), correctDisplay: step.card.es });
}
function renderListen(step) {
  const body = document.getElementById("lesson-body");
  const opts = shuffle([step.card.es, ...distractors(L.lesson, step.card, "es", 3)]);
  body.innerHTML = `<div class="prompt">Listen, then pick the phrase you hear.<br><button class="speak" style="font-size:40px" data-speak="${esc(step.card.es)}">🔊</button></div><div class="options">${opts.map((o) => `<button class="opt">${esc(o)}</button>`).join("")}</div>`;
  bindSpeak(body);
  playPhrase(step.card.es);
  let selected = null;
  body.querySelectorAll(".opt").forEach((b) => {
    b.addEventListener("click", () => {
      body.querySelectorAll(".opt").forEach((x) => x.classList.remove("selected"));
      b.classList.add("selected");
      selected = b.textContent;
      document.getElementById("lesson-action").disabled = false;
    });
  });
  L.evaluate = () => ({ correct: selected === step.card.es, correctDisplay: step.card.es });
}
function renderFillblank(step) {
  const body = document.getElementById("lesson-body");
  const options = blankable(step.card.es);
  const pick = options[Math.floor(Math.random() * options.length)];
  const toks = step.card.es.split(/\s+/);
  const m = pick.tok.match(/^([¿¡]*)(.*?)([?!. ,;]*)$/);
  const prefix = m[1], suffix = m[3];
  const answer = pick.word;
  const bank = shuffle([answer, ...distractorWords(answer, 3)]);
  let chosen = null;
  function renderSentence() {
    const shown = toks.map((t, i) => (i === pick.i ? prefix + (chosen || "______") + suffix : t)).join(" ");
    document.getElementById("fb-sentence").textContent = shown;
  }
  body.innerHTML = `<div class="prompt">Fill in the missing word:</div><div class="prompt" id="fb-sentence"></div><div class="en" style="color:var(--muted)">${esc(step.card.en)}</div><div class="word-bank">${bank.map((w) => `<button>${esc(w)}</button>`).join("")}</div>`;
  renderSentence();
  body.querySelectorAll(".word-bank button").forEach((b) => {
    b.addEventListener("click", () => {
      if (chosen === b.textContent) {
        chosen = null;
        b.classList.remove("used");
      } else {
        body.querySelectorAll(".word-bank button").forEach((x) => x.classList.remove("used"));
        chosen = b.textContent;
        b.classList.add("used");
      }
      renderSentence();
      document.getElementById("lesson-action").disabled = chosen === null;
    });
  });
  L.evaluate = () => ({ correct: chosen !== null && norm(chosen) === norm(answer), correctDisplay: answer });
}
function distractorWords(answer, n) {
  const out = [];
  const seen = new Set([norm(answer)]);
  for (const u of UNITS) for (const l of u.lessons) for (const c of l.cards) {
    for (const tok of c.es.split(/\s+/)) {
      const w = stripWord(tok);
      if (w.length >= 3 && !seen.has(norm(w))) { seen.add(norm(w)); out.push(w); }
    }
  }
  return shuffle(out).slice(0, n);
}
function renderMatch(step) {
  const body = document.getElementById("lesson-body");
  const tiles = [];
  step.cards.forEach((c, i) => {
    tiles.push({ text: c.es, pair: i, side: "es" });
    tiles.push({ text: c.en, pair: i, side: "en" });
  });
  body.innerHTML = `<div class="prompt">Match the pairs:</div><div class="match-grid">${shuffle(tiles).map((t) => `<button class="match-tile" data-pair="${t.pair}" data-side="${t.side}">${esc(t.text)}</button>`).join("")}</div>`;
  const action = document.getElementById("lesson-action");
  action.textContent = "Check";
  action.disabled = true;
  let first = null;
  let matched = 0;
  L.matchWrong = false;
  const done = () => {
    L.phase = "feedback";
    resolveStep(!L.matchWrong, "All pairs matched");
  };
  body.querySelectorAll(".match-tile").forEach((b) => {
    b.addEventListener("click", () => {
      if (L.phase !== "answer" || b.classList.contains("matched")) return;
      if (!first) {
        first = b;
        b.classList.add("selected");
        return;
      }
      if (first === b) { first.classList.remove("selected"); first = null; return; }
      const ok = first.dataset.pair === b.dataset.pair && first.dataset.side !== b.dataset.side;
      if (ok) {
        first.classList.remove("selected");
        first.classList.add("matched");
        b.classList.add("matched");
        first.disabled = true;
        b.disabled = true;
        first = null;
        matched++;
        if (matched === step.cards.length) done();
      } else {
        L.matchWrong = true;
        L.hearts--;
        document.getElementById("lesson-hearts").textContent = L.hearts;
        api("/api/sync-hearts", "POST", { hearts: L.hearts });
        const a = first, c = b;
        a.classList.add("wrong-flash");
        c.classList.add("wrong-flash");
        first = null;
        setTimeout(() => { a.classList.remove("selected", "wrong-flash"); c.classList.remove("wrong-flash"); }, 500);
        if (L.hearts <= 0) { showFail(); return; }
      }
    });
  });
  L.evaluate = null;
}
function resolveStep(correct, correctDisplay) {
  L.answered++;
  const fb = document.getElementById("feedback");
  const action = document.getElementById("lesson-action");
  if (correct) {
    L.correct++;
    L.xp += 10;
    fb.className = "feedback ok";
    fb.innerHTML = "¡Correcto! <b>+10 XP</b>";
  } else {
    L.hearts--;
    document.getElementById("lesson-hearts").textContent = L.hearts;
    api("/api/sync-hearts", "POST", { hearts: L.hearts });
    fb.className = "feedback bad";
    fb.innerHTML = "Correct answer: <b>" + esc(correctDisplay) + "</b>";
  }
  L.phase = "feedback";
  action.textContent = "Continue";
  action.disabled = false;
}
function showComplete() {
  stopSegment();
  document.getElementById("lesson-progress").style.width = "100%";
  const acc = L.answered > 0 ? Math.round((L.correct / L.answered) * 100) : 0;
  document.getElementById("lesson-body").innerHTML = `<div class="complete-box"><div class="trophy">🏆</div><h2>Lesson complete!</h2><p><b>${L.xp} XP</b> earned · ${acc}% accuracy</p><button id="again-btn" class="btn">Practice again</button></div>`;
  document.getElementById("feedback").className = "feedback hidden";
  const action = document.getElementById("lesson-action");
  action.textContent = "Back to path";
  action.disabled = false;
  L.phase = "done";
  document.getElementById("again-btn").addEventListener("click", () => startLesson(L.lesson.id));
  if (!L.posted) {
    L.posted = true;
    api("/api/complete-lesson", "POST", { lessonId: L.lesson.id, xp: L.xp, correct: L.correct, total: L.answered })
      .then((p) => { progress = p; renderHeader(); });
  }
}
function showFail() {
  stopSegment();
  document.getElementById("lesson-body").innerHTML = `<div class="complete-box"><div class="trophy">💔</div><h2>Out of hearts</h2><p>Review the dialogue and try again — it stays here.</p><button id="retry-btn" class="btn primary">Retry lesson</button></div>`;
  document.getElementById("feedback").className = "feedback hidden";
  const action = document.getElementById("lesson-action");
  action.textContent = "Back to path";
  action.disabled = false;
  L.phase = "done";
  document.getElementById("retry-btn").addEventListener("click", () => startLesson(L.lesson.id));
}
document.getElementById("lesson-action").addEventListener("click", () => {
  if (!L) return;
  if (L.phase === "study") { L.stepIdx = 1; renderStep(); return; }
  if (L.phase === "answer") {
    if (!L.evaluate) return;
    const r = L.evaluate();
    // mark chosen option right/wrong for choice-style steps
    document.querySelectorAll("#lesson-body .opt").forEach((b) => {
      if (b.classList.contains("selected")) b.classList.add(r.correct ? "correct" : "wrong");
      b.disabled = true;
    });
    document.querySelectorAll("#lesson-body .word-bank button").forEach((b) => { b.disabled = true; });
    const input = document.getElementById("tr-input");
    if (input) input.disabled = true;
    resolveStep(r.correct, r.correctDisplay);
    return;
  }
  if (L.phase === "feedback") {
    if (L.hearts <= 0) { showFail(); return; }
    L.stepIdx++;
    if (L.stepIdx > L.steps.length) showComplete();
    else renderStep();
    return;
  }
  if (L.phase === "done") { stopAudio(); showView("learn"); return; }
});
document.getElementById("lesson-exit").addEventListener("click", () => { stopAudio(); L = null; showView("learn"); });

/* ---------------- Init ---------------- */
renderRoadmap();
loadSegments();
refreshProgress().then(() => renderPath());
