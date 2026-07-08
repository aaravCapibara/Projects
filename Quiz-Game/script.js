// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("ans-container");
const currentQuestionSpan = document.getElementById("current-Q");
const totalQuestionsSpan = document.getElementById("total-Q");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("maximum-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions dataset
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false }
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false }
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true }
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false }
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false }
    ],
  },
  {
    question: "Who developed the theory of relativity?",
    answers: [
      { text: "Isaac Newton", correct: false },
      { text: "Albert Einstein", correct: true },
      { text: "Nikola Tesla", correct: false },
      { text: "Marie Curie", correct: false }
    ],
  },
  {
    question: "Which country is home to the kangaroo?",
    answers: [
      { text: "South Africa", correct: false },
      { text: "Australia", correct: true },
      { text: "New Zealand", correct: false },
      { text: "Brazil", correct: false }
    ],
  },
  {
    question: "The Earth is flat.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
    ],
  },
  {
    question: "What is the powerhouse of the cell?",
    answers: [
      { text: "Nucleus", correct: false },
      { text: "Mitochondria", correct: true },
      { text: "Ribosome", correct: false },
      { text: "Cytoplasm", correct: false },
      { text: "Golgi Apparatus", correct: false }
    ]
  },
  {
    question: "The human body has 206 bones.",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false }
    ]
  },
  {
    question: "Which country gifted the Statue of Liberty to the USA?",
    answers: [
      { text: "United Kingdom", correct: false },
      { text: "Germany", correct: false },
      { text: "France", correct: true },
      { text: "Italy", correct: false }
    ]
  },
  {
    question: "How many elements are in the periodic table?",
    answers: [
      { text: "100", correct: false },
      { text: "112", correct: false },
      { text: "118", correct: true },
      { text: "120", correct: false },
      { text: "94", correct: false },
      { text: "108", correct: false }
    ]
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Monaco", correct: false },
      { text: "Malta", correct: false },
      { text: "Vatican City", correct: true }
    ]
  },
  {
    question: "Which programming language is mainly used for iOS app development?",
    answers: [
      { text: "Swift", correct: true },
      { text: "Kotlin", correct: false },
      { text: "Java", correct: false },
      { text: "C#", correct: false }
    ]
  },
  {
    question: "Sound travels faster in water than in air.",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false }
    ]
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Claude Monet", correct: false },
      { text: "Michelangelo", correct: false }
    ]
  },
  {
    question: "What is the closest star to Earth?",
    answers: [
      { text: "Proxima Centauri", correct: false },
      { text: "The Sun", correct: true },
      { text: "Sirius", correct: false },
      { text: "Betelgeuse", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "JavaScript", correct: false },
      { text: "SQL", correct: false },
      { text: "XML", correct: false }
    ]
  },
  {
    question: "How many bytes are in a kilobyte?",
    answers: [
      { text: "500", correct: false },
      { text: "1000", correct: false },
      { text: "1024", correct: true },
      { text: "2048", correct: false }
    ]
  },
  {
    question: "Which character in 'SpongeBob SquarePants' lives in a tentacle-shaped house?",
    answers: [
      { text: "SpongeBob", correct: false },
      { text: "Patrick", correct: false },
      { text: "Squidward", correct: true },
      { text: "Mr. Krabs", correct: false }
    ]
  },
  {
    question: "What is the longest river on Earth?",
    answers: [
      { text: "Amazon River", correct: false },
      { text: "Nile River", correct: true },
      { text: "Yangtze River", correct: false },
      { text: "Mississippi River", correct: false },
      { text: "Danube", correct: false }
    ]
  },
  {
    question: "Light enters the eye through which transparent structure?",
    answers: [
      { text: "Retina", correct: false },
      { text: "Iris", correct: false },
      { text: "Cornea", correct: true },
      { text: "Lens", correct: false }
    ]
  },
  {
    question: "Which company created the Android operating system?",
    answers: [
      { text: "Apple", correct: false },
      { text: "Microsoft", correct: false },
      { text: "Google", correct: true },
      { text: "Samsung", correct: false },
      { text: "Nokia", correct: false },
      { text: "BlackBerry", correct: false }
    ]
  },
  {
    question: "The currency of Japan is the Won.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
    ]
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: [
      { text: "Gold", correct: false },
      { text: "Iron", correct: false },
      { text: "Diamond", correct: true },
      { text: "Quartz", correct: false }
    ]
  },
  {
    question: "How many continents are there on Earth?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false }
    ]
  },
  {
    question: "Which fundamental force keeps us on the ground?",
    answers: [
      { text: "Magnetism", correct: false },
      { text: "Gravity", correct: true },
      { text: "Friction", correct: false }
    ]
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Jane Austen", correct: false }
    ]
  },
  {
    question: "What is the primary gas found in the air we breathe?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Carbon Dioxide", correct: false },
      { text: "Nitrogen", correct: true },
      { text: "Hydrogen", correct: false },
      { text: "Helium", correct: false }
    ]
  },
  {
    question: "Which protocol is used to securely fetch web pages?",
    answers: [
      { text: "HTTP", correct: false },
      { text: "FTP", correct: false },
      { text: "HTTPS", correct: true },
      { text: "SSH", correct: false }
    ]
  },
  {
    question: "Sharks are mammals.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
    ]
  },
  {
    question: "Which element does 'O' stand for on the periodic table?",
    answers: [
      { text: "Osmium", correct: false },
      { text: "Oxygen", correct: true },
      { text: "Gold", correct: false }
    ]
  },
  {
    question: "What is the largest land animal?",
    answers: [
      { text: "Rhino", correct: false },
      { text: "African Elephant", correct: true },
      { text: "Hippopotamus", correct: false },
      { text: "Giraffe", correct: false }
    ]
  },
  {
    question: "Which city is known as the Big Apple?",
    answers: [
      { text: "Los Angeles", correct: false },
      { text: "Chicago", correct: false },
      { text: "New York City", correct: true },
      { text: "Miami", correct: false }
    ]
  },
  {
    question: "HTML tags are enclosed in angle brackets: < >",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false }
    ]
  },
  {
    question: "What color do you get when mixing blue and yellow?",
    answers: [
      { text: "Green", correct: true },
      { text: "Purple", correct: false },
      { text: "Orange", correct: false },
      { text: "Brown", correct: false }
    ]
  },
  {
    question: "Which instrument is used to measure atmospheric pressure?",
    answers: [
      { text: "Thermometer", correct: false },
      { text: "Barometer", correct: true },
      { text: "Hygrometer", correct: false },
      { text: "Anemometer", correct: false }
    ]
  },
  {
    question: "In what year did the Titanic sink?",
    answers: [
      { text: "1905", correct: false },
      { text: "1912", correct: true },
      { text: "1920", correct: false },
      { text: "1898", correct: false }
    ]
  },
  {
    question: "What does URL stand for?",
    answers: [
      { text: "Uniform Resource Locator", correct: true },
      { text: "Unified Resource Link", correct: false },
      { text: "Universal Routing Locator", correct: false }
    ]
  },
  {
    question: "Spiders have six legs.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
    ]
  },
  {
    question: "Which planet is closest to the Sun?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mercury", correct: true },
      { text: "Earth", correct: false },
      { text: "Mars", correct: false }
    ]
  },
  {
    question: "Who is the main protagonist in 'The Legend of Zelda' gaming series?",
    answers: [
      { text: "Zelda", correct: false },
      { text: "Link", correct: true },
      { text: "Mario", correct: false },
      { text: "Luigi", correct: false }
    ]
  },
  {
    question: "Which deep-fried dough pastry is a staple breakfast food in France?",
    answers: [
      { text: "Croissant", correct: true },
      { text: "Donut", correct: false },
      { text: "Churro", correct: false }
    ]
  },
  {
    question: "What is the chemical formula for water?",
    answers: [
      { text: "CO2", correct: false },
      { text: "H2O", correct: true },
      { text: "NaCl", correct: false },
      { text: "O2", correct: false }
    ]
  },
  {
    question: "How many strings does a standard violin have?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "6", correct: false }
    ]
  },
  {
    question: "Which device is used to input text into a computer?",
    answers: [
      { text: "Mouse", correct: false },
      { text: "Monitor", correct: false },
      { text: "Keyboard", correct: true },
      { text: "Printer", correct: false },
      { text: "Speaker", correct: false }
    ]
  },
  {
    question: "The Great Wall of China is fully visible from the Moon without assistance.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
    ]
  },
  {
    question: "What animal is known for changing its skin color to camouflage?",
    answers: [
      { text: "Chameleon", correct: true },
      { text: "Gecko", correct: false },
      { text: "Iguana", correct: false },
      { text: "Salamander", correct: false }
    ]
  },
  {
    question: "Which inventer is credited with creating the telephone?",
    answers: [
      { text: "Thomas Edison", correct: false },
      { text: "Alexander Graham Bell", correct: true },
      { text: "Nikola Tesla", correct: false },
      { text: "Albert Einstein", correct: false }
    ]
  },
  {
    question: "Which of these is a primary color?",
    answers: [
      { text: "Green", correct: false },
      { text: "Orange", correct: false },
      { text: "Red", correct: true },
      { text: "Purple", correct: false }
    ]
  },
  {
    question: "What does CPU stand for?",
    answers: [
      { text: "Central Processing Unit", correct: true },
      { text: "Computer Power Unit", correct: false },
      { text: "Central Programming Utility", correct: false }
    ]
  },
  {
    question: "An octopus has three hearts.",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false }
    ]
  },
  {
    question: "Which country is famous for the Pyramids of Giza?",
    answers: [
      { text: "Mexico", correct: false },
      { text: "Greece", correct: false },
      { text: "Egypt", correct: true },
      { text: "Peru", correct: false }
    ]
  },
  {
    question: "What is the chemical symbol for Sodium?",
    answers: [
      { text: "S", correct: false },
      { text: "So", correct: false },
      { text: "Na", correct: true },
      { text: "Sd", correct: false }
    ]
  },
  {
    question: "Which fruit is known to have its seeds on the outside?",
    answers: [
      { text: "Blueberry", correct: false },
      { text: "Strawberry", correct: true },
      { text: "Raspberry", correct: false },
      { text: "Blackberry", correct: false }
    ]
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    answers: [
      { text: "class", correct: false },
      { text: "styles", correct: false },
      { text: "style", correct: true },
      { text: "font", correct: false }
    ]
  },
  {
    question: "Bats are completely blind.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
    ]
  },
  {
    question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Carbon Dioxide", correct: true },
      { text: "Hydrogen", correct: false }
    ]
  },
  {
    question: "How many items are in a dozen?",
    answers: [
      { text: "10", correct: false },
      { text: "12", correct: true },
      { text: "14", correct: false },
      { text: "24", correct: false }
    ]
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
      { text: "Neptune", correct: false },
      { text: "Uranus", correct: false }
    ]
  },
  {
    question: "Which CSS property is used to change text color?",
    answers: [
      { text: "text-color", correct: false },
      { text: "font-color", correct: false },
      { text: "color", correct: true }
    ]
  },
  {
    question: "A leap year has 366 days.",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false }
    ]
  },
  {
    question: "What is the capital of Italy?",
    answers: [
      { text: "Venice", correct: false },
      { text: "Milan", correct: false },
      { text: "Rome", correct: true },
      { text: "Florence", correct: false }
    ]
  },
  {
    question: "Which database language is used to manage relational databases?",
    answers: [
      { text: "HTML", correct: false },
      { text: "SQL", correct: true },
      { text: "XML", correct: false },
      { text: "JSON", correct: false }
    ]
  },
  {
    question: "What type of animal is a penguin?",
    answers: [
      { text: "Mammal", correct: false },
      { text: "Bird", correct: true },
      { text: "Reptile", correct: false },
      { text: "Amphibian", correct: false }
    ]
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "<-- -->", correct: false },
      { text: "#", correct: false },
      { text: "/* */", correct: false }
    ]
  },
  {
    question: "The Amazon Rainforest produces over 50% of the world's oxygen supply.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
    ]
  },
  {
    question: "What is the freezing point of water in Celsius?",
    answers: [
      { text: "-10°C", correct: false },
      { text: "0°C", correct: true },
      { text: "32°C", correct: false },
      { text: "100°C", correct: false }
    ]
  },
  {
    question: "Which company manufactures the iPhone?",
    answers: [
      { text: "Samsung", correct: false },
      { text: "Apple", correct: true },
      { text: "Google", correct: false },
      { text: "Sony", correct: false }
    ]
  },
  {
    question: "What is the standard name of the character on a 'No Parking' sign?",
    answers: [
      { text: "P", correct: true },
      { text: "N", correct: false },
      { text: "X", correct: false }
    ]
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    answers: [
      { text: "<link>", correct: false },
      { text: "<a>", correct: true },
      { text: "<href>", correct: false },
      { text: "<url>", correct: false }
    ]
  },
  {
    question: "Lightning is hotter than the surface of the Sun.",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false }
    ]
  },
  {
    question: "What is the currency of the United Kingdom?",
    answers: [
      { text: "Euro", correct: false },
      { text: "Dollar", correct: false },
      { text: "Pound Sterling", correct: true },
      { text: "Yen", correct: false }
    ]
  },
  {
    question: "Which array method adds an element to the end of an array in JS?",
    answers: [
      { text: "pop()", correct: false },
      { text: "push()", correct: true },
      { text: "shift()", correct: false },
      { text: "unshift()", correct: false }
    ]
  },
  {
    question: "How many zones are there in a standard dartboard?",
    answers: [
      { text: "10", correct: false },
      { text: "20", correct: true },
      { text: "50", correct: false }
    ]
  },
  {
    question: "Which planet is famous for its bright, prominent ring system?",
    answers: [
      { text: "Jupiter", correct: false },
      { text: "Uranus", correct: false },
      { text: "Saturn", correct: true },
      { text: "Neptune", correct: false }
    ]
  },
  {
    question: "Goldfish only have a three-second memory span.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
    ]
  },
  {
    question: "What is the capital of Canada?",
    answers: [
      { text: "Toronto", correct: false },
      { text: "Vancouver", correct: false },
      { text: "Ottawa", correct: true },
      { text: "Montreal", correct: false }
    ]
  },
  {
    question: "What is the name of the framework created by Facebook for frontend interfaces?",
    answers: [
      { text: "Angular", correct: false },
      { text: "Vue", correct: false },
      { text: "React", correct: true },
      { text: "Svelte", correct: false }
    ]
  },
  {
    question: "How many degrees are in a right angle?",
    answers: [
      { text: "45°", correct: false },
      { text: "90°", correct: true },
      { text: "180°", correct: false },
      { text: "360°", correct: false }
    ]
  },
  {
    question: "Which keyword is used to declare a constant variable in JavaScript?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: true }
    ]
  },
  {
    question: "Bananas grow on trees.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
    ]
  },
  {
    question: "What animal is the largest bird in the world?",
    answers: [
      { text: "Eagle", correct: false },
      { text: "Ostrich", correct: true },
      { text: "Emu", correct: false },
      { text: "Penguin", correct: false }
    ]
  },
  {
    question: "Which language engine runs directly inside web browsers?",
    answers: [
      { text: "Python", correct: false },
      { text: "Java", correct: false },
      { text: "JavaScript", correct: true },
      { text: "PHP", correct: false }
    ]
  },
  {
    question: "How many colors make up a standard rainbow?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false }
    ]
  },
  {
    question: "Which format is widely used for sending data payloads between web servers and clients?",
    answers: [
      { text: "JSON", correct: true },
      { text: "HTML", correct: false },
      { text: "CSS", correct: false }
    ]
  },
  {
    question: "The Pacific Ocean is the smallest ocean on our planet.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
    ]
  },
  {
    question: "Which tracking device is used to play computer games or guide aircraft options?",
    answers: [
      { text: "Keyboard", correct: false },
      { text: "Joystick", correct: true },
      { text: "Printer", correct: false }
    ]
  },
  {
    question: "What is the national animal of Scotland?",
    answers: [
      { text: "Lion", correct: false },
      { text: "Unicorn", correct: true },
      { text: "Dragon", correct: false },
      { text: "Loch Ness Monster", correct: false }
    ]
  },
  {
    question: "Which HTML element is used to insert a line break?",
    answers: [
      { text: "<break>", correct: false },
      { text: "<lb>", correct: false },
      { text: "<br>", correct: true }
    ]
  },
  {
    question: "Who was the first person to step onto the surface of the Moon?",
    answers: [
      { text: "Buzz Aldrin", correct: false },
      { text: "Yuri Gagarin", correct: false },
      { text: "Neil Armstrong", correct: true },
      { text: "Elon Musk", correct: false }
    ]
  },
  {
    question: "The chemical element Iron is designated by the symbol 'Ir'.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
    ]
  },
  {
    question: "What is the capital city of Australia?",
    answers: [
      { text: "Sydney", correct: false },
      { text: "Melbourne", correct: false },
      { text: "Canberra", correct: true },
      { text: "Brisbane", correct: false },
      { text: "Perth", correct: false }
    ]
  },
  {
    question: "Which CSS property controls text boldness levels?",
    answers: [
      { text: "font-style", correct: false },
      { text: "text-weight", correct: false },
      { text: "font-weight", correct: true }
    ]
  },
  {
    question: "How many seconds are in one full hour?",
    answers: [
      { text: "60", correct: false },
      { text: "3600", correct: true },
      { text: "2400", correct: false }
    ]
  },
  {
    question: "Which mathematical symbol acts as the assignment operator inside JavaScript variables?",
    answers: [
      { text: "=", correct: true },
      { text: "==", correct: false },
      { text: "===", correct: false }
    ]
  },
  {
    question: "Sound cannot travel through empty space vacuums.",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false }
    ]
  },
  {
    question: "What is the primary ingredient found in traditional guacamole dishes?",
    answers: [
      { text: "Tomato", correct: false },
      { text: "Onion", correct: false },
      { text: "Avocado", correct: true },
      { text: "Pepper", correct: false }
    ]
  },
  {
    question: "Which system is the largest internal organ inside the human body?",
    answers: [
      { text: "Brain", correct: false },
      { text: "Liver", correct: true },
      { text: "Heart", correct: false },
      { text: "Lungs", correct: false }
    ]
  },
  {
    question: "Are you a Donkey?",
    answers: [
      { text: "Yes :]", correct: true },
      { text: "No", correct: false }
    ]
  }
];


// Quiz tracking variables
let currentQuestionIndex = 0;
let score = 0;
let ansDisabled = false;

// Setup structural max totals on first init load
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0; // Fixed score variable refresh
    scoreSpan.textContent = 0;

    quizQuestions.sort(() => Math.floor(Math.random() * (quizQuestions.length * 2 + 1)) - quizQuestions.length);

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
};

function showQuestion() {
    ansDisabled = false; // unlock options tracking input

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    // Dynamically scale progress bar width
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;
    // Empty previous choices DOM elements
    answersContainer.innerHTML = "";

    // Loop through answers and construct option buttons
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("ans-btn"); // Maps perfectly to CSS selection

        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
};

function selectAnswer(event) {
    if(ansDisabled) return;

    ansDisabled = true; // Lock further selection immediately
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // Reveal correct/incorrect configurations to the user
    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");    
        } else if(button === selectedButton) {
            button.classList.add("incorrect");
        };
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score;
    };

    // Brief timeout stall to let colors display clearly before screen switches
    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        };
    }, 1000);
};

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;
    const percentage = (score / quizQuestions.length) * 100;

    // Dynamic ending display logic
    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great Job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    };
};

function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
};








//:]