// Function to fetch appointments using Axios
function getAppointmentsRequest(event) {
  event.preventDefault();

  // Use Axios to make a GET request to retrieve appointments
  axios
    .get("http://localhost:4000/getAppointments")
    .then((response) => {
      const data = response.data;
      const appointmentsList = document.getElementById("appointments-list");
      appointmentsList.innerHTML = "";
      data.forEach((appointment) => {
        const appointmentElement = document.createElement("div");
        appointmentElement.innerHTML = `
                    <p><strong>Full Name:</strong> ${appointment.full_name}</p>
                    <p><strong>Email:</strong> ${appointment.email}</p>
                    <p><strong>Phone:</strong> ${appointment.phone}</p>
                    <p><strong>Date:</strong> ${appointment.appointment_date}</p>
                    <p><strong>Time:</strong> ${appointment.appointment_time}</p>
                    <p><strong>Reason:</strong> ${appointment.reason}</p>
                    <hr>
                `;
        appointmentsList.appendChild(appointmentElement);
      });
    })
    .catch((error) => console.error("Error fetching appointments:", error));
}
