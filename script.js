document.addEventListener('DOMContentLoaded', function () {
  const moodSelect = document.getElementById('mood');
  const submitButton = document.querySelector('button');
  const dailyReport = document.getElementById('dailyReport');
  const weeklyAverage = document.getElementById('weeklyAverage');
  let results = JSON.parse(localStorage.getItem('moodData')) || [];


const firebaseConfig = {
  apiKey: "AIzaSyDAcuQTkeAHOMbazn-Dmf9KuCPFuI3sdyk",
  authDomain: "healing-site.firebaseapp.com",
  projectId: "healing-site",
  storageBucket: "healing-site.appspot.com",
  messagingSenderId: "414554343739",
  appId: "1:414554343739:web:75083b9eedf3f59d738f1e",
  measurementId: "G-3TV74H6QE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


  
  // Function to display daily reports
  function displayDailyReports() {
  dailyReport.innerHTML = '';  // Clear previous reports
  
  // Retrieve data from Firebase
  database.ref('moods').once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      const moodEntry = childSnapshot.val();
      const li = document.createElement('li');
      li.textContent = `${moodEntry.date}: ${moodEntry.mood}`;
      dailyReport.appendChild(li);
    });
  });
}

  // Function to calculate weekly average mood score
  function calculateWeeklyAverage() {
    if (results.length === 0) return 0;
    let moodScores = results.map(entry => {
      switch (entry.mood) {
        case 'great':
          return 5;
        case 'good':
          return 4;
        case 'neutral':
          return 3;
        case 'bad':
          return 2;
        case 'awful':
          return 1;
        default:
          return 0;
      }
    });

  

    const total = moodScores.reduce((a, b) => a + b, 0);
    return (total / moodScores.length).toFixed(2);  // Returns the average with 2 decimal places
  }

  // Function to display the weekly average
  function displayWeeklyAverage() {
    const average = calculateWeeklyAverage();
    weeklyAverage.textContent = `Average Mood Score: ${average}`;
  }

  // When user submits the mood
submitButton.addEventListener('click', function (e) {
    e.preventDefault();

    const selectedMood = moodSelect.value;
    const currentDate = new Date().toLocaleDateString();
    const moodData = { date: currentDate, mood: selectedMood };

    // Push data to Firebase
    database.ref('moods/' + currentDate).set(moodData)
      .then(() => {
        console.log('Mood data saved successfully!');
        alert(`Mood recorded for ${currentDate}: ${selectedMood}`);
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });

    // Update daily and weekly reports
    displayDailyReports();
    displayWeeklyAverage();
});



});

