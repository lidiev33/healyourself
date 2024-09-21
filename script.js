document.addEventListener('DOMContentLoaded', function () {
  const moodSelect = document.getElementById('mood');
  const submitButton = document.querySelector('button');
  const results = [];

  // Event listener for the submit button
  submitButton.addEventListener('click', function (e) {
    e.preventDefault();  // Prevents the page from refreshing
    
    const selectedMood = moodSelect.value;
    const currentDate = new Date().toLocaleDateString();
    const moodData = { date: currentDate, mood: selectedMood };
    
    results.push(moodData);
    localStorage.setItem('moodData', JSON.stringify(results));
    
    alert(`Mood recorded for ${currentDate}: ${selectedMood}`);
  });

  // Function to calculate weekly average mood score
  function calculateAverage() {
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
    return (moodScores.length > 0) ? (total / moodScores.length).toFixed(2) : 0;
  }

  // Display the weekly average (you can expand this)
  console.log('Weekly Average Mood:', calculateAverage());
});
