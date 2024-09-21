// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// Initialize Firebase when the document is ready
document.addEventListener('DOMContentLoaded', function () {
    const moodSelect = document.getElementById('mood');
    const submitButton = document.querySelector('button');
    const dailyReport = document.getElementById('dailyReport');

    // Your Firebase configuration object
    const firebaseConfig = {
        apiKey: "AIzaSyDAcuQTkeAHOMbazn-Dmf9KuCPFuI3sdyk",
        authDomain: "healing-site.firebaseapp.com",
        databaseURL: "https://healing-site-default-rtdb.firebaseio.com",
        projectId: "healing-site",
        storageBucket: "healing-site.appspot.com",
        messagingSenderId: "414554343739",
        appId: "1:414554343739:web:75083b9eedf3f59d738f1e",
        measurementId: "G-3TV74H6QE7"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    // Function to display daily reports
    function displayDailyReports() {
        dailyReport.innerHTML = ''; // Clear previous reports

        // Retrieve data from Firebase
        const dbRef = ref(database);
        get(child(dbRef, 'moods')).then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const moodEntry = childSnapshot.val();
                    const li = document.createElement('li');
                    li.textContent = `${moodEntry.date} (${moodEntry.timestamp}): ${moodEntry.mood}`;
                    dailyReport.appendChild(li);
                });
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error('Error getting data:', error);
        });
    }

    // When user submits the mood
    submitButton.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent form from submitting

        const selectedMood = moodSelect.value;
        const currentDate = new Date().toLocaleDateString();
        const timestamp = new Date().toISOString(); // Get the current timestamp
        const moodData = { date: currentDate, timestamp: timestamp, mood: selectedMood };

        // Use a unique key based on the timestamp
        const uniqueKey = new Date().getTime(); // Use a numeric timestamp for a unique key
        set(ref(database, 'moods/' + uniqueKey), moodData)
            .then(() => {
                console.log('Mood data saved successfully!');
                alert(`Mood recorded for ${currentDate}: ${selectedMood}`);
                displayDailyReports(); // Update daily reports after saving
            })
            .catch((error) => {
                console.error('Error saving data:', error);
            });
    });

    // Initialize and display data on page load
    displayDailyReports();
});

